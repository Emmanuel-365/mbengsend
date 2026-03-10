import { Heading } from "@medusajs/ui"
import { cookies as nextCookies } from "next/headers"

import CartTotals from "@modules/common/components/cart-totals"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import OrderDetails from "@modules/order/components/order-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import PaymentDetails from "@modules/order/components/payment-details"
import { HttpTypes } from "@medusajs/types"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const cookies = await nextCookies()

  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  return (
    <div className="py-24 min-h-[calc(100vh-64px)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="content-container flex flex-col justify-center items-center gap-y-12 max-w-4xl h-full w-full relative z-10">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-24 h-24 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary text-4xl mb-4 border border-brand-primary/20 animate-bounce">
            ✓
          </div>
          <Heading
            level="h1"
            className="text-4xl small:text-6xl font-display font-bold text-brand-dark tracking-tight"
          >
            Merci <span className="text-brand-primary">beaucoup !</span>
          </Heading>
          <p className="text-lg text-ui-fg-subtle max-w-lg">
            Votre commande a été passée avec succès. Mbengsend prépare déjà votre livraison.
          </p>
        </div>

        {isOnboarding && <OnboardingCta orderId={order.id} />}
        
        <div
          className="flex flex-col gap-8 max-w-4xl h-full glass-dark p-8 small:p-12 rounded-huge shadow-lux-lg border border-white/10 w-full"
          data-testid="order-complete-container"
        >
          <div className="flex flex-col gap-4">
            <OrderDetails order={order} />
          </div>
          
          <div className="border-t border-white/10 pt-8 mt-4">
            <Heading level="h2" className="text-2xl font-display font-bold text-white mb-6">
              Récapitulatif
            </Heading>
            <Items order={order} />
          </div>

          <div className="border-t border-white/10 pt-8">
            <CartTotals totals={order} className="text-white" />
          </div>

          <div className="grid grid-cols-1 small:grid-cols-2 gap-8 border-t border-white/10 pt-8">
            <ShippingDetails order={order} />
            <PaymentDetails order={order} />
          </div>

          <div className="border-t border-white/10 pt-8">
            <Help />
          </div>
        </div>
      </div>
    </div>
  )
}
