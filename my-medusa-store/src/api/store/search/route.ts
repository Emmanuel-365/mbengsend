import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "zod"
import MeilisearchService from "../../../modules/meilisearch/service"

const searchQuerySchema = z.object({
  q: z.string().min(1, "Search query (q) is required"),
  limit: z.coerce.number().optional(),
  offset: z.coerce.number().optional(),
  filter: z.string().optional(),
  sort: z.string().optional(), // Expected format: "field:asc", "field:desc"
})

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const meilisearchService: MeilisearchService = req.scope.resolve("meilisearch")

  // Validate query parameters
  const validated = searchQuerySchema.safeParse(req.query)

  if (!validated.success) {
    res.status(400).json({
      message: validated.error.errors[0]?.message || "Search query (q) is required",
      errors: validated.error.errors,
    })
    return
  }

  const { q, limit, offset, filter, sort } = validated.data

  try {
    // Call Meilisearch service
    const result = await meilisearchService.searchProducts(q, {
      limit,
      offset,
      filter,
      sort: sort ? [sort] : undefined,
    })

    // Return formatted response
    res.json({
      products: result.hits,
      count: result.estimatedTotalHits,
      limit: limit || 20,
      offset: offset || 0,
    })
  } catch (error: any) {
    // Handle service unavailability
    res.status(503).json({
      message: "Search service temporarily unavailable",
    })
  }
}

