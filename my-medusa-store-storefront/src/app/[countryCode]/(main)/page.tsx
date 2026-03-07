import { Metadata } from "next"
import { Suspense } from "react"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import Banners from "@modules/home/components/banners"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Mbengsend | Livraison Europe & Cameroun - Boutique en Ligne Premiere",
  description:
    "Découvrez Mbengsend, votre passerelle de shopping entre l'Europe et le Cameroun. Produits authentiques, livraison express et sécurisée au meilleur prix.",
}


export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <Suspense fallback={<div className="h-64 content-container" />}>
        <Banners />
      </Suspense>
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
