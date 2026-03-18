"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"

export default function ReserveKilosForm({ travel }: { travel: any }) {
  const [kilos, setKilos] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const totalPrice = kilos * travel.price_per_kilo

  const handleReserve = async () => {
    setIsSubmitting(true)
    
    // In a real implementation, we would add a specific product to the cart
    // For this MVP, we redirect to a contact or a generic checkout
    // Let's simulate a success for now
    
    setTimeout(() => {
      setIsSubmitting(false)
      alert(`Votre réservation de ${kilos}kg (${totalPrice}€) a été prise en compte. Mbengsend vous contactera pour le dépôt du colis.`)
      router.push("/gp")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <span className="text-sm font-bold uppercase text-gray-400">Prix au kilo</span>
        <div className="text-4xl font-bold text-brand-dark">{travel.price_per_kilo}€</div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-bold text-gray-700">Quantité (Kg)</label>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setKilos(Math.max(1, kilos - 1))}
            className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center font-bold hover:bg-gray-50"
          >
            -
          </button>
          <div className="flex-1 text-center font-bold text-xl py-2 border-b-2 border-brand-primary">
            {kilos} Kg
          </div>
          <button 
            onClick={() => setKilos(Math.min(travel.available_kilos, kilos + 1))}
            className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center font-bold hover:bg-gray-50"
          >
            +
          </button>
        </div>
        <p className="text-[10px] text-gray-400 text-center uppercase tracking-wider font-bold">
          Maximum disponible : {travel.available_kilos} kg
        </p>
      </div>

      <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>{kilos}kg x {travel.price_per_kilo}€</span>
          <span>{totalPrice}€</span>
        </div>
        <div className="flex justify-between font-bold text-gray-900 border-t border-gray-200 pt-2">
          <span>Total</span>
          <span>{totalPrice}€</span>
        </div>
      </div>

      <button
        onClick={handleReserve}
        disabled={isSubmitting}
        className="w-full bg-brand-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-brand-primary/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
      >
        {isSubmitting ? "Réservation..." : "Réserver maintenant"}
      </button>

      <p className="text-[10px] text-gray-400 text-center leading-relaxed italic">
        * En cliquant sur "Réserver", vous acceptez que Mbengsend vérifie le contenu de votre colis pour des raisons de sécurité aérienne.
      </p>
    </div>
  )
}
