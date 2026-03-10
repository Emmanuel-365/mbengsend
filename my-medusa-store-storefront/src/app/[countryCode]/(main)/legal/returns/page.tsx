import { Heading, Text } from "@medusajs/ui"

export default function ReturnsPage() {
    return (
        <div className="py-12">
            <div className="content-container flex flex-col gap-y-8">
                <Heading level="h1" className="text-4xl-semi">Politique de Retours et Remboursements</Heading>
                <div className="flex flex-col gap-y-4">
                    <Heading level="h2" className="text-2xl-semi">1. Droits de Rétractation (Europe)</Heading>
                    <Text>
                        Conformément à la législation européenne, les clients résidant en Europe disposent d&apos;un délai de 14 jours pour retourner un produit sans justification. Les frais de retour sont à la charge du client.
                    </Text>
                    <Heading level="h2" className="text-2xl-semi">2. Retours au Cameroun</Heading>
                    <Text>
                        Pour les livraisons au Cameroun, les retours ne sont acceptés qu&apos;en cas de produit défectueux ou non conforme à la commande. Le signalement doit être fait dans les 48 heures suivant la réception.
                    </Text>
                    <Heading level="h2" className="text-2xl-semi">3. Procédure de remboursement</Heading>
                    <Text>
                        Une fois le produit retourné et inspecté, le remboursement sera effectué via le mode de paiement initial ou par avoir sur la boutique.
                    </Text>
                </div>
            </div>
        </div>
    )
}
