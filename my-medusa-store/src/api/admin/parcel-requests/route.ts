import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { listParcelRequestsWorkflow } from "../../../workflows/list-parcel-requests"

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const { result } = await listParcelRequestsWorkflow(req.scope).run()

    res.json({ parcel_requests: result })
}
