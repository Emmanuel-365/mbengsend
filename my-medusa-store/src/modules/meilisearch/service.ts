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

            // Set settings for the index
            await index.updateSettings({
                searchableAttributes: ["title", "description", "categories"],
                filterableAttributes: ["status", "categories", "price"],
                sortableAttributes: ["price", "created_at"],
            })

            const documents = products.map(p => {
                // Find minimum price among variants
                const prices = p.variants?.map((v: any) => v.calculated_price?.calculated_amount).filter(Boolean) || []
                const minPrice = prices.length > 0 ? Math.min(...prices) : 0

                return {
                    id: p.id,
                    title: p.title,
                    handle: p.handle,
                    description: p.description,
                    thumbnail: p.thumbnail,
                    status: p.status,
                    categories: p.categories?.map((c: any) => c.handle) || [],
                    price: minPrice,
                    created_at: p.created_at,
                }
            })

            await index.addDocuments(documents, { primaryKey: "id" })
            this.logger.info(`[Meilisearch] Indexed ${documents.length} products with refined metadata`)
        } catch (error: any) {
            this.logger.error(`[Meilisearch] Indexing failed: ${error.message}`)
        }
    }

    /**
     * Purge the entire index and re-index all provided products.
     * Use this when duplicates are suspected in the index.
     */
    async reindexAll(products: any[]) {
        try {
            await this.initPromise
            const index = this.client.index("products")

            // Delete all documents first
            await index.deleteAllDocuments()
            this.logger.info(`[Meilisearch] Purged all documents from 'products' index`)

            // Wait for the delete task to complete
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Re-index with fresh data
            await this.indexProducts(products)
        } catch (error: any) {
            this.logger.error(`[Meilisearch] Full re-index failed: ${error.message}`)
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
        options?: {
            limit?: number;
            offset?: number;
            filter?: string;
            sort?: string[];
        }
    ): Promise<{ hits: any[]; estimatedTotalHits: number }> {
        try {
            await this.initPromise

            const limit = Math.min(options?.limit || 20, 100)
            const offset = options?.offset || 0

            const index = this.client.index("products")
            const result = await index.search(query, {
                limit,
                offset,
                filter: options?.filter,
                sort: options?.sort,
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

