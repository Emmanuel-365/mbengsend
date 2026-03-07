import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { welcomeEmailWorkflow } from "../workflows/welcome-email"

export default async function customerCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<any>) {
  const { id } = data
  const logger = container.resolve("logger")

  logger.info(`[Subscriber] Customer created event received for: ${id}`)

  // Trigger the welcome email workflow
  await welcomeEmailWorkflow(container).run({
    input: {
      customer_id: id,
    },
  })
}

export const config: SubscriberConfig = {
  event: "customer.created",
}
