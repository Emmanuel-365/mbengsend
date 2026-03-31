import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import FilterDrawerClient from "@modules/store/components/filter-drawer-client"
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
      className="flex flex-col small:flex-row small:items-start py-6 small:py-12 px-4 small:px-8 content-container gap-8 small:gap-12"
      data-testid="category-container"
    >
      {/* Sidebar - Hidden on mobile, shown on small+ */}
      <div className="hidden small:flex flex-col gap-y-12 shrink-0 small:w-[250px] pt-4 small:sticky small:top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
        <StoreCategories />
        <RefinementList sortBy={sort} region={region} />
      </div>

      {/* Main Content */}
      <div className="w-full">
        {/* Mobile Filter Drawer */}
        <FilterDrawerClient sortBy={sort} region={region} minPrice={minPrice} maxPrice={maxPrice} />

        {/* Page Title */}
        <div className="mb-8 small:mb-12">
          <h1 className="text-3xl small:text-4xl medium:text-5xl font-display font-bold text-brand-dark tracking-tight" data-testid="store-page-title">
            Notre <span className="text-brand-primary">Collection</span>
          </h1>
          <p className="text-sm small:text-base text-ui-fg-subtle mt-2">Découvrez l'excellence du terroir et de l'artisanat camerounais, sélectionnés pour vous.</p>
        </div>

        {/* Products Grid */}
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
