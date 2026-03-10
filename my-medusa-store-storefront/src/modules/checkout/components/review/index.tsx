"use client"

import { Heading, Text, clx } from "@medusajs/ui"

import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"

const Review = ({ cart }: { cart: any }) => {
  const searchParams = useSearchParams()

  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    (cart.payment_collection || paidByGiftcard)

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lux-sm border border-brand-dark/5">
      <div className="flex flex-row items-center justify-between mb-8">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-3xl font-display font-bold text-brand-dark gap-x-2 items-center",
            {
              "opacity-50 pointer-events-none select-none": !isOpen,
            }
          )}
        >
          Vérification
        </Heading>
      </div>
      {isOpen && previousStepsCompleted && (
        <>
          <div className="flex items-start gap-x-1 w-full mb-8 bg-brand-dark/[0.02] p-6 rounded-xl border border-brand-dark/5">
            <div className="w-full">
              <Text className="text-sm text-ui-fg-subtle leading-relaxed">
                En cliquant sur le bouton &quot;Passer la commande&quot;, vous confirmez avoir lu, compris et accepté nos{" "}
                <span className="text-brand-primary font-bold hover:underline cursor-pointer">Conditions d&apos;Utilisation</span>,{" "}
                <span className="text-brand-primary font-bold hover:underline cursor-pointer">Conditions de Vente</span> et{" "}
                <span className="text-brand-primary font-bold hover:underline cursor-pointer">Politique de Retour</span>, et reconnaissez avoir pris connaissance de la{" "}
                <span className="text-brand-primary font-bold hover:underline cursor-pointer">Politique de Confidentialité</span> de Mbengsend.
              </Text>
            </div>
          </div>
          <PaymentButton cart={cart} data-testid="submit-order-button" />
        </>
      )}
    </div>
  )
}

export default Review
