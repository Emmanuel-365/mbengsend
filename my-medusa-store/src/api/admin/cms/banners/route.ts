import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import CmsModuleService from "../../../../modules/cms/service"

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const service: CmsModuleService = req.scope.resolve("cms")
    const [banners, count] = await service.listAndCountBanners({}, {
        order: { position: "ASC" }
    })
    res.json({ banners, count })
}

export async function POST(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const service: CmsModuleService = req.scope.resolve("cms")
    const banner = await service.createBanners(req.body as any)
    res.json({ banner })
}
