import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export default async function reindexMeilisearch({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
    const query = container.resolve(ContainerRegistrationKeys.QUERY)
    const meilisearchService = container.resolve("meilisearch")

    logger.info("[Meilisearch Script] Starting full re-index...")

    try {
        // Dynamically find the default currency
        const { data: stores } = await query.graph({
            entity: "store",
            fields: ["supported_currencies.*"]
        });

        const defaultCurrency = stores[0]?.supported_currencies.find(c => c && c.is_default)?.currency_code || 'eur';
        logger.info(`[Meilisearch Script] Using default currency: ${defaultCurrency}`);

        // Fetch all products with all necessary fields
        const { data: products } = await query.graph({
            entity: "product",
            fields: [
                "id", "title", "handle", "description", "thumbnail", "status",
                "categories.*", "variants.*", "variants.calculated_price.*",
                "created_at"
            ],
            context: {
                currency_code: defaultCurrency
            }
        })

        if (products && products.length > 0) {
            logger.info(`[Meilisearch Script] Found ${products.length} products to index`)
            await meilisearchService.reindexAll(products)
            logger.info("[Meilisearch Script] Full re-index completed successfully")
        } else {
            logger.warn("[Meilisearch Script] No products found to index")
        }
    } catch (error) {
        logger.error(`[Meilisearch Script] Re-index failed: ${error.message}`)
    }
}
