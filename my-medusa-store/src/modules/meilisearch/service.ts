import { MeiliSearch } from "meilisearch"
import { Logger } from "@medusajs/framework/types"

export default class MeilisearchService {
    protected client: MeiliSearch
    protected logger: Logger

    constructor({ logger }: { logger: Logger }) {
        this.logger = logger
        this.client = new MeiliSearch({
            host: process.env.MEILISEARCH_HOST || "http://localhost:7700",
            apiKey: process.env.MEILISEARCH_API_KEY || "meilimasterkey",
        })
    }

    async indexProducts(products: any[]) {
        try {
            const index = this.client.index("products")
            const documents = products.map(p => ({
                id: p.id,
                title: p.title,
                handle: p.handle,
                description: p.description,
                thumbnail: p.thumbnail,
                status: p.status,
                // On peut ajouter plus de champs si nécessaire
            }))

            await index.addDocuments(documents)
            this.logger.info(`[Meilisearch] Indexed ${documents.length} products`)
        } catch (error) {
            this.logger.error(`[Meilisearch] Indexing failed: ${error.message}`)
        }
    }

    async deleteProduct(productId: string) {
        try {
            await this.client.index("products").deleteDocument(productId)
            this.logger.info(`[Meilisearch] Deleted product ${productId}`)
        } catch (error) {
            this.logger.error(`[Meilisearch] Deletion failed: ${error.message}`)
        }
    }
}
