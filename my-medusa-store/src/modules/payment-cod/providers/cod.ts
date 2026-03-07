import {
    AbstractPaymentProvider,
    PaymentSessionStatus,
} from "@medusajs/framework/utils"
import {
    AuthorizePaymentInput,
    AuthorizePaymentOutput,
    CancelPaymentInput,
    CancelPaymentOutput,
    CapturePaymentInput,
    CapturePaymentOutput,
    DeletePaymentInput,
    DeletePaymentOutput,
    GetPaymentStatusInput,
    GetPaymentStatusOutput,
    InitiatePaymentInput,
    InitiatePaymentOutput,
    ProviderWebhookPayload,
    RefundPaymentInput,
    RefundPaymentOutput,
    RetrievePaymentInput,
    RetrievePaymentOutput,
    UpdatePaymentInput,
    UpdatePaymentOutput,
    WebhookActionResult,
} from "@medusajs/framework/types"

type CodOptions = {}

export default class CodPaymentProvider extends AbstractPaymentProvider<CodOptions> {
    static identifier = "cod"
    protected options_: CodOptions

    constructor(container, options: CodOptions) {
        super(container, options)
        this.options_ = options
    }

    async initiatePayment({ amount, currency_code, context, data }: InitiatePaymentInput): Promise<InitiatePaymentOutput> {
        return {
            id: (data?.id as string) || `cod_${Date.now()}`,
            data: {
                amount,
                currency: currency_code.toUpperCase(),
                email: context?.customer?.email,
                customer: context?.customer,
                ...data
            }
        }
    }

    async authorizePayment(input: AuthorizePaymentInput): Promise<AuthorizePaymentOutput> {
        // Cash on delivery is automatically authorized since payment happens later
        return {
            status: PaymentSessionStatus.AUTHORIZED,
            data: input.data || {}
        }
    }

    async capturePayment({ data }: CapturePaymentInput): Promise<CapturePaymentOutput> {
        // Cash on delivery is captured when the item is delivered and paid
        return { data: data || {} }
    }

    async refundPayment({ amount, data }: RefundPaymentInput): Promise<RefundPaymentOutput> {
        return {
            data: data || {}
        }
    }

    async cancelPayment({ data }: CancelPaymentInput): Promise<CancelPaymentOutput> {
        return { data: data || {} }
    }

    async getPaymentStatus(input: GetPaymentStatusInput): Promise<GetPaymentStatusOutput> {
        return { status: PaymentSessionStatus.AUTHORIZED, data: input.data || {} }
    }

    async updatePayment({ data, amount }: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
        return {
            data: {
                ...(data || {}),
                amount
            }
        }
    }

    async deletePayment(input: DeletePaymentInput): Promise<DeletePaymentOutput> {
        return { data: input.data || {} }
    }

    async retrievePayment(input: RetrievePaymentInput): Promise<RetrievePaymentOutput> {
        return { data: input.data || {} }
    }

    async getWebhookActionAndData(payload: ProviderWebhookPayload["payload"]): Promise<WebhookActionResult> {
        return {
            action: "not_supported",
            data: {
                session_id: "unknown",
                amount: 0
            }
        }
    }
}
