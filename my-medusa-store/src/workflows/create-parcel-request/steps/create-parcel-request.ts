import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { MBENG_SEND_LOGISTICS_MODULE } from "../../../modules/mbengsendLogistics"

type CreateParcelRequestStepInput = {
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

export const createParcelRequestStepId = "create-parcel-request-step"

export const createParcelRequestStep = createStep(
    createParcelRequestStepId,
    async (data: CreateParcelRequestStepInput, { container }) => {
        const service = container.resolve(MBENG_SEND_LOGISTICS_MODULE)

        const created = await service.createParcelRequests(data)

        return new StepResponse(created, created.id)
    },
    async (id: string, { container }) => {
        const service = container.resolve(MBENG_SEND_LOGISTICS_MODULE)

        await service.deleteParcelRequests(id)
    }
)
