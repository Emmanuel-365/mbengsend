"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { MagnifyingGlass, XMark } from "@medusajs/icons"
import { Button, Input, Text, clx } from "@medusajs/ui"
import { searchProducts, SearchProduct } from "@lib/data/search"
import { debounce } from "lodash"

type SearchModalProps = {
  isOpen: boolean
  onClose: () => void
  countryCode: string
}

export default function SearchModal({ isOpen, onClose, countryCode }: SearchModalProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchProduct[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([])
        setHasSearched(false)
        return
      }

      setIsLoading(true)
      try {
        const { products } = await searchProducts(searchQuery, { limit: 12 })
        setResults(products)
        setHasSearched(true)
      } catch (error) {
        console.error("Search error:", error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 300),
    []
  )

  useEffect(() => {
    debouncedSearch(query)
  }, [query, debouncedSearch])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleProductClick = (handle: string) => {
    router.push(`/${countryCode}/products/${handle}`)
    onClose()
    setQuery("")
    setResults([])
    setHasSearched(false)
  }

  const handleClose = () => {
    onClose()
    setQuery("")
    setResults([])
    setHasSearched(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center small:pt-20 pt-0">
      <div className="bg-white w-full small:rounded-lg small:shadow-2xl small:max-w-2xl small:mx-4 small:max-h-[80vh] h-full small:h-auto flex flex-col">
        {/* Header */}
        <div className="p-4 small:p-4 border-b border-gray-200 flex items-center gap-x-3 sticky top-0 bg-white z-10">
          <MagnifyingGlass className="text-gray-400 flex-shrink-0" />
          <Input
            autoFocus
            placeholder="Rechercher des produits..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border-none focus:ring-0 text-base"
          />
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
            aria-label="Fermer la recherche"
          >
            <XMark className="text-gray-600" />
          </button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4 small:p-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Text className="text-gray-500">Recherche en cours...</Text>
            </div>
          ) : hasSearched && results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-y-2">
              <Text className="text-gray-500">Aucun produit trouvé</Text>
              <Text className="text-sm text-gray-400">
                Essayez avec d'autres mots-clés
              </Text>
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 small:grid-cols-2 gap-3 small:gap-4">
              {results.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product.handle)}
                  className="flex flex-col small:flex-col gap-3 p-3 small:p-4 hover:bg-gray-50 rounded-lg transition-colors text-left border border-gray-100 hover:border-brand-primary/20"
                >
                  {product.thumbnail ? (
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full aspect-square object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-full aspect-square bg-gray-200 rounded-md flex items-center justify-center">
                      <MagnifyingGlass className="text-gray-400 w-8 h-8" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <Text className="font-medium line-clamp-2 text-sm small:text-base">{product.title}</Text>
                    {product.description && (
                      <Text className="text-xs small:text-sm text-gray-500 line-clamp-2 mt-1">
                        {product.description}
                      </Text>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 gap-y-2">
              <MagnifyingGlass className="text-gray-300 w-12 h-12" />
              <Text className="text-gray-500">
                Commencez à taper pour rechercher
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
