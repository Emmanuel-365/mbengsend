import { Metadata } from "next"
import { Heading, Text } from "@medusajs/ui"

export const metadata: Metadata = {
  title: "Gestion des données personnelles | Mbengsend",
  description: "Comment gérer vos données personnelles sur Mbengsend.",
}

export default function DataManagementPage() {
  return (
    <div className="py-12 md:py-24 bg-white min-h-screen">
      <div className="content-container max-w-4xl mx-auto px-4">
        <Heading level="h1" className="text-4xl font-display font-bold text-brand-dark mb-8">
          Gestion des données personnelles
        </Heading>
        <div className="prose prose-blue max-w-none text-gray-700 space-y-6">
          <p>
            Vous avez le contrôle total sur vos données personnelles. Cette page vous explique comment accéder, modifier ou supprimer vos informations.
          </p>
          <Heading level="h2" className="text-2xl font-bold mt-8 mb-4">Accès à vos données</Heading>
          <p>
            Vous pouvez consulter l'ensemble de vos données dans votre espace client.
          </p>
          <Heading level="h2" className="text-2xl font-bold mt-8 mb-4">Suppression de compte</Heading>
          <p>
            Pour supprimer votre compte et toutes les données associées, veuillez contacter notre support technique.
          </p>
          <p className="mt-12 text-sm text-gray-500 italic">
            Ceci est un placeholder. La version complète sera disponible prochainement.
          </p>
        </div>
      </div>
    </div>
  )
}
