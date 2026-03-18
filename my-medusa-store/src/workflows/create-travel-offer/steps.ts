import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { TRAVEL_MODULE } from "../../modules/travel"
import TravelModuleService from "../../modules/travel/service"

export type CreateTravelOfferStepInput = {
  first_name: string
  last_name: string
  email: string
  phone_number: string
  departure_city: string
  destination_city: string
  departure_date: string
  airline?: string
  available_kilos: number
  price_per_kilo: number
}

export const createTravelOfferStep = createStep(
  "create-travel-offer",
  async (input: CreateTravelOfferStepInput, { container }) => {
    const travelModuleService: TravelModuleService = container.resolve(TRAVEL_MODULE)
    const offer = await travelModuleService.createTravelOffers(input)
    return new StepResponse(offer, offer.id)
  },
  async (id: string, { container }) => {
    const travelModuleService: TravelModuleService = container.resolve(TRAVEL_MODULE)
    await travelModuleService.deleteTravelOffers(id)
  }
)

export const sendAdminNotificationStep = createStep(
  "send-admin-notification",
  async (input: { offerId: string; travelerName: string }, { container }) => {
    const notificationService = container.resolve("notification")
    
    // Using your configured email module
    await notificationService.createNotifications({
      to: process.env.ADMIN_EMAIL || "admin@mbengsend.com",
      channel: "email",
      template: "new-travel-offer", // You'll need to handle this in your email module
      data: {
        offer_id: input.offerId,
        traveler_name: input.travelerName,
        url: `${process.env.ADMIN_URL || 'http://localhost:9000'}/app/travel-offers/${input.offerId}`
      }
    })
    
    return new StepResponse({ success: true })
  }
)
