import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import CmsModuleService from "../../../../modules/cms/service"

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const service: CmsModuleService = req.scope.resolve("cms")
    
    // On ne retourne que les bannières actives
    const [banners, count] = await service.listAndCountBanners(
        { is_active: true }, 
        { order: { position: "ASC" } }
    )
    
    res.json({ banners, count })
}
