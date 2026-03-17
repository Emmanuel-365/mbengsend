import { Metadata } from "next"
import { Heading, Text } from "@medusajs/ui"

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Mbengsend",
  description:
    "Comment Mbengsend protège, gère et utilise vos données personnelles lors de vos achats en Europe et au Cameroun.",
}

export default function PrivacyPage() {
  return (
    <div className="py-12 md:py-24 bg-white">
      <div className="content-container max-w-4xl mx-auto">
        <div className="flex flex-col gap-y-4 mb-16 border-b border-ui-border-base pb-8">
          <Heading level="h1" className="text-4xl md:text-5xl font-display font-medium text-brand-secondary tracking-tight">
            Politique de Confidentialité
          </Heading>
          <Text className="text-lg text-ui-fg-muted">
            La protection de vos données personnelles est au cœur de nos priorités. Découvrez comment Mbengsend collecte, utilise et protège vos informations.
          </Text>
          <Text className="text-sm text-ui-fg-subtle mt-4">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</Text>
        </div>

        <div className="flex flex-col gap-y-12">
          
          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">1. Collecte des Données</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <p>Nous collectons les informations nécessaires au traitement de vos commandes et à l'exécution de nos services logistiques. Ces données incluent :</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Informations d'identité :</strong> Nom, prénom, adresse e-mail, numéro de téléphone.</li>
                <li><strong>Données de livraison :</strong> Adresse physique (en Europe ou au Cameroun), instructions spécifiques de livraison.</li>
                <li><strong>Données de navigation :</strong> Cookies techniques et analytiques essentiels au bon fonctionnement du site.</li>
              </ul>
              <div className="p-4 mt-2 bg-brand-primary/5 border border-brand-primary/20 rounded-lg text-sm text-brand-secondary">
                <strong>Concernant le paiement :</strong> Mbengsend ne stocke en aucun cas vos informations bancaires. Celles-ci sont traitées par nos partenaires sécurisés (Stripe, PayPal, Flutterwave).
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">2. Utilisation des Données</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <p>Vos données sont exclusivement utilisées pour :</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Traiter, expédier et suivre la logistique de vos commandes entre l'Europe et le Cameroun.</li>
                <li>Communiquer avec vous concernant l'état de vos expéditions.</li>
                <li>Vous proposer une assistance client personnalisée.</li>
                <li>Améliorer l'expérience utilisateur et la sécurité de la plateforme mbengsend.com.</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">3. Partage et Transfert</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <p>Dans le cadre de nos opérations transcontinentales, vos données peuvent être partagées avec :</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Nos prestataires spécialisés dans le fret aérien et maritime.</li>
                <li>Nos équipes locales au Cameroun pour assurer la distribution finale.</li>
                <li>Les autorités douanières (les bordereaux d'expédition requièrent le nom complet et l'adresse).</li>
              </ul>
              <p>Nous ne vendons <strong>jamais</strong> vos données personnelles à des tiers à des fins marketing ou commerciales.</p>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">4. Vos Droits (RGPD)</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <p>Conformément à la réglementation (notamment le RGPD pour nos opérations européennes), vous bénéficiez de droits d'accès, de rectification, de suppression et d'opposition concernant vos données.</p>
              <p>Vous pouvez exercer ces droits à tout moment en modifiant les informations dans votre <a href="/account" className="text-brand-primary hover:underline">Espace Compte</a> ou en nous écrivant via la page <a href="/contact" className="text-brand-primary hover:underline">Contact</a>.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
