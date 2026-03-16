"use server"

import { sdk } from "@lib/config"

export interface SearchProduct {
  id: string
  title: string
  handle: string
  description: string | null
  thumbnail: string | null
  status: string
}

export interface SearchResponse {
  products: SearchProduct[]
  count: number
  limit: number
  offset: number
}

export const searchProducts = async (
  query: string,
  options?: {
    limit?: number;
    offset?: number;
    filter?: string;
    sort?: string;
  }
): Promise<SearchResponse> => {
  const params = new URLSearchParams({
    q: query,
    ...(options?.limit && { limit: options.limit.toString() }),
    ...(options?.offset && { offset: options.offset.toString() }),
    ...(options?.filter && { filter: options.filter }),
    ...(options?.sort && { sort: options.sort }),
  })

  return sdk.client.fetch<SearchResponse>(
    `/store/search?${params.toString()}`,
    {
      method: "GET",
      cache: "no-store",
    }
  )
}

