import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { retrieveOrderDetailsStep } from "./steps/retrieve-order-details"
import { formatOrderEmailStep } from "./steps/format-order-email"
import { sendEmailStep } from "./steps/send-email"

export type OrderConfirmationEmailWorkflowInput = {
  order_id: string
}

export const orderConfirmationEmailWorkflow = createWorkflow(
  "order-confirmation-email-workflow",
  (input: OrderConfirmationEmailWorkflowInput) => {
    // Step 1: Retrieve order details
    const orderDetails = retrieveOrderDetailsStep(input)

    // Step 2: Format email HTML
    const formattedEmail = formatOrderEmailStep(orderDetails)

    // Step 3: Send email
    const result = sendEmailStep(formattedEmail)

    return new WorkflowResponse({
      success: result.success
    })
  }
)
