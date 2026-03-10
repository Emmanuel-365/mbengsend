import { Metadata } from "next"

import OrderOverview from "@modules/account/components/order-overview"
import { notFound } from "next/navigation"
import { listOrders } from "@lib/data/orders"
import Divider from "@modules/common/components/divider"
import TransferRequestForm from "@modules/account/components/transfer-request-form"

export const metadata: Metadata = {
  title: "Mes Commandes | Mbengsend",
  description: "Consultez et suivez vos commandes Mbengsend.",
}

export default async function Orders() {
  const orders = await listOrders()

  if (!orders) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <div className="mb-12 flex flex-col gap-y-2">
        <h1 className="text-4xl font-display font-bold text-brand-dark">Commandes</h1>
        <p className="text-base text-ui-fg-subtle max-w-[600px] leading-relaxed">
          Retrouvez l&apos;ensemble de vos commandes passées chez Mbengsend. Suivez leur statut et accédez aux détails de vos livraisons en un clin d&apos;œil.
        </p>
      </div>
      <div className="flex flex-col gap-y-16">
        <OrderOverview orders={orders} />
        <div className="w-full h-px bg-gray-100" />
        <TransferRequestForm />
      </div>
    </div>
  )
}

