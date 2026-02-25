import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import MbengsendLogisticsModuleService from "../../../modules/mbengsendLogistics/service"

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const logger = req.scope.resolve("logger")
    logger.info("[Mbengsend Logistics] GET /admin/shipping-rates hit")

    const service: MbengsendLogisticsModuleService = req.scope.resolve("mbengsendLogistics")

    let [rates, count] = await service.listAndCountShippingRates({}, {
        order: { key: "ASC" }
    })

    if (count === 0) {
        logger.info("[Mbengsend Logistics] No rates found, auto-seeding...")
        const defaultRates = [
            { key: "air_freight", name: "Fret Aérien Express", price_xaf: 6500, price_eur: 10 },
            { key: "sea_freight", name: "Fret Maritime", price_xaf: 3250, price_eur: 5 },
            { key: "local_delivery", name: "Livraison Locale", price_xaf: 2000, price_eur: 3 },
            { key: "pickup", name: "Retrait Agence", price_xaf: 0, price_eur: 0 },
        ]
        await service.createShippingRates(defaultRates)

        const result = await service.listAndCountShippingRates({}, {
            order: { key: "ASC" }
        })
        rates = result[0]
        count = result[1]
    }

    res.json({
        shipping_rates: rates,
        count
    })
}
