import { ModuleProvider, Modules } from "@medusajs/framework/utils"
import FlutterwavePaymentProvider from "./providers/flutterwave"

export default ModuleProvider(Modules.PAYMENT, {
    services: [
        FlutterwavePaymentProvider,
    ],
})
