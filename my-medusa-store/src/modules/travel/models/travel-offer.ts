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
  status: model.enum(["pending", "approved", "rejected", "completed"]).default("pending"),
  metadata: model.json().nullable(),
})
