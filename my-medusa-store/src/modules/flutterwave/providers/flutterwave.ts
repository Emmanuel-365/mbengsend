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
    PaymentActions
} from "@medusajs/framework/types"

type FlutterwaveOptions = {
    secretKey: string
    publicKey: string
    webhookSecret: string
}

export default class FlutterwavePaymentProvider extends AbstractPaymentProvider<FlutterwaveOptions> {
    static identifier = "flutterwave"
    protected options_: FlutterwaveOptions

    constructor(container, options: FlutterwaveOptions) {
        super(container, options)
        this.options_ = options
    }

    async initiatePayment({ amount, currency_code, context, data }: InitiatePaymentInput): Promise<InitiatePaymentOutput> {
        return {
            id: (data?.id as string) || `fw_${Date.now()}`,
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
        const { data } = input
        const transactionId = data?.transaction_id as string

        if (!transactionId) {
            return {
                status: PaymentSessionStatus.PENDING,
                data: data || {}
            }
        }

        try {
            const response = await fetch(`https://api.flutterwave.com/v3/transactions/${transactionId}/verify`, {
                headers: {
                    Authorization: `Bearer ${this.options_.secretKey}`
                }
            })

            const result = await response.json()

            if (result.status === "success" && result.data.status === "successful") {
                return {
                    status: PaymentSessionStatus.AUTHORIZED,
                    data: {
                        ...data,
                        ...result.data
                    }
                }
            }

            return {
                status: PaymentSessionStatus.ERROR,
                data: {
                    ...(data || {}),
                    error: "Payment verification failed",
                    details: result
                }
            }
        } catch (e: any) {
            return {
                status: PaymentSessionStatus.ERROR,
                data: {
                    ...(data || {}),
                    error: e.message
                }
            }
        }
    }

    async capturePayment({ data }: CapturePaymentInput): Promise<CapturePaymentOutput> {
        return { data: data || {} }
    }

    async refundPayment({ amount, data }: RefundPaymentInput): Promise<RefundPaymentOutput> {
        const transactionId = data?.id as string

        if (!transactionId) {
            throw new Error("Missing transaction ID for refund")
        }

        try {
            const response = await fetch(`https://api.flutterwave.com/v3/transactions/${transactionId}/refund`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${this.options_.secretKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ amount })
            })

            const result = await response.json()

            if (result.status === "success") {
                return {
                    data: {
                        ...(data || {}),
                        refund_id: result.data.id
                    }
                }
            }

            throw new Error(result.message || "Refund failed")
        } catch (e) {
            throw e
        }
    }

    async cancelPayment({ data }: CancelPaymentInput): Promise<CancelPaymentOutput> {
        return { data: data || {} }
    }

    async getPaymentStatus(input: GetPaymentStatusInput): Promise<GetPaymentStatusOutput> {
        const { data } = input
        if (!data) return { status: PaymentSessionStatus.PENDING, data: {} }

        const status = data.status as string
        if (status === "successful") return { status: PaymentSessionStatus.AUTHORIZED, data }
        if (status === "failed") return { status: PaymentSessionStatus.ERROR, data }
        return { status: PaymentSessionStatus.PENDING, data }
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
        const { data, event } = payload.data as any

        if (event === "charge.completed") {
            return {
                action: "authorized",
                data: {
                    session_id: data.tx_ref,
                    amount: data.amount
                }
            }
        }

        return {
            action: "not_supported",
            data: {
                session_id: "unknown",
                amount: 0
            }
        }
    }
}
