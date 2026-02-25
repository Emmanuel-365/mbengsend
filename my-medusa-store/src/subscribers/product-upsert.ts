import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export default async function productUpsertHandler({
    event: { data },
    container,
}: SubscriberArgs<any>) {
    const productId = data.id
    const meilisearchService = container.resolve("meilisearch")
    const query = container.resolve(ContainerRegistrationKeys.QUERY)

    // On récupère les détails complets du produit
    const { data: products } = await query.graph({
        entity: "product",
        fields: ["id", "title", "handle", "description", "thumbnail", "status"],
        filters: { id: productId }
    })

    if (products.length > 0) {
        await meilisearchService.indexProducts([products[0]])
    }
}

export const config: SubscriberConfig = {
    event: ["product.created", "product.updated"],
}
