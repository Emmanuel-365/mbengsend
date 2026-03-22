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
import { Package, Plane } from "lucide-react"

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
      <div className="small:hidden sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-white/20 shadow-sm transition-all duration-300 supports-[backdrop-filter]:bg-white/60">
        <div className="flex items-center justify-between h-16 px-3 gap-2">
          {/* Left: Menu Button */}
          <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />

          {/* Center: Logo & Name */}
          <LocalizedClientLink
            href="/"
            className="flex-1 flex items-center justify-center gap-2"
            data-testid="nav-store-link"
          >
            <div className="relative w-8 h-8">
              <Image 
                src="/logo.png" 
                alt="Mbengsend Logo" 
                fill 
                className="object-contain drop-shadow-sm"
              />
            </div>
            <span className="text-lg font-display font-bold text-brand-dark tracking-tight">Mbengsend</span>
          </LocalizedClientLink>

          {/* Right: Search, Wishlist & Cart */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors"
              data-testid="mobile-search-button"
              aria-label="Rechercher des produits"
            >
              <MagnifyingGlass className="w-5 h-5 text-brand-dark" />
            </button>

            <LocalizedClientLink
              href="/account/wishlist"
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors"
              aria-label="Favoris"
            >
              <Heart className="w-5 h-5 text-brand-dark" />
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/cart"
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors"
              aria-label="Panier"
            >
              <ShoppingCart className="w-5 h-5 text-brand-dark" />
            </LocalizedClientLink>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="small:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl bg-white/95 border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-safe-area-inset-bottom">
        <div className="flex items-center justify-between h-16 px-1 pb-1">
          {/* Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-lg hover:bg-gray-100 transition-colors flex-1"
            aria-label="Rechercher"
          >
            <MagnifyingGlass className="w-6 h-6 text-gray-700" />
            <span className="text-[10px] font-medium text-gray-700">Recherche</span>
          </button>

          {/* Shipping */}
          <LocalizedClientLink
            href="/shipping"
            className="flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-lg hover:bg-blue-50 transition-colors flex-1 text-blue-600"
          >
            <Package className="w-6 h-6" />
            <span className="text-[10px] font-semibold tracking-tight">Expédier</span>
          </LocalizedClientLink>

          {/* GP Service - Flagship Attraction (Center FAB) */}
          <div className="flex-[1.2] flex justify-center relative z-50">
            <LocalizedClientLink
              href="/gp"
              className="flex flex-col items-center justify-center w-[60px] h-[60px] rounded-full bg-brand-primary text-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] ring-4 ring-white hover:bg-brand-secondary transition-transform active:scale-95 -mt-8"
              aria-label="Vendre Kilos (GP)"
            >
              <Plane className="w-6 h-6" />
              <span className="text-[10px] font-bold mt-0.5 leading-none">GP</span>
            </LocalizedClientLink>
          </div>

          {/* Account */}
          <LocalizedClientLink
            href="/account"
            className="flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-lg hover:bg-gray-100 transition-colors flex-1"
          >
            <div className="w-6 h-6 rounded-full border-2 border-gray-700" />
            <span className="text-[10px] font-medium text-gray-700">Compte</span>
          </LocalizedClientLink>

          {/* Store - De-emphasized */}
          <LocalizedClientLink
            href="/store"
            className="flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-lg hover:bg-gray-50 transition-colors flex-[0.8] opacity-50 grayscale"
          >
            <ShoppingCart className="w-5 h-5 text-gray-500" />
            <span className="text-[10px] font-medium text-gray-500">Boutique</span>
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
