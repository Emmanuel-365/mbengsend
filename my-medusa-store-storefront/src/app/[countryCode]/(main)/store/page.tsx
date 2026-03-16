import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Boutique Mbengsend | Tous nos Produits Européens",
  description: "Explorez notre catalogue complet de produits sourcés en Europe et livrés au Cameroun. Mode, électronique, cosmétiques et bien plus.",
  openGraph: {
    title: "Boutique Mbengsend | Shopping Europe-Cameroun",
    description: "Le meilleur du catalogue européen disponible immédiatement pour le Cameroun.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boutique Mbengsend | Shopping Europe-Cameroun",
    description: "Catalogue complet de produits importés d'Europe.",
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
