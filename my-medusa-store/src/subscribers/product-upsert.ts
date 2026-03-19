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
        // Dynamically find the default currency for context
        const { data: stores } = await query.graph({
            entity: "store",
            fields: ["supported_currencies.*"]
        });
        const defaultCurrency = stores[0]?.supported_currencies.find(c => c && c.is_default)?.currency_code || 'eur';
        logger.info(`[Subscriber] Using default currency: ${defaultCurrency} for product ${productId}`);

        // On récupère les détails complets du produit
        const { data: products } = await query.graph({
            entity: "product",
            fields: [
                "id", "title", "handle", "description", "thumbnail", "status",
                "categories.*", "variants.*", "variants.calculated_price.*",
                "created_at"
            ],
            filters: { id: productId },
            context: {
                currency_code: defaultCurrency
            }
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
