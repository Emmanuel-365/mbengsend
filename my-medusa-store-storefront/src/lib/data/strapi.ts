const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

interface StrapiPage {
  id: number
  documentId: string
  title: string
  handle: string
  content: string
  seo_title?: string
  seo_description?: string
  is_published: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
}

interface StrapiBanner {
  id: number
  documentId: string
  title: string
  image: {
    data: {
      id: number
      attributes: {
        url: string
        alternativeText?: string
        width: number
        height: number
      }
    }
  }
  link?: string
  is_active: boolean
  position: number
  createdAt: string
  updatedAt: string
  publishedAt: string
}

const fetchStrapi = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
    ...options.headers,
  }

  const response = await fetch(`${STRAPI_URL}/api${endpoint}`, {
    ...options,
    headers,
    next: { revalidate: 60 }, // Cache for 60 seconds
  })

  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Get all published pages
 */
export const getPages = async () => {
  "use server"
  try {
    const response = await fetchStrapi<StrapiResponse<StrapiPage[]>>(
      "/pages?filters[is_published][$eq]=true&sort=title:asc"
    )
    return response.data
  } catch (error) {
    console.error("Error fetching pages from Strapi:", error)
    return []
  }
}

/**
 * Get a single page by handle
 */
export const getPageByHandle = async (handle: string) => {
  "use server"
  try {
    const response = await fetchStrapi<StrapiResponse<StrapiPage[]>>(
      `/pages?filters[handle][$eq]=${handle}&filters[is_published][$eq]=true`
    )
    return response.data[0] || null
  } catch (error) {
    console.error(`Error fetching page ${handle} from Strapi:`, error)
    return null
  }
}

/**
 * Get all active banners sorted by position
 */
export const getBanners = async () => {
  "use server"
  try {
    const response = await fetchStrapi<StrapiResponse<StrapiBanner[]>>(
      "/banners?filters[is_active][$eq]=true&sort=position:asc&populate=image"
    )
    return response.data
  } catch (error) {
    console.error("Error fetching banners from Strapi:", error)
    return []
  }
}

/**
 * Get a single banner by ID
 */
export const getBannerById = async (id: number) => {
  "use server"
  try {
    const response = await fetchStrapi<{ data: StrapiBanner }>(
      `/banners/${id}?populate=image`
    )
    return response.data
  } catch (error) {
    console.error(`Error fetching banner ${id} from Strapi:`, error)
    return null
  }
}

/**
 * Helper to get full image URL from Strapi
 * This is a regular function, not a Server Action
 */
export const getStrapiImageUrl = (url: string) => {
  if (url.startsWith("http")) {
    return url
  }
  return `${STRAPI_URL}${url}`
}
