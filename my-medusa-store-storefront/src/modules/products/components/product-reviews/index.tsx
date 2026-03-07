"use client"

import React, { useState, useEffect } from "react"
import { Button, Heading, Text, Textarea, Input, Label, clx } from "@medusajs/ui"
import { StarSolid } from "@medusajs/icons"
import { listReviews, createReview, Review } from "@lib/data/reviews"
import { HttpTypes } from "@medusajs/types"

type ProductReviewsProps = {
  product: HttpTypes.StoreProduct
  customer: HttpTypes.StoreCustomer | null
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ product, customer }) => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  
  // Form state
  const [rating, setRating] = useState(5)
  const [title, setTitle] = useState("")
  const [comment, setComment] = useState("")
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { reviews } = await listReviews(product.id)
        setReviews(reviews)
      } catch (err) {
        console.error("Failed to fetch reviews:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [product.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!customer) return

    setIsSubmitting(true)
    setMessage(null)

    try {
      await createReview({
        product_id: product.id,
        rating,
        title,
        comment,
      })
      setMessage({ type: "success", text: "Merci ! Ton avis a été soumis pour modération." })
      setTitle("")
      setComment("")
      setRating(5)
      setShowForm(false)
    } catch (err: any) {
      setMessage({ type: "error", text: "Une erreur est survenue lors de l'envoi de l'avis." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const averageRating = (product.metadata?.average_rating as number) || 0
  const reviewCount = (product.metadata?.review_count as number) || 0

  return (
    <div className="flex flex-col gap-y-8 py-12 border-t border-gray-200">
      <div className="flex flex-col gap-y-4">
        <Heading level="h2" className="flex items-center gap-x-2">
          Avis Clients ({reviewCount})
        </Heading>
        <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                    <StarSolid key={i} className={clx("h-5 w-5", { "text-orange-400": i < averageRating, "text-gray-200": i >= averageRating })} />
                ))}
            </div>
            <Text className="text-ui-fg-subtle">{averageRating} / 5 sur la base de {reviewCount} avis</Text>
        </div>
      </div>

      <div className="flex flex-col gap-y-6">
        {isLoading ? (
          <Text>Chargement des avis...</Text>
        ) : reviews.length === 0 ? (
          <Text>Il n'y a pas encore d'avis pour ce produit.</Text>
        ) : (
          <div className="grid grid-cols-1 gap-y-8">
            {reviews.map((review) => (
              <div key={review.id} className="flex flex-col gap-y-2 pb-6 border-b border-gray-100 last:border-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <StarSolid key={i} className={clx("h-3 w-3", { "text-orange-400": i < review.rating, "text-gray-200": i >= review.rating })} />
                        ))}
                    </div>
                    <Text className="text-xs text-ui-fg-muted">{new Date(review.created_at).toLocaleDateString()}</Text>
                </div>
                <Text className="font-bold">{review.title}</Text>
                <Text className="text-sm italic text-ui-fg-subtle">"{review.comment}"</Text>
                <div className="flex items-center gap-x-2">
                    <Text className="text-xs font-semibold">{review.author_name}</Text>
                    {review.verified_purchase && (
                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Achat vérifié</span>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4">
        {!showForm ? (
          <Button 
            variant="secondary" 
            onClick={() => customer ? setShowForm(true) : window.location.href = `/${window.location.pathname.split('/')[1]}/account`}
          >
            Donner mon avis
          </Button>
        ) : (
          <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-xl flex flex-col gap-y-4 max-w-xl">
            <Heading level="h3">Partage ton expérience</Heading>
            
            <div className="flex flex-col gap-y-2">
                <Text size="small" weight="plus">Note</Text>
                <div className="flex items-center gap-x-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <button 
                            key={i} 
                            type="button"
                            onClick={() => setRating(i + 1)}
                            className="focus:outline-none"
                        >
                            <StarSolid className={clx("h-6 w-6 cursor-pointer transition-colors", { "text-orange-400": i < rating, "text-gray-200": i >= rating })} />
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-y-2">
                <Label>Titre de l'avis</Label>
                <Input 
                    placeholder="Ex: Excellent produit !" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div className="flex flex-col gap-y-2">
                <Label>Ton commentaire</Label>
                <Textarea 
                    placeholder="Qu'as-tu pensé de la qualité, de la taille, etc. ?" 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    required
                />
            </div>

            <div className="flex items-center gap-x-4 pt-2">
                <Button variant="primary" type="submit" isLoading={isSubmitting}>Envoyer l'avis</Button>
                <Button variant="secondary" onClick={() => setShowForm(false)}>Annuler</Button>
            </div>
          </form>
        )}
        
        {message && (
            <div className={clx("mt-4 p-4 rounded-lg text-sm font-medium", {
                "bg-green-100 text-green-800": message.type === "success",
                "bg-red-100 text-red-800": message.type === "error"
            })}>
                {message.text}
            </div>
        )}
      </div>
    </div>
  )
}

export default ProductReviews
