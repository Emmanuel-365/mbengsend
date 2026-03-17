import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "zod"

const estimateSchema = z.object({
    package_weight: z.number().optional(),
    length: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    shipping_mode: z.enum(["air_freight", "sea_freight", "local_delivery"]).optional(),
    origin_city: z.string().optional(),
    destination_city: z.string().optional(),
})

export type EstimateRequestType = z.infer<typeof estimateSchema>

export async function POST(
    req: MedusaRequest<EstimateRequestType>,
    res: MedusaResponse
) {
    const input = estimateSchema.parse(req.body)

    let estimated_price = 0
    let billableWeight = input.package_weight || 0

    // Auto-detect local delivery if origin and destination cities match loosely, and mode isn't explicitly set
    let activeMode = input.shipping_mode
    if (!activeMode && input.origin_city && input.destination_city) {
        if (input.origin_city.toLowerCase() === input.destination_city.toLowerCase()) {
            activeMode = "local_delivery"
        } else {
            // Default to air freight if international or unclear
            activeMode = "air_freight"
        }
    }

    // Default if still none
    if (!activeMode) {
        activeMode = "air_freight"
    }

    // Calculate volumetric weight
    let volumetricWeight = 0
    if (input.length && input.width && input.height) {
        volumetricWeight = (input.length * input.width * input.height) / 5000
    }
    
    billableWeight = Math.max(billableWeight, volumetricWeight)

    // Apply rate
    const minimumWeight = activeMode === "local_delivery" ? 0 : 1
    const finalWeight = Math.max(billableWeight, minimumWeight)

    switch (activeMode) {
        case "air_freight":
            estimated_price = finalWeight * 6500
            break
        case "sea_freight":
            estimated_price = finalWeight * 3250
            break
        case "local_delivery":
            // Flat base + per kg for local
            estimated_price = finalWeight > 0 ? (finalWeight * 500) + 1500 : 2000
            break
    }

    res.json({ 
        estimated_price: Math.ceil(estimated_price),
        billable_weight: finalWeight,
        volumetric_weight: volumetricWeight,
        applied_mode: activeMode
    })
}
