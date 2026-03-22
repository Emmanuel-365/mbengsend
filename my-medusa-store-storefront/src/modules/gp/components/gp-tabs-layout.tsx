"use client"

import React, { useState, useMemo } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Plane, Search } from "lucide-react"
import SellKilosForm from "./sell-kilos-form"
import SpecialRequestForm from "./special-request-form"

type TravelOffer = any // Will use generic any as in the page

interface GpTabsLayoutProps {
  travels: TravelOffer[]
}

export default function GpTabsLayout({ travels }: GpTabsLayoutProps) {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell' | 'request'>('buy')
  
  // Search state
  const [departureSearch, setDepartureSearch] = useState("")
  const [destinationSearch, setDestinationSearch] = useState("")
  const [dateSearch, setDateSearch] = useState("")

  const filteredTravels = useMemo(() => {
    return travels.filter((travel) => {
      const matchDeparture = travel.departure_city?.toLowerCase().includes(departureSearch.toLowerCase()) || !departureSearch
      const matchDestination = travel.destination_city?.toLowerCase().includes(destinationSearch.toLowerCase()) || !destinationSearch
      
      let matchDate = true
      if (dateSearch) {
        const travelDate = new Date(travel.departure_date).toISOString().split('T')[0]
        matchDate = travelDate === dateSearch
      }
      
      return matchDeparture && matchDestination && matchDate
    })
  }, [travels, departureSearch, destinationSearch, dateSearch])

  return (
    <div className="max-w-7xl mx-auto px-4 w-full">
      {/* Tabs Navigation */}
      <div className="flex justify-center mb-12">
        <div className="bg-gray-100 p-2 rounded-full inline-flex relative shadow-inner">
          <button
            onClick={() => setActiveTab('buy')}
            className={`px-8 py-3 rounded-full text-base font-bold transition-all duration-300 z-10 ${
              (activeTab === 'buy' || activeTab === 'request') 
                ? "bg-white text-brand-dark shadow-md" 
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Je cherche un voyageur
          </button>
          <button
            onClick={() => setActiveTab('sell')}
            className={`px-8 py-3 rounded-full text-base font-bold transition-all duration-300 z-10 ${
              activeTab === 'sell' 
                ? "bg-white text-brand-dark shadow-md" 
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Je vends des kilos
          </button>
        </div>
      </div>

      {/* Tabs Content */}
      <div className="transition-all duration-500">
        
        {/* BUY TAB (Listings & Search) */}
        {(activeTab === 'buy') && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex-1">
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">Vols à venir</h2>
                <p className="text-gray-500">Réservez vos kilos sur les prochains vols disponibles.</p>
              </div>
              
              {/* Search Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:w-2/3 lg:w-1/2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Départ..."
                    value={departureSearch}
                    onChange={(e) => setDepartureSearch(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary bg-gray-50"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Destination..."
                    value={destinationSearch}
                    onChange={(e) => setDestinationSearch(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary bg-gray-50"
                  />
                </div>
                <div>
                  <input
                    type="date"
                    value={dateSearch}
                    onChange={(e) => setDateSearch(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary bg-gray-50 text-gray-600"
                  />
                </div>
              </div>
            </div>

            {filteredTravels.length === 0 ? (
              <div className="bg-brand-secondary/5 rounded-3xl p-12 text-center border-2 border-dashed border-brand-secondary/20">
                <div className="flex justify-center mb-6">
                  <Plane className="w-12 h-12 text-brand-secondary/40" />
                </div>
                <h3 className="text-2xl font-bold text-brand-dark mb-4">Aucun vol ne correspond à votre recherche</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Les vols correspondant à vos critères ne sont pas encore disponibles ou sont complets. 
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => {
                      setDepartureSearch("")
                      setDestinationSearch("")
                      setDateSearch("")
                    }}
                    className="inline-block bg-white text-brand-dark border border-gray-200 px-8 py-3 rounded-full font-bold shadow-sm hover:bg-gray-50 transition-all cursor-pointer"
                  >
                    Effacer les filtres
                  </button>
                  <button 
                    onClick={() => setActiveTab('request')}
                    className="inline-block bg-brand-primary text-white px-8 py-3 rounded-full font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    Faire une demande spéciale
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {filteredTravels.map((travel: any) => (
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
                
                {/* Always show Special Request below listings in case they don't find the perfect date */}
                <div className="bg-brand-secondary/5 rounded-3xl p-8 border border-brand-secondary/20 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-brand-dark mb-2">Vous ne trouvez pas la date idéale ?</h3>
                    <p className="text-gray-600">Faites-nous part de votre besoin et nous chercherons un voyageur pour vous.</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('request')}
                    className="whitespace-nowrap bg-brand-primary text-white px-8 py-3 rounded-full font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    Commande Spéciale
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SELL TAB */}
        {activeTab === 'sell' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <h2 className="text-4xl font-display font-bold text-brand-dark mb-4">
                Vendez vos kilos en trop
              </h2>
              <p className="text-lg text-gray-600">
                Vous voyagez bientôt ? Rentabilisez votre franchise bagage en transportant des colis pour la communauté. 
                Mbengsend s'occupe de la logistique, vous transportez en toute sécurité.
              </p>
            </div>
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-8 max-w-3xl mx-auto">
              <SellKilosForm />
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
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
        )}

        {/* SPECIAL REQUEST TAB */}
        {activeTab === 'request' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <button 
                onClick={() => setActiveTab('buy')}
                className="mb-6 flex items-center text-gray-500 hover:text-brand-primary transition-colors font-medium"
              >
                ← Retour aux vols
              </button>
             <SpecialRequestForm />
          </div>
        )}
      </div>
    </div>
  )
}
