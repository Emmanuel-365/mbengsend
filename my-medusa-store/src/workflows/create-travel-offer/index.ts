import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { createTravelOfferStep, sendAdminNotificationStep, CreateTravelOfferStepInput } from "./steps"

export const createTravelOfferWorkflow = createWorkflow(
  "create-travel-offer-workflow",
  (input: CreateTravelOfferStepInput) => {
    const offer = createTravelOfferStep(input)
    
    sendAdminNotificationStep({
      offerId: offer.id,
      travelerName: `${input.first_name} ${input.last_name}`
    })
    
    return new WorkflowResponse(offer)
  }
)
