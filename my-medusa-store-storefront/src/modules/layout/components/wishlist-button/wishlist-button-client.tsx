"use client"

import { Heart } from "@medusajs/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type WishlistButtonClientProps = {
  itemCount: number
}

export default function WishlistButtonClient({ itemCount }: WishlistButtonClientProps) {
  return (
    <LocalizedClientLink
      className="hover:text-ui-fg-base flex items-center gap-x-2 relative"
      href="/account/wishlist"
      data-testid="nav-wishlist-link"
    >
      <Heart />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-ui-fg-base text-ui-fg-on-color text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {itemCount}
        </span>
      )}
      <span className="hidden small:inline">Wishlist</span>
    </LocalizedClientLink>
  )
}
