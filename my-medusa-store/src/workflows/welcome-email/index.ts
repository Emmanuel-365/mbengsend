import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { retrieveCustomerDetailsStep } from "./steps/retrieve-customer-details"
import { formatWelcomeEmailStep } from "./steps/format-welcome-email"
import { sendEmailStep } from "../order-confirmation-email/steps/send-email"

export type WelcomeEmailWorkflowInput = {
  customer_id: string
}

export const welcomeEmailWorkflow = createWorkflow(
  "welcome-email-workflow",
  (input: WelcomeEmailWorkflowInput) => {
    // Step 1: Retrieve customer details
    const customerDetails = retrieveCustomerDetailsStep(input)

    // Step 2: Format email HTML
    const formattedEmail = formatWelcomeEmailStep(customerDetails)

    // Step 3: Send email (reuse from order-confirmation-email)
    const result = sendEmailStep(formattedEmail)

    return new WorkflowResponse({
      success: result.success
    })
  }
)
