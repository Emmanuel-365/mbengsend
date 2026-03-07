"use server"

import { sdk } from "@lib/config"
import { getAuthHeaders, getCacheOptions, getCacheTag } from "./cookies"

export interface WishlistItem {
    id: string
    product_id: string | null
    variant_id: string | null
    created_at: string
}

export interface Wishlist {
    id: string
    customer_id: string
    items: WishlistItem[]
}

export const getWishlist = async () => {
    const headers = await getAuthHeaders()
    const next = await getCacheOptions("wishlist")

    return sdk.client.fetch<{ wishlist: Wishlist }>(
        `/store/wishlist`,
        {
            method: "GET",
            headers,
            next,
            cache: "force-cache",
        }
    ).catch(() => ({ wishlist: null as any }))
}

export const addToWishlist = async (data: {
    product_id?: string
    variant_id?: string
}) => {
    const headers = await getAuthHeaders()

    return sdk.client.fetch<{ wishlist: Wishlist }>(
        `/store/wishlist`,
        {
            method: "POST",
            body: data,
            headers,
        }
    ).catch((err) => {
        console.error("ADD_TO_WISHLIST_ERROR", err)
        return { wishlist: null as any }
    })
}

export const removeFromWishlist = async (id: string) => {
    const headers = await getAuthHeaders()

    return sdk.client.fetch(
        `/store/wishlist/items/${id}`,
        {
            method: "DELETE",
            headers,
        }
    ).catch((err) => {
        console.error("REMOVE_FROM_WISHLIST_ERROR", err)
        return null
    })
}
