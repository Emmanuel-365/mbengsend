import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCategoryByHandle, listCategories } from "@lib/data/categories"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import CategoryTemplate from "@modules/categories/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

type Props = {
  params: Promise<{ category: string[]; countryCode: string }>
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
    min?: string
    max?: string
  }>
}

export async function generateStaticParams() {
  try {
    const product_categories = await listCategories()

    if (!product_categories) {
      return []
    }

    const countryCodes = await listRegions().then((regions: StoreRegion[]) =>
      regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
    )

    const categoryHandles = product_categories.map(
      (category: any) => category.handle
    )

    const staticParams = countryCodes
      ?.map((countryCode: string | undefined) =>
        categoryHandles.map((handle: any) => ({
          countryCode,
          category: [handle],
        }))
      )
      .flat()

    return staticParams
  } catch (error) {
    console.warn("Could not generate static params for categories:", error)
    return []
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  try {
    const productCategory = await getCategoryByHandle(params.category)
    const title = `${productCategory.name} | Mbengsend`
    const description = productCategory.description ?? `Découvrez notre sélection de ${productCategory.name} du terroir camerounais, livrés en Europe avec Mbengsend.`
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${params.countryCode}/categories/${params.category.join("/")}`

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        type: "website",
        images: [
          {
            url: "/opengraph-image.jpg", // Fallback to global, or use category image if available
            width: 1200,
            height: 630,
            alt: title,
          }
        ]
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
      alternates: {
        canonical: url,
        languages: {
          "x-default": `${process.env.NEXT_PUBLIC_BASE_URL}/cm/categories/${params.category.join("/")}`,
          "fr-CM": `${process.env.NEXT_PUBLIC_BASE_URL}/cm/categories/${params.category.join("/")}`,
          "fr-FR": `${process.env.NEXT_PUBLIC_BASE_URL}/fr/categories/${params.category.join("/")}`,
          "fr-BE": `${process.env.NEXT_PUBLIC_BASE_URL}/be/categories/${params.category.join("/")}`,
          "de-DE": `${process.env.NEXT_PUBLIC_BASE_URL}/de/categories/${params.category.join("/")}`,
          "it-IT": `${process.env.NEXT_PUBLIC_BASE_URL}/it/categories/${params.category.join("/")}`,
          "es-ES": `${process.env.NEXT_PUBLIC_BASE_URL}/es/categories/${params.category.join("/")}`,
        }
      },
    }

  } catch (error) {
    notFound()
  }
}

export default async function CategoryPage(props: Props) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { sortBy, page, min, max } = searchParams

  const productCategory = await getCategoryByHandle(params.category)

  if (!productCategory) {
    notFound()
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Boutique",
        "item": `${process.env.NEXT_PUBLIC_BASE_URL}/${params.countryCode}/store`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": productCategory.name,
        "item": `${process.env.NEXT_PUBLIC_BASE_URL}/${params.countryCode}/categories/${params.category.join("/")}`
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CategoryTemplate
        category={productCategory}
        sortBy={sortBy}
        page={page}
        countryCode={params.countryCode}
        minPrice={min}
        maxPrice={max}
      />
    </>
  )
}
