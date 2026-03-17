import { Heading } from "@medusajs/ui"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="sticky top-32 flex flex-col gap-y-8">
      <div className="w-full glass rounded-[2.5rem] p-10 shadow-lux-lg border-white/40 flex flex-col relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-3xl -mr-16 -mt-16" />
        
        <Heading
          level="h2"
          className="text-3xl font-display font-bold text-brand-dark mb-8 italic"
        >
          Votre <span className="text-brand-gold">Panier</span>
        </Heading>
        
        <div className="mb-8">
          <CartTotals totals={cart} />
        </div>

        <div className="mt-8 pt-8 border-t border-brand-gold/10">
          <ItemsPreviewTemplate cart={cart} />
        </div>

        <div className="mt-8 pt-8 border-t border-brand-gold/10">
          <DiscountCode cart={cart} />
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-brand-dark rounded-[2rem] p-8 border border-white/5 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="flex items-center gap-x-4 mb-4 relative z-10">
          <div className="w-3 h-3 rounded-full bg-brand-gold shadow-[0_0_15px_rgba(202,138,4,0.6)] animate-pulse" />
          <span className="text-[10px] small:text-xs font-bold uppercase tracking-[0.2em] text-white font-sans">Paiement Sécurisé</span>
        </div>
        <p className="text-xs text-white/50 leading-relaxed font-sans relative z-10">
          Vos données bancaires sont cryptées et traitées avec le plus haut niveau de sécurité intercontinentale.
        </p>
      </div>
    </div>
  )
}

export default CheckoutSummary
