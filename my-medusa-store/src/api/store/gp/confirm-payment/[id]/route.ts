import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import { TRAVEL_MODULE } from "../../../../../modules/travel"
import TravelModuleService from "../../../../../modules/travel/service"

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const travelBookingId = req.params.id

  if (!travelBookingId) {
    return res.status(400).json({ message: "Missing travel booking ID" })
  }

  const travelModuleService: TravelModuleService = req.scope.resolve(TRAVEL_MODULE)
  
  const booking = await travelModuleService.retrieveTravelBooking(travelBookingId)
  
  if (!booking) {
    return res.status(404).json({ message: "Travel booking not found" })
  }

  // Si on a reçu le payment intent status ou simplement on update
  // Idealement, si c'est appelé par le front après confirmation de Stripe:
  // on pourrait interroger le payment collection de Medusa, mais pour l'instant:
  
  // Update booking to paid
  const updated = await travelModuleService.updateTravelBookings({
    id: booking.id,
    payment_status: "paid"
  })

  // Envoyer un email de confirmation au client si on le souhaite

  res.status(200).json({ booking: updated })
}
