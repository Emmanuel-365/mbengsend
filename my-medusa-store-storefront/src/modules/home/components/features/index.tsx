import { Text } from "@medusajs/ui"
import ReactCountryFlag from "react-country-flag"
import { Plane, MessageCircle, ShieldCheck, Award } from "lucide-react"

const features = [
    {
        title: "Savoir-faire Authentique",
        description: "Tous nos produits sont sourcés directement auprès de producteurs et artisans camerounais.",
        icon: <ReactCountryFlag countryCode="CM" svg />,
    },
    {
        title: "Livraison en Europe",
        description: "Expéditions régulières du Cameroun vers l'Europe pour des délais optimisés.",
        icon: <Plane className="w-8 h-8" />,
    },
    {
        title: "Service Client 7j/7",
        description: "Une équipe dédiée à votre écoute pour un accompagnement personnalisé en Europe.",
        icon: <MessageCircle className="w-8 h-8" />,
    },
    {
        title: "Paiement Sécurisé",
        description: "Options de paiement internationales sécurisées adaptées à vos besoins.",
        icon: <ShieldCheck className="w-8 h-8" />,
    },
]

export default function Features() {
    return (
        <div className="py-12 small:py-24 bg-brand-dark text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[300px] small:w-[400px] h-[300px] small:h-[400px] bg-brand-primary/20 rounded-full blur-[80px] small:blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] small:w-[400px] h-[300px] small:h-[400px] bg-white/5 rounded-full blur-[80px] small:blur-[100px] pointer-events-none" />

            <div className="content-container relative z-10">
                <div className="grid grid-cols-1 small:grid-cols-2 medium:grid-cols-4 gap-12 small:gap-16">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-start gap-4 small:gap-6 group">
                            <div className="w-14 small:w-16 h-14 small:h-16 rounded-2xl bg-white/5 backdrop-blur-md flex items-center justify-center text-2xl small:text-3xl mb-2 text-brand-gold border border-white/10 shadow-lux-sm group-hover:bg-brand-gold group-hover:text-brand-dark transition-all duration-500 group-hover:rotate-6">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="text-xl small:text-2xl font-display font-bold mb-3 tracking-wide text-white group-hover:text-brand-gold transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <Text className="text-white/60 leading-relaxed text-sm small:text-base font-sans">
                                    {feature.description}
                                </Text>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
