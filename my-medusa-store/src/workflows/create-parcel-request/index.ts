import {
    createWorkflow,
    WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { createParcelRequestStep } from "./steps/create-parcel-request"
import { emitEventStep } from "@medusajs/medusa/core-flows"

type CreateParcelRequestWorkflowInput = {
    customer_id?: string
    sender_name: string
    sender_phone: string
    sender_address: string
    receiver_name: string
    receiver_phone: string
    receiver_address: string
    origin_city: string
    destination_city: string
    package_weight?: number
    package_description: string
    estimated_price?: number
}

export const createParcelRequestWorkflow = createWorkflow(
    "create-parcel-request",
    function (input: CreateParcelRequestWorkflowInput) {
        const parcelRequest = createParcelRequestStep(input)

        emitEventStep({
            eventName: "parcel_request.created",
            data: {
                id: parcelRequest.id,
            },
        })

        return new WorkflowResponse(parcelRequest)
    }
)
