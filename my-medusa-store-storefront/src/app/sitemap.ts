import { MetadataRoute } from "next"
import { listProducts } from "@lib/data/products"
import { listCollections } from "@lib/data/collections"
import { listCategories } from "@lib/data/categories"
import { listRegions } from "@lib/data/regions"
import { getBaseURL } from "@lib/util/env"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = getBaseURL()

    const regions = await listRegions().catch(() => [])
    const countryCodes = regions
        .map((r) => r.countries?.map((c) => c.iso_2))
        .flat()
        .filter(Boolean) as string[]

    const defaultCountryCode = countryCodes[0] || "us"

    // Base pages for all countries
    const staticPages = ["", "/store", "/about", "/contact"]
    const countrySpecificStaticPages = countryCodes.flatMap((country) =>
        staticPages.map((path) => ({
            url: `${baseUrl}/${country}${path}`,
            lastModified: new Date(),
            changeFrequency: "daily" as const,
            priority: path === "" ? 1 : 0.8,
        }))
    )

    // Products
    const productsPromises = countryCodes.map(async (country) => {
        const { response } = await listProducts({
            countryCode: country,
            queryParams: { limit: 100, fields: "handle,updated_at" },
        }).catch(() => ({ response: { products: [] } }))

        return response.products.map((p) => ({
            url: `${baseUrl}/${country}/products/${p.handle}`,
            lastModified: new Date(p.updated_at || new Date()),
            changeFrequency: "weekly" as const,
            priority: 0.7,
        }))
    })

    // Collections
    const collectionsPromise = async () => {
        const { collections } = await listCollections().catch(() => ({ collections: [] }))
        return countryCodes.flatMap((country) =>
            collections.map((c) => ({
                url: `${baseUrl}/${country}/collections/${c.handle}`,
                lastModified: new Date(c.updated_at || new Date()),
                changeFrequency: "monthly" as const,
                priority: 0.6,
            }))
        )
    }

    // Helper pour vérifier qu'une URL ne contient pas de caractères XML invalides
    const isSafeXmlUrl = (url: string) => !url.includes("&") && !url.includes("<") && !url.includes(">") && !url.includes("\"") && !url.includes("'")

    // Categories
    const categoriesPromise = async () => {
        const categories = await listCategories().catch(() => [])
        return countryCodes.flatMap((country) =>
            categories
                .map((c) => ({
                    url: `${baseUrl}/${country}/categories/${c.handle}`,
                    lastModified: new Date(c.updated_at || new Date()),
                    changeFrequency: "monthly" as const,
                    priority: 0.6,
                }))
                .filter((entry) => isSafeXmlUrl(entry.url))
        )
    }

    const [products, collections, categories] = await Promise.all([
        Promise.all(productsPromises).then((res) => res.flat()),
        collectionsPromise(),
        categoriesPromise(),
    ])

    return [...countrySpecificStaticPages, ...products, ...collections, ...categories]
}
