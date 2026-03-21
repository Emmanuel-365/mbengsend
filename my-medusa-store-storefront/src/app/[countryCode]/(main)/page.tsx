import { Metadata } from "next"
import { Suspense } from "react"
import { Text as MedusaText } from "@medusajs/ui"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import GpCta from "@modules/home/components/gp-cta"
import Banners from "@modules/home/components/banners"
import HowItWorks from "@modules/home/components/how-it-works"
import Features from "@modules/home/components/features"
import CategoryGrid from "@modules/home/components/category-grid"
import Newsletter from "@modules/home/components/newsletter"
import { listCollections } from "@lib/data/collections"
import { listCategories } from "@lib/data/categories"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Mbengsend | L'Excellence du Cameroun en Europe - Boutique Officielle",
  description:
    "Découvrez Mbengsend, votre destination privilégiée pour le meilleur des produits camerounais en Europe. Authenticité garantie, livraison express et sécurisée.",
  alternates: {
    languages: {
      "x-default": "https://mbengsend.com/cm",
      "fr-CM": "https://mbengsend.com/cm",
      "fr-FR": "https://mbengsend.com/fr",
      "fr-BE": "https://mbengsend.com/be",
      "de-DE": "https://mbengsend.com/de",
      "it-IT": "https://mbengsend.com/it",
      "es-ES": "https://mbengsend.com/es",
    }
  }
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
      <GpCta />
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Mbengsend",
            "url": "https://mbengsend.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://mbengsend.com/search?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          }),
        }}
      />
    </>
  )
}


