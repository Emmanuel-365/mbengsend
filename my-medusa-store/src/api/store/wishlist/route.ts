import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import WishlistModuleService from "../../../modules/wishlist/service"

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const service: WishlistModuleService = req.scope.resolve("wishlist")
    const customerId = req.query.customer_id as string

    if (!customerId) {
        return res.status(400).json({ message: "customer_id is required" })
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
    const service: WishlistModuleService = req.scope.resolve("wishlist")
    const { customer_id, product_id } = req.body as any

    if (!customer_id || !product_id) {
        return res.status(400).json({ message: "customer_id and product_id are required" })
    }

    let [wishlist] = await service.listWishlists({ customer_id }, { relations: ["items"] })

    if (!wishlist) {
        wishlist = await service.createWishlists({ customer_id })
    }

    // Vérifier si le produit est déjà présent
    const existingItem = wishlist.items?.find((i: any) => i.product_id === product_id)

    if (!existingItem) {
        await service.createWishlistItems({
            wishlist_id: wishlist.id,
            product_id: product_id
        })
    }

    const [updatedWishlist] = await service.listWishlists({ id: wishlist.id }, { relations: ["items"] })
    res.json({ wishlist: updatedWishlist })
}
