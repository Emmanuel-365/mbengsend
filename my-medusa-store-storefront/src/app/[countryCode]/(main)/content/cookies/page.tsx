import { Metadata } from "next"
import { Heading, Text } from "@medusajs/ui"

export const metadata: Metadata = {
  title: "Politique d'Utilisation des Cookies | Mbengsend",
  description: "Découvrez comment Mbengsend utilise les cookies pour optimiser votre expérience utilisateur et de navigation.",
}

export default function CookiesPage() {
  return (
    <div className="py-12 md:py-24 bg-white">
      <div className="content-container max-w-4xl mx-auto">
        <div className="flex flex-col gap-y-4 mb-16 border-b border-ui-border-base pb-8">
          <Heading level="h1" className="text-4xl md:text-5xl font-display font-medium text-brand-secondary tracking-tight">
            Politique des Cookies
          </Heading>
          <Text className="text-lg text-ui-fg-muted">
            Chez Mbengsend, nous utilisons les cookies pour vous garantir la meilleure expérience de navigation et de commerce possible, en toute transparence.
          </Text>
          <Text className="text-sm text-ui-fg-subtle mt-4">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</Text>
        </div>

        <div className="flex flex-col gap-y-12">
          
          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">1. Qu'est-ce qu'un cookie ?</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <p>Un cookie est un petit fichier texte (souvent composé de lettres et de chiffres) déposé et stocké sur le disque dur de votre terminal (ordinateur, smartphone, tablette) lors de la consultation d'un site web, de la lecture d'un e-mail, de l'installation ou de l'utilisation d'un logiciel.</p>
              <p>Il permet de mémoriser vos préférences, de faciliter votre navigation et d'améliorer la personnalisation des services que nous vous proposons.</p>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">2. Pourquoi utilisons-nous des cookies ?</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <p>Nous utilisons les cookies aux fins suivantes :</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Cookies Strictement Nécessaires :</strong> Indispensables au fonctionnement du site Mbengsend.com. Ils vous permettent de naviguer sur le site, de maintenir votre session ouverte, de sécuriser votre connexion et de valider votre panier d'achats.</li>
                <li><strong>Cookies Analytiques et de Performance :</strong> Nous permettent de connaître l'utilisation et les performances de notre site, d'établir des statistiques, des volumes de fréquentation et d'utilisation (pages visitées, parcours), afin d'améliorer l'ergonomie de nos services.</li>
                <li><strong>Cookies Fonctionnels :</strong> Ils permettent de mémoriser vos choix (comme la langue choisie ou la région) et de vous fournir des fonctionnalités personnalisées.</li>
                <li><strong>Cookies de Ciblage / Publicitaires :</strong> Utilisés pour limiter le nombre de fois où vous voyez une publicité et pour mesurer l'efficacité de nos campagnes publicitaires, en cohérence avec vos centres d'intérêt.</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">3. Cookies Tiers</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <p>Certains de nos partenaires peuvent également déposer des cookies sur votre appareil. C'est notamment le cas lors de :</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>L'utilisation des boutons de partage vers les réseaux sociaux (Facebook, Instagram, WhatsApp).</li>
                <li>L'intégration de systèmes de paiement sécurisés (comme Stripe ou PayPal).</li>
                <li>L'analyse du comportement des visiteurs via des outils certifiés tels que Google Analytics.</li>
              </ul>
              <div className="p-4 bg-brand-primary/5 border-l-4 border-brand-primary rounded-r-lg">
                <strong>Attention :</strong> Les cookies tiers sont soumis aux politiques de confidentialité de ces tiers. Nous n'avons pas de contrôle direct sur ces cookies.
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">4. Durée de Conservation</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <p>Conformément à la réglementation (RGPD), les cookies non-nécessaires ne sont conservés que pour une durée maximale de <strong>13 mois</strong> après le premier dépôt dans le terminal de l'utilisateur (suite à l'expression du consentement).</p>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">5. Gestion et Paramétrage de vos Cookies</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <p>Lors de votre première visite sur Mbengsend, un bandeau d'information vous permet d'accepter ou de refuser certains types de cookies. Vous gardez en permanence le droit de modifier ces paramètres de la manière suivante :</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Via votre navigateur :</strong> Vous pouvez configurer votre logiciel de navigation de manière à ce que les cookies soient rejetés, soit systématiquement, soit selon leur émetteur. La configuration dépend du navigateur (Chrome, Safari, Firefox, Edge, etc.).</li>
                <li><strong>Via les plateformes web :</strong> En utilisant des plateformes professionnelles interprofessionnelles qui regroupent de nombreux professionnels de la publicité digitale.</li>
              </ul>
              <p>Veuillez noter que le refus total des cookies est susceptible d'altérer considérablement votre expérience d'achat et la navigation fluide sur notre site.</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">6. Contact</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <p>Pour toute question ou demande d'information supplémentaire concernant notre gestion des cookies, vous pouvez nous contacter via notre <a href="/contact" className="text-brand-primary hover:underline">formulaire de contact</a> ou adresser un e-mail à notre DPO à : <span className="font-semibold text-brand-dark">armandabouem@icloud.com</span>.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
