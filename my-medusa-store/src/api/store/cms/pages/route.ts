import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import CmsModuleService from "../../../../modules/cms/service"

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const service: CmsModuleService = req.scope.resolve("cms")
    const { handle } = req.query as any

    // On ne retourne que les pages publiées
    const [pages, count] = await service.listAndCountPages(
        { 
            is_published: true,
            ...(handle ? { handle } : {})
        }, 
        { order: { title: "ASC" } }
    )
    
    res.json({ pages, count })
}
