import { model } from "@medusajs/framework/utils"

export const ParcelRequest = model.define("parcel_request", {
    id: model.id().primaryKey(),
    customer_id: model.text().nullable(),
    sender_name: model.text(),
    sender_phone: model.text(),
    sender_address: model.text(),
    receiver_name: model.text(),
    receiver_phone: model.text(),
    receiver_address: model.text(),
    origin_city: model.text(),
    destination_city: model.text(),
    package_weight: model.number().nullable(),
    package_description: model.text(),
    status: model.enum(["PENDING", "ACCEPTED", "IN_TRANSIT", "DELIVERED", "CANCELLED"]).default("PENDING"),
    estimated_price: model.bigNumber().nullable(),
})
