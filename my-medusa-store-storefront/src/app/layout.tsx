import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    template: "%s | Mbengsend",
    default: "Mbengsend - E-commerce entre l'Europe et le Cameroun",
  },
  description: "La meilleure passerelle e-commerce pour vos achats depuis l'Europe vers le Cameroun.",
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
