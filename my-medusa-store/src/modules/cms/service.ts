import { MedusaService } from "@medusajs/framework/utils"
import { Banner, Page } from "./models/banner"

export default class CmsModuleService extends MedusaService({
    Banner,
    Page,
}) { }
