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
    <div className="content-container py-24 small:py-32">
      <div className="flex items-end justify-between mb-16 border-b border-brand-gold/10 pb-10">
        <div className="flex flex-col gap-3">
          <Text className="text-[10px] small:text-xs font-bold uppercase tracking-[0.3em] text-brand-gold font-sans">Explorer l'excellence</Text>
          <Text className="text-4xl small:text-6xl font-display font-bold text-brand-dark tracking-tight italic">{collection.title}</Text>
        </div>
        <InteractiveLink href={`/collections/${collection.handle}`} className="text-brand-dark hover:text-brand-gold font-sans font-bold uppercase tracking-widest text-sm transition-all duration-300">
          Voir tout <span className="text-xl ml-1">→</span>
        </InteractiveLink>
      </div>
      <ul className="grid grid-cols-2 small:grid-cols-4 gap-x-8 gap-y-16 small:gap-y-24">
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
