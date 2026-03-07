import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { createParcelRequestWorkflow } from "../../../workflows/create-parcel-request"
import { z } from "zod"

const parcelRequestSchema = z.object({
    customer_id: z.string().optional(),
    sender_name: z.string(),
    sender_phone: z.string(),
    sender_address: z.string(),
    receiver_name: z.string(),
    receiver_phone: z.string(),
    receiver_address: z.string(),
    origin_city: z.string(),
    destination_city: z.string(),
    package_weight: z.number().optional(),
    package_description: z.string(),
    estimated_price: z.number().optional(),
})

export type CreateParcelRequestType = z.infer<typeof parcelRequestSchema>

export async function POST(
    req: MedusaRequest<CreateParcelRequestType>,
    res: MedusaResponse
) {
    // Only valid fields reach here due to Zod validation in a production environment
    // We'll trust the body directly, or parse it just to be sure:
    const input = parcelRequestSchema.parse(req.body)

    const { result } = await createParcelRequestWorkflow(req.scope).run({
        input,
    })

    res.json({ parcel_request: result })
}
