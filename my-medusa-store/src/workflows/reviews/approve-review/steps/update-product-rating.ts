import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import ReviewModuleService from "../../../../modules/reviews/service"

export const updateProductRatingStepId = "update-product-rating-step"
export const updateProductRatingStep = createStep(
  updateProductRatingStepId,
  async (input: { product_id: string }, { container }) => {
    const reviewService: ReviewModuleService = container.resolve("reviews")
    const productModule = container.resolve(Modules.PRODUCT)

    // 1. Get all approved reviews for the product
    const [reviews] = await reviewService.listAndCountReviews(
      { product_id: input.product_id, status: "approved" }
    )

    if (reviews.length === 0) {
      await productModule.updateProducts(input.product_id, {
        metadata: {
          average_rating: 0,
          review_count: 0
        }
      })
      return new StepResponse({ success: true, rating: 0, count: 0 })
    }

    // 2. Calculate average
    const totalRating = reviews.reduce((acc, review) => acc + (review.rating || 0), 0)
    const averageRating = totalRating / reviews.length
    const count = reviews.length

    // 3. Update product metadata
    await productModule.updateProducts(input.product_id, {
      metadata: {
        average_rating: parseFloat(averageRating.toFixed(1)),
        review_count: count
      }
    })

    return new StepResponse({ success: true, rating: averageRating, count })
  }
)
