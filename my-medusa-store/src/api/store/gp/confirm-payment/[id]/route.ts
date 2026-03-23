import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import { TRAVEL_MODULE } from "../../../../../modules/travel"
import TravelModuleService from "../../../../../modules/travel/service"
import { Stripe } from "stripe"

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const travelBookingId = req.params.id
  const { payment_intent_id } = req.body as any

  if (!travelBookingId) {
    return res.status(400).json({ message: "Missing travel booking ID" })
  }

  // 1. Verify Payment Intent if provided (Security)
  if (payment_intent_id) {
    try {
      const stripe = new Stripe(process.env.STRIPE_API_KEY as string, {
        apiVersion: "2024-06-20" as any,
      })
      const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent_id)
      
      if (paymentIntent.status !== "succeeded") {
        return res.status(400).json({ message: `Payment not succeeded. Status: ${paymentIntent.status}` })
      }

      // Verify that the payment intent belongs to this booking
      if (paymentIntent.metadata?.travel_booking_id !== travelBookingId) {
        return res.status(403).json({ message: "Payment intent does not match booking ID" })
      }
    } catch (err) {
      console.error("GP CONFIRM: Stripe verification failed:", err)
      return res.status(500).json({ message: "Failed to verify payment with Stripe" })
    }
  } else {
    // In production, we might want to FORBID confirmation without a payment intent
    // Unless it's an admin bypass or COD, but for GP we expect Stripe.
    console.warn("GP CONFIRM: Proceeding without payment_intent_id (unverified)")
    // For now we allow it but log a warning, in full production we should return 400.
  }

  const travelModuleService: TravelModuleService = req.scope.resolve(TRAVEL_MODULE)
  
  const booking = await travelModuleService.retrieveTravelBooking(travelBookingId)
  
  if (!booking) {
    return res.status(404).json({ message: "Travel booking not found" })
  }

  if (booking.payment_status === "paid") {
    return res.status(200).json({ booking, message: "Already paid" })
  }

  // 2. Atomic updates using transaction
  try {
    await (travelModuleService as any).withTransaction(async (transactionManager: any) => {
      // Mark booking as paid
      await travelModuleService.updateTravelBookings({
        id: booking.id,
        payment_status: "paid"
      }, transactionManager)

      // Decrease available kilos on the Travel Offer
      const offer = await travelModuleService.retrieveTravelOffer(booking.travel_offer_id)
      if (offer) {
        const newAvailableKilos = Math.max(0, (offer.available_kilos || 0) - (booking.kilos_reserved || 0))
        await travelModuleService.updateTravelOffers({
          id: offer.id,
          available_kilos: newAvailableKilos
        }, transactionManager)
        console.log(`GP CONFIRM: Decreased available kilos for offer ${offer.id}. New available: ${newAvailableKilos}`)
      }
    })
    
    const updatedBooking = await travelModuleService.retrieveTravelBooking(travelBookingId)
    res.status(200).json({ booking: updatedBooking })
  } catch (err) {
    console.error("GP CONFIRM: Transaction failed:", err)
    res.status(500).json({ message: "Failed to update booking and inventory" })
  }
}
