import { Metadata } from "next"
import ShippingForm from "@modules/shipping/components/shipping-form"
import { getBaseURL } from "@lib/util/env"

export const metadata: Metadata = {
    title: "Expédier un colis | Mbengsend - Devis Gratuit Cameroun-Europe",
    description: "Besoin d'envoyer un colis du Cameroun vers l'Europe ou vice-versa ? Utilisez notre simulateur pour obtenir une estimation immédiate.",
    openGraph: {
        title: "Expédier un colis avec Mbengsend",
        description: "Devis en temps réel pour vos expéditions entre le Cameroun et l'Europe.",
        type: "website",
    }
}

export default function ShippingPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Service d'expédition Mbengsend",
        "description": "Transport de colis international spécialisé entre le Cameroun et l'Europe.",
        "provider": {
            "@type": "Organization",
            "name": "Mbengsend",
            "url": getBaseURL()
        },
        "areaServed": ["CM", "FR", "BE", "DE", "IT", "LU", "ES", "CH"],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Modes d'expédition",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Fret Aérien Express"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Fret Maritime"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Livraison Locale"
                    }
                }
            ]
        }
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <ShippingForm />
            </div>
        </>
    )
}
