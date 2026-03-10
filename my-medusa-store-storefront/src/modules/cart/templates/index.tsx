import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import InteractiveLink from "@modules/common/components/interactive-link"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div className="py-24 min-h-[calc(100vh-64px)] relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-secondary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="content-container relative z-10" data-testid="cart-container">
        {cart?.items?.length ? (
          <div className="grid grid-cols-1 small:grid-cols-[1fr_380px] gap-12 small:gap-24 items-start">
            <div className="flex flex-col gap-y-8">
              {!customer && (
                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-brand-primary/10 shadow-lux-sm">
                  <SignInPrompt />
                </div>
              )}
              <div className="bg-white rounded-3xl p-8 small:p-12 shadow-lux-lg border border-brand-dark/5">
                <ItemsTemplate cart={cart} />
              </div>
            </div>
            <div className="relative">
              <div className="flex flex-col gap-y-8 sticky top-32">
                {cart && cart.region && (
                  <div className="bg-white rounded-3xl p-8 shadow-lux-lg border border-brand-dark/5">
                    <Summary cart={cart as any} />
                  </div>
                )}
                
                {/* Trust Badges or Help Section */}
                <div className="bg-brand-dark/[0.02] rounded-2xl p-6 border border-brand-dark/5">
                  <Text className="text-sm font-bold uppercase tracking-widest text-brand-dark mb-4">Besoin d&apos;assistance ?</Text>
                  <p className="text-xs text-ui-fg-subtle leading-relaxed mb-4">
                    Notre équipe est à votre disposition pour vous accompagner dans votre commande.
                  </p>
                  <InteractiveLink href="/contact" className="text-xs font-bold text-brand-primary">
                    Contacter le support
                  </InteractiveLink>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative z-10">
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
