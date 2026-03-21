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
    length: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    shipping_mode: z.enum(["air_freight", "sea_freight", "local_delivery"]).optional(),
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

    let estimated_price = input.estimated_price

    // Calculate estimated price if not provided but dimensions/weight and mode are present
    if (estimated_price === undefined && input.shipping_mode) {
        let billableWeight = input.package_weight || 0

        // Calculate volumetric weight
        if (input.length && input.width && input.height) {
            const volumetricWeight = (input.length * input.width * input.height) / 5000
            if (volumetricWeight > billableWeight) {
                billableWeight = volumetricWeight
            }
        }

        // Apply rate
        const minimumWeight = input.shipping_mode === "local_delivery" ? 0 : 1
        const finalWeight = Math.max(billableWeight, minimumWeight)

        switch (input.shipping_mode) {
            case "air_freight":
                estimated_price = finalWeight * 6500
                break
            case "sea_freight":
                estimated_price = finalWeight * 3250
                break
            case "local_delivery":
                estimated_price = finalWeight > 0 ? (finalWeight * 500) + 1500 : 2000 // Base 2000 + 500/kg
                break
        }
    }

    const { result } = await createParcelRequestWorkflow(req.scope).run({
        input: {
            ...input,
            estimated_price,
        },
    })

    // Notify Admin via Email
    try {
        const notificationModuleService = req.scope.resolve("notification")
        await notificationModuleService.createNotifications({
            to: "contact@mbengsend.com",
            channel: "email",
            template: "parcel-request-notification", 
            data: {
                subject: `NOUVELLE DEMANDE D'EXPÉDITION - ${result.origin_city} ➔ ${result.destination_city}`,
                sender_name: result.sender_name,
                sender_phone: result.sender_phone,
                origin_city: result.origin_city,
                destination_city: result.destination_city,
                package_description: result.package_description,
                estimated_price: result.estimated_price,
                admin_link: `https://api.mbengsend.com/app/parcel-requests`
            }
        })
        console.info(`Email successfully sent to contact@mbengsend.com for parcel request ${result.id}`)
    } catch (error) {
        console.error("Failed to send email notification for parcel request:", error)
    }

    res.json({ parcel_request: result })
}
