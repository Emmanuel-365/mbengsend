"use server"

import { sdk } from "@lib/config"
import { getAuthHeaders, getCacheOptions } from "./cookies"

export interface Review {
    id: string
    product_id: string
    customer_id: string
    rating: number
    title: string | null
    author_name: string
    comment: string | null
    verified_purchase: boolean
    status: "pending" | "approved" | "rejected"
    created_at: string
}

export const listReviews = async (productId?: string) => {
    const headers = await getAuthHeaders()
    const next = await getCacheOptions("reviews")

    return sdk.client.fetch<{ reviews: Review[]; count: number }>(
        `/store/reviews`,
        {
            method: "GET",
            query: productId ? { product_id: productId } : {},
            headers,
            next,
            cache: "no-store",
        }
    ).catch(() => ({ reviews: [], count: 0 }))
}

export const createReview = async (data: {
    product_id: string
    rating: number
    title?: string
    comment?: string
}) => {
    const headers = await getAuthHeaders()

    return sdk.client.fetch<{ review: Review }>(
        `/store/reviews`,
        {
            method: "POST",
            body: data,
            headers,
        }
    )
}
