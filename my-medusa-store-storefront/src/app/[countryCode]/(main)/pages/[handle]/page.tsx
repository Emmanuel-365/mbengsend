import { getPageByHandle } from "@lib/data/cms"
import { notFound } from "next/navigation"
import { Heading, Text } from "@medusajs/ui"
import { Metadata } from "next"

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const params = await props.params
  const page = await getPageByHandle(params.handle)

  if (!page) {
    return {}
  }

  return {
    title: `${page.title} | MbengSend`,
    description: `Consultez notre page ${page.title}`,
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

  return (
    <div className="content-container py-12 max-w-3xl">
      <Heading level="h1" className="mb-8">{page.title}</Heading>
      <div 
        className="prose prose-blue max-w-none"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </div>
  )
}
