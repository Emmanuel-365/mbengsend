"use client"

import { useState, Suspense } from "react"
import { MagnifyingGlass, ShoppingCart } from "@medusajs/icons"
import { useParams } from "next/navigation"
import SearchModal from "../search-modal"
import CartButton from "../cart-button"
import { HttpTypes } from "@medusajs/types"
import { Locale } from "@lib/data/locales"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SideMenu from "../side-menu"

type MobileNavClientProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
}

export default function MobileNavClient({ regions, locales, currentLocale }: MobileNavClientProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const params = useParams()
  const countryCode = params.countryCode as string

  return (
    <>
      {/* Top navbar - visible on mobile only */}
      <div className="small:hidden sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <LocalizedClientLink
            href="/"
            className="flex items-center gap-2"
            data-testid="nav-store-link"
          >
            <div className="relative w-8 h-8">
              <Image 
                src="/logo.png" 
                alt="Mbengsend Logo" 
                fill 
                className="object-contain"
              />
            </div>
          </LocalizedClientLink>

          {/* Search button - prominent on mobile */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
            data-testid="mobile-search-button"
            aria-label="Rechercher des produits"
          >
            <MagnifyingGlass className="w-6 h-6 text-gray-700" />
          </button>

          {/* Cart button */}
          <Suspense fallback={<div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse" />}>
            <CartButton />
          </Suspense>
        </div>
      </div>

      {/* Bottom sticky navigation - visible on mobile only */}
      <div className="small:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around h-16 px-2">
          {/* Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex flex-col items-center justify-center gap-1 py-2 px-2 rounded-lg hover:bg-gray-100 transition-colors flex-1"
            aria-label="Rechercher"
          >
            <MagnifyingGlass className="w-5 h-5 text-gray-700" />
            <span className="text-xs font-medium text-gray-700">Recherche</span>
          </button>

          {/* Store */}
          <LocalizedClientLink
            href="/store"
            className="flex flex-col items-center justify-center gap-1 py-2 px-2 rounded-lg hover:bg-gray-100 transition-colors flex-1"
          >
            <ShoppingCart className="w-5 h-5 text-gray-700" />
            <span className="text-xs font-medium text-gray-700">Boutique</span>
          </LocalizedClientLink>

          {/* Menu */}
          <div className="flex flex-col items-center justify-center gap-1 py-2 px-2 rounded-lg flex-1">
            <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        countryCode={countryCode}
      />
    </>
  )
}
