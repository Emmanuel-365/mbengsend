import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { TRAVEL_MODULE } from "../../../../modules/travel"
import TravelModuleService from "../../../../modules/travel/service"

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const { travel_offer_id, kilos, firstName, lastName, email, phoneNumber } = req.body as any
  
  if (!travel_offer_id || !kilos || !email || !firstName) {
    return res.status(400).json({ message: "Missing required fields" })
  }
 
  const travelModuleService: TravelModuleService = req.scope.resolve(TRAVEL_MODULE)
  
  // 1. Get Travel Offer to calculate total price
  const offer = await travelModuleService.retrieveTravelOffer(travel_offer_id)
  
  if (!offer || offer.status !== "approved") {
    return res.status(404).json({ message: "Travel offer not found or not approved" })
  }

  const sellingPrice = offer.selling_price_per_kilo || offer.price_per_kilo
  const totalPrice = kilos * sellingPrice

  // 2. Create Travel Booking directly
  const booking = await travelModuleService.createTravelBookings({
    travel_offer_id,
    buyer_first_name: firstName,
    buyer_last_name: lastName,
    buyer_email: email,
    buyer_phone: phoneNumber,
    kilos_reserved: Number(kilos),
    total_price: totalPrice,
    status: "pending",
    payment_status: "pending"
  })

  // 3. TODO: Trigger Email Notification to Admin here

  res.status(200).json({ booking })
}
