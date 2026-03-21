import { Metadata } from "next"
import { Heading, Text } from "@medusajs/ui"

export const metadata: Metadata = {
  title: "Utilisation des Cookies | Mbengsend",
  description: "Comment nous utilisons les cookies pour améliorer votre expérience.",
}

export default function CookiesPage() {
  return (
    <div className="py-12 md:py-24 bg-white min-h-screen">
      <div className="content-container max-w-4xl mx-auto px-4">
        <Heading level="h1" className="text-4xl font-display font-bold text-brand-dark mb-8">
          Utilisation des Cookies
        </Heading>
        <div className="prose prose-blue max-w-none text-gray-700 space-y-6">
          <p>
            Nous utilisons des cookies pour assurer le bon fonctionnement du site et améliorer votre expérience de shopping.
          </p>
          <Heading level="h2" className="text-2xl font-bold mt-8 mb-4">1. Qu'est-ce qu'un cookie ?</Heading>
          <p>
            Un cookie est un petit fichier texte déposé sur votre ordinateur lors de la visite d'un site.
          </p>
          <Heading level="h2" className="text-2xl font-bold mt-8 mb-4">2. Cookies essentiels</Heading>
          <p>
            Ces cookies sont nécessaires au fonctionnement du panier et de votre session utilisateur.
          </p>
          <Heading level="h2" className="text-2xl font-bold mt-8 mb-4">3. Cookies analytiques</Heading>
          <p>
            Ils nous permettent de comprendre comment les visiteurs utilisent notre site afin de l'améliorer.
          </p>
          <p className="mt-12 text-sm text-gray-500 italic">
            Ceci est un placeholder. La version complète sera disponible prochainement.
          </p>
        </div>
      </div>
    </div>
  )
}
