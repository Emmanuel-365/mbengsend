import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { TRAVEL_MODULE } from "../../../modules/travel"
import TravelModuleService from "../../../modules/travel/service"

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const travelModuleService: TravelModuleService = req.scope.resolve(TRAVEL_MODULE)
  
  const [offers, count] = await travelModuleService.listAndCountTravelOffers({}, {
    order: { created_at: "DESC" }
  })

  res.status(200).json({ 
    travel_offers: offers,
    count
  })
}
