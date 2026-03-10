import { Text } from "@medusajs/ui"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  // const pricedProduct = await listProducts({
  //   regionId: region.id,
  //   queryParams: { id: [product.id!] },
  // }).then(({ response }) => response.products[0])

  // if (!pricedProduct) {
  //   return null
  // }

  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group h-full">
      <div
        className="flex flex-col h-full bg-white rounded-huge-lg border border-brand-dark/[0.03] overflow-hidden transition-all duration-500 hover:shadow-lux-lg hover:border-brand-primary/20 group-hover:-translate-y-1"
        data-testid="product-wrapper"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
            className="transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div className="flex flex-col p-6 flex-grow">
          <Text
            className="text-lg font-display font-bold text-brand-dark group-hover:text-brand-primary transition-colors duration-300"
            data-testid="product-title"
          >
            {product.title}
          </Text>
          <div className="flex items-center mt-3 pt-3 border-t border-brand-dark/5">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
