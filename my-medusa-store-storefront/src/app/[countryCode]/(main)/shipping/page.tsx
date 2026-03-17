import { Metadata } from "next"
import ShippingForm from "@modules/shipping/components/shipping-form"
import { getBaseURL } from "@lib/util/env"

export const metadata: Metadata = {
    title: "Expédier un colis | Mbengsend - Devis Gratuit Europe-Cameroun",
    description: "Besoin d'envoyer un colis au Cameroun ou en Europe ? Utilisez notre simulateur pour obtenir une estimation immédiate pour le fret aérien, maritime ou local.",
    openGraph: {
        title: "Expédier un colis avec Mbengsend",
        description: "Devis en temps réel pour vos expéditions entre l'Europe et le Cameroun.",
        type: "website",
    }
}

export default function ShippingPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Service d'expédition Mbengsend",
        "description": "Transport de colis international spécialisé entre l'Europe et le Cameroun.",
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
