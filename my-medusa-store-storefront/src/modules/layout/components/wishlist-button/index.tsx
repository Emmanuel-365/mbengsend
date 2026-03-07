import { getWishlist } from "@lib/data/wishlist"
import WishlistButtonClient from "./wishlist-button-client"

export default async function WishlistButton() {
  const { wishlist } = await getWishlist().catch(() => ({ wishlist: null }))

  return <WishlistButtonClient itemCount={wishlist?.items?.length || 0} />
}
