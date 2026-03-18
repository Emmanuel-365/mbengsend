"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { sdk } from "@lib/config"
import { useForm } from "react-hook-form"

type ReserveFormData = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  kilos: number
}

export default function ReserveKilosForm({ travel }: { travel: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ReserveFormData>({
    defaultValues: { kilos: 1 }
  })

  const kilos = watch("kilos") || 1
  const totalPrice = kilos * travel.price_per_kilo

  const onSubmit = async (data: ReserveFormData) => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      await sdk.client.fetch("/store/travel-bookings", {
        method: "POST",
        body: {
          travel_offer_id: travel.id,
          buyer_first_name: data.firstName,
          buyer_last_name: data.lastName,
          buyer_email: data.email,
          buyer_phone: data.phoneNumber,
          kilos_reserved: Number(data.kilos),
          total_price: Number(totalPrice),
        },
      })
      
      alert(`Votre réservation de ${data.kilos}kg (${totalPrice}€) a été enregistrée. Mbengsend vous contactera pour le dépôt du colis au point relais.`)
      router.push("/gp")
    } catch (err) {
      console.error("Error creating booking:", err)
      setError("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center">
        <span className="text-sm font-bold uppercase text-gray-400">Prix au kilo</span>
        <div className="text-4xl font-bold text-brand-dark">{travel.price_per_kilo}€</div>
      </div>

      {error && <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg">{error}</div>}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Kilos à réserver</label>
          <input 
            type="number"
            {...register("kilos", { required: true, min: 1, max: travel.available_kilos })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <input {...register("firstName", { required: true })} placeholder="Prénom" className="px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          <input {...register("lastName", { required: true })} placeholder="Nom" className="px-4 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>
        
        <input {...register("email", { required: true })} type="email" placeholder="Email" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
        <input {...register("phoneNumber", { required: true })} placeholder="Téléphone / WhatsApp" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
      </div>

      <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>{kilos}kg x {travel.price_per_kilo}€</span>
          <span>{totalPrice}€</span>
        </div>
        <div className="flex justify-between font-bold text-gray-900 border-t border-gray-200 pt-2">
          <span>Total à payer</span>
          <span>{totalPrice}€</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-brand-primary/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
      >
        {isSubmitting ? "Réservation..." : "Confirmer ma réservation"}
      </button>

      <p className="text-[10px] text-gray-400 text-center leading-relaxed italic">
        * Le paiement s'effectue lors du dépôt du colis au point relais Mbengsend.
      </p>
    </form>
  )
}
