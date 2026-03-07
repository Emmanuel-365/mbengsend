"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Heading, Text, Button } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { Trash } from "@medusajs/icons"
import { removeFromWishlistAction } from "@modules/products/components/wishlist-toggle/actions"
import { HttpTypes } from "@medusajs/types"

type WishlistClientProps = {
  initialWishlist: any
  initialProducts: HttpTypes.StoreProduct[]
  countryCode: string
}

export default function WishlistClient({ 
  initialWishlist, 
  initialProducts,
  countryCode 
}: WishlistClientProps) {
  const router = useRouter()
  const [items, setItems] = useState(initialWishlist?.items || [])
  const [isRemoving, setIsRemoving] = useState<string | null>(null)

  const products = initialProducts

  const handleRemove = async (itemId: string) => {
    setIsRemoving(itemId)
    
    // Optimistic update
    const previousItems = items
    setItems(items.filter((item: any) => item.id !== itemId))

    try {
      const result = await removeFromWishlistAction(itemId)
      
      if (!result.success) {
        // Revert on error
        setItems(previousItems)
      } else {
        // Force refresh to update navbar count
        router.refresh()
      }
    } catch (error) {
      console.error("Remove from wishlist error:", error)
      // Revert on error
      setItems(previousItems)
    } finally {
      setIsRemoving(null)
    }
  }

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col gap-y-4">
        <Heading level="h1">Ma Liste d'Envies</Heading>
        <Text className="text-ui-fg-subtle">
          Retrouve ici tous tes articles favoris pour les commander plus tard.
        </Text>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
          <Text className="mb-4">Ta liste d'envies est vide.</Text>
          <LocalizedClientLink href="/store">
            <Button variant="primary">Parcourir la boutique</Button>
          </LocalizedClientLink>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-y-6">
          {items.map((item: any) => {
            const product = products.find(p => p.id === item.product_id)
            if (!product) return null

            // Find the specific variant if variant_id is present
            const variant = item.variant_id 
              ? product.variants?.find(v => v.id === item.variant_id)
              : null

            // Use variant image if available, otherwise use product thumbnail
            const thumbnail = variant?.images?.[0]?.url || product.thumbnail

            // Get variant options for display
            const variantOptions = variant?.options?.map((opt: any) => opt.value).join(" / ")

            return (
              <div 
                key={item.id} 
                className="flex items-center gap-x-6 p-4 bg-white rounded-xl border border-gray-100 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="w-24">
                  <Thumbnail thumbnail={thumbnail} size="square" />
                </div>
                <div className="flex-1 flex flex-col gap-y-1">
                  <LocalizedClientLink 
                    href={`/products/${product.handle}${variant ? `?v_id=${variant.id}` : ''}`}
                    className="font-bold text-lg hover:text-blue-600 transition-colors"
                  >
                    {product.title}
                  </LocalizedClientLink>
                  {variantOptions && (
                    <Text className="text-sm text-ui-fg-muted">
                      {variantOptions}
                    </Text>
                  )}
                  <Text className="text-sm text-ui-fg-subtle line-clamp-1">
                    {product.description}
                  </Text>
                </div>
                <Button 
                  variant="secondary" 
                  className="text-red-500"
                  onClick={() => handleRemove(item.id)}
                  disabled={isRemoving === item.id}
                  isLoading={isRemoving === item.id}
                >
                  <Trash />
                </Button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
