import { SubscriberArgs, SubscriberConfig } from "@medusajs/medusa"
import { mbengsendShippingWorkflow } from "../workflows/mbengsend-shipping"
import { shippingNotificationEmailWorkflow } from "../workflows/shipping-notification-email"

export default async function fulfillmentCreatedHandler({
    event: { data },
    container,
}: SubscriberArgs<any>) {
    const { id } = data
    const logger = container.resolve("logger")
    const fulfillmentService = container.resolve("fulfillment")

    logger.info(`[Subscriber] Fulfillment created event received for: ${id}`)

    // On récupère le fulfillment pour avoir le tracking number
    const fulfillment = await fulfillmentService.retrieveFulfillment(id, {
        relations: ["labels"]
    })

    // Trigger shipping notification email workflow for all fulfillments
    await shippingNotificationEmailWorkflow(container).run({
        input: {
            fulfillment_id: id
        }
    })

    // Keep existing mbengsend workflow logic
    if (fulfillment.provider_id === "mbengsend") {
        const tracking_number = (fulfillment.labels as any[])?.[0]?.tracking_number || "NO_TRACKING"

        // On lance le workflow Mbengsend
        await mbengsendShippingWorkflow(container).run({
            input: {
                fulfillment_id: id,
                tracking_number: tracking_number
            }
        })
    }
}

export const config: SubscriberConfig = {
    event: "fulfillment.created",
}
