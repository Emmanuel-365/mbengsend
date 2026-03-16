"use client"

import { useState } from "react"
import { ChevronDown, XMark } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "../refinement-list/sort-products"
import SortProducts from "../refinement-list/sort-products"
import PriceFilter from "../refinement-list/price-filter"

type FilterDrawerProps = {
  sortBy: SortOptions
  region?: HttpTypes.StoreRegion | null
  minPrice?: string
  maxPrice?: string
  setQueryParams: (name: string, value: string) => void
}

export default function FilterDrawer({
  sortBy,
  region,
  minPrice,
  maxPrice,
  setQueryParams,
}: FilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="small:hidden w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-brand-primary/50 transition-colors mb-6"
      >
        <span className="font-medium text-brand-dark">Filtres & Tri</span>
        <ChevronDown className="w-5 h-5" />
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 small:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-full max-w-sm bg-white transform transition-transform duration-300 ease-out small:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <h2 className="font-display font-bold text-brand-dark">Filtres & Tri</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Fermer les filtres"
          >
            <XMark className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4 pb-20">
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="font-medium text-brand-dark mb-4">Tri</h3>
              <SortProducts
                sortBy={sortBy}
                setQueryParams={setQueryParams}
              />
            </div>
            <div>
              <h3 className="font-medium text-brand-dark mb-4">Prix</h3>
              <PriceFilter
                minPrice={minPrice}
                maxPrice={maxPrice}
                setQueryParams={setQueryParams}
                region={region}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="fixed bottom-0 left-0 right-0 max-w-sm p-4 bg-white border-t border-gray-200 flex gap-3">
          <button
            onClick={() => setIsOpen(false)}
            className="flex-1 px-4 py-3 bg-gray-100 text-brand-dark rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Fermer
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="flex-1 px-4 py-3 bg-brand-primary text-white rounded-lg font-medium hover:bg-brand-primary/90 transition-colors"
          >
            Appliquer
          </button>
        </div>
      </div>
    </>
  )
}
