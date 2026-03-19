"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { HttpTypes } from "@medusajs/types"
import SortProducts, { SortOptions } from "./sort-products"
import PriceFilter from "./price-filter"

type RefinementListProps = {
  sortBy: SortOptions
  region?: HttpTypes.StoreRegion | null
  search?: boolean
  'data-testid'?: string
}

const RefinementList = ({ sortBy, region, 'data-testid': dataTestId }: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const minPrice = searchParams.get("min") || undefined
  const maxPrice = searchParams.get("max") || undefined

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`, { scroll: false })
  }

  const handleApply = () => {
    // Re-apply all params at once to avoid multiple navigation events
    const params = new URLSearchParams(searchParams)
    
    if (minPrice) params.set("min", minPrice)
    else params.delete("min")

    if (maxPrice) params.set("max", maxPrice)
    else params.delete("max")
    
    // The sortBy param is already set by the SortProducts component,
    // so we just push the final URL.
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex flex-col gap-12 py-4 mb-8 pl-0 small:min-w-[250px]">
      <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />
      <PriceFilter
        minPrice={minPrice}
        maxPrice={maxPrice}
        setQueryParams={setQueryParams}
        region={region}
      />
      <button
        onClick={handleApply}
        className="w-full hidden small:block px-4 py-3 bg-brand-primary text-white rounded-lg font-medium hover:bg-brand-primary/90 transition-colors"
      >
        Appliquer
      </button>
    </div>
  )
}


export default RefinementList

