"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { sdk } from "@lib/config"

type FormData = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  departureCity: string
  destinationCity: string
  departureDate: string
  airline: string
  availableKilos: number
  pricePerKilo: number
  comments: string
}

export default function SellKilosForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      const response = await sdk.client.fetch("/store/travel-offers", {
        method: "POST",
        body: {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone_number: data.phoneNumber,
          departure_city: data.departureCity,
          destination_city: data.destinationCity,
          departure_date: data.departureDate,
          airline: data.airline,
          available_kilos: Number(data.availableKilos),
          price_per_kilo: Number(data.pricePerKilo),
        },
      })
      
      setIsSuccess(true)
    } catch (err) {
      console.error("Error submitting travel offer:", err)
      setError("Une erreur est survenue lors de l'envoi de votre proposition. Veuillez réessayer plus tard.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
          ✅
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Proposition reçue !</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Merci pour votre proposition de voyage. L'équipe Mbengsend va l'analyser et vous contactera par téléphone ou email pour valider les détails.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="text-brand-primary font-semibold hover:underline"
        >
          Envoyer une autre proposition
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-6">
          {error}
        </div>
      )}
      {/* Voyage Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          ✈️ Détails du voyage
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ville de départ</label>
            <input
              {...register("departureCity", { required: "Ce champ est requis" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary"
              placeholder="ex: Paris, France"
            />
            {errors.departureCity && <span className="text-red-500 text-xs">{errors.departureCity.message}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ville de destination</label>
            <input
              {...register("destinationCity", { required: "Ce champ est requis" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary"
              placeholder="ex: Douala, Cameroun"
            />
            {errors.destinationCity && <span className="text-red-500 text-xs">{errors.destinationCity.message}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date de départ</label>
            <input
              type="date"
              {...register("departureDate", { required: "Ce champ est requis" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary"
            />
            {errors.departureDate && <span className="text-red-500 text-xs">{errors.departureDate.message}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Compagnie aérienne</label>
            <input
              {...register("airline")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary"
              placeholder="ex: Air France"
            />
          </div>
        </div>
      </div>

      {/* Bagages Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          🧳 Franchise bagage
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kilos disponibles (Kg)</label>
            <input
              type="number"
              {...register("availableKilos", { required: "Requis", min: 1 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary"
              placeholder="ex: 23"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prix souhaité par kilo (€)</label>
            <input
              type="number"
              {...register("pricePerKilo", { required: "Requis", min: 1 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary"
              placeholder="ex: 10"
            />
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          👤 Informations de contact
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
            <input
              {...register("firstName", { required: "Requis" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input
              {...register("lastName", { required: "Requis" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email requis" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone (WhatsApp)</label>
            <input
              {...register("phoneNumber", { required: "Requis" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary"
              placeholder="+33 6 12 34 56 78"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-primary text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-brand-primary/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Envoi en cours..." : "Publier ma proposition"}
      </button>
    </form>
  )
}
