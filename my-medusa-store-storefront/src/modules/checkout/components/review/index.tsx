"use client"

import { Heading, Text, clx } from "@medusajs/ui"

import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Review = ({ cart }: { cart: any }) => {
  const searchParams = useSearchParams()
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

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
          <div className="flex flex-col gap-y-4 mb-8">
            <div className="flex items-start gap-x-3 bg-brand-dark/[0.02] p-4 rounded-xl border border-brand-dark/5">
              <input 
                type="checkbox" 
                id="privacy-policy" 
                checked={agreedToPrivacy}
                onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                className="mt-1 h-5 w-5 rounded border-gray-300 text-brand-gold focus:ring-brand-gold flex-shrink-0 cursor-pointer"
              />
              <label htmlFor="privacy-policy" className="text-sm text-ui-fg-subtle leading-relaxed cursor-pointer select-none">
                J&apos;ai lu et je reconnais avoir pris connaissance de la{" "}
                <LocalizedClientLink href="/legal/privacy" target="_blank" className="text-brand-primary font-bold hover:underline">Charte de Protection des Données Personnelles</LocalizedClientLink> de Mbengsend.
              </label>
            </div>
            
            <div className="flex items-start gap-x-3 bg-brand-dark/[0.02] p-4 rounded-xl border border-brand-dark/5">
              <input 
                type="checkbox" 
                id="terms" 
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 h-5 w-5 rounded border-gray-300 text-brand-gold focus:ring-brand-gold flex-shrink-0 cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-ui-fg-subtle leading-relaxed cursor-pointer select-none">
                J&apos;ai lu, compris et j&apos;accepte les{" "}
                <LocalizedClientLink href="/legal/terms" target="_blank" className="text-brand-primary font-bold hover:underline">Conditions Générales de Vente</LocalizedClientLink> de Mbengsend.
              </label>
            </div>
          </div>
          <PaymentButton cart={cart} data-testid="submit-order-button" disabled={!agreedToPrivacy || !agreedToTerms} />
        </>
      )}
    </div>
  )
}

export default Review
