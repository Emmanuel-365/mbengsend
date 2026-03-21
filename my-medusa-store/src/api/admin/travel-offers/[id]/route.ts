import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { TRAVEL_MODULE } from "../../../../modules/travel"
import TravelModuleService from "../../../../modules/travel/service"

export async function DELETE(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const { id } = req.params
    const travelModuleService: TravelModuleService = req.scope.resolve(TRAVEL_MODULE)

    await travelModuleService.deleteTravelOffers(id)

    res.status(200).json({
        id,
        object: "travel_offer",
        deleted: true,
    })
}
