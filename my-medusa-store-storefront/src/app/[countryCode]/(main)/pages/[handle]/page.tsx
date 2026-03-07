import { getPageByHandle } from "@lib/data/strapi"
import { notFound } from "next/navigation"
import { Heading } from "@medusajs/ui"
import { Metadata } from "next"
import { marked } from "marked"

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const params = await props.params
  const page = await getPageByHandle(params.handle)

  if (!page) {
    return {}
  }

  return {
    title: `${page.seo_title || page.title} | MbengSend`,
    description: page.seo_description || `Consultez notre page ${page.title}`,
  }
}

export default async function StaticPage(props: {
  params: Promise<{ handle: string }>
}) {
  const params = await props.params
  const page = await getPageByHandle(params.handle)

  if (!page) {
    return notFound()
  }

  // Convert markdown to HTML
  const htmlContent = await marked(page.content)

  return (
    <div className="content-container py-12 max-w-3xl">
      <Heading level="h1" className="mb-8">{page.title}</Heading>
      <div 
        className="prose prose-blue max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  )
}
