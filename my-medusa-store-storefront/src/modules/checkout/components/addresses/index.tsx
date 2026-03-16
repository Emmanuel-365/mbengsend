"use client"

import { setAddresses } from "@lib/data/cart"
import compareAddresses from "@lib/util/compare-addresses"
import { CheckCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text, useToggleState } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import Spinner from "@modules/common/icons/spinner"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState } from "react"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useActionState(setAddresses, null)

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lux-sm border border-brand-dark/5">
      <div className="flex flex-row items-center justify-between mb-8">
        <Heading
          level="h2"
          className="flex flex-row text-3xl font-display font-bold text-brand-dark gap-x-2 items-center"
        >
          Adresse de livraison
          {!isOpen && <CheckCircleSolid className="text-brand-primary" />}
        </Heading>
        {!isOpen && cart?.shipping_address && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-brand-primary font-bold hover:text-brand-secondary transition-colors"
              data-testid="edit-address-button"
            >
              Modifier
            </button>
          </Text>
        )}
      </div>
      {isOpen ? (
        <form action={formAction}>
          <div className="pb-8">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {!sameAsBilling && (
              <div className="mt-12 pt-12 border-t border-brand-dark/5">
                <Heading
                  level="h2"
                  className="text-3xl font-display font-bold text-brand-dark pb-8"
                >
                  Adresse de facturation
                </Heading>

                <BillingAddress cart={cart} />
              </div>
            )}
            <div className="mt-10">
              <SubmitButton className="w-full h-14 rounded-full bg-brand-primary hover:bg-brand-secondary text-white font-bold text-lg shadow-lux-md hover:shadow-lux-lg transition-all duration-300" data-testid="submit-address-button">
                Continuer vers la livraison
              </SubmitButton>
            </div>
            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        <div className="bg-brand-dark/[0.02] p-4 small:p-6 rounded-xl border border-brand-dark/5">
          <div className="text-xs small:text-sm">
            {cart && cart.shipping_address ? (
              <div className="grid grid-cols-1 small:grid-cols-2 medium:grid-cols-3 gap-4 small:gap-8">
                <div
                  className="flex flex-col"
                  data-testid="shipping-address-summary"
                >
                  <Text className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-2 small:mb-3">
                    Adresse de livraison
                  </Text>
                  <div className="flex flex-col text-brand-dark space-y-1">
                    <Text className="font-bold text-sm">
                      {cart.shipping_address.first_name}{" "}
                      {cart.shipping_address.last_name}
                    </Text>
                    <Text className="text-ui-fg-subtle text-xs small:text-sm">
                      {cart.shipping_address.address_1}{" "}
                      {cart.shipping_address.address_2}
                    </Text>
                    <Text className="text-ui-fg-subtle text-xs small:text-sm">
                      {cart.shipping_address.postal_code},{" "}
                      {cart.shipping_address.city}
                    </Text>
                    <Text className="text-ui-fg-subtle text-xs small:text-sm">
                      {cart.shipping_address.country_code?.toUpperCase()}
                    </Text>
                  </div>
                </div>

                <div
                  className="flex flex-col"
                  data-testid="shipping-contact-summary"
                >
                  <Text className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-2 small:mb-3">
                    Contact
                  </Text>
                  <div className="flex flex-col text-brand-dark space-y-1">
                    <Text className="text-ui-fg-subtle text-xs small:text-sm">
                      {cart.shipping_address.phone}
                    </Text>
                    <Text className="text-ui-fg-subtle text-xs small:text-sm">
                      {cart.email}
                    </Text>
                  </div>
                </div>

                <div
                  className="flex flex-col"
                  data-testid="billing-address-summary"
                >
                  <Text className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-2 small:mb-3">
                    Adresse de facturation
                  </Text>

                  {sameAsBilling ? (
                    <Text className="text-ui-fg-subtle text-xs small:text-sm leading-relaxed">
                      L&apos;adresse de facturation est identique à celle de livraison.
                    </Text>
                  ) : (
                    <div className="flex flex-col text-brand-dark space-y-1">
                      <Text className="font-bold text-sm">
                        {cart.billing_address?.first_name}{" "}
                        {cart.billing_address?.last_name}
                      </Text>
                      <Text className="text-ui-fg-subtle text-xs small:text-sm">
                        {cart.billing_address?.address_1}{" "}
                        {cart.billing_address?.address_2}
                      </Text>
                      <Text className="text-ui-fg-subtle text-xs small:text-sm">
                        {cart.billing_address?.postal_code},{" "}
                        {cart.billing_address?.city}
                      </Text>
                      <Text className="text-ui-fg-subtle text-xs small:text-sm">
                        {cart.billing_address?.country_code?.toUpperCase()}
                      </Text>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex justify-center p-8">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Addresses
