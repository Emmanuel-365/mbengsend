"use server"

import { sdk } from "@lib/config"
import { getAuthHeaders, getCacheOptions } from "./cookies"

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

    return sdk.client.fetch<{ wishlist: Wishlist }>(
        `/store/wishlist`,
        {
            method: "GET",
            headers,
            cache: "no-store",
        }
    )
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
    )
}

export const removeFromWishlist = async (id: string) => {
    const headers = await getAuthHeaders()

    return sdk.client.fetch(
        `/store/wishlist/items/${id}`,
        {
            method: "DELETE",
            headers,
        }
    )
}
