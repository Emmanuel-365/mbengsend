import { listBanners } from "@lib/data/cms"
import Link from "next/link"
import { Button, Heading } from "@medusajs/ui"

export default async function CmsBanners() {
  const { banners } = await listBanners()

  if (!banners || banners.length === 0) {
    return null
  }

  return (
    <div className="content-container py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((banner) => (
          <div 
            key={banner.id} 
            className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden group"
          >
            <img 
              src={banner.image_url} 
              alt={banner.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
              <Heading level="h2" className="text-white mb-2">{banner.title}</Heading>
              {banner.link && (
                <Link href={banner.link} passHref>
                  <Button variant="primary" className="w-fit">
                    Découvrir
                  </Button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
