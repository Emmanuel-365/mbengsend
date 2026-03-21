"use client"

import { Button } from "@medusajs/ui"
import { Package } from "lucide-react"

import OrderCard from "../order-card"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

const OrderOverview = ({ orders }: { orders: HttpTypes.StoreOrder[] }) => {
  if (orders?.length) {
    return (
      <div className="flex flex-col gap-y-12 w-full">
        {orders.map((o) => (
          <div
            key={o.id}
            className="pb-12 border-b border-gray-100 last:pb-0 last:border-none"
          >
            <OrderCard order={o} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className="w-full flex flex-col items-center gap-y-6 py-32 bg-gray-50/50 rounded-huge border border-gray-100 shadow-lux-sm"
      data-testid="no-orders-container"
    >
      <div className="w-24 h-24 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4 border border-brand-primary/20">
        <Package className="w-12 h-12" />
      </div>
      <h2 className="text-3xl font-display font-bold text-brand-dark text-center tracking-tight">Aucune commande pour le moment</h2>
      <p className="text-ui-fg-subtle text-center max-w-[400px] leading-relaxed">
        Vous n&apos;avez pas encore passé de commande. Découvrez notre collection exclusive pour commencer votre voyage Mbengsend.
      </p>
      <div className="mt-8">
        <LocalizedClientLink href="/" passHref>
          <Button data-testid="continue-shopping-button" className="h-14 px-12 rounded-full bg-brand-primary hover:bg-brand-secondary text-white font-bold transition-all shadow-lux-md hover:shadow-lux-lg border-none text-lg">
            Commencer mon shopping
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderOverview
