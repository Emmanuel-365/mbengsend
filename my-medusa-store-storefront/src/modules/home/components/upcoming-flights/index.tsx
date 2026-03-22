import { sdk } from "@lib/config"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Plane } from "lucide-react"

async function getUpcomingTravels() {
  try {
    const response = await sdk.client.fetch<any>("/store/travel-offers", {
      method: "GET",
    })
    const travels = response.travel_offers || []
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    // Filter out past flights, sort by date ascending, and take first 3
    return travels
      .filter((t: any) => new Date(t.departure_date) >= now)
      .sort((a: any, b: any) => new Date(a.departure_date).getTime() - new Date(b.departure_date).getTime())
      .slice(0, 3)
  } catch (error) {
    console.error("Error fetching travel offers for home:", error)
    return []
  }
}

export default async function UpcomingFlights() {
  const travels = await getUpcomingTravels()

  if (!travels || travels.length === 0) {
    return null
  }

  return (
    <div className="py-24 bg-gray-50/50 border-y border-gray-100">
      <div className="content-container max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
             <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full">
                  Service GP (Gratuité Partielle)
                </span>
             </div>
             <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">Expédiez par les airs</h2>
             <p className="text-lg text-gray-600 mb-4">
               Profitez de notre réseau de voyageurs de confiance pour envoyer vos colis vers le Cameroun. 
               Une solution rapide, sécurisée et solidaire qui vous permet d'expédier vos biens en express tout en aidant les voyageurs à rentabiliser leur billet d'avion.
             </p>
             <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-700">
               <span className="flex items-center gap-1">✓ Colis vérifiés</span>
               <span className="flex items-center gap-1">✓ Paiement sécurisé</span>
               <span className="flex items-center gap-1">✓ Remise en point relais</span>
             </div>
          </div>
          <LocalizedClientLink href="/gp" className="inline-block bg-white text-brand-dark px-6 py-3 rounded-full font-bold shadow-sm hover:bg-gray-50 transition-all border border-gray-200">
            Voir tous les vols →
          </LocalizedClientLink>
        </div>
        
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
                    <span className="block text-2xl font-bold text-gray-900 leading-none">
                      {travel.selling_price_per_kilo || travel.price_per_kilo}€
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">par kilo</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900">{travel.departure_city}</h4>
                    <p className="text-xs text-gray-500">Aéroport Relais</p>
                  </div>
                  <div className="text-brand-primary animate-pulse">
                    <Plane className="w-6 h-6" />
                  </div>
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
      </div>
    </div>
  )
}
