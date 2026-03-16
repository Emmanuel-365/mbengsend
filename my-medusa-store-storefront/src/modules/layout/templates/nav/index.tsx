import { Suspense } from "react"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import SearchButton from "./search-button"
import Image from "next/image"
import WishlistButton from "@modules/layout/components/wishlist-button"
import MobileNav from "@modules/layout/components/mobile-nav"

export default function Nav({ regions, locales, currentLocale }: { 
  regions: StoreRegion[]
  locales: any[]
  currentLocale: string
}) {
  return (
    <>
      {/* Mobile Navigation */}
      <MobileNav regions={regions} locales={locales} currentLocale={currentLocale} />

      {/* Desktop Navigation */}
      <div className="hidden small:flex sticky top-4 inset-x-0 z-50 justify-center px-4 small:px-8">
        <header className="w-full max-w-[1440px] h-16 rounded-full glass flex items-center px-6 small:px-10 transition-all duration-300 hover:shadow-lux-lg group">
          <nav className="flex items-center justify-between w-full h-full text-small-regular font-medium">
            <div className="flex-1 basis-0 h-full flex items-center">
              <div className="h-full flex items-center">
                <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
              </div>
            </div>

            <div className="flex items-center h-full">
              <LocalizedClientLink
                href="/"
                className="flex items-center gap-2 group/logo"
                data-testid="nav-store-link"
              >
                <div className="relative w-10 h-10 transition-transform duration-500 group-hover/logo:rotate-[360deg]">
                  <Image 
                    src="/logo.png" 
                    alt="Mbengsend Logo" 
                    fill 
                    className="object-contain"
                  />
                </div>
                <span className="text-xl font-display font-bold text-brand-secondary tracking-tight">
                  Mbengsend
                </span>
              </LocalizedClientLink>
            </div>

            <div className="flex items-center gap-x-4 small:gap-x-8 h-full flex-1 basis-0 justify-end">
              <div className="flex items-center gap-x-8 h-full">
                <SearchButton />
                <Suspense fallback={<div className="w-8 h-8 rounded-full bg-grey-10 animate-pulse" />}>
                  <WishlistButton />
                </Suspense>
                <LocalizedClientLink
                  className="hover:text-brand-primary transition-colors font-semibold"
                  href="/account"
                  data-testid="nav-account-link"
                >
                  Compte
                </LocalizedClientLink>
              </div>
              
              <Suspense
                fallback={
                  <div className="w-8 h-8 rounded-full bg-grey-10 animate-pulse" />
                }
              >
                <CartButton />
              </Suspense>
            </div>
          </nav>
        </header>
      </div>
    </>
  )
}
