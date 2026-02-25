import { listProducts } from "@lib/data/products"
import { retrieveCustomer } from "@lib/data/customer"
import { getWishlist } from "@lib/data/wishlist"
import { HttpTypes } from "@medusajs/types"
import ProductActions from "@modules/products/components/product-actions"
import { notFound } from "next/navigation"

/**
 * Fetches real time pricing for a product and renders the product actions component.
 */
export default async function ProductActionsWrapper({
  id,
  region,
}: {
  id: string
  region: HttpTypes.StoreRegion
}) {
  const [{ response }, customer, wishlist] = await Promise.all([
    listProducts({ queryParams: { id: [id] }, regionId: region.id }),
    retrieveCustomer(),
    retrieveCustomer().then(c => c ? getWishlist() : null)
  ])

  const product = response.products[0]

  if (!product) {
    return notFound()
  }

  return (
    <ProductActions
      product={product}
      region={region}
      customer={customer}
      wishlist={wishlist?.wishlist}
    />
  )
}
