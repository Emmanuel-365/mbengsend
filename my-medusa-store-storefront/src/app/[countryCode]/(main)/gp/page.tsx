import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { sdk } from "@lib/config"
import { Package, Scale, Truck, Star, Plane } from "lucide-react"
import GpTabsLayout from "@modules/gp/components/gp-tabs-layout"

export const metadata: Metadata = {
  title: "Envoyer avec un voyageur (GP) - Mbengsend",
  description: "Expédiez vos colis rapidement vers le Cameroun grâce à nos voyageurs certifiés.",
}

async function getApprovedTravels() {
  try {
    const response = await sdk.client.fetch<any>("/store/travel-offers", {
      method: "GET",
    })
    const travels = response.travel_offers || []
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    return travels.filter((t: any) => new Date(t.departure_date) >= now)
  } catch (error) {
    console.error("Error fetching travel offers:", error)
    return []
  }
}

export default async function GPPage() {
  const travels = await getApprovedTravels()

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-brand-dark/80 z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')] bg-cover bg-center" />
        <div className="relative z-20 text-center px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            L'expédition Peer-to-Peer réinventée
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Envoyez vos colis vers le Cameroun en 24h ou vendez vos kilos libres lors de votre prochain voyage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#tabs" 
              className="bg-brand-primary text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-brand-primary/20 transition-all hover:-translate-y-1"
            >
              Je vends des kilos
            </a>
            <a 
              href="#tabs" 
              className="bg-white text-brand-dark px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all hover:-translate-y-1"
            >
              Je cherche un voyageur
            </a>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-b border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <Package className="w-8 h-8 text-brand-primary" />
            <div>
              <h4 className="font-bold">Colis vérifiés</h4>
              <p className="text-sm text-gray-500">Zéro risque de sécurité</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Scale className="w-8 h-8 text-brand-primary" />
            <div>
              <h4 className="font-bold">Tarifs fixes</h4>
              <p className="text-sm text-gray-500">Pas de négociation interminable</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Truck className="w-8 h-8 text-brand-primary" />
            <div>
              <h4 className="font-bold">Point Relais</h4>
              <p className="text-sm text-gray-500">Dépôt et retrait facilités</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Star className="w-8 h-8 text-brand-primary" />
            <div>
              <h4 className="font-bold">Service garanti</h4>
              <p className="text-sm text-gray-500">Mbengsend gère tout</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tabs Section */}
      <section id="tabs" className="py-20 bg-gray-50/50">
        <GpTabsLayout travels={travels} />
      </section>
    </div>
  )
}
