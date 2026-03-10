import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  return (
    <div className="text-white/80">
      <Text className="text-lg">
        Nous avons envoyé la confirmation de commande à{" "}
        <span
          className="text-white font-bold"
          data-testid="order-email"
        >
          {order.email}
        </span>
        .
      </Text>
      <div className="grid grid-cols-1 small:grid-cols-2 gap-4 mt-8 bg-white/5 p-6 rounded-2xl border border-white/10">
        <div className="flex flex-col">
          <Text className="text-xs uppercase tracking-widest text-white/40 font-bold mb-1">
            Date de commande
          </Text>
          <Text className="text-white font-semibold" data-testid="order-date">
            {new Date(order.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </Text>
        </div>
        <div className="flex flex-col">
          <Text className="text-xs uppercase tracking-widest text-brand-primary font-bold mb-1">
            Numéro de commande
          </Text>
          <Text className="text-white font-bold text-lg" data-testid="order-id">
            #{order.display_id}
          </Text>
        </div>
      </div>

      {showStatus && (
        <div className="flex flex-wrap items-center gap-6 mt-6">
          <div className="flex items-center gap-x-3">
            <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
            <Text className="text-sm">
              <span className="text-white/40 mr-2">Statut :</span>
              <span className="text-white font-bold" data-testid="order-status">
                {formatStatus(order.fulfillment_status)}
              </span>
            </Text>
          </div>
          <div className="flex items-center gap-x-3">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            <Text className="text-sm">
              <span className="text-white/40 mr-2">Paiement :</span>
              <span
                className="text-white font-bold"
                data-testid="order-payment-status"
              >
                {formatStatus(order.payment_status)}
              </span>
            </Text>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderDetails
