import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ProductActionsWrapper from "./product-actions-wrapper"
import ProductReviews from "@modules/products/components/product-reviews"
import { retrieveCustomer } from "@lib/data/customer"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = async ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  const customer = await retrieveCustomer()

  return (
    <>
      <div
        className="content-container flex flex-col small:flex-row small:items-start py-6 small:py-8 medium:py-12 relative gap-6 small:gap-8 medium:gap-12"
        data-testid="product-container"
      >
        <div className="flex flex-col small:sticky small:top-20 medium:top-32 small:py-0 small:max-w-[250px] medium:max-w-[300px] w-full py-6 gap-y-4 small:gap-y-6">
          <ProductInfo product={product} />
          <ProductTabs product={product} />
        </div>
        <div className="block w-full relative">
          <ImageGallery images={images} />
        </div>
        <div className="flex flex-col small:sticky small:top-20 medium:top-32 small:py-0 small:max-w-[250px] medium:max-w-[300px] w-full py-6 gap-y-8 small:gap-y-12">
          <ProductOnboardingCta />
          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
              />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
        </div>
      </div>
      <div className="content-container my-8 small:my-16 medium:my-32">
        <ProductReviews product={product} customer={customer} />
      </div>
      <div
        className="content-container my-8 small:my-16 medium:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
