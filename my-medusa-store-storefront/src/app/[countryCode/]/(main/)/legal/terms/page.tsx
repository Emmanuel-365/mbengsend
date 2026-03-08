import { Heading, Text } from "@medusajs/ui"

export default function TermsPage() {
    return (
        <div className="py-12">
            <div className="content-container flex flex-col gap-y-8">
                <Heading level="h1" className="text-4xl-semi">Conditions Générales de Vente</Heading>
                <div className="flex flex-col gap-y-4">
                    <Text>
                        Bienvenue sur notre boutique. Les présentes conditions générales de vente régissent l&apos;utilisation de notre site et les achats effectués auprès de notre établissement, tant au Cameroun qu&apos;en Europe.
                    </Text>
                    <Heading level="h2" className="text-2xl-semi">1. Commandes et Paiement</Heading>
                    <Text>
                        Les commandes sont validées après confirmation du paiement (Stripe, PayPal, Flutterwave) ou sélection du mode &quot;Paiement à la livraison&quot; pour les régions éligibles (Cameroun).
                    </Text>
                    <Heading level="h2" className="text-2xl-semi">2. Livraison</Heading>
                    <Text>
                        Nous proposons des services de livraison par voie aérienne, maritime et locale. Les délais et tarifs varient selon la destination et le mode de transport sélectionné.
                    </Text>
                    <Heading level="h2" className="text-2xl-semi">3. Responsabilités</Heading>
                    <Text>
                        L&apos;acheteur est responsable de l&apos;exactitude des informations de livraison fournies lors de la commande.
                    </Text>
                </div>
            </div>
        </div>
    )
}
