import TravelModuleService from "./service"
import { Module } from "@medusajs/framework/utils"
import { TRAVEL_MODULE } from "./constants"

export { TRAVEL_MODULE }

export default Module(TRAVEL_MODULE, {
  service: TravelModuleService,
})
