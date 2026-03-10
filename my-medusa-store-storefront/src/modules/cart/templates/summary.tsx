"use client"

import { Button, Heading } from "@medusajs/ui"

import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="flex flex-col gap-y-6">
      <Heading level="h2" className="text-3xl font-display font-bold text-brand-dark tracking-tight">
        Résumé
      </Heading>
      <DiscountCode cart={cart} />
      <Divider className="opacity-10" />
      <CartTotals totals={cart} />
      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
        className="block mt-6"
      >
        <Button className="w-full h-14 rounded-full bg-brand-primary hover:bg-brand-secondary text-white font-bold text-lg shadow-lux-md hover:shadow-lux-lg transition-all duration-300">
          Passer à la caisse
        </Button>
      </LocalizedClientLink>
    </div>
  )
}

export default Summary
