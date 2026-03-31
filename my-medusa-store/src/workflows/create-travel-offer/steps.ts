import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { TRAVEL_MODULE } from "../../modules/travel/constants"
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
    const offers = await travelModuleService.createTravelOffers([{
      ...input,
      departure_date: new Date(input.departure_date)
    }])
    const offer = offers[0]
    return new StepResponse(offer, offer.id)
  },
  async (id: string, { container }) => {
    const travelModuleService: TravelModuleService = container.resolve(TRAVEL_MODULE)
    await travelModuleService.deleteTravelOffers(id)
  }
)

export const sendAdminNotificationStep = createStep(
  "send-admin-notification",
  async (input: { offerId: string; first_name: string; last_name: string }, { container }) => {
    const notificationService = container.resolve("notification")
    const traveler_name = `${input.first_name} ${input.last_name}`
    
    // Using your configured email module
    await notificationService.createNotifications({
      to: process.env.ADMIN_EMAIL || "armandabouem@icloud.com",
      channel: "email",
      template: "new-travel-offer", // You'll need to handle this in your email module
      data: {
        offer_id: input.offerId,
        traveler_name,
        url: `${process.env.ADMIN_URL || 'http://localhost:9000'}/app/travel-offers/${input.offerId}`
      }
    })
    
    return new StepResponse({ success: true })
  }
)
