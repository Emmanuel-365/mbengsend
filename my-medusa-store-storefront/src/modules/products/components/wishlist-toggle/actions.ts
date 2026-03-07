"use server"

import { addToWishlist, removeFromWishlist } from "@lib/data/wishlist"
import { revalidateTag } from "next/cache"
import { getCacheTag } from "@lib/data/cookies"

export async function addToWishlistAction(data: {
  product_id?: string
  variant_id?: string
}) {
  try {
    const result = await addToWishlist(data)
    // Revalidate wishlist cache tag to update count everywhere
    const wishlistCacheTag = await getCacheTag("wishlist")
    revalidateTag(wishlistCacheTag)
    return { success: true, wishlist: result.wishlist }
  } catch (error) {
    console.error("ADD_TO_WISHLIST_ACTION_ERROR", error)
    return { success: false, error: "Failed to add to wishlist" }
  }
}

export async function removeFromWishlistAction(id: string) {
  try {
    await removeFromWishlist(id)
    // Revalidate wishlist cache tag to update count everywhere
    const wishlistCacheTag = await getCacheTag("wishlist")
    revalidateTag(wishlistCacheTag)
    return { success: true }
  } catch (error) {
    console.error("REMOVE_FROM_WISHLIST_ACTION_ERROR", error)
    return { success: false, error: "Failed to remove from wishlist" }
  }
}
