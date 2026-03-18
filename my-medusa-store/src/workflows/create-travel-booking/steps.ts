import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { TRAVEL_MODULE } from "../../modules/travel"
import TravelModuleService from "../../modules/travel/service"

export type CreateTravelBookingStepInput = {
  travel_offer_id: string
  buyer_first_name: string
  buyer_last_name: string
  buyer_email: string
  buyer_phone: string
  kilos_reserved: number
  total_price: number
}

export const createTravelBookingStep = createStep(
  "create-travel-booking",
  async (input: CreateTravelBookingStepInput, { container }) => {
    const travelModuleService: TravelModuleService = container.resolve(TRAVEL_MODULE)
    const bookings = await travelModuleService.createTravelBookings([input])
    const booking = bookings[0]
    return new StepResponse(booking, booking.id)
  }
)

export const sendBookingNotificationStep = createStep(
  "send-booking-notification",
  async (input: { bookingId: string; travelerEmail: string }, { container }) => {
    const notificationService = container.resolve("notification")
    
    // Notify Admin of a new booking
    await notificationService.createNotifications({
      to: process.env.ADMIN_EMAIL || "admin@mbengsend.com",
      channel: "email",
      template: "new-gp-booking",
      data: {
        booking_id: input.bookingId,
        url: `${process.env.ADMIN_URL || 'http://localhost:9000'}/app/travel-bookings/${input.bookingId}`
      }
    })
    
    return new StepResponse({ success: true })
  }
)
