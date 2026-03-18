import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { sdk } from "@lib/config"

export const metadata: Metadata = {
  title: "Envoyer avec un voyageur (GP) - Mbengsend",
  description: "Expédiez vos colis rapidement vers le Cameroun grâce à nos voyageurs certifiés.",
}

async function getApprovedTravels() {
  try {
    const response = await sdk.client.fetch<any>("/store/travel-offers", {
      method: "GET",
    })
    return response.travel_offers || []
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
            <LocalizedClientLink 
              href="/gp/sell" 
              className="bg-brand-primary text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-brand-primary/20 transition-all hover:-translate-y-1"
            >
              Je vends des kilos
            </LocalizedClientLink>
            <a 
              href="#vols" 
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
            <span className="text-3xl text-brand-primary">📦</span>
            <div>
              <h4 className="font-bold">Colis vérifiés</h4>
              <p className="text-sm text-gray-500">Zéro risque de sécurité</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-3xl text-brand-primary">⚖️</span>
            <div>
              <h4 className="font-bold">Tarifs fixes</h4>
              <p className="text-sm text-gray-500">Pas de négociation interminable</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-3xl text-brand-primary">🚚</span>
            <div>
              <h4 className="font-bold">Point Relais</h4>
              <p className="text-sm text-gray-500">Dépôt et retrait facilités</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-3xl text-brand-primary">⭐</span>
            <div>
              <h4 className="font-bold">Service garanti</h4>
              <p className="text-sm text-gray-500">Mbengsend gère tout</p>
            </div>
          </div>
        </div>
      </section>

      {/* Listings Section */}
      <section id="vols" className="py-20 max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-2">Vols à venir</h2>
            <p className="text-gray-500">Réservez vos kilos sur les prochains vols vers le Cameroun.</p>
          </div>
          {/* Simple search UI (mock) */}
          <div className="flex gap-2">
            <div className="bg-gray-100 p-2 rounded-full flex gap-2">
              <button className="bg-white text-brand-dark px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">Tout</button>
              <button className="text-gray-500 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-white/50 transition-all">Paris</button>
              <button className="text-gray-500 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-white/50 transition-all">Lyon</button>
              <button className="text-gray-500 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-white/50 transition-all">Bruxelles</button>
            </div>
          </div>
        </div>

        {travels.length === 0 ? (
          <div className="bg-brand-secondary/5 rounded-3xl p-12 text-center border-2 border-dashed border-brand-secondary/20">
            <div className="text-5xl mb-6">✈️</div>
            <h3 className="text-2xl font-bold text-brand-dark mb-4">Aucun voyageur disponible pour l'instant</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Soyez le premier à proposer vos kilos pour le prochain vol !
            </p>
            <LocalizedClientLink 
              href="/gp/sell" 
              className="inline-block bg-brand-primary text-white px-8 py-3 rounded-full font-bold shadow-md hover:shadow-lg transition-all"
            >
              Je propose mon voyage
            </LocalizedClientLink>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {travels.map((travel: any) => (
              <div key={travel.id} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="h-4 bg-brand-primary" />
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-xs font-bold uppercase tracking-widest text-brand-secondary bg-brand-secondary/10 px-3 py-1 rounded-full">
                      {travel.airline || "Compagnie Certifiée"}
                    </div>
                    <div className="text-right">
                      <span className="block text-2xl font-bold text-gray-900 leading-none">{travel.price_per_kilo}€</span>
                      <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">par kilo</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900">{travel.departure_city}</h4>
                      <p className="text-xs text-gray-500">Aéroport Relais</p>
                    </div>
                    <div className="text-brand-primary text-2xl animate-pulse">✈️</div>
                    <div className="flex-1 text-right">
                      <h4 className="text-xl font-bold text-gray-900">{travel.destination_city}</h4>
                      <p className="text-xs text-gray-500">Relais Arrivée</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8 py-6 border-y border-gray-50">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400 font-medium">Décollage :</span>
                      <span className="text-gray-900 font-bold">{new Date(travel.departure_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400 font-medium">Capacité libre :</span>
                      <span className="text-brand-primary font-bold">{travel.available_kilos} Kg restants</span>
                    </div>
                  </div>

                  <LocalizedClientLink 
                    href={`/gp/reserve/${travel.id}`}
                    className="block w-full text-center bg-brand-dark text-white py-4 rounded-2xl font-bold hover:bg-brand-primary transition-colors shadow-md group-hover:shadow-brand-primary/20"
                  >
                    Réserver mes kilos
                  </LocalizedClientLink>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
