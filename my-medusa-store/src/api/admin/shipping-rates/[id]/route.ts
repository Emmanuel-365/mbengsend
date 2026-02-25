import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import MbengsendLogisticsModuleService from "../../../../modules/mbengsendLogistics/service"

export async function POST(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const service: MbengsendLogisticsModuleService = req.scope.resolve("mbengsendLogistics")

    // Body should contain { id, price_xaf, price_eur }
    const { id, price_xaf, price_eur } = req.body as any

    const rate = await service.updateShippingRates({
        id,
        price_xaf,
        price_eur
    })

    res.json({
        shipping_rate: rate
    })
}
