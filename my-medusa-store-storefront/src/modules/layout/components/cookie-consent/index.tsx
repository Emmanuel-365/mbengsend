"use client"

import { useState, useEffect } from "react"
import { Button, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl bg-white/95">
          <div className="flex-1">
            <h3 className="text-lg font-display font-bold text-brand-dark mb-2 flex items-center gap-2">
              <span>🍪</span> Respect de votre vie privée
            </h3>
            <Text className="text-gray-600 text-sm md:text-base leading-relaxed">
              Mbengsend utilise des cookies pour assurer le bon fonctionnement du site, mesurer l'audience et vous proposer des services adaptés. 
              En continuant, vous acceptez notre utilisation des cookies conformément à notre{" "}
              <LocalizedClientLink href="/content/cookies" className="text-brand-primary font-bold underline underline-offset-4 hover:text-brand-secondary transition-colors">
                politique de cookies
              </LocalizedClientLink>.
            </Text>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button 
                variant="secondary" 
                onClick={handleDecline}
                className="rounded-full px-8 py-2 border-gray-200 text-gray-500 hover:bg-gray-50 font-semibold"
            >
              Plus tard
            </Button>
            <Button 
                onClick={handleAccept}
                className="bg-brand-primary text-white rounded-full px-10 py-2 shadow-lg shadow-brand-primary/20 hover:bg-brand-secondary transition-all transform hover:-translate-y-0.5 font-bold"
            >
              Accepter tout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
