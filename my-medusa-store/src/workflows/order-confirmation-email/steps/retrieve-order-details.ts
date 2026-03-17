import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { Modules } from "@medusajs/framework/utils"

export type OrderDetailsOutput = {
  order_number: string
  customer_email: string
  customer_name: string
  items: Array<{
    title: string
    quantity: number
    unit_price: number
  }>
  total: number
  currency_code: string
  order_date: Date
  shipping_address: {
    address_1: string
    address_2?: string
    city: string
    postal_code: string
    country_code: string
  }
}

export const retrieveOrderDetailsStep = createStep(
  "retrieve-order-details",
  async (input: { order_id: string }, { container }) => {
    const logger = container.resolve("logger")
    const orderModule = container.resolve(Modules.ORDER)

    try {
      // Retrieve order with necessary relations
      const order = await orderModule.retrieveOrder(input.order_id, {
        relations: ["items", "shipping_address"]
      })

      // Handle missing customer email
      if (!order.email) {
        logger.error(`[Order Confirmation] Order ${input.order_id} has no customer email`)
        return new StepResponse(null)
      }

      // Extract order details
      const orderDetails: OrderDetailsOutput = {
        order_number: order.display_id?.toString() || order.id,
        customer_email: order.email,
        customer_name: `${order.shipping_address?.first_name || ''} ${order.shipping_address?.last_name || ''}`.trim() || 'Customer',
        items: order.items?.map((item: any) => ({
          title: item.title || item.variant_title || 'Product',
          quantity: item.quantity || 1,
          unit_price: item.unit_price || 0
        })) || [],
        total: Number(order.total || 0),
        currency_code: order.currency_code || 'EUR',
        order_date: new Date(order.created_at || new Date()),
        shipping_address: {
          address_1: order.shipping_address?.address_1 || '',
          address_2: order.shipping_address?.address_2,
          city: order.shipping_address?.city || '',
          postal_code: order.shipping_address?.postal_code || '',
          country_code: order.shipping_address?.country_code || ''
        }
      }

      logger.info(`[Order Confirmation] Retrieved details for order ${orderDetails.order_number}`)
      return new StepResponse(orderDetails)
    } catch (error) {
      logger.error(`[Order Confirmation] Failed to retrieve order ${input.order_id}: ${error}`)
      return new StepResponse(null)
    }
  }
)
