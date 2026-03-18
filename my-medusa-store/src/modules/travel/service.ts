import { MedusaService } from "@medusajs/framework/utils"
import { TravelOffer, TravelBooking } from "./models/travel-offer"

export default class TravelModuleService extends MedusaService({
  TravelOffer,
  TravelBooking,
}) {}
