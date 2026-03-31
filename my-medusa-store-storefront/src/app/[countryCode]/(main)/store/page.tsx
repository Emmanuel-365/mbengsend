import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

import { getBaseURL } from "@lib/util/env"

export const metadata: Metadata = {
  title: "Boutique Mbengsend | L'Excellence du Terroir Camerounais",
  description: "Explorez notre catalogue complet de produits camerounais livrés en Europe. Artisanat, alimentation, cosmétiques naturels et bien plus.",
  openGraph: {
    title: "Boutique Mbengsend | L'Excellence du Cameroun en Europe",
    description: "Le meilleur du terroir camerounais disponible immédiatement pour l'Europe.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boutique Mbengsend | L'Excellence du Cameroun en Europe",
    description: "Catalogue complet de produits d'excellence du Cameroun.",
  },
  alternates: {
    canonical: `${getBaseURL()}/fr/store`,
    languages: {
      "x-default": `${getBaseURL()}/fr/store`,
      "fr-CM": `${getBaseURL()}/cm/store`,
      "fr-FR": `${getBaseURL()}/fr/store`,
      "fr-BE": `${getBaseURL()}/be/store`,
      "de-DE": `${getBaseURL()}/de/store`,
      "it-IT": `${getBaseURL()}/it/store`,
      "es-ES": `${getBaseURL()}/es/store`,
    }
  }
}



type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
    min?: string
    max?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { sortBy, page, min, max } = searchParams

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Boutique",
        "item": `${getBaseURL()}/${params.countryCode}/store`
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <StoreTemplate
        sortBy={sortBy}
        page={page}
        countryCode={params.countryCode}
        minPrice={min}
        maxPrice={max}
      />
    </>
  )
}
