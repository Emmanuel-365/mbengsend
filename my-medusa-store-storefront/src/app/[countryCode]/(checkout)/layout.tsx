import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-[#FAFAFA] relative small:min-h-screen">
      <div className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-brand-dark/5">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-xs font-bold uppercase tracking-widest text-brand-dark/60 hover:text-brand-primary flex items-center gap-x-2 transition-colors flex-1 basis-0 group"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90 group-hover:-translate-x-1 transition-transform" size={16} />
            <span className="hidden small:block">Retour au panier</span>
            <span className="block small:hidden">Retour</span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="text-2xl font-display font-bold text-brand-dark hover:text-brand-primary transition-colors tracking-tighter"
            data-testid="store-link"
          >
            Mbengsend<span className="text-brand-primary">.</span>
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative py-12" data-testid="checkout-container">{children}</div>
      <div className="py-8 w-full flex flex-col items-center justify-center border-t border-brand-dark/5 bg-white">
        <p className="text-xs text-brand-dark/40 font-medium">© {new Date().getFullYear()} Mbengsend. Tous droits réservés.</p>
      </div>
    </div>
  )
}
