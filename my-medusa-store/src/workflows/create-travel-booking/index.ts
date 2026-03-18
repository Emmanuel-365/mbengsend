import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { createTravelBookingStep, sendBookingNotificationStep, CreateTravelBookingStepInput } from "./steps"

export const createTravelBookingWorkflow = createWorkflow(
  "create-travel-booking-workflow",
  (input: CreateTravelBookingStepInput) => {
    const booking = createTravelBookingStep(input)
    
    sendBookingNotificationStep({
      bookingId: booking.id,
      travelerEmail: "admin@mbengsend.com" // Simplified
    })
    
    return new WorkflowResponse(booking)
  }
)
