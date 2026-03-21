import { Metadata } from "next"
import { sdk } from "@lib/config"
import ReserveKilosForm from "@modules/gp/components/reserve-kilos-form"
import { notFound } from "next/navigation"
import { getCartId } from "@lib/data/cookies"

export const metadata: Metadata = {
  title: "Réserver mes kilos - Mbengsend",
  description: "Choisissez le nombre de kilos à expédier avec votre voyageur.",
}

async function getTravelOffer(id: string) {
  try {
    const response = await sdk.client.fetch<any>(`/store/travel-offers`, {
      method: "GET",
    })
    const offer = response.travel_offers.find((o: any) => o.id === id)
    return offer
  } catch (error) {
    console.error("Error fetching travel offer:", error)
    return null
  }
}

export default async function ReserveKilosPage({ params }: { params: { id: string, countryCode: string } }) {
  const travel = await getTravelOffer(params.id)
  const cartId = await getCartId()

  if (!travel) {
    notFound()
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h1 className="text-3xl font-display font-bold text-gray-900 mb-6">Réserver vos kilos</h1>
              
              <div className="flex items-center gap-6 p-6 bg-brand-primary/5 rounded-2xl border border-brand-primary/10">
                <div className="flex-1 text-center">
                  <span className="block text-xs uppercase font-bold text-gray-400 mb-1">Départ</span>
                  <span className="text-xl font-bold text-brand-dark">{travel.departure_city}</span>
                </div>
                <div className="text-2xl text-brand-primary">✈️</div>
                <div className="flex-1 text-center">
                  <span className="block text-xs uppercase font-bold text-gray-400 mb-1">Destination</span>
                  <span className="text-xl font-bold text-brand-dark">{travel.destination_city}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-50">
                <div>
                  <span className="block text-sm text-gray-400">Date du vol</span>
                  <span className="font-bold text-gray-900">{new Date(travel.departure_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <div>
                  <span className="block text-sm text-gray-400">Compagnie</span>
                  <span className="font-bold text-gray-900">{travel.airline || "Certifiée Mbengsend"}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4">Fonctionnement du service GP</h2>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <span className="w-6 h-6 bg-brand-secondary/20 text-brand-secondary rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
                  <p className="text-sm text-gray-600">Vous réservez et payez vos kilos en ligne sur Mbengsend.</p>
                </li>
                <li className="flex gap-4">
                  <span className="w-6 h-6 bg-brand-secondary/20 text-brand-secondary rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
                  <p className="text-sm text-gray-600">Vous déposez votre colis au point relais Mbengsend le plus proche.</p>
                </li>
                <li className="flex gap-4">
                  <span className="w-6 h-6 bg-brand-secondary/20 text-brand-secondary rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span>
                  <p className="text-sm text-gray-600">Mbengsend vérifie le contenu du colis et le remet au voyageur.</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar: Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <ReserveKilosForm travel={travel} cartId={cartId} countryCode={params.countryCode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
