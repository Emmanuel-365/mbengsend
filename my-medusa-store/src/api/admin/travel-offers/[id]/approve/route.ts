import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { TRAVEL_MODULE } from "../../../../../modules/travel"
import TravelModuleService from "../../../../../modules/travel/service"

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const { id } = req.params
  const travelModuleService: TravelModuleService = req.scope.resolve(TRAVEL_MODULE)
  
  const offer = await travelModuleService.updateTravelOffers({
    id,
    status: "approved"
  })

  res.status(200).json({ travel_offer: offer })
}
