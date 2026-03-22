"use client"

import React, { useState } from "react"
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js"
import { useParams, useRouter } from "next/navigation"

export default function CheckoutForm({ clientSecret, bookingId }: { clientSecret: string; bookingId: string }) {
  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const params = useParams()
  const countryCode = params.countryCode as string

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)

    // Confirm the payment
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Return URL is required, stripe will redirect here if redirection is needed
        // but we can also use redirect: 'if_required' and handle it manually to call our backend endpoint
      },
      redirect: 'if_required',
    })

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message ?? "Une erreur est survenue")
      } else {
        setMessage("Une erreur inattendue est survenue.")
      }
      setIsLoading(false)
    } else {
      // Payment succeeded
      try {
        // Appeler notre endpoint pour confirmer en base
        await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"}/store/gp/confirm-payment/${bookingId}`, {
          method: 'POST'
        })
      } catch (err) {
        console.error("Erreur confirmation de paiement", err)
      }
      // Rediriger vers succes
      router.push(`/${countryCode}/gp/reserve/success`)
    }
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <button 
        disabled={isLoading || !stripe || !elements} 
        id="submit"
        className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold hover:bg-brand-primary/90 disabled:opacity-50 transition-all font-display text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5"
      >
        {isLoading ? "Traitement en cours..." : "Payer maintenant"}
      </button>
      {message && <div id="payment-message" className="text-red-500 text-sm font-medium p-3 bg-red-50 rounded-lg">{message}</div>}
    </form>
  )
}
