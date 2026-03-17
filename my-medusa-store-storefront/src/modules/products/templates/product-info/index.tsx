import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-6 lg:max-w-[500px] mx-auto">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-[10px] small:text-xs font-bold uppercase tracking-[0.3em] text-brand-gold hover:text-brand-dark transition-all duration-300 font-sans"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading
          level="h2"
          className="text-4xl small:text-6xl font-display font-bold text-brand-dark leading-[1.1] tracking-tight italic"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        <div className="h-0.5 w-12 bg-brand-gold mt-2" />

        <Text
          className="text-base small:text-lg text-ui-fg-subtle leading-relaxed whitespace-pre-line font-sans"
          data-testid="product-description"
        >
          {product.description}
        </Text>
      </div>
    </div>
  )
}

export default ProductInfo
