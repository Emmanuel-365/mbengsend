import { HttpTypes } from "@medusajs/types"
import { Locale } from "@lib/data/locales"
import MobileNavClient from "./mobile-nav-client"

type MobileNavProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
}

export default function MobileNav({ regions, locales, currentLocale }: MobileNavProps) {
  return (
    <MobileNavClient 
      regions={regions} 
      locales={locales} 
      currentLocale={currentLocale} 
    />
  )
}
