"use client"

import { useState } from "react"
import { MagnifyingGlass } from "@medusajs/icons"
import { useParams } from "next/navigation"
import SearchModal from "@modules/layout/components/search-modal"

export default function SearchButton() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const params = useParams()
  const countryCode = params.countryCode as string

  return (
    <>
      <button
        onClick={() => setIsSearchOpen(true)}
        className="hover:text-brand-primary transition-colors flex items-center gap-x-2 font-semibold p-2 -m-2 rounded-lg hover:bg-gray-100/50"
        data-testid="nav-search-button"
        aria-label="Ouvrir la recherche"
      >
        <MagnifyingGlass className="w-6 h-6" />
        <span className="hidden small:inline">Rechercher</span>
      </button>
      
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)}
        countryCode={countryCode}
      />
    </>
  )
}
