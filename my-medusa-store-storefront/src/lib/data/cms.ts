"use server"

import { sdk } from "@lib/config"
import { getCacheOptions } from "./cookies"

export interface Banner {
    id: string
    title: string
    image_url: string
    link: string | null
    is_active: boolean
    position: number
}

export interface Page {
    id: string
    title: string
    handle: string
    content: string
    is_published: boolean
}

/**
 * Récupère les bannières actives depuis l'API Store sécurisée.
 */
export const listBanners = async () => {
    const next = await getCacheOptions("banners")

    return sdk.client.fetch<{ banners: Banner[]; count: number }>(
        `/store/cms/banners`,
        {
            method: "GET",
            next,
            cache: "force-cache",
        }
    )
}

/**
 * Récupère une page publiée via son handle depuis l'API Store sécurisée.
 */
export const getPageByHandle = async (handle: string) => {
    const next = await getCacheOptions("pages")

    return sdk.client.fetch<{ pages: Page[] }>(
        `/store/cms/pages`,
        {
            method: "GET",
            query: { handle },
            next,
            cache: "force-cache",
        }
    ).then(res => res.pages?.[0] || null)
}
