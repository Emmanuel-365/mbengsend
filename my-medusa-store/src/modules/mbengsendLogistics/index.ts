import MbengsendLogisticsModuleService from "./service"
import { Module } from "@medusajs/framework/utils"
import seedRates from "./loaders/seed-rates"

export const MBENG_SEND_LOGISTICS_MODULE = "mbengsendLogistics"

export default Module(MBENG_SEND_LOGISTICS_MODULE, {
    service: MbengsendLogisticsModuleService,
    loaders: [seedRates],
})
