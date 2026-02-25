import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export default async function validateModules({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
    const cmsService = container.resolve("cms")
    const reviewsService = container.resolve("reviews")

    logger.info("--- Validation des nouveaux modules ---")

    try {
        // 1. Test du module CMS
        const banner = await cmsService.createBanners({
            title: "Promotion Exceptionnelle Fret Aérien",
            image_url: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1",
            link: "/store/products/air-freight",
            is_active: true
        })
        logger.info(`[CMS] Bannière de test créée : ${banner.title}`)

        // 2. Test du module Reviews
        // On récupère d'abord un produit existant pour lier l'avis
        const query = container.resolve(ContainerRegistrationKeys.QUERY)
        const { data: products } = await query.graph({ 
            entity: "product", 
            fields: ["id", "title"] 
        })

        if (products.length > 0) {
            const review = await reviewsService.createReviews({
                product_id: products[0].id,
                customer_id: "test-customer",
                rating: 5,
                comment: "Excellent service de fret, rapide et sécurisé !"
            })
            logger.info(`[Reviews] Avis de test créé pour le produit : ${products[0].title}`)
        } else {
            logger.warn("[Reviews] Aucun produit trouvé pour créer un avis.")
        }

        logger.info("--- Validation terminée avec succès ! ---")
    } catch (error) {
        logger.error(`Erreur lors de la validation : ${error.message}`)
    }
}
