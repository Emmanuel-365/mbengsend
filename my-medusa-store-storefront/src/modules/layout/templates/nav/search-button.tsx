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
        className="hover:text-ui-fg-base flex items-center gap-x-2"
        data-testid="nav-search-button"
      >
        <MagnifyingGlass />
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
