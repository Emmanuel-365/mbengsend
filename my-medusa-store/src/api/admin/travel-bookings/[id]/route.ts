import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { TRAVEL_MODULE } from "../../../../modules/travel"
import TravelModuleService from "../../../../modules/travel/service"

export async function DELETE(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const { id } = req.params
  const travelModuleService: TravelModuleService = req.scope.resolve(TRAVEL_MODULE)
  
  await travelModuleService.deleteTravelBookings(id)

  res.status(200).json({ 
    id,
    object: "travel_booking",
    deleted: true
  })
}

export async function POST(
    req: MedusaRequest,
    res: MedusaResponse
  ) {
    const { id } = req.params
    const { status, payment_status } = req.body as any
    const travelModuleService: TravelModuleService = req.scope.resolve(TRAVEL_MODULE)
    
    const booking = await travelModuleService.updateTravelBookings({
        id,
        status,
        payment_status
    })
  
    res.status(200).json({ 
      travel_booking: booking
    })
  }
