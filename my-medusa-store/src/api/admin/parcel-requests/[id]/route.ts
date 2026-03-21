import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MBENG_SEND_LOGISTICS_MODULE } from "../../../../modules/mbengsendLogistics"
import MbengsendLogisticsModuleService from "../../../../modules/mbengsendLogistics/service"

export async function DELETE(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const { id } = req.params
    const logisticsService: MbengsendLogisticsModuleService = req.scope.resolve(MBENG_SEND_LOGISTICS_MODULE)

    await logisticsService.deleteParcelRequests(id)

    res.status(200).json({
        id,
        object: "parcel_request",
        deleted: true,
    })
}
