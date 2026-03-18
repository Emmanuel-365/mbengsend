import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { createTravelOfferWorkflow } from "../../../workflows/create-travel-offer"

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const { result } = await createTravelOfferWorkflow(req.scope).run({
    input: req.body as any,
  })

  res.status(200).json({ travel_offer: result })
}
