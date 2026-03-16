import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Boutique Mbengsend | Tous nos Produits",
  description: "Explorez notre collection complète de produits disponibles pour une livraison rapide au Cameroun. Vêtements, accessoires, électronique et plus encore.",
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
