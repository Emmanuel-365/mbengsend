import { Heading, Text } from "@medusajs/ui"

export default function PrivacyPage() {
    return (
        <div className="py-12">
            <div className="content-container flex flex-col gap-y-8">
                <Heading level="h1" className="text-4xl-semi">Politique de Confidentialité</Heading>
                <div className="flex flex-col gap-y-4">
                    <Text>
                        La protection de vos données personnelles est une priorité. Nous collectons uniquement les informations nécessaires au traitement de vos commandes et à l&apos;amélioration de votre expérience.
                    </Text>
                    <Heading level="h2" className="text-2xl-semi">1. Collecte des données</Heading>
                    <Text>
                        Nous collectons votre nom, adresse, e-mail et numéro de téléphone lors de la création d&apos;un compte ou d&apos;un achat.
                    </Text>
                    <Heading level="h2" className="text-2xl-semi">2. Utilisation des données</Heading>
                    <Text>
                        Vos informations ne sont jamais vendues à des tiers. Elles sont partagées uniquement avec nos partenaires logistiques et de paiement pour assurer le service.
                    </Text>
                    <Heading level="h2" className="text-2xl-semi">3. Vos droits</Heading>
                    <Text>
                        Vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données personnelles sur simple demande.
                    </Text>
                </div>
            </div>
        </div>
    )
}
