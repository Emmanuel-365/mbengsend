import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { createTravelBookingWorkflow } from "../../../workflows/create-travel-booking"

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const { result } = await createTravelBookingWorkflow(req.scope).run({
    input: req.body as any,
  })

  res.status(200).json({ travel_booking: result })
}
