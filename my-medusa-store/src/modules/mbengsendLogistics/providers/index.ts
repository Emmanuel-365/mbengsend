import { ModuleProvider, Modules } from "@medusajs/framework/utils"
import MbengsendLogisticsService from "./service"

export default ModuleProvider(Modules.FULFILLMENT, {
    services: [MbengsendLogisticsService],
})
