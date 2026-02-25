import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import CmsModuleService from "../../../../modules/cms/service"

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const service: CmsModuleService = req.scope.resolve("cms")
    const [pages, count] = await service.listAndCountPages({}, {
        order: { title: "ASC" }
    })
    res.json({ pages, count })
}

export async function POST(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const service: CmsModuleService = req.scope.resolve("cms")
    const page = await service.createPages(req.body as any)
    res.json({ page })
}
