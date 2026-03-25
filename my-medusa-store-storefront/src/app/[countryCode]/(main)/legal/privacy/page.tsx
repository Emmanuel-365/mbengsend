import { Metadata } from "next"
import { Heading, Text } from "@medusajs/ui"

export const metadata: Metadata = {
  title: "Charte de Protection des Données | Mbengsend",
  description: "Comment Mbengsend protège, gère et utilise vos données personnelles.",
}

export default function PrivacyPage() {
  return (
    <div className="py-12 md:py-24 bg-white">
      <div className="content-container max-w-4xl mx-auto">
        <div className="flex flex-col gap-y-4 mb-16 border-b border-ui-border-base pb-8">
          <Heading level="h1" className="text-4xl md:text-5xl font-display font-medium text-brand-secondary tracking-tight">
            Charte de Protection des Données Personnelles
          </Heading>
          <Text className="text-lg text-ui-fg-muted">
            La présente charte a pour objectif d’informer les utilisateurs du site mbengsend.com sur la collecte, le traitement et la protection de leurs données personnelles.
          </Text>
          <Text className="text-sm text-ui-fg-subtle mt-4">Dernière mise à jour : 25 mars 2026</Text>
        </div>

        <div className="flex flex-col gap-y-12">
          
          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">1. Introduction</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <p>La présente charte a pour objectif d’informer les utilisateurs du site mbengsend.com sur la collecte, le traitement et la protection de leurs données personnelles, conformément au Règlement Général sur la Protection des Données (RGPD) et à la législation française applicable.</p>
              <p><strong>Le responsable de traitement des données est :</strong><br/>
              Armand Judicael ABOUEM ABOUEM<br/>
              Adresse mail : armandabouem@icloud.com</p>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">2. Données collectées</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <p>Nous pouvons collecter les catégories de données suivantes :</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Données d’identification :</strong> nom, prénom, adresse mail, numéro de téléphone, adresse postale.</li>
                <li><strong>Données de commande :</strong> produits commandés, poids des colis, détails d’expédition et livraison.</li>
                <li><strong>Données de paiement :</strong> informations bancaires, uniquement via les plateformes sécurisées de paiement (ex. Stripe, PayPal).</li>
                <li><strong>Données de navigation :</strong> cookies, adresse IP, pages consultées, durée de visite.</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">3. Finalités du traitement</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <p>Les données collectées sont utilisées pour :</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Gérer les commandes et expéditions.</li>
                <li>Facturation et suivi des paiements.</li>
                <li>Communication avec le client : confirmation de commande, informations sur l’expédition, support client.</li>
                <li>Amélioration du site et analyse de fréquentation.</li>
                <li>Marketing (newsletter, offres promotionnelles) uniquement si le consentement est donné.</li>
              </ol>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">4. Bases légales</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <ul className="list-disc pl-5 space-y-2">
                <li>Exécution du contrat avec l’utilisateur (article 6.1.b RGPD).</li>
                <li>Consentement de l’utilisateur pour les communications marketing (article 6.1.a RGPD).</li>
                <li>Respect d’obligations légales (article 6.1.c RGPD).</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">5. Partage et transfert des données</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <p>Les données peuvent être partagées avec :</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Prestataires logistiques et transporteurs pour l’envoi des colis.</li>
                <li>Prestataires de paiement pour la sécurisation des transactions.</li>
                <li>Autorités légales si requis par la loi.</li>
              </ul>
              <div className="p-4 mt-2 bg-brand-primary/5 border border-brand-primary/20 rounded-lg text-sm text-brand-secondary">
                Aucun transfert en dehors de l’Union Européenne n’a lieu sans garanties appropriées.
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">6. Conservation des données</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Données de commandes :</strong> 5 ans conformément aux obligations fiscales.</li>
                <li><strong>Données de navigation :</strong> 13 mois pour analyse statistique.</li>
                <li><strong>Données marketing :</strong> jusqu’au retrait du consentement.</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">7. Droits des utilisateurs</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Droit d’accès à vos données.</li>
                <li>Droit de rectification des données inexactes ou incomplètes.</li>
                <li>Droit à l’effacement (“droit à l’oubli”).</li>
                <li>Droit de limitation du traitement.</li>
                <li>Droit d’opposition au traitement.</li>
                <li>Droit à la portabilité des données.</li>
              </ul>
              <p>Pour exercer vos droits, contactez :<br/>
              Armand Judicael ABOUEM – armandabouem@icloud.com</p>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">8. Sécurité des données</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <p>Nous mettons en œuvre toutes les mesures techniques et organisationnelles pour protéger vos données contre tout accès non autorisé, perte, altération ou divulgation.</p>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">9. Cookies et technologies similaires</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <p>Le site utilise des cookies pour :</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Mesurer la fréquentation.</li>
                <li>Améliorer l’expérience utilisateur.</li>
                <li>Personnaliser les offres marketing (avec consentement).</li>
              </ul>
              <p>L’utilisateur peut gérer ses préférences via son navigateur.</p>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">10. Modifications de la charte</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <p>Cette charte peut être mise à jour périodiquement. La version la plus récente est toujours disponible sur mbengsend.com.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
