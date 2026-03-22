import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import { TRAVEL_MODULE } from "../../../../modules/travel"
import TravelModuleService from "../../../../modules/travel/service"

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
) {
  console.log("GP RESERVE ROUTE: Received request", req.body)
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
    payment_status: "pending" // Remains pending until Stripe confirms
  })

  // 3. Trigger Email Notification to Admin
  const notificationModuleService = req.scope.resolve(Modules.NOTIFICATION)
  
  try {
    await notificationModuleService.createNotifications({
      to: process.env.ADMIN_EMAIL || "contact@mbengsend.com", // L'email de l'admin
      channel: "email",
      template: "Nouvelle Réservation GP",
      data: {
        html: `
          <h1>Nouvelle Réservation de Kilos</h1>
          <p><strong>Client:</strong> ${firstName} ${lastName} (${email})</p>
          <p><strong>Téléphone:</strong> ${phoneNumber}</p>
          <p><strong>Kilos:</strong> ${kilos} Kg</p>
          <p><strong>Trajet:</strong> ${offer.departure_city} &rarr; ${offer.destination_city}</p>
          <p><strong>Prix Total prévu:</strong> ${totalPrice} €</p>
          <br/>
          <a href="https://api.mbengsend.com/app/travel-bookings" style="display:inline-block;padding:10px 20px;background-color:#007bff;color:white;text-decoration:none;border-radius:5px;">Voir dans l'Admin</a>
        `
      }
    })
  } catch (error) {
    console.error("Failed to send admin notification:", error)
  }

  // 4. Create Payment Collection and Session via Medusa Payment Module
  let client_secret: string | null = null;
  let payment_collection_id: string | null = null;
  let payment_error: any = null;
  
  try {
    const paymentModuleService = req.scope.resolve(Modules.PAYMENT)
    
    // We multiply by 100 because Stripe expects amounts in cents for EUR
    const amountInCents = Math.round(totalPrice * 100);

    const paymentCollection = await paymentModuleService.createPaymentCollections({
      currency_code: "eur",
      amount: amountInCents,
    })

    const paymentSession = await paymentModuleService.createPaymentSession(
      paymentCollection.id,
      {
        provider_id: "stripe",
        currency_code: "eur",
        amount: amountInCents,
        data: {
          email: email,
          metadata: {
            travel_booking_id: booking.id
          }
        }
      }
    )

    client_secret = (paymentSession.data?.client_secret as string) || null;
    payment_collection_id = paymentCollection.id;

    console.log("GP RESERVE ROUTE: Created payment session", { client_secret, payment_collection_id })

    // We can also update the booking to attach the payment_collection_id if needed, but returning it is enough for now.
  } catch (err: any) {
    console.error("GP RESERVE ROUTE: Failed to initialize payment session:", err)
    payment_error = err.message || err.toString();
    // require("fs").writeFileSync("payment_error.log", payment_error + "\n" + (err.stack||""), { flag: 'a' });
  }

  console.log("GP RESERVE ROUTE: Returning response", { booking_id: booking.id, has_client_secret: !!client_secret })
  res.status(200).json({ 
    booking, 
    client_secret,
    payment_collection_id,
    payment_error
  })
}
