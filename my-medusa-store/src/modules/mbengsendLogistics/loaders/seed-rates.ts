import { LoaderOptions } from "@medusajs/framework/types"
import MbengsendLogisticsModuleService from "../service"
import { MBENG_SEND_LOGISTICS_MODULE } from "../index"

export default async function seedShippingRates({ container }: LoaderOptions) {
    const logger = container.resolve("logger")

    try {
        const service: MbengsendLogisticsModuleService = container.resolve(MBENG_SEND_LOGISTICS_MODULE)

        const defaultRates = [
            { key: "air_freight", name: "Fret Aérien Express", price_xaf: 6500, price_eur: 10 },
            { key: "sea_freight", name: "Fret Maritime", price_xaf: 3250, price_eur: 5 },
            { key: "local_delivery", name: "Livraison Locale", price_xaf: 2000, price_eur: 3 },
            { key: "pickup", name: "Retrait Agence", price_xaf: 0, price_eur: 0 },
        ]

        for (const rate of defaultRates) {
            const [existing] = await service.listShippingRates({ key: rate.key })
            if (!existing) {
                await service.createShippingRates(rate)
                logger.info(`[Mbengsend Logistics] Seeded default rate: ${rate.key}`)
            }
        }
        logger.info("[Mbengsend Logistics] Seeding completed or already present.")
    } catch (error) {
        logger.warn(`[Mbengsend Logistics] Seeding loader could not run yet: ${error.message}`)
    }
}
