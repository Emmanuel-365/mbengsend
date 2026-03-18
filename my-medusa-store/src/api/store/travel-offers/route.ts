import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { createTravelOfferWorkflow } from "../../../workflows/create-travel-offer"
import { TRAVEL_MODULE } from "../../../modules/travel/constants"
import TravelModuleService from "../../../modules/travel/service"

// Liste des offres validées pour le public
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const travelModuleService: TravelModuleService = req.scope.resolve(TRAVEL_MODULE)
  
  // On ne récupère que les offres approuvées
  const [offers, count] = await travelModuleService.listAndCountTravelOffers({
    status: "approved"
  }, {
    order: { departure_date: "ASC" },
    take: 20
  })

  res.status(200).json({ 
    travel_offers: offers,
    count
  })
}

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const { result } = await createTravelOfferWorkflow(req.scope).run({
    input: req.body as any,
  })

  res.status(200).json({ travel_offer: result })
}
