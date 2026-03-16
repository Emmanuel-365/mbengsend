import { Text, Heading } from "@medusajs/ui"
import { motion } from "framer-motion"

const steps = [
    {
        title: "Sélectionnez vos Articles",
        description: "Parcourez notre catalogue et choisissez vos produits parmi une sélection exclusive d'articles venus d'Europe.",
        icon: "🛍️",
    },
    {
        title: "Paiement Sécurisé",
        description: "Réglez vos achats en toute sécurité. Nous acceptons divers modes de paiement, y compris le paiement à la livraison au Cameroun.",
        icon: "💳",
    },
    {
        title: "Livraison Rapide",
        description: "Nous expédions vos colis vers le Cameroun. Suivez votre commande et recevez-la chez vous ou en point relais.",
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
                        La simplicité d'un achat en Europe, avec la garantie d'une livraison au Cameroun sans tracas.
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
