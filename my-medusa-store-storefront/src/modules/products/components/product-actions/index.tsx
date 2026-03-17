"use client"

import { addToCart } from "@lib/data/cart"
import { addToWishlistAction, removeFromWishlistAction } from "@modules/products/components/wishlist-toggle/actions"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import { Button, clx } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"
import { useRouter } from "next/navigation"
import { Heart } from "@medusajs/icons"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
  customer?: HttpTypes.StoreCustomer | null
  wishlist?: any | null
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  disabled,
  customer,
  wishlist: initialWishlist,
}: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const [isWishlistLoading, setIsWishlistLoading] = useState(false)
  const [wishlist, setWishlist] = useState(initialWishlist)
  const countryCode = useParams().countryCode as string

  // Update local wishlist when initialWishlist changes (e.g. on page load)
  useEffect(() => {
    setWishlist(initialWishlist)
  }, [initialWishlist])

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  const isProductInWishlist = useMemo(() => {
    if (!wishlist || !wishlist.items) return false

    // If a variant is selected, check if that specific variant is in wishlist
    if (selectedVariant?.id) {
      return wishlist.items.some((i: any) => i.variant_id === selectedVariant.id)
    }

    // If no variant selected (single variant product or no selection yet)
    // Check if the product itself is in wishlist (any variant)
    return wishlist.items.some((i: any) => i.product_id === product.id)
  }, [wishlist, selectedVariant, product.id])

  const wishlistId = useMemo(() => {
    if (!wishlist || !wishlist.items) return null

    // If a variant is selected, find the wishlist item for that specific variant
    if (selectedVariant?.id) {
      return wishlist.items.find((i: any) => i.variant_id === selectedVariant.id)?.id
    }

    // If no variant selected, find any wishlist item for this product
    return wishlist.items.find((i: any) => i.product_id === product.id)?.id
  }, [wishlist, selectedVariant, product.id])

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  //check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const value = isValidVariant ? selectedVariant?.id : null

    if (params.get("v_id") === value) {
      return
    }

    if (value) {
      params.set("v_id", value)
    } else {
      params.delete("v_id")
    }

    router.replace(pathname + "?" + params.toString())
  }, [selectedVariant, isValidVariant])

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    await addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      countryCode,
    })

    setIsAdding(false)
  }

  const handleWishlistAction = async () => {
    if (!customer) {
      router.push(`/${countryCode}/account`)
      return
    }

    // For products with multiple variants, require a variant to be selected
    if ((product.variants?.length ?? 0) > 1 && !selectedVariant) {
      return // Don't allow adding to wishlist without selecting a variant
    }

    setIsWishlistLoading(true)

    // Optimistic update
    const previousWishlist = wishlist

    try {
      if (isProductInWishlist && wishlistId) {
        // Optimistic update - remove from UI immediately
        const updatedItems = wishlist.items.filter((i: any) => i.id !== wishlistId)
        setWishlist({ ...wishlist, items: updatedItems })

        const result = await removeFromWishlistAction(wishlistId)
        if (!result.success) {
          // Revert on error
          setWishlist(previousWishlist)
        } else {
          // Refresh to update navbar count
          router.refresh()
        }
      } else {
        // For multi-variant products, always send variant_id
        // For single-variant products, send both product_id and variant_id
        const result = await addToWishlistAction({
          product_id: product.id,
          variant_id: selectedVariant?.id
        })

        if (result.success && result.wishlist) {
          setWishlist(result.wishlist)
          // Refresh to update navbar count
          router.refresh()
        }
      }
    } catch (error: any) {
      console.error("Wishlist action failed:", error)
      // Revert on error
      setWishlist(previousWishlist)
      if (error.status === 401 || error.message?.includes("Unauthorized")) {
        router.push(`/${countryCode}/account`)
      }
    } finally {
      setIsWishlistLoading(false)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-y-2" ref={actionsRef}>
        <div>
          {(product.variants?.length ?? 0) > 1 && (
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map((option) => {
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      current={options[option.id]}
                      updateOption={setOptionValue}
                      title={option.title ?? ""}
                      data-testid="product-options"
                      disabled={!!disabled || isAdding}
                    />
                  </div>
                )
              })}
              <Divider />
            </div>
          )}
        </div>

        <ProductPrice product={product} variant={selectedVariant} />

        <div className="flex flex-col gap-y-4 w-full mt-10">
          <Button
            onClick={handleAddToCart}
            disabled={
              !inStock ||
              !selectedVariant ||
              !!disabled ||
              isAdding ||
              !isValidVariant
            }
            className="w-full h-16 rounded-full bg-brand-dark hover:bg-brand-gold text-white font-sans font-bold uppercase tracking-widest text-sm shadow-lux-lg hover:scale-[1.05] active:scale-[0.95] transition-all duration-500 border-none"
            isLoading={isAdding}
            data-testid="add-product-button"
          >
            {!selectedVariant && !options
              ? "Choisir une option"
              : !inStock || !isValidVariant
                ? "Rupture de stock"
                : "Ajouter au panier"}
          </Button>

          <Button
            onClick={handleWishlistAction}
            variant="secondary"
            className="w-full h-16 rounded-full border-brand-gold/20 text-brand-dark hover:bg-brand-gold/5 flex items-center justify-center gap-x-4 font-sans font-bold uppercase tracking-widest text-xs transition-all duration-500 shadow-sm hover:shadow-md"
            isLoading={isWishlistLoading}
            disabled={!!disabled || ((product.variants?.length ?? 0) > 1 && !selectedVariant)}
          >
            <Heart className={clx("h-5 w-5 transition-all duration-500", { "fill-brand-gold text-brand-gold scale-110": isProductInWishlist, "text-brand-dark/30": !isProductInWishlist })} />
            {!selectedVariant && (product.variants?.length ?? 0) > 1
              ? "Sélectionner une variante"
              : isProductInWishlist
                ? "Dans mes favoris"
                : "Ajouter aux favoris"}
          </Button>
        </div>

        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>
    </>
  )
}
