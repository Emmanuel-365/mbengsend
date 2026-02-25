import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import ReviewModuleService from "../../../../modules/reviews/service"
import { approveReviewWorkflow } from "../../../../workflows/reviews/approve-review"

export async function POST(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const service: ReviewModuleService = req.scope.resolve("reviews")
    const { id } = req.params
    const { status } = req.body as any

    if (!status || !["approved", "rejected", "pending"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" })
    }

    // 1. Get the review to find the product_id
    const reviewData = await service.retrieveReview(id)
    
    // 2. Run workflow
    const { result: review } = await approveReviewWorkflow(req.scope)
        .run({
            input: {
                id,
                status: status as any,
                product_id: reviewData.product_id
            }
        })

    res.json({ review })
}

export async function DELETE(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const service: ReviewModuleService = req.scope.resolve("reviews")
    const { id } = req.params

    await service.deleteReviews(id)

    res.json({ id, deleted: true })
}
