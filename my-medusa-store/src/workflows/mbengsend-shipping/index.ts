import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { logShippingDetailsStep } from "./steps/log-shipping-details"

export type MbengsendShippingWorkflowInput = {
    fulfillment_id: string
    tracking_number: string
}

export const mbengsendShippingWorkflow = createWorkflow(
    "mbengsend-shipping-workflow",
    (input: MbengsendShippingWorkflowInput) => {
        const shippingResult = logShippingDetailsStep(input)

        return new WorkflowResponse({
            success: shippingResult.success,
            tracking_number: input.tracking_number
        })
    }
)
