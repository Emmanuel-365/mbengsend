import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export default async function indexAllProducts({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
    const meilisearchService = container.resolve("meilisearch")
    const query = container.resolve(ContainerRegistrationKeys.QUERY)

    logger.info("[Meilisearch] Starting full re-index...")

    try {
        const { data: products } = await query.graph({
            entity: "product",
            fields: ["id", "title", "handle", "description", "thumbnail", "status"]
        })

        if (products.length > 0) {
            await meilisearchService.indexProducts(products)
            logger.info(`[Meilisearch] Successfully indexed ${products.length} products.`)
        } else {
            logger.warn("[Meilisearch] No products found to index.")
        }
    } catch (error) {
        logger.error(`[Meilisearch] Full re-index failed: ${error.message}`)
    }
}
