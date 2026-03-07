import { Logger } from "@medusajs/framework/types"

export default class MeilisearchService {
    protected client: any
    protected logger: Logger
    protected initPromise: Promise<void>

    constructor({ logger }: { logger: Logger }) {
        this.logger = logger
        this.initPromise = this.init()
    }

    protected async init() {
        const { MeiliSearch } = await import("meilisearch")
        this.client = new MeiliSearch({
            host: process.env.MEILISEARCH_HOST || "http://localhost:7700",
            apiKey: process.env.MEILISEARCH_API_KEY || "meilimasterkey",
        })
    }

    async indexProducts(products: any[]) {
        try {
            await this.initPromise
            const index = this.client.index("products")
            const documents = products.map(p => ({
                id: p.id,
                title: p.title,
                handle: p.handle,
                description: p.description,
                thumbnail: p.thumbnail,
                status: p.status,
            }))

            await index.addDocuments(documents)
            this.logger.info(`[Meilisearch] Indexed ${documents.length} products`)
        } catch (error: any) {
            this.logger.error(`[Meilisearch] Indexing failed: ${error.message}`)
        }
    }

    async deleteProduct(productId: string) {
        try {
            await this.initPromise
            await this.client.index("products").deleteDocument(productId)
            this.logger.info(`[Meilisearch] Deleted product ${productId}`)
        } catch (error: any) {
            this.logger.error(`[Meilisearch] Deletion failed: ${error.message}`)
        }
    }

    async searchProducts(
        query: string,
        options?: { limit?: number; offset?: number }
    ): Promise<{ hits: any[]; estimatedTotalHits: number }> {
        try {
            await this.initPromise

            // Apply defaults and constraints
            const limit = Math.min(options?.limit || 20, 100)
            const offset = options?.offset || 0

            const index = this.client.index("products")
            const result = await index.search(query, {
                limit,
                offset,
            })

            this.logger.info(
                `[Meilisearch] Search query "${query}" returned ${result.hits.length} results`
            )

            return {
                hits: result.hits,
                estimatedTotalHits: result.estimatedTotalHits,
            }
        } catch (error: any) {
            this.logger.error(`[Meilisearch] Search failed: ${error.message}`)
            throw new Error("Search service temporarily unavailable")
        }
    }
}
