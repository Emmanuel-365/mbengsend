"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { CheckCircle, Plane, Luggage, User, MessageSquare } from "lucide-react"
import { sdk } from "@lib/config"

type FormData = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  departureCity: string
  destinationCity: string
  departureDate: string
  kilosNeeded: number
  comments: string
}

export default function SpecialRequestForm() {
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
      // Pour l'instant on simule l'envoi puisque le endpoint côté serveur n'est pas forcément prêt
      // const response = await sdk.client.fetch("/store/special-requests", {
      //   method: "POST",
      //   body: data,
      // })
      
      // Simulation: 
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSuccess(true)
    } catch (err) {
      console.error("Error submitting special request:", err)
      setError("Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer plus tard.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Demande envoyée !</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Nous avons bien reçu votre demande spéciale. Notre équipe va rechercher le meilleur voyageur pour vous et vous contactera très rapidement.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="text-brand-primary font-semibold hover:underline"
        >
          Faire une autre demande
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold font-display text-gray-900">Demande Spéciale</h2>
        <p className="text-gray-500 mt-2">Vous ne trouvez pas de vol ? Décrivez votre besoin et nous chercherons pour vous.</p>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-6">
          {error}
        </div>
      )}
      
      {/* Voyage Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Plane className="w-5 h-5 text-brand-primary" /> Détails du trajet souhaité
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">De (Ville)</label>
            <input
              {...register("departureCity", { required: "Ce champ est requis" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary"
              placeholder="ex: Paris"
            />
            {errors.departureCity && <span className="text-red-500 text-xs">{errors.departureCity.message}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vers (Ville)</label>
            <input
              {...register("destinationCity", { required: "Ce champ est requis" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary"
              placeholder="ex: Douala"
            />
            {errors.destinationCity && <span className="text-red-500 text-xs">{errors.destinationCity.message}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Au plus tard le</label>
            <input
              type="date"
              {...register("departureDate", { required: "Ce champ est requis" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary"
            />
            {errors.departureDate && <span className="text-red-500 text-xs">{errors.departureDate.message}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kilos nécessaires</label>
            <input
              type="number"
              {...register("kilosNeeded", { required: "Requis", min: 1 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary"
              placeholder="ex: 10"
            />
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-brand-primary" /> Vos coordonnées
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
      
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-brand-primary" /> Informations additionnelles
        </h3>
        <textarea
            {...register("comments")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary h-24 resize-none"
            placeholder="Précisez la nature de vos colis ou toute autre information utile..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-primary text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-brand-primary/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande spéciale"}
      </button>
    </form>
  )
}
