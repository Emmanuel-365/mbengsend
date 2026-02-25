import { MedusaService } from "@medusajs/framework/utils"
import { Banner } from "./models/banner"

export default class CmsModuleService extends MedusaService({
    Banner,
}) { }
