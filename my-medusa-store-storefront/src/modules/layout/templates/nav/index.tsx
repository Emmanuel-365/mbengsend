import { Suspense } from "react"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import SearchButton from "./search-button"
import Image from "next/image"
import WishlistButton from "@modules/layout/components/wishlist-button"
import MobileNavBar from "@modules/layout/components/mobile-nav/navbar"

export default function Nav({ regions, locales, currentLocale }: { 
  regions: StoreRegion[]
  locales: any[]
  currentLocale: string
}) {
  return (
    <>
      {/* Desktop Navigation - sticky header */}
      <div className="hidden small:block sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between h-16 px-4 small:px-8 max-w-[1440px] mx-auto">
          {/* Left: Menu */}
          <div className="flex items-center">
            <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
          </div>

          {/* Center: Logo */}
          <LocalizedClientLink
            href="/"
            className="flex items-center gap-2 group/logo"
            data-testid="nav-store-link"
          >
            <div className="relative w-8 h-8 transition-transform duration-500 group-hover/logo:rotate-[360deg]">
              <Image 
                src="/logo.png" 
                alt="Mbengsend Logo" 
                fill 
                className="object-contain"
              />
            </div>
            <span className="text-lg font-display font-bold text-gray-900 tracking-tight">
              Mbengsend
            </span>
          </LocalizedClientLink>

          {/* Right: Search, Wishlist, Account, Cart */}
          <div className="flex items-center gap-x-6">
            <LocalizedClientLink
              className="hidden lg:flex items-center gap-2 hover:text-brand-primary transition-colors text-sm font-semibold bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full hover:bg-blue-100"
              href="/shipping"
            >
              📦 Expédier un colis
            </LocalizedClientLink>
            <SearchButton />
            <Suspense fallback={<div className="w-6 h-6 rounded-full bg-grey-10 animate-pulse" />}>
              <WishlistButton />
            </Suspense>
            <LocalizedClientLink
              className="hover:text-brand-primary transition-colors text-sm font-medium"
              href="/account"
              data-testid="nav-account-link"
            >
              Compte
            </LocalizedClientLink>
            <Suspense
              fallback={
                <div className="w-6 h-6 rounded-full bg-grey-10 animate-pulse" />
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNavBar regions={regions} locales={locales} currentLocale={currentLocale} />
    </>
  )
}
