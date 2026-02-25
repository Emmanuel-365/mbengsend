import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

export const logShippingDetailsStep = createStep(
    "log-shipping-details",
    async (input: { fulfillment_id: string; tracking_number: string }, { container }) => {
        const logger = container.resolve("logger")
        logger.info(`[Mbengsend Workflow] Processing shipment for fulfillment: ${input.fulfillment_id}`)
        logger.info(`[Mbengsend Workflow] Tracking Number generated: ${input.tracking_number}`)

        // Ici, on pourrait appeler une API Mbengsend réelle
        
        return new StepResponse({ success: true, tracking_number: input.tracking_number })
    }
)
