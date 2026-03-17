import { Text } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region?: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group h-full block relative">
      <div
        className="flex flex-col h-full bg-white rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:border-brand-gold/40 border border-transparent group-hover:-translate-y-1 relative"
        data-testid="product-wrapper"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
            className="transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
          {/* Subtle gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="flex flex-col p-4 small:p-5 flex-grow bg-white relative z-10">
          <Text
            className="text-base small:text-xl font-display font-semibold text-brand-dark group-hover:text-brand-gold transition-colors duration-300 line-clamp-2 leading-tight mb-2"
            data-testid="product-title"
          >
            {product.title}
          </Text>
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 group-hover:border-brand-gold/20 transition-colors duration-300">
             <div className="flex items-center gap-2">
               {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
             </div>
             {/* Quick Add icon placeholder (optional) */}
             <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
               <span className="text-lg leading-none">+</span>
             </div>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
