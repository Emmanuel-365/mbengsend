"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "../refinement-list/sort-products"
import FilterDrawer from "../filter-drawer"

type FilterDrawerClientProps = {
  sortBy: SortOptions
  region?: HttpTypes.StoreRegion | null
  minPrice?: string
  maxPrice?: string
}

export default function FilterDrawerClient({
  sortBy,
  region,
  minPrice,
  maxPrice,
}: FilterDrawerClientProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

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

  return (
    <FilterDrawer
      sortBy={sortBy}
      region={region}
      minPrice={minPrice}
      maxPrice={maxPrice}
      setQueryParams={setQueryParams}
    />
  )
}
