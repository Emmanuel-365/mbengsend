import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { MBENG_SEND_LOGISTICS_MODULE } from "../../../modules/mbengsendLogistics"

export const listParcelRequestsStepId = "list-parcel-requests-step"

export const listParcelRequestsStep = createStep(
    listParcelRequestsStepId,
    async (_, { container }) => {
        const service = container.resolve(MBENG_SEND_LOGISTICS_MODULE)

        // Using the auto-generated method
        const requests = await service.listParcelRequests()

        return new StepResponse(requests)
    }
)
