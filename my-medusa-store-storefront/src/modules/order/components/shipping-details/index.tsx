import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"

import Divider from "@modules/common/components/divider"

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder
}

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  return (
    <div className="text-white">
      <Heading level="h2" className="text-2xl font-display font-bold mb-6">
        Livraison
      </Heading>
      <div className="grid grid-cols-1 small:grid-cols-3 gap-8">
        <div
          className="flex flex-col"
          data-testid="shipping-address-summary"
        >
          <Text className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-2">
            Adresse de livraison
          </Text>
          <div className="text-white/80 space-y-1">
            <Text>
              {order.shipping_address?.first_name}{" "}
              {order.shipping_address?.last_name}
            </Text>
            <Text>
              {order.shipping_address?.address_1}{" "}
              {order.shipping_address?.address_2}
            </Text>
            <Text>
              {order.shipping_address?.postal_code},{" "}
              {order.shipping_address?.city}
            </Text>
            <Text className="uppercase">
              {order.shipping_address?.country_code}
            </Text>
          </div>
        </div>

        <div
          className="flex flex-col"
          data-testid="shipping-contact-summary"
        >
          <Text className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-2">Contact</Text>
          <div className="text-white/80 space-y-1">
            <Text>
              {order.shipping_address?.phone}
            </Text>
            <Text className="break-all">{order.email}</Text>
          </div>
        </div>

        <div
          className="flex flex-col"
          data-testid="shipping-method-summary"
        >
          <Text className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-2">Mode de livraison</Text>
          <Text className="text-white font-semibold">
            {(order as any).shipping_methods?.[0]?.name}
          </Text>
          <Text className="text-white/60 text-sm mt-1">
            {convertToLocale({
              amount: order.shipping_methods?.[0]?.total ?? 0,
              currency_code: order.currency_code,
            })}
          </Text>
        </div>
      </div>
    </div>
  )
}

export default ShippingDetails
