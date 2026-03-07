import { ModuleProvider, Modules } from "@medusajs/framework/utils"
import CodPaymentProvider from "./providers/cod"

export default ModuleProvider(Modules.PAYMENT, {
    services: [
        CodPaymentProvider,
    ],
})
