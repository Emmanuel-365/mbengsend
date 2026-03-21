import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"
import Image from "next/image"
import { 
  ShieldCheck, 
  Truck, 
  Award, 
  Headset, 
  Instagram, 
  Facebook, 
  Send,
  MessageCircle
} from "lucide-react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const VisaIcon = () => (
  <svg width="32" height="20" viewBox="0 0 40 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 hover:opacity-100 transition-opacity">
    <rect width="40" height="25" rx="4" fill="#1A1F71"/>
    <path d="M16.5 17.5L18.2 8.5H20.5L18.8 17.5H16.5ZM25.2 8.7C24.7 8.5 24 8.4 23.3 8.4C21.4 8.4 20.1 9.4 20.1 10.8C20.1 11.8 21 12.4 21.7 12.8C22.4 13.1 22.7 13.4 22.7 13.8C22.7 14.3 22.1 14.6 21.5 14.6C20.8 14.6 20.3 14.4 20 14.2L19.6 15.8C20.1 16 20.9 16.2 21.7 16.2C23.7 16.2 25 15.2 25 13.8C25 12.6 24.2 12 23 11.4C22.3 11.1 22 10.8 22 10.5C22 10.1 22.5 9.8 23.1 9.8C23.7 9.8 24.2 9.9 24.5 10.1L24.9 8.5L25.2 8.7ZM31.1 8.5H29.3C28.8 8.5 28.4 8.8 28.2 9.3L25.3 16.2H27.6L28.1 14.8H30.8L31.1 16.2H33.4L31.5 8.5H31.1ZM28.6 13.3L29.4 11L29.9 13.3H28.6ZM15.5 8.5L13.2 14.8L12.9 13.3C12.5 11.8 11.3 10.3 10 9.5L12 16.2H14.4L17.8 8.5H15.5Z" fill="white"/>
  </svg>
)

const MastercardIcon = () => (
  <svg width="32" height="20" viewBox="0 0 40 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 hover:opacity-100 transition-opacity">
    <rect width="40" height="25" rx="4" fill="#222222"/>
    <circle cx="16" cy="12.5" r="7" fill="#EB001B"/>
    <circle cx="24" cy="12.5" r="7" fill="#F79E1B"/>
    <path d="M20 12.5C20 10.5 20.9 8.7 22.4 7.5C20.9 6.3 19 5.5 17 5.5C13.1 5.5 10 8.6 10 12.5C10 16.4 13.1 19.5 17 19.5C19 19.5 20.9 18.7 22.4 17.5C20.9 16.3 20 14.5 20 12.5Z" fill="#FF5F00"/>
  </svg>
)

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="w-full bg-[#FDFDFD] pt-16 md:pt-24 border-t border-gray-100">
      <div className="content-container flex flex-col w-full px-4">
        
        {/* Newsletter Section */}
        <div className="w-full bg-brand-dark py-12 px-6 rounded-[2.5rem] mb-16 overflow-hidden relative group shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full -mr-48 -mt-48 blur-3xl group-hover:bg-brand-gold/10 transition-all duration-1000"></div>
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 tracking-tight">
              Rejoignez l&apos;excellence Mbengsend
            </h3>
            <p className="text-brand-gold/80 mb-8 text-sm md:text-base leading-relaxed">
              Inscrivez-vous pour recevoir nos sélections exclusives et nos actualités transcontinentales directement dans votre boîte mail.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Votre adresse email" 
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all text-sm"
              />
              <button className="bg-brand-gold text-brand-dark font-bold px-8 py-3.5 rounded-full hover:bg-white hover:scale-105 transition-all shadow-xl shadow-brand-gold/20 flex items-center justify-center gap-2 text-sm">
                S&apos;abonner <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-12 border-b border-gray-100 mb-12">
          <div className="flex items-center gap-5 group">
            <div className="w-14 h-14 rounded-2xl bg-brand-gold/5 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-500 shadow-sm">
              <ShieldCheck size={28} strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-bold text-brand-dark text-sm uppercase tracking-wider">Paiement Sécurisé</h4>
              <p className="text-xs text-ui-fg-subtle mt-0.5">Transactions 100% protégées</p>
            </div>
          </div>
          <div className="flex items-center gap-5 group">
             <div className="w-14 h-14 rounded-2xl bg-brand-gold/5 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-500 shadow-sm">
              <Truck size={28} strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-bold text-brand-dark text-sm uppercase tracking-wider">Expédition FIABLE</h4>
              <p className="text-xs text-ui-fg-subtle mt-0.5">Cameroun &harr; Europe</p>
            </div>
          </div>
          <div className="flex items-center gap-5 group">
             <div className="w-14 h-14 rounded-2xl bg-brand-gold/5 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-500 shadow-sm">
              <Award size={28} strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-bold text-brand-dark text-sm uppercase tracking-wider">Excellence locale</h4>
              <p className="text-xs text-ui-fg-subtle mt-0.5">Sélection premium garantie</p>
            </div>
          </div>
          <div className="flex items-center gap-5 group">
             <div className="w-14 h-14 rounded-2xl bg-brand-gold/5 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-500 shadow-sm">
              <Headset size={28} strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-bold text-brand-dark text-sm uppercase tracking-wider">Support Dédié</h4>
              <p className="text-xs text-ui-fg-subtle mt-0.5">À votre écoute 7j/7</p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="flex flex-col gap-y-12 lg:flex-row items-center lg:items-start justify-between py-12 mb-12">
          <div className="flex flex-col items-center lg:items-start gap-6 w-full lg:w-1/4 text-center lg:text-left">
            <LocalizedClientLink href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image src="/logo.png" alt="Mbengsend Logo" fill className="object-contain" />
              </div>
              <span className="text-2xl font-display font-bold text-brand-secondary tracking-tight">Mbengsend</span>
            </LocalizedClientLink>
            <Text className="text-sm text-ui-fg-subtle leading-relaxed max-w-[280px]">
              Votre passerelle privilégiée pour découvrir l&apos;excellence camerounaise et la faire rayonner en Europe.
            </Text>
            <div className="flex gap-4 mt-2">
              <a href="https://instagram.com/mbengsend" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-brand-dark hover:bg-brand-gold hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com/mbengsend" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-brand-dark hover:bg-brand-gold hover:text-white transition-all">
                <Facebook size={20} />
              </a>
              <a href="https://wa.me/237..." target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-brand-dark hover:bg-brand-gold hover:text-white transition-all">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8 w-full lg:w-3/4">
            {/* Categories */}
            <div className="flex flex-col items-center lg:items-start gap-y-5">
              <span className="text-brand-dark font-display font-bold text-sm uppercase tracking-[0.2em] opacity-80">Catégories</span>
              <ul className="flex flex-col items-center lg:items-start gap-y-3 text-sm text-ui-fg-subtle">
                {productCategories?.slice(0, 5).map((c) => (
                  <li key={c.id}>
                    <LocalizedClientLink href={`/categories/${c.handle}`} className="hover:text-brand-gold transition-colors">{c.name}</LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Collections */}
            <div className="flex flex-col items-center lg:items-start gap-y-5">
              <span className="text-brand-dark font-display font-bold text-sm uppercase tracking-[0.2em] opacity-80">Collections</span>
              <ul className="flex flex-col items-center lg:items-start gap-y-3 text-sm text-ui-fg-subtle">
                {collections?.slice(0, 5).map((c) => (
                  <li key={c.id}>
                    <LocalizedClientLink href={`/collections/${c.handle}`} className="hover:text-brand-gold transition-colors">{c.title}</LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="flex flex-col items-center lg:items-start gap-y-5">
              <span className="text-brand-dark font-display font-bold text-sm uppercase tracking-[0.2em] opacity-80">Assistance</span>
              <ul className="flex flex-col items-center lg:items-start gap-y-3 text-sm text-ui-fg-subtle">
                <li><LocalizedClientLink href="/about" className="hover:text-brand-gold transition-colors">À propos</LocalizedClientLink></li>
                <li><LocalizedClientLink href="/contact" className="hover:text-brand-gold transition-colors">Contactez-nous</LocalizedClientLink></li>
                <li><LocalizedClientLink href="/faq" className="hover:text-brand-gold transition-colors">FAQ</LocalizedClientLink></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="flex flex-col items-center lg:items-start gap-y-5">
              <span className="text-brand-dark font-display font-bold text-sm uppercase tracking-[0.2em] opacity-80">Légal</span>
              <ul className="flex flex-col items-center lg:items-start gap-y-3 text-sm text-ui-fg-subtle">
                <li><LocalizedClientLink href="/legal/terms" className="hover:text-brand-gold transition-colors">Conditions Générales</LocalizedClientLink></li>
                <li><LocalizedClientLink href="/content/privacy-policy" className="hover:text-brand-gold transition-colors">Charte des données</LocalizedClientLink></li>
                <li><LocalizedClientLink href="/content/cookies" className="hover:text-brand-gold transition-colors">Cookies</LocalizedClientLink></li>
                <li><button className="hover:text-brand-gold transition-colors">Paramètres des cookies</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center py-8 border-t border-gray-100 gap-6">
          <Text className="text-xs text-ui-fg-muted font-medium">
            © {new Date().getFullYear()} Mbengsend. Tous droits réservés. Propulsé par l&apos;excellence.
          </Text>
          <div className="flex items-center gap-3">
            <VisaIcon />
            <MastercardIcon />
          </div>
        </div>
      </div>
    </footer>
  )
}
