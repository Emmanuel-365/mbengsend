import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import WishlistModuleService from "../../../modules/wishlist/service"
import { z } from "zod"

const wishlistActionSchema = z.object({
    product_id: z.string().optional(),
    variant_id: z.string().optional(),
}).refine(data => data.product_id || data.variant_id, {
    message: "Either product_id or variant_id must be provided"
})

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const service: WishlistModuleService = req.scope.resolve("wishlist")
    
    // Retrieve customer_id from authenticated session
    const customerId = (req as any).auth_context?.actor_id || (req as any).auth_context?.app_metadata?.customer_id
    
    if (!customerId) {
        console.error("Wishlist GET: No customerId found in auth_context. Auth context:", JSON.stringify((req as any).auth_context))
        return res.status(401).json({ message: "Not authenticated" })
    }

    let [wishlist] = await service.listWishlists({ customer_id: customerId }, {
        relations: ["items"]
    })

    if (!wishlist) {
        wishlist = await service.createWishlists({ customer_id: customerId })
    }

    res.json({ wishlist })
}

export async function POST(
    req: MedusaRequest,
    res: MedusaResponse
) {
    console.log("WISHLIST_POST_START");
    const service: WishlistModuleService = req.scope.resolve("wishlist")
    
    // Retrieve customer_id from authenticated session
    console.log("AUTH_CONTEXT_POST:", JSON.stringify((req as any).auth_context));
    const customerId = (req as any).auth_context?.actor_id || (req as any).auth_context?.app_metadata?.customer_id
    
    if (!customerId) {
        console.error("Wishlist POST: No customerId found in auth_context. Auth context:", JSON.stringify((req as any).auth_context))
        return res.status(401).json({ message: "Not authenticated" })
    }

    const validated = wishlistActionSchema.safeParse(req.body)
    if (!validated.success) {
        return res.status(400).json({ message: "Validation failed", errors: validated.error.errors })
    }

    const { product_id, variant_id } = validated.data

    let [wishlist] = await service.listWishlists({ customer_id: customerId }, { relations: ["items"] })

    if (!wishlist) {
        wishlist = await service.createWishlists({ customer_id: customerId })
    }

    // Vérifier si l'item est déjà présent
    // Pour les produits multi-variantes, on vérifie par variant_id
    // Pour les produits single-variante, on peut vérifier par product_id ou variant_id
    const existingItem = wishlist.items?.find((i: any) => {
        // Si on ajoute une variante spécifique, chercher par variant_id
        if (variant_id) {
            return i.variant_id === variant_id
        }
        // Si on ajoute juste un produit (single variant), chercher par product_id
        if (product_id) {
            return i.product_id === product_id && !i.variant_id
        }
        return false
    })

    if (!existingItem) {
        await service.createWishlistItems({
            wishlist_id: wishlist.id,
            product_id: product_id || null,
            variant_id: variant_id || null
        })
    }

    const [updatedWishlist] = await service.listWishlists({ id: wishlist.id }, { relations: ["items"] })
    res.json({ wishlist: updatedWishlist })
}
