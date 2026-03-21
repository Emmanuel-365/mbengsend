import { Metadata } from "next"
import { Heading, Text } from "@medusajs/ui"

export const metadata: Metadata = {
  title: "Conditions d'Utilisation | Mbengsend",
  description: "Nos conditions d'utilisation générales.",
}

export default function TermsOfUsePage() {
  return (
    <div className="py-12 md:py-24 bg-white min-h-screen">
      <div className="content-container max-w-4xl mx-auto px-4">
        <Heading level="h1" className="text-4xl font-display font-bold text-brand-dark mb-8">
          Conditions d'Utilisation
        </Heading>
        <div className="prose prose-blue max-w-none text-gray-700 space-y-6">
          <p>
            Bienvenue sur Mbengsend. En utilisant nos services, vous acceptez les présentes conditions d'utilisation.
          </p>
          <Heading level="h2" className="text-2xl font-bold mt-8 mb-4">1. Acceptation des conditions</Heading>
          <p>
            L'utilisation du site mbengsend.com implique l'acceptation pleine et entière des présentes conditions générales d'utilisation.
          </p>
          <Heading level="h2" className="text-2xl font-bold mt-8 mb-4">2. Services</Heading>
          <p>
            Mbengsend propose des services de commerce en ligne et de logistique entre l'Europe et le Cameroun.
          </p>
          <Heading level="h2" className="text-2xl font-bold mt-8 mb-4">3. Responsabilités</Heading>
          <p>
            L'utilisateur est responsable de la véracité des informations fournies lors de la création de son compte.
          </p>
          <p className="mt-12 text-sm text-gray-500 italic">
            Ceci est un placeholder. La version complète sera disponible prochainement.
          </p>
        </div>
      </div>
    </div>
  )
}
