import { Container, Heading, Text } from "@medusajs/ui"

import { isStripeLike, paymentInfoMap } from "@lib/constants"
import Divider from "@modules/common/components/divider"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type PaymentDetailsProps = {
  order: HttpTypes.StoreOrder
}

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  const payment = order.payment_collections?.[0].payments?.[0]

  return (
    <div className="text-white">
      <Heading level="h2" className="text-2xl font-display font-bold mb-6">
        Paiement
      </Heading>
      <div>
        {payment && (
          <div className="grid grid-cols-1 small:grid-cols-2 gap-8 w-full">
            <div className="flex flex-col">
              <Text className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-2">
                Mode de paiement
              </Text>
              <Text
                className="text-white font-semibold"
                data-testid="payment-method"
              >
                {paymentInfoMap[payment.provider_id]?.title || payment.provider_id}
              </Text>
            </div>
            <div className="flex flex-col">
              <Text className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-2">
                Détails du paiement
              </Text>
              <div className="flex gap-4 text-white/80 items-center">
                <Container className="flex items-center h-10 w-fit p-3 bg-white/5 border border-white/10 rounded-lg shadow-lux-sm">
                  {paymentInfoMap[payment.provider_id]?.icon}
                </Container>
                <div className="flex flex-col">
                  <Text data-testid="payment-amount" className="font-medium text-white">
                    {isStripeLike(payment.provider_id) && payment.data?.card_last4
                      ? `**** **** **** ${payment.data.card_last4}`
                      : convertToLocale({
                        amount: payment.amount,
                        currency_code: order.currency_code,
                      })}
                  </Text>
                  {!isStripeLike(payment.provider_id) && (
                    <Text className="text-xs text-white/40">
                      Payé le {new Date(payment.created_at ?? "").toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </Text>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentDetails
