import { model } from "@medusajs/framework/utils"

export const TravelOffer = model.define("travel_offer", {
  id: model.id().primaryKey(),
  first_name: model.text(),
  last_name: model.text(),
  email: model.text(),
  phone_number: model.text(),
  departure_city: model.text(),
  destination_city: model.text(),
  departure_date: model.dateTime(),
  airline: model.text().nullable(),
  available_kilos: model.number(),
  price_per_kilo: model.number(),
  selling_price_per_kilo: model.number().nullable(),
  status: model.enum(["pending", "approved", "rejected", "completed"]).default("pending"),
  metadata: model.json().nullable(),
  bookings: model.hasMany(() => TravelBooking, {
    mappedBy: "travel_offer",
  }),
})

export const TravelBooking = model.define("travel_booking", {
  id: model.id().primaryKey(),
  travel_offer: model.belongsTo(() => TravelOffer, {
    mappedBy: "bookings",
  }),
  buyer_first_name: model.text(),
  buyer_last_name: model.text(),
  buyer_email: model.text(),
  buyer_phone: model.text(),
  kilos_reserved: model.number(),
  total_price: model.number(),
  payment_status: model.enum(["pending", "paid", "refunded"]).default("pending"),
  status: model.enum(["pending", "package_received", "in_transit", "delivered"]).default("pending"),
})
