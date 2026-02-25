import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { retrieveFulfillmentDetailsStep } from "./steps/retrieve-fulfillment-details"
import { formatShippingEmailStep } from "./steps/format-shipping-email"
import { sendEmailStep } from "../order-confirmation-email/steps/send-email"

export type ShippingNotificationEmailWorkflowInput = {
  fulfillment_id: string
}

export const shippingNotificationEmailWorkflow = createWorkflow(
  "shipping-notification-email-workflow",
  (input: ShippingNotificationEmailWorkflowInput) => {
    // Step 1: Retrieve fulfillment details
    const fulfillmentDetails = retrieveFulfillmentDetailsStep(input)

    // Step 2: Format email HTML
    const formattedEmail = formatShippingEmailStep(fulfillmentDetails)

    // Step 3: Send email (reuse from order confirmation)
    const result = sendEmailStep(formattedEmail)

    return new WorkflowResponse({
      success: result.success
    })
  }
)
