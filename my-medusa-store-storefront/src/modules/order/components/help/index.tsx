import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"

const Help = () => {
  return (
    <div className="mt-6">
      <Heading className="text-xl font-display font-bold text-white mb-4 italic">Besoin d&apos;aide ?</Heading>
      <div className="text-base my-2">
        <ul className="gap-y-3 flex flex-col">
          <li>
            <LocalizedClientLink href="/contact" className="text-white/70 hover:text-brand-primary transition-colors flex items-center gap-2 group">
              <span className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
              Contactez le support
            </LocalizedClientLink>
          </li>
          <li>
            <LocalizedClientLink href="/contact" className="text-white/70 hover:text-brand-primary transition-colors flex items-center gap-2 group">
              <span className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
              Retours & Échanges
            </LocalizedClientLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Help
