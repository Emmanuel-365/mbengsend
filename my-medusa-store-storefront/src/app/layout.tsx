import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    template: "%s | Mbengsend",
    default: "Mbengsend - Votre Pont de Shopping Europe-Cameroun",
  },
  description: "Découvrez Mbengsend : achetez en Europe et soyez livré au Cameroun. Authenticité garantie, logistique express et service client premium.",
  keywords: ["e-commerce cameroun", "achat europe livraison cameroun", "mbengsend", "shopping france cameroun", "fret aerien cameroun"],
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
    title: "Mbengsend - Boutique Transcontinentale",
    description: "Le meilleur du shopping européen, livré chez vous au Cameroun.",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mbengsend - Livraison Europe & Cameroun",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mbengsend - Boutique Transcontinentale",
    description: "Le meilleur du shopping européen, livré chez vous au Cameroun.",
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
