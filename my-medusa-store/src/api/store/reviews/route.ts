import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import ReviewModuleService from "../../../modules/reviews/service"
import { z } from "zod"
import { Modules } from "@medusajs/framework/utils"

const createReviewSchema = z.object({
    product_id: z.string(),
    rating: z.number().min(1).max(5),
    comment: z.string().optional(),
    title: z.string().optional(),
    author_name: z.string().optional(), // Keep it optional in case of guest
})

export async function POST(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const service: ReviewModuleService = req.scope.resolve("reviews")

    // Retrieve customer_id and customer name from authenticated session
    const customerId = req.auth?.metadata?.customer_id
    let authorName = "Anonymous"

    if (customerId) {
        const customerModule = req.scope.resolve(Modules.CUSTOMER)
        const customer = await customerModule.retrieveCustomer(customerId, { select: ["first_name", "last_name"] })
        authorName = `${customer.first_name} ${customer.last_name || ''}`.trim()
    } else {
        // Since we have a middleware, this part might be redundant, but it's good for safety.
        return res.status(401).json({ message: "Not authenticated" })
    }

    const validated = createReviewSchema.safeParse(req.body)

    if (!validated.success) {
        return res.status(400).json({ 
            message: "Validation failed", 
            errors: validated.error.errors 
        })
    }

    const { product_id, rating, comment, title } = validated.data

    const review = await service.createReviews({
        product_id,
        rating,
        comment,
        title,
        author_name: authorName,
        customer_id: customerId,
        status: "pending",
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
        { 
            status: "approved",
            ...(product_id ? { product_id } : {})
        },
        { order: { created_at: "DESC" } }
    )

    res.json({ reviews, count })
}
