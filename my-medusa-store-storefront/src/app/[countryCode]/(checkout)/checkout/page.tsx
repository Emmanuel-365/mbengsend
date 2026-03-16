import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Passage en caisse | Mbengsend",
}

export default async function Checkout() {
  const cart = await retrieveCart()

  if (!cart) {
    return notFound()
  }

  const customer = await retrieveCustomer()

  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="content-container relative z-10 py-6 small:py-12 medium:py-24">
        <div className="grid grid-cols-1 small:grid-cols-[1fr_300px] medium:grid-cols-[1fr_416px] gap-6 small:gap-12 medium:gap-24 items-start">
          <PaymentWrapper cart={cart}>
            <CheckoutForm cart={cart} customer={customer} />
          </PaymentWrapper>
          <div className="sticky top-20 small:top-32">
            <CheckoutSummary cart={cart} />
          </div>
        </div>
      </div>
    </div>
  )
}
