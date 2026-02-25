import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import WishlistModuleService from "../../../../modules/wishlist/service"

export async function DELETE(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const service: WishlistModuleService = req.scope.resolve("wishlist")
    const { id } = req.params

    await service.deleteWishlistItems(id)

    res.json({
        id,
        object: "wishlist_item",
        deleted: true,
    })
}
