import { Text } from "@medusajs/ui"

const features = [
    {
        title: "Authenticité Garantie",
        description: "Tous nos produits sont sourcés directement auprès de marques européennes reconnues.",
        icon: "✓",
    },
    {
        title: "Livraison Express",
        description: "Expéditions régulières entre la France et le Cameroun pour des délais optimisés.",
        icon: "⚡",
    },
    {
        title: "Service Client 7j/7",
        description: "Une équipe dédiée à votre écoute pour un accompagnement personnalisé.",
        icon: "💬",
    },
    {
        title: "Paiement Flexible",
        description: "Plusieurs options adaptées à vos besoins, en Europe comme au Cameroun.",
        icon: "🛡️",
    },
]

export default function Features() {
    return (
        <div className="py-12 small:py-24 bg-brand-dark text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[300px] small:w-[400px] h-[300px] small:h-[400px] bg-brand-primary/20 rounded-full blur-[80px] small:blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] small:w-[400px] h-[300px] small:h-[400px] bg-white/5 rounded-full blur-[80px] small:blur-[100px] pointer-events-none" />

            <div className="content-container relative z-10">
                <div className="grid grid-cols-1 small:grid-cols-2 medium:grid-cols-4 gap-6 small:gap-8 medium:gap-12">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-start gap-3 small:gap-4">
                            <div className="w-10 small:w-12 h-10 small:h-12 rounded-full bg-white/10 flex items-center justify-center text-xl small:text-2xl mb-1 small:mb-2 text-brand-primary border border-white/5 shadow-[0_0_15px_rgba(0,102,204,0.3)]">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="text-lg small:text-xl font-display font-bold mb-2 tracking-wide">
                                    {feature.title}
                                </h3>
                                <Text className="text-white/70 leading-relaxed text-sm small:text-base">
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
