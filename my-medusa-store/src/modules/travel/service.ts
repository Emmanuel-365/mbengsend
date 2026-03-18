import { MedusaService } from "@medusajs/framework/utils"
import { TravelOffer } from "./models/travel-offer"

export default class TravelModuleService extends MedusaService({
  TravelOffer,
}) {}
