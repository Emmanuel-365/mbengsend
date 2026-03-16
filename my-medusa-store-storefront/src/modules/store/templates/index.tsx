import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { getRegion } from "@lib/data/regions"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreCategories from "@modules/store/components/store-categories"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = async ({
  sortBy,
  page,
  countryCode,
  minPrice,
  maxPrice,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  minPrice?: string
  maxPrice?: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"
  const region = await getRegion(countryCode)

  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-12 px-4 small:px-8 content-container gap-12"
      data-testid="category-container"
    >
      <div className="flex flex-col gap-y-12 shrink-0 small:w-[250px] w-full pt-4">
        <StoreCategories />
        <RefinementList sortBy={sort} region={region} />
      </div>

      <div className="w-full">
        <div className="mb-12">
          <h1 className="text-4xl small:text-5xl font-display font-bold text-brand-dark tracking-tight" data-testid="store-page-title">
            Tous les <span className="text-brand-primary">produits</span>
          </h1>
          <p className="text-ui-fg-subtle mt-2">Découvrez notre collection exclusive sélectionnée en Europe.</p>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
