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
      <div className="hidden small:block sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-white/20 shadow-sm transition-all duration-300 supports-[backdrop-filter]:bg-white/60">
        <div className="flex items-center justify-between h-16 px-4 small:px-8 max-w-[1440px] mx-auto">
          {/* Left: Menu & Logo */}
          <div className="flex items-center gap-6">
            <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
            
            <LocalizedClientLink
              href="/"
              className="flex items-center gap-2 group/logo"
              data-testid="nav-store-link"
            >
              <div className="relative w-10 h-10 transition-transform duration-700 ease-out group-hover/logo:rotate-[360deg] group-hover/logo:scale-110">
                <Image 
                  src="/logo.png" 
                  alt="Mbengsend Logo" 
                  fill 
                  className="object-contain drop-shadow-md"
                />
              </div>
              <span className="text-xl font-display font-bold text-brand-dark tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-dark to-brand-secondary">
                Mbengsend
              </span>
            </LocalizedClientLink>
          </div>

          {/* Right: Search, Wishlist, Account, Cart */}
          <div className="flex items-center gap-x-6">
            <LocalizedClientLink
              className="hidden lg:flex items-center gap-2 text-sm font-semibold bg-brand-secondary text-white border border-brand-secondary/50 px-5 py-2 rounded-full hover:bg-brand-secondary/90 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-opacity-50"
              href="/gp/sell"
            >
              <span>✈️</span> Je voyage : Vendre mes kilos
            </LocalizedClientLink>
            <LocalizedClientLink
              className="hidden lg:flex items-center gap-2 text-sm font-semibold bg-brand-primary/10 text-brand-primary border border-brand-primary/20 px-5 py-2 rounded-full hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              href="/shipping"
            >
              <span>📦</span> Expédier un colis
            </LocalizedClientLink>
            <div className="h-6 w-px bg-gray-200 mx-2" />
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
