import {
    AbstractFulfillmentProviderService,
    MedusaError,
} from "@medusajs/framework/utils"
import {
    CalculateShippingOptionPriceDTO,
    CalculatedShippingOptionPrice,
    CreateFulfillmentResult,
    CreateShippingOptionDTO,
    FulfillmentDTO,
    FulfillmentItemDTO,
    FulfillmentOption,
    FulfillmentOrderDTO,
} from "@medusajs/framework/types"

export default class MbengsendLogisticsService extends AbstractFulfillmentProviderService {
    static identifier = "mbengsend"

    protected options_: any
    protected container_: any

    constructor(container: any, options: any) {
        super()
        this.container_ = container
        this.options_ = options
    }

    async getFulfillmentOptions(): Promise<FulfillmentOption[]> {
        return [
            { id: "pickup", name: "Retrait Agence", is_return: false },
            { id: "local_delivery", name: "Livraison Locale", is_return: false },
            { id: "sea_freight", name: "Fret Maritime", is_return: false },
            { id: "air_freight", name: "Fret Aérien Express", is_return: false },
        ]
    }

    async validateOption(data: Record<string, unknown>): Promise<boolean> {
        return true
    }

    async validateFulfillmentData(
        optionData: Record<string, unknown>,
        data: Record<string, unknown>,
        context: any
    ): Promise<any> {
        return { ...data }
    }

    async canCalculate(data: CreateShippingOptionDTO): Promise<boolean> {
        // Both flat and calculated options can be checked here.
        // For flat rate (like 'pickup'), it doesn't need to calculate
        return data.price_type === "calculated"
    }

    async calculatePrice(
        optionData: CalculateShippingOptionPriceDTO["optionData"],
        data: CalculateShippingOptionPriceDTO["data"],
        context: CalculateShippingOptionPriceDTO["context"]
    ): Promise<CalculatedShippingOptionPrice> {
        const logisticsService = this.container_.resolve("mbengsendLogistics")

        let totalWeightGr = 0
        let totalItems = 0

        // Sum up the weight of items in the cart (in grams)
        if (context.items) {
            for (const item of context.items as any[]) {
                const itemWeight = (item.variant?.weight as number) || 0
                totalWeightGr += itemWeight * item.quantity
                totalItems += item.quantity
            }
        }

        const totalWeightKg = totalWeightGr / 1000

        let calculatedAmount = 0
        const currency = ((context as any).currency_code || "eur").toLowerCase()

        // Fetch rate from DB
        const [dbRate] = await logisticsService.listShippingRates({ key: optionData.id })

        if (optionData.id === "pickup") {
            calculatedAmount = 0
        } else if (dbRate) {
            const rateAmount = currency === "xaf" ? Number(dbRate.price_xaf) : Number(dbRate.price_eur)

            if (optionData.id === "local_delivery") {
                calculatedAmount = rateAmount
            } else {
                // Freight calculation with 1kg minimum
                const billableWeight = totalWeightKg < 1 ? 1 : totalWeightKg
                calculatedAmount = billableWeight * rateAmount
            }
        } else {
            // Fallback to static options if DB record missing
            const rates = this.options_?.rates || {}
            switch (optionData.id) {
                case "local_delivery":
                    calculatedAmount = rates.local_delivery?.[currency] || (currency === "xaf" ? 2000 : 3)
                    break
                case "sea_freight": {
                    const billableWeightSea = totalWeightKg < 1 ? 1 : totalWeightKg
                    const rateSea = rates.sea_freight?.[currency] || (currency === "xaf" ? 3250 : 5)
                    calculatedAmount = billableWeightSea * rateSea
                    break
                }
                case "air_freight": {
                    const billableWeightAir = totalWeightKg < 1 ? 1 : totalWeightKg
                    const rateAir = rates.air_freight?.[currency] || (currency === "xaf" ? 6500 : 10)
                    calculatedAmount = billableWeightAir * rateAir
                    break
                }
                default:
                    calculatedAmount = 0
            }
        }

        // Arrondir pour les centimes le cas échéant
        const finalAmount = Math.ceil(calculatedAmount)

        return {
            calculated_amount: finalAmount,
            is_calculated_price_tax_inclusive: true,
        }
    }

    async createFulfillment(
        data: Record<string, unknown>,
        items: Partial<Omit<FulfillmentItemDTO, "fulfillment">>[],
        order: Partial<FulfillmentOrderDTO> | undefined,
        fulfillment: Partial<Omit<FulfillmentDTO, "provider_id" | "data" | "items">>
    ): Promise<CreateFulfillmentResult> {
        // Generate a dummy tracking number
        const tracking_number = `MBS-${Math.floor(Math.random() * 1000000)}`
        return {
            data: {
                ...data,
            },
            labels: [{ tracking_number, tracking_url: `https://mbengsend.com/track/${tracking_number}`, label_url: "" }]
        }
    }

    async cancelFulfillment(data: Record<string, unknown>): Promise<any> {
        return {}
    }

    async getFulfillmentDocuments(data: Record<string, unknown>): Promise<never[]> {
        return []
    }

    async createReturnFulfillment(
        fulfillment: Record<string, unknown>
    ): Promise<CreateFulfillmentResult> {
        return { data: {}, labels: [] }
    }

    async getReturnDocuments(data: Record<string, unknown>): Promise<never[]> {
        return []
    }

    async getShipmentDocuments(data: Record<string, unknown>): Promise<never[]> {
        return []
    }

    async retrieveDocuments(
        fulfillmentData: Record<string, unknown>,
        documentType: string
    ): Promise<void> { }
}
