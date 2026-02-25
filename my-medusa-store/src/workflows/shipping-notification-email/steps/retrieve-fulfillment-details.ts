import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { Modules } from "@medusajs/framework/utils"

export type FulfillmentDetailsOutput = {
  order_number: string
  customer_email: string
  customer_name: string
  tracking_number?: string
  carrier?: string
}

export const retrieveFulfillmentDetailsStep = createStep(
  "retrieve-fulfillment-details",
  async (input: { fulfillment_id: string }, { container }) => {
    const logger = container.resolve("logger")
    const fulfillmentModule = container.resolve(Modules.FULFILLMENT)

    try {
      // Retrieve fulfillment with labels and order relation
      const fulfillment = await fulfillmentModule.retrieveFulfillment(input.fulfillment_id, {
        relations: ["labels", "order", "order.shipping_address"]
      })

      // Access order from fulfillment
      const order = (fulfillment as any).order

      // Handle missing order or customer email
      if (!order || !order.email) {
        logger.error(`[Shipping Notification] Fulfillment ${input.fulfillment_id} has no order or customer email`)
        return new StepResponse(null)
      }

      // Extract tracking information (may be missing)
      const trackingNumber = fulfillment.labels?.[0]?.tracking_number
      const carrier = fulfillment.provider_id

      const fulfillmentDetails: FulfillmentDetailsOutput = {
        order_number: order.display_id?.toString() || order.id,
        customer_email: order.email,
        customer_name: `${order.shipping_address?.first_name || ''} ${order.shipping_address?.last_name || ''}`.trim() || 'Customer',
        tracking_number: trackingNumber,
        carrier: carrier
      }

      logger.info(`[Shipping Notification] Retrieved details for fulfillment ${input.fulfillment_id}`)
      return new StepResponse(fulfillmentDetails)
    } catch (error) {
      logger.error(`[Shipping Notification] Failed to retrieve fulfillment ${input.fulfillment_id}: ${error}`)
      return new StepResponse(null)
    }
  }
)
