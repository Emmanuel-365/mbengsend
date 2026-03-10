import { Heading } from "@medusajs/ui"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="sticky top-32 flex flex-col gap-y-8">
      <div className="w-full bg-white rounded-3xl p-8 shadow-lux-lg border border-brand-dark/5 flex flex-col">
        <Heading
          level="h2"
          className="text-2xl font-display font-bold text-brand-dark mb-6"
        >
          Votre <span className="text-brand-primary">Panier</span>
        </Heading>
        
        <div className="mb-8">
          <CartTotals totals={cart} />
        </div>

        <div className="mt-8 pt-8 border-t border-brand-dark/5">
          <ItemsPreviewTemplate cart={cart} />
        </div>

        <div className="mt-8 pt-8 border-t border-brand-dark/5">
          <DiscountCode cart={cart} />
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-brand-dark/[0.02] rounded-2xl p-6 border border-brand-dark/5">
        <div className="flex items-center gap-x-3 mb-2">
          <div className="w-2 h-2 rounded-full bg-brand-primary shadow-[0_0_10px_rgba(var(--brand-primary-rgb),0.5)]" />
          <span className="text-xs font-bold uppercase tracking-widest text-brand-dark">Paiement Sécurisé</span>
        </div>
        <p className="text-[11px] text-ui-fg-subtle leading-relaxed">
          Vos données bancaires sont cryptées et traitées avec le plus haut niveau de sécurité.
        </p>
      </div>
    </div>
  )
}

export default CheckoutSummary
