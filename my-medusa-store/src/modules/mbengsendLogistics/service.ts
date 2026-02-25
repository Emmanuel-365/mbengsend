import { MedusaService } from "@medusajs/framework/utils"
import ShippingRate from "./models/shipping-rate"

class MbengsendLogisticsModuleService extends MedusaService({
    ShippingRate,
}) { }

export default MbengsendLogisticsModuleService
