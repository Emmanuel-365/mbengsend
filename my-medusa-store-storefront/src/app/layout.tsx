import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    template: "%s | Mbengsend",
    default: "Mbengsend - L'Excellence du Cameroun en Europe",
  },
  description: "Découvrez Mbengsend : le meilleur des produits camerounais livrés en Europe. Authenticité garantie, logistique express et savoir-faire local.",
  keywords: ["produits camerounais en europe", "artisanat cameroun", "mbengsend", "shopping cameroun france", "export cameroun"],
  authors: [{ name: "Mbengsend Team" }],
  creator: "Mbengsend",
  publisher: "Mbengsend",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: getBaseURL(),
    siteName: "Mbengsend",
    title: "Mbengsend - L'Excellence du Cameroun en Europe",
    description: "Le meilleur des produits camerounais, livré partout en Europe.",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mbengsend - Livraison Cameroun & Europe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mbengsend - L'Excellence du Cameroun en Europe",
    description: "Le meilleur des produits camerounais, livré partout en Europe.",
    creator: "@mbengsend",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
}





export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-mode="light">
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
