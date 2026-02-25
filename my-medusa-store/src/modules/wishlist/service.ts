import { MedusaService } from "@medusajs/framework/utils"
import { Wishlist, WishlistItem } from "./models/wishlist"

export default class WishlistModuleService extends MedusaService({
    Wishlist,
    WishlistItem,
}) { }
