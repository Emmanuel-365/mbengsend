import { Metadata } from "next"
import { notFound } from "next/navigation"

import AddressBook from "@modules/account/components/address-book"

import { getRegion } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "Mes Adresses | Mbengsend",
  description: "Gérez vos adresses de livraison Mbengsend.",
}

export default async function Addresses(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const customer = await retrieveCustomer()
  const region = await getRegion(countryCode)

  if (!customer || !region) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <div className="mb-12 flex flex-col gap-y-2">
        <h1 className="text-4xl font-display font-bold text-brand-dark">Adresses de Livraison</h1>
        <p className="text-base text-ui-fg-subtle max-w-[600px] leading-relaxed">
          Gérez vos adresses de livraison pour un passage en caisse plus rapide et fluide. Vous pouvez enregistrer plusieurs adresses pour vos différents lieux de réception.
        </p>
      </div>
      <AddressBook customer={customer} region={region} />
    </div>
  )
}

