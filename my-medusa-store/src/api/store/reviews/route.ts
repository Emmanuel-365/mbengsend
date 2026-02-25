import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import ReviewModuleService from "../../../modules/reviews/service"

export async function POST(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const service: ReviewModuleService = req.scope.resolve("reviews")

    // Validation basique
    const { product_id, rating, comment, customer_id } = req.body as any

    if (!product_id || !rating) {
        return res.status(400).json({ message: "product_id and rating are required" })
    }

    const review = await service.createReviews({
        product_id,
        rating,
        comment,
        customer_id: customer_id || "guest",
    })

    res.json({ review })
}

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const service: ReviewModuleService = req.scope.resolve("reviews")
    const { product_id } = req.query as any

    const [reviews, count] = await service.listAndCountReviews(
        product_id ? { product_id } : {},
        { order: { created_at: "DESC" } }
    )

    res.json({ reviews, count })
}
