import { Text, Heading } from "@medusajs/ui"
import { motion } from "framer-motion"

const steps = [
    {
        title: "Sélectionnez l'Excellence",
        description: "Parcourez notre catalogue et choisissez vos produits parmi une sélection exclusive du meilleur du terroir camerounais.",
        icon: "🇨🇲",
    },
    {
        title: "Paiement Sécurisé",
        description: "Réglez vos achats en toute sécurité. Nous acceptons divers modes de paiement internationaux pour faciliter vos transactions.",
        icon: "💳",
    },
    {
        title: "Livraison en Europe",
        description: "Nous expédions vos produits directement du Cameroun vers l'Europe. Suivez votre colis jusqu'à votre porte.",
        icon: "✈️",
    },
]

export default function HowItWorks() {
    return (
        <div className="py-24 bg-brand-light relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(202,138,4,0.03)_0%,transparent_70%)] pointer-events-none" />

            <div className="content-container relative z-10">
                <div className="text-center mb-20">
                    <Heading level="h2" className="text-4xl small:text-6xl font-display font-bold text-brand-dark tracking-tight mb-6">
                        Comment ça <span className="text-brand-gold italic">marche ?</span>
                    </Heading>
                    <Text className="text-ui-fg-subtle text-lg small:text-xl max-w-2xl mx-auto font-sans leading-relaxed">
                        Le meilleur du Cameroun, livré chez vous en Europe avec la garantie d'un service premium et sans tracas.
                    </Text>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="glass p-10 rounded-3xl flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-4 hover:shadow-lux-lg border-white/40 group relative overflow-hidden"
                        >
                            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-4xl mb-8 shadow-lux-sm group-hover:bg-brand-gold group-hover:scale-110 transition-all duration-500 group-hover:rotate-3">
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-display font-bold text-brand-dark mb-4 group-hover:text-brand-gold transition-colors">
                                {step.title}
                            </h3>
                            <p className="text-ui-fg-subtle font-sans leading-relaxed">
                                {step.description}
                            </p>
                            <div className="absolute -right-6 -bottom-6 text-[12rem] opacity-[0.03] font-display font-bold text-brand-dark pointer-events-none group-hover:opacity-[0.06] transition-opacity duration-500">
                                {index + 1}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
