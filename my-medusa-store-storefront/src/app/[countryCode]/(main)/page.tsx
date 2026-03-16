import { Metadata } from "next"
import { Suspense } from "react"
import { Text as MedusaText } from "@medusajs/ui"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import Banners from "@modules/home/components/banners"
import HowItWorks from "@modules/home/components/how-it-works"
import Features from "@modules/home/components/features"
import CategoryGrid from "@modules/home/components/category-grid"
import Newsletter from "@modules/home/components/newsletter"
import { listCollections } from "@lib/data/collections"
import { listCategories } from "@lib/data/categories"
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

  const categories = await listCategories({
    parent_category_id: null,
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <Features />

      {categories && categories.length > 0 && (
        <CategoryGrid categories={categories} />
      )}

      <div className="py-12 bg-[#FDFDFD]">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>

      <Suspense fallback={<div className="h-64 content-container" />}>
        <div className="py-24 bg-grey-5">
          <div className="content-container mb-12 text-center">
            <MedusaText className="text-sm font-bold uppercase tracking-widest text-brand-primary">Offres</MedusaText>
            <h2 className="text-4xl font-display font-bold text-brand-dark mt-2">Promotions du Moment</h2>
          </div>
          <Banners />
        </div>
      </Suspense>

      <HowItWorks />
      <Newsletter />
    </>
  )
}


