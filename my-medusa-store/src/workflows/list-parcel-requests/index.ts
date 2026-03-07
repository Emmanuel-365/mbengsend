import {
    createWorkflow,
    WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { listParcelRequestsStep } from "./steps/list-parcel-requests"

export const listParcelRequestsWorkflow = createWorkflow(
    "list-parcel-requests",
    function () {
        const parcelRequests = listParcelRequestsStep()

        return new WorkflowResponse(parcelRequests)
    }
)
