import { Metadata } from "next"
import { Heading, Text } from "@medusajs/ui"
import Image from "next/image"

export const metadata: Metadata = {
  title: "À propos de nous | Mbengsend",
  description:
    "Découvrez l'histoire de Mbengsend, votre partenaire de confiance pour des achats de qualité en Europe livrés directement au Cameroun.",
}

export default function AboutPage() {
  return (
    <div className="py-12 md:py-24 bg-ui-bg-subtle">
      <div className="content-container">
        {/* Hero Section */}
        <div className="flex flex-col gap-y-8 items-center text-center mb-20">
          <Heading level="h1" className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-brand-secondary tracking-tight">
            Notre Mission
          </Heading>
          <Text className="text-lg md:text-xl text-ui-fg-muted max-w-3xl">
            Rapprocher l'Europe et le Cameroun. Nous rendons les produits internationaux de haute qualité accessibles à tous, avec un service de logistique rapide et transparent.
          </Text>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="flex flex-col gap-y-6">
            <Heading level="h2" className="text-3xl font-display text-brand-dark">
              L'histoire de Mbengsend
            </Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle text-base leading-relaxed">
              <p>
                Née d'un constat simple, Mbengsend a été fondée pour combler le vide entre le vaste marché européen et les consommateurs exigeants du Cameroun. Trop souvent, obtenir des produits de qualité internationale nécessitait des démarches complexes, des coûts cachés, et des délais interminables.
              </p>
              <p>
                Nous avons décidé de changer cela. En combinant une plateforme e-commerce moderne à notre propre infrastructure logistique de fret (aérien et maritime), nous offrons aujourd'hui une expérience d'achat fluide, de la commande en ligne jusqu'à la livraison à votre porte.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="flex flex-col p-6 bg-white rounded-2xl border border-ui-border-base shadow-sm">
                <span className="text-3xl font-bold text-brand-primary mb-2">10k+</span>
                <span className="text-sm font-medium text-ui-fg-muted">Clients Satisfaits</span>
              </div>
              <div className="flex flex-col p-6 bg-white rounded-2xl border border-ui-border-base shadow-sm">
                <span className="text-3xl font-bold text-brand-primary mb-2">Express</span>
                <span className="text-sm font-medium text-ui-fg-muted">Livraison au Cameroun</span>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/5] md:aspect-square w-full rounded-3xl overflow-hidden shadow-xl ring-1 ring-gray-900/10">
            {/* Remplacer par une vraie image de l'équipe ou de logistique plus tard */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-brand-secondary/20 mix-blend-multiply z-10" />
            <div className="absolute inset-0 bg-brand-dark flex items-center justify-center p-12 text-center text-white/80">
                [Zone pour une Image d'Équipe ou Institutionnelle]
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
