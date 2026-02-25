import { model } from "@medusajs/framework/utils"

const ShippingRate = model.define("shipping_rate", {
    id: model.id().primaryKey(),
    key: model.text().unique(),
    name: model.text(),
    price_xaf: model.bigNumber().default(0),
    price_eur: model.bigNumber().default(0),
})

export default ShippingRate
