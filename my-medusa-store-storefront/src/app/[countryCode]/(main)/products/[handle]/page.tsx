import { Metadata } from "next"
import { notFound } from "next/navigation"
import { listProducts } from "@lib/data/products"
import { getRegion, listRegions } from "@lib/data/regions"
import ProductTemplate from "@modules/products/templates"
import { HttpTypes } from "@medusajs/types"
import { getBaseURL } from "@lib/util/env"


type Props = {
  params: Promise<{ countryCode: string; handle: string }>
  searchParams: Promise<{ v_id?: string }>
}

export async function generateStaticParams() {
  try {
    const countryCodes = await listRegions().then((regions) =>
      regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
    )

    if (!countryCodes) {
      return []
    }

    const promises = countryCodes.map(async (country) => {
      const { response } = await listProducts({
        countryCode: country,
        queryParams: { limit: 100, fields: "handle" },
      })

      return {
        country,
        products: response.products,
      }
    })

    const countryProducts = await Promise.all(promises)

    return countryProducts
      .flatMap((countryData) =>
        countryData.products.map((product) => ({
          countryCode: countryData.country,
          handle: product.handle,
        }))
      )
      .filter((param) => param.handle)
  } catch (error) {
    console.error(
      `Failed to generate static paths for product pages: ${error instanceof Error ? error.message : "Unknown error"
      }.`
    )
    return []
  }
}

function getImagesForVariant(
  product: HttpTypes.StoreProduct,
  selectedVariantId?: string
) {
  if (!selectedVariantId || !product.variants || !product.images) {
    return product.images || []
  }

  const variant = product.variants.find((v) => v.id === selectedVariantId)
  if (!variant || !variant.images?.length) {
    return product.images || []
  }

  const imageIdsMap = new Map(variant.images.map((i) => [i.id, true]))
  return product.images.filter((i) => imageIdsMap.has(i.id))
}


export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { handle } = params
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const product = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle, fields: "title,description,thumbnail,updated_at" },
  }).then(({ response }) => response.products[0])

  if (!product) {
    notFound()
  }

  const title = `${product.title} | Mbengsend - L'Excellence du Cameroun`
  const description = product.description || `Achetez ${product.title} sur Mbengsend. Produit d'excellence camerounaise avec livraison sécurisée en Europe.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: product.thumbnail ? [product.thumbnail] : [],
      type: "article",
      url: `${getBaseURL()}/${params.countryCode}/products/${handle}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
    alternates: {
      canonical: `${getBaseURL()}/${params.countryCode}/products/${handle}`,
      languages: {
        "x-default": `${getBaseURL()}/cm/products/${handle}`,
        "fr-CM": `${getBaseURL()}/cm/products/${handle}`,
        "fr-FR": `${getBaseURL()}/fr/products/${handle}`,
        "fr-BE": `${getBaseURL()}/be/products/${handle}`,
        "de-DE": `${getBaseURL()}/de/products/${handle}`,
        "it-IT": `${getBaseURL()}/it/products/${handle}`,
        "es-ES": `${getBaseURL()}/es/products/${handle}`,
      }
    }
  }
}


export default async function ProductPage(props: Props) {
  const params = await props.params
  const region = await getRegion(params.countryCode)
  const searchParams = await props.searchParams

  const selectedVariantId = searchParams.v_id

  if (!region) {
    notFound()
  }

  const pricedProduct = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle: params.handle },
  }).then(({ response }) => response.products[0])

  if (!pricedProduct) {
    notFound()
  }

  const images = getImagesForVariant(pricedProduct, selectedVariantId)


  const averageRating = (pricedProduct.metadata?.average_rating as number) || 5
  const reviewCount = (pricedProduct.metadata?.review_count as number) || 0

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": pricedProduct.title,
    "description": pricedProduct.description,
    "image": pricedProduct.thumbnail,
    "brand": {
      "@type": "Brand",
      "name": "Mbengsend"
    },
    ...(reviewCount > 0 ? {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": averageRating,
        "reviewCount": reviewCount
      }
    } : {}),
    "offers": {
      "@type": "Offer",
      "price": pricedProduct.variants?.[0]?.calculated_price?.calculated_amount || 0,
      "priceCurrency": pricedProduct.variants?.[0]?.calculated_price?.currency_code?.toUpperCase() || "XAF",
      "availability": pricedProduct.variants?.some((v: any) => (v.inventory_quantity || 0) > 0)
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      "url": `${getBaseURL()}/${params.countryCode}/products/${params.handle}`,
      "seller": {
        "@type": "Organization",
        "name": "Mbengsend"
      }
    }
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Boutique",
        "item": `${getBaseURL()}/${params.countryCode}/store`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": pricedProduct.title,
        "item": `${getBaseURL()}/${params.countryCode}/products/${params.handle}`
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductTemplate
        product={pricedProduct}
        region={region}
        countryCode={params.countryCode}
        images={images}
      />
    </>
  )
}

