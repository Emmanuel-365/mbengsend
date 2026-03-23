import { getWishlist, type WishlistItem } from "@lib/data/wishlist"
import { listProducts } from "@lib/data/products"
import WishlistClient from "./wishlist-client"

type Props = {
  params: Promise<{ countryCode: string }>
}

export default async function WishlistPage(props: Props) {
  const params = await props.params
  const countryCode = params.countryCode
  
  let wishlistData;
  try {
    wishlistData = await getWishlist()
  } catch (e) {
    wishlistData = { wishlist: null }
  }
  
  const wishlist = wishlistData.wishlist

  const productIds: string[] = wishlist?.items
    ? wishlist.items
        .map((item: WishlistItem) => item.product_id)
        .filter((id: string | null): id is string => id !== null)
    : []

  const { response: { products } } = productIds.length > 0 
    ? await listProducts({ queryParams: { id: productIds }, countryCode })
    : { response: { products: [] } }

  return <WishlistClient initialWishlist={wishlist} initialProducts={products} countryCode={countryCode} />
}
