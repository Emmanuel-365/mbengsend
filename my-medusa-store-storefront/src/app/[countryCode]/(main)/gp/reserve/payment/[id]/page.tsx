"use client"

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "./CheckoutForm"
import { useEffect, useState } from "react"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || "")

export default function PaymentPage({
  params,
  searchParams,
}: {
  params: { id: string; countryCode: string }
  searchParams: { client_secret: string }
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!searchParams.client_secret) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
        <h1 className="text-xl font-bold text-gray-900 mb-2">Erreur de paiement</h1>
        <p className="text-gray-500">Aucune session de paiement n'a été trouvée.</p>
      </div>
    )
  }

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#0f172a',
      colorBackground: '#ffffff',
      colorText: '#30313d',
      colorDanger: '#df1b41',
      spacingUnit: '4px',
      borderRadius: '8px',
      // font family brand
    }
  }

  const options = {
    clientSecret: searchParams.client_secret,
    appearance,
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
          <h1 className="text-2xl font-display font-bold text-gray-900 mb-2">Paiement Sécurisé</h1>
          <p className="text-sm text-gray-500 mb-8">
            Veuillez procéder au paiement pour confirmer définitivement votre réservation de kilos.
          </p>
          
          {mounted && (
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm clientSecret={searchParams.client_secret} bookingId={params.id} />
            </Elements>
          )}
        </div>
        
        <div className="text-center">
          <div className="inline-flex items-center justify-center gap-2 text-xs font-medium text-gray-400">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Paiement 100% sécurisé via Stripe
          </div>
        </div>
      </div>
    </div>
  )
}
