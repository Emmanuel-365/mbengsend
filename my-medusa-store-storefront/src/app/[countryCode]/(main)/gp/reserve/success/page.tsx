import Link from "next/link"
import { Button } from "@medusajs/ui"
import { CheckCircleSolid } from "@medusajs/icons"

export default function GPReserveSuccessPage({ params }: { params: { countryCode: string } }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="mb-6 text-green-500">
        <CheckCircleSolid className="w-20 h-20" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Demande Envoyée !</h1>
      <p className="text-lg text-gray-600 max-w-md mx-auto mb-8">
        Votre demande de réservation de kilos a bien été enregistrée. 
        L'équipe Mbengsend vous contactera sous peu par email ou WhatsApp pour finaliser les détails et organiser le dépôt de votre colis.
      </p>
      <div className="flex gap-4">
        <Link href={`/${params.countryCode}/gp`}>
          <Button variant="secondary">Retour aux offres GP</Button>
        </Link>
        <Link href={`/${params.countryCode}`}>
          <Button variant="primary">Retour à l'accueil</Button>
        </Link>
      </div>
    </div>
  )
}
