import { Metadata } from "next"
import { Heading, Text } from "@medusajs/ui"

export const metadata: Metadata = {
  title: "Charte d'utilisation des données personnelles | Mbengsend",
  description: "Comment nous protégeons vos données personnelles.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 md:py-24 bg-white min-h-screen">
      <div className="content-container max-w-4xl mx-auto px-4">
        <Heading level="h1" className="text-4xl font-display font-bold text-brand-dark mb-8">
          Charte d'utilisation des données personnelles
        </Heading>
        <div className="prose prose-blue max-w-none text-gray-700 space-y-6">
          <p>
            Votre vie privée est importante pour nous. Cette charte explique comment nous collectons, utilisons et protégeons vos données personnelles.
          </p>
          <Heading level="h2" className="text-2xl font-bold mt-8 mb-4">1. Données collectées</Heading>
          <p>
            Nous collectons les données que vous nous fournissez lors de votre inscription, notamment votre nom, adresse e-mail et numéro de téléphone.
          </p>
          <Heading level="h2" className="text-2xl font-bold mt-8 mb-4">2. Utilisation des données</Heading>
          <p>
            Vos données sont utilisées pour gérer votre compte, traiter vos commandes et vous envoyer des notifications importantes.
          </p>
          <Heading level="h2" className="text-2xl font-bold mt-8 mb-4">3. Sécurité</Heading>
          <p>
            Nous mettons en œuvre des mesures de sécurité rigoureuses pour protéger vos informations contre tout accès non autorisé.
          </p>
          <p className="mt-12 text-sm text-gray-500 italic">
            Ceci est un placeholder. La version complète sera disponible prochainement.
          </p>
        </div>
      </div>
    </div>
  )
}
