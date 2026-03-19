import { Metadata } from "next"
import SellKilosForm from "@modules/gp/components/sell-kilos-form"

export const metadata: Metadata = {
  title: "Vendre mes kilos - Mbengsend",
  description: "Proposez vos kilos disponibles lors de votre prochain voyage et gagnez de l'argent.",
}

export default function SellKilosPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-brand-dark mb-4">
            Vendez vos kilos en trop
          </h1>
          <p className="text-lg text-gray-600">
            Vous voyagez bientôt ? Rentabilisez votre franchise bagage en transportant des colis pour la communauté. 
            Mbengsend s'occupe de la logistique, vous transportez en toute sécurité.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-8">
            <SellKilosForm />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              🛡️
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Sécurisé</h3>
            <p className="text-sm text-gray-500">Mbengsend vérifie tous les colis avant de vous les remettre.</p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 bg-brand-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              💰
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Rentable</h3>
            <p className="text-sm text-gray-500">Gagnez de l'argent pour couvrir une partie de votre billet d'avion.</p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              🌍
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Solidaire</h3>
            <p className="text-sm text-gray-500">Aidez la communauté à envoyer des biens essentiels rapidement.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
