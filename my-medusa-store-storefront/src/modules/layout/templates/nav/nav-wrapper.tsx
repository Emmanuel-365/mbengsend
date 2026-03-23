import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import Nav from "./index"

export default async function NavWrapper() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions || []),
    listLocales().then((locales) => locales || []),
    getLocale().then((locale) => locale || "fr"),
  ])

  return <Nav regions={regions || []} locales={locales || []} currentLocale={currentLocale || "fr"} />
}
