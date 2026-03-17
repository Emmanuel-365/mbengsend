import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

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

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
      minPrice={min}
      maxPrice={max}
    />
  )
}
