import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import { createTravelOfferWorkflow } from "../../../workflows/create-travel-offer"
import { TRAVEL_MODULE } from "../../../modules/travel/constants"
import TravelModuleService from "../../../modules/travel/service"

// ... (GET remains same)

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const { result } = await createTravelOfferWorkflow(req.scope).run({
    input: req.body as any,
  })

  // Trigger Email Notification to Admin
  const notificationModuleService = req.scope.resolve(Modules.NOTIFICATION)
  
  try {
    const offer = result as any
    await notificationModuleService.createNotifications({
      to: "contact@mbengsend.com",
      channel: "email",
      template: "Nouvelle Offre de Voyage",
      data: {
        html: `
          <h1>Nouvelle Offre de Voyage à Approuver</h1>
          <p><strong>Voyageur:</strong> ${offer.first_name} ${offer.last_name} (${offer.email})</p>
          <p><strong>Trajet:</strong> ${offer.departure_city} &rarr; ${offer.destination_city}</p>
          <p><strong>Date:</strong> ${offer.departure_date}</p>
          <p><strong>Kilos dispo:</strong> ${offer.available_kilos} Kg</p>
          <p><strong>Prix demandé:</strong> ${offer.price_per_kilo} €/Kg</p>
          <br/>
          <a href="https://api.mbengsend.com/app/travel-offers" style="display:inline-block;padding:10px 20px;background-color:#28a745;color:white;text-decoration:none;border-radius:5px;">Approuver dans l'Admin</a>
        `
      }
    })
  } catch (error) {
    console.error("Failed to send admin notification for travel offer:", error)
  }

  res.status(200).json({ travel_offer: result })
}
