"use client"

import { useState, Suspense } from "react"
import { MagnifyingGlass, ShoppingCart, Heart } from "@medusajs/icons"
import { useParams } from "next/navigation"
import SearchModal from "../search-modal"
import { HttpTypes } from "@medusajs/types"
import { Locale } from "@lib/data/locales"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SideMenu from "../side-menu"

type MobileNavBarProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
}

export default function MobileNavBar({ regions, locales, currentLocale }: MobileNavBarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const params = useParams()
  const countryCode = params.countryCode as string

  return (
    <>
      {/* Mobile Header - visible only on mobile */}
      <div className="small:hidden sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between h-16 px-3 gap-2">
          {/* Left: Menu Button */}
          <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />

          {/* Center: Logo & Name */}
          <LocalizedClientLink
            href="/"
            className="flex-1 flex items-center justify-center gap-2"
            data-testid="nav-store-link"
          >
            <div className="relative w-6 h-6">
              <Image 
                src="/logo.png" 
                alt="Mbengsend Logo" 
                fill 
                className="object-contain"
              />
            </div>
            <span className="text-sm font-bold text-gray-900">Mbengsend</span>
          </LocalizedClientLink>

          {/* Right: Search, Wishlist & Cart */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
              data-testid="mobile-search-button"
              aria-label="Rechercher des produits"
            >
              <MagnifyingGlass className="w-6 h-6 text-gray-700" />
            </button>

            <LocalizedClientLink
              href="/account/wishlist"
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Favoris"
            >
              <Heart className="w-6 h-6 text-gray-700" />
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/cart"
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Panier"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
            </LocalizedClientLink>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="small:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around h-16 px-2">
          {/* Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors flex-1"
            aria-label="Rechercher"
          >
            <MagnifyingGlass className="w-6 h-6 text-gray-700" />
            <span className="text-xs font-medium text-gray-700">Recherche</span>
          </button>

          {/* Store */}
          <LocalizedClientLink
            href="/store"
            className="flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors flex-1"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            <span className="text-xs font-medium text-gray-700">Boutique</span>
          </LocalizedClientLink>

          {/* Shipping */}
          <LocalizedClientLink
            href="/shipping"
            className="flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors flex-1 text-blue-600"
          >
            <span className="text-xl leading-none flex items-center justify-center h-6">📦</span>
            <span className="text-xs font-semibold">Expédier</span>
          </LocalizedClientLink>

          {/* Wishlist */}
          <LocalizedClientLink
            href="/account/wishlist"
            className="flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors flex-1"
          >
            <Heart className="w-6 h-6 text-gray-700" />
            <span className="text-xs font-medium text-gray-700">Favoris</span>
          </LocalizedClientLink>

          {/* Account */}
          <LocalizedClientLink
            href="/account"
            className="flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors flex-1"
          >
            <div className="w-6 h-6 rounded-full border-2 border-gray-700" />
            <span className="text-xs font-medium text-gray-700">Compte</span>
          </LocalizedClientLink>
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
