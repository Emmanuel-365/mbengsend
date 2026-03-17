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
        <div className="py-24 bg-brand-primary/5">
            <div className="content-container">
                <div className="text-center mb-16">
                    <Heading level="h2" className="text-3xl small:text-4xl font-display font-bold text-brand-dark tracking-tight mb-4">
                        Comment ça marche ?
                    </Heading>
                    <Text className="text-ui-fg-subtle text-lg max-w-2xl mx-auto">
                        Le meilleur du Cameroun, livré chez vous en Europe avec la garantie d'un service premium et sans tracas.
                    </Text>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="glass p-8 rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lux-lg relative overflow-hidden group"
                        >
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-display font-bold text-brand-dark mb-3">
                                {step.title}
                            </h3>
                            <p className="text-ui-fg-subtle">
                                {step.description}
                            </p>
                            <div className="absolute -right-4 -bottom-4 text-9xl opacity-[0.03] font-display font-bold text-brand-dark pointer-events-none">
                                {index + 1}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
