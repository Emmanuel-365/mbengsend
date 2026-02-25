import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import ReviewModuleService from "../../../modules/reviews/service"

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const service: ReviewModuleService = req.scope.resolve("reviews")
    const { status, product_id } = req.query as any

    const [reviews, count] = await service.listAndCountReviews(
        { 
            ...(status ? { status } : {}),
            ...(product_id ? { product_id } : {})
        },
        { 
            order: { created_at: "DESC" },
            take: req.query.take ? parseInt(req.query.take as string) : 20,
            skip: req.query.skip ? parseInt(req.query.skip as string) : 0,
        }
    )

    res.json({ reviews, count })
}
