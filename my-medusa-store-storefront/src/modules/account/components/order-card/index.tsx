import { Button } from "@medusajs/ui"
import { useMemo } from "react"

import Thumbnail from "@modules/products/components/thumbnail"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OrderCardProps = {
  order: HttpTypes.StoreOrder
}

const OrderCard = ({ order }: OrderCardProps) => {
  const numberOfLines = useMemo(() => {
    return (
      order.items?.reduce((acc, item) => {
        return acc + item.quantity
      }, 0) ?? 0
    )
  }, [order])

  const numberOfProducts = useMemo(() => {
    return order.items?.length ?? 0
  }, [order])

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lux-sm hover:shadow-lux-md transition-all duration-300 group" data-testid="order-card-container">
      <div className="flex items-center justify-between mb-6">
        <div className="text-xl font-display font-bold text-brand-dark tracking-tight">
          Commande #<span data-testid="order-display-id" className="text-brand-primary">{order.display_id}</span>
        </div>
        <div className="text-brand-primary font-display font-bold text-xl" data-testid="order-amount">
          {convertToLocale({
            amount: order.total,
            currency_code: order.currency_code,
          })}
        </div>
      </div>

      <div className="flex items-center gap-x-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-8 pb-6 border-b border-gray-100">
        <span data-testid="order-created-at">
          {new Date(order.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
        <span className="w-1 h-1 bg-gray-200 rounded-full" />
        <span>{`${numberOfLines} ${numberOfLines > 1 ? "articles" : "article"
          }`}</span>
      </div>

      <div className="grid grid-cols-4 small:grid-cols-6 gap-4 mb-8">
        {order.items?.slice(0, 5).map((i) => {
          return (
            <div
              key={i.id}
              className="flex flex-col gap-y-2"
              data-testid="order-item"
            >
              <Thumbnail thumbnail={i.thumbnail} images={[]} size="square" className="rounded-xl border border-gray-100 shadow-sm" />
            </div>
          )
        })}
        {numberOfProducts > 5 && (
          <div className="aspect-square w-full bg-gray-50 rounded-xl flex flex-col items-center justify-center border border-dashed border-gray-200">
            <span className="text-sm font-bold text-gray-400">
              + {numberOfProducts - 5}
            </span>
          </div>
        )}
      </div>

      <div className="flex justify-end pt-8 border-t border-gray-100">
        <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
          <Button data-testid="order-details-link" className="rounded-full bg-brand-primary hover:bg-brand-secondary text-white border-none h-14 px-10 font-bold transition-all duration-300 shadow-lux-md hover:shadow-lux-lg text-sm">
            Détails de la commande
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderCard
