import { Metadata } from "next"

import ProfilePhone from "@modules/account//components/profile-phone"
import ProfileBillingAddress from "@modules/account/components/profile-billing-address"
import ProfileEmail from "@modules/account/components/profile-email"
import ProfileName from "@modules/account/components/profile-name"
import ProfilePassword from "@modules/account/components/profile-password"

import { notFound } from "next/navigation"
import { listRegions } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "Mon Profil | Mbengsend",
  description: "Gérez vos informations personnelles et vos préférences de compte Mbengsend.",
}

export default async function Profile() {
  const customer = await retrieveCustomer()
  const regions = await listRegions()

  if (!customer || !regions) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="profile-page-wrapper">
      <div className="mb-12 flex flex-col gap-y-2">
        <h1 className="text-4xl font-display font-bold text-brand-dark">Profil</h1>
        <p className="text-base text-ui-fg-subtle max-w-[600px] leading-relaxed">
          Consultez et mettez à jour votre profil Mbengsend. Gérez vos informations personnelles, vos coordonnées ainsi que votre adresse de facturation.
        </p>
      </div>
      <div className="flex flex-col w-full">
        <ProfileName customer={customer} />
        <ProfileEmail customer={customer} />
        <ProfilePhone customer={customer} />
        <ProfileBillingAddress customer={customer} regions={regions} />
      </div>
    </div>
  )
}

