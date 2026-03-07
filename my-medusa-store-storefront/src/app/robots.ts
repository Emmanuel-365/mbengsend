import { MetadataRoute } from "next"
import { getBaseURL } from "@lib/util/env"

export default function robots(): MetadataRoute.Robots {
    const baseUrl = getBaseURL()

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: [
                "/cart",
                "/checkout",
                "/account",
                "/*/cart",
                "/*/checkout",
                "/*/account",
                "/api/",
                "/_next/",
            ],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
