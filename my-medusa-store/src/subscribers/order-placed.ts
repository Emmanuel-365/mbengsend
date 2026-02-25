import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { orderConfirmationEmailWorkflow } from "../workflows/order-confirmation-email"

export default async function orderPlacedHandler({
  event: { data },
  container,
}: SubscriberArgs<any>) {
  const { id } = data
  const logger = container.resolve("logger")

  logger.info(`[Subscriber] Order placed event received for: ${id}`)

  // Trigger the order confirmation email workflow
  await orderConfirmationEmailWorkflow(container).run({
    input: {
      order_id: id,
    },
  })
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
