import { getWishlist } from "@lib/data/wishlist"
import { listProducts } from "@lib/data/products"
import { Heading, Text, Button } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { Trash } from "@medusajs/icons"
import { removeFromWishlist } from "@lib/data/wishlist"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export default async function WishlistPage() {
  const { wishlist } = await getWishlist()
  
  const productIds = wishlist?.items
    ?.map(item => item.product_id)
    .filter((id): id is string => id !== null) || []

  const { response: { products } } = productIds.length > 0 
    ? await listProducts({ queryParams: { id: productIds }, countryCode: 'FR' }) // countryCode is dummy here for listProducts
    : { response: { products: [] } }

  async function remove(id: string) {
    "use server"
    await removeFromWishlist(id)
    // Revalidation is handled by Next.js if we use server actions properly
  }

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col gap-y-4">
        <Heading level="h1">Ma Liste d'Envies</Heading>
        <Text className="text-ui-fg-subtle">
            Retrouve ici tous tes articles favoris pour les commander plus tard.
        </Text>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
            <Text className="mb-4">Ta liste d'envies est vide.</Text>
            <LocalizedClientLink href="/store">
                <Button variant="primary">Parcourir la boutique</Button>
            </LocalizedClientLink>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-y-6">
            {wishlist.items.map((item) => {
                const product = products.find(p => p.id === item.product_id)
                if (!product) return null

                return (
                    <div key={item.id} className="flex items-center gap-x-6 p-4 bg-white rounded-xl border border-gray-100 shadow-sm transition-shadow hover:shadow-md">
                        <div className="w-24">
                            <Thumbnail thumbnail={product.thumbnail} size="square" />
                        </div>
                        <div className="flex-1 flex flex-col">
                            <LocalizedClientLink href={`/products/${product.handle}`} className="font-bold text-lg hover:text-blue-600 transition-colors">
                                {product.title}
                            </LocalizedClientLink>
                            <Text className="text-sm text-ui-fg-subtle line-clamp-1">{product.description}</Text>
                        </div>
                        <form action={async () => {
                            "use server"
                            await removeFromWishlist(item.id)
                            // Redirect to refresh the page since we don't have client state here easily
                        }}>
                             {/* Note: This is a bit hacky for a pure server component but works for a prototype/first version */}
                             <Button variant="secondary" className="text-red-500">
                                <Trash />
                             </Button>
                        </form>
                    </div>
                )
            })}
        </div>
      )}
    </div>
  )
}
