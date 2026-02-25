import { model } from "@medusajs/framework/utils"

export const Wishlist = model.define("wishlist", {
    id: model.id().primaryKey(),
    customer_id: model.text().index().unique(),
    items: model.hasMany(() => WishlistItem, {
        mappedBy: "wishlist",
    }),
})

export const WishlistItem = model.define("wishlist_item", {
    id: model.id().primaryKey(),
    wishlist: model.belongsTo(() => Wishlist, {
        mappedBy: "items",
    }),
    product_id: model.text().index(),
})