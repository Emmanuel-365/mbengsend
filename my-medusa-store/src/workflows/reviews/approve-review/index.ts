import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { updateProductRatingStep } from "./steps/update-product-rating"
import ReviewModuleService from "../../../modules/reviews/service"
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

export const updateReviewStatusStep = createStep(
  "update-review-status-step",
  async (input: { id: string, status: string }, { container }) => {
    const service: ReviewModuleService = container.resolve("reviews")
    const review = await service.updateReviews(input as any)
    return new StepResponse(review, { id: input.id, old_status: review.status })
  }
)

export const approveReviewWorkflow = createWorkflow(
  "approve-review-workflow",
  (input: { id: string, status: string, product_id: string }) => {
    const review = updateReviewStatusStep(input)
    
    // Si l'avis est approuvé ou rejeté, on met à jour la note du produit
    updateProductRatingStep({ product_id: input.product_id })

    return new WorkflowResponse(review)
  }
)
