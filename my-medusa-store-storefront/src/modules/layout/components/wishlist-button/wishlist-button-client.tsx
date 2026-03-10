"use client"

import { Heart } from "@medusajs/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type WishlistButtonClientProps = {
  itemCount: number
}

export default function WishlistButtonClient({ itemCount }: WishlistButtonClientProps) {
  return (
    <LocalizedClientLink
      className="hover:text-brand-primary flex items-center gap-x-2 relative transition-colors font-semibold"
      href="/account/wishlist"
      data-testid="nav-wishlist-link"
    >
      <Heart className="w-5 h-5" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-brand-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-white shadow-sm">
          {itemCount}
        </span>
      )}
      <span className="hidden small:inline">Favoris</span>
    </LocalizedClientLink>
  )
}
