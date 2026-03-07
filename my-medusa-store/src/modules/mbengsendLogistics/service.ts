import { MedusaService } from "@medusajs/framework/utils"
import ShippingRate from "./models/shipping-rate"
import { ParcelRequest } from "./models/parcel-request"

class MbengsendLogisticsModuleService extends MedusaService({
    ShippingRate,
    ParcelRequest,
}) { }

export default MbengsendLogisticsModuleService
