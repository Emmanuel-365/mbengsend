import { Logger } from "@medusajs/framework/types"

export default class MeilisearchService {
    protected client: any
    protected logger: Logger

    constructor({ logger }: { logger: Logger }) {
        this.logger = logger
        this.init()
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
            if (!this.client) await this.init()
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
            if (!this.client) await this.init()
            await this.client.index("products").deleteDocument(productId)
            this.logger.info(`[Meilisearch] Deleted product ${productId}`)
        } catch (error: any) {
            this.logger.error(`[Meilisearch] Deletion failed: ${error.message}`)
        }
    }
}
