import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  })

  if (!pricedProducts) {
    return null
  }

  return (
    <div className="content-container py-16 small:py-32">
      <div className="flex items-end justify-between mb-12 border-b border-brand-dark/5 pb-6">
        <div className="flex flex-col gap-2">
          <Text className="text-sm font-bold uppercase tracking-widest text-brand-primary">Collection</Text>
          <Text className="text-3xl small:text-5xl font-display font-bold text-brand-dark tracking-tight">{collection.title}</Text>
        </div>
        <InteractiveLink href={`/collections/${collection.handle}`} className="text-brand-dark hover:text-brand-primary font-semibold transition-colors">
          Voir tout
        </InteractiveLink>
      </div>
      <ul className="grid grid-cols-2 small:grid-cols-4 gap-x-6 gap-y-12 small:gap-y-20">
        {pricedProducts &&
          pricedProducts.map((product) => (
            <li key={product.id}>
              <ProductPreview product={product} region={region} isFeatured />
            </li>
          ))}
      </ul>
    </div>
  )
}
