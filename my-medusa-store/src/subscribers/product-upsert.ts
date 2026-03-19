import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export default async function productUpsertHandler({
    event,
    container,
}: SubscriberArgs<any>) {
    const productId = event.data.id
    const eventName = event.name
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
    const meilisearchService = container.resolve("meilisearch")
    const query = container.resolve(ContainerRegistrationKeys.QUERY)

    logger.info(`[Subscriber] Received event ${eventName} for product ${productId}`)

    if (eventName === "product.deleted") {
        await meilisearchService.deleteProduct(productId)
        return
    }

    try {
        // On récupère les détails complets du produit
        // Note: Pour les prix calculés, sans contexte de région/devise, cela peut varier.
        // Le service meilisearch gère le cas où calculated_price est absent.
        const { data: products } = await query.graph({
            entity: "product",
            fields: [
                "id", "title", "handle", "description", "thumbnail", "status",
                "categories.*", "variants.*", "variants.calculated_price.*",
                "created_at"
            ],
            filters: { id: productId }
        })

        if (products && products.length > 0) {
            await meilisearchService.indexProducts([products[0]])
            logger.info(`[Subscriber] Successfully indexed product ${productId} in Meilisearch`)
        } else {
            logger.warn(`[Subscriber] Product ${productId} not found for indexing`)
        }
    } catch (error) {
        logger.error(`[Subscriber] Failed to index product ${productId}: ${error.message}`)
    }
}

export const config: SubscriberConfig = {
    event: ["product.created", "product.updated", "product.deleted"],
}
