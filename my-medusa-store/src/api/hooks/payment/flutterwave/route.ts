import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const POST = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const paymentModuleService = req.scope.resolve("payment")
    const payload = req.body as any

    // Flutterwave sends a signature in the header
    const signature = req.headers["verif-hash"] as string
    const webhookSecret = process.env.FLUTTERWAVE_WEBHOOK_SECRET

    if (webhookSecret && signature !== webhookSecret) {
        return res.status(401).send("Invalid signature")
    }

    try {
        const actionResult = await paymentModuleService.getWebhookActionAndData({
            provider: "flutterwave",
            payload: {
                data: payload,
                rawData: JSON.stringify(payload),
                headers: req.headers as Record<string, any>
            }
        })

        if (actionResult.action === "authorized" && actionResult.data) {
            await paymentModuleService.authorizePaymentSession(
                actionResult.data.session_id,
                {}
            )
        }

        res.status(200).send("OK")
    } catch (error) {
        console.error("Flutterwave webhook error:", error)
        res.status(500).send("Internal Server Error")
    }
}
