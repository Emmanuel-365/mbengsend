import { getBanners, getStrapiImageUrl } from "@lib/data/strapi"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

export default async function Banners() {
  const banners = await getBanners()

  if (!banners || banners.length === 0) {
    return null
  }

  return (
    <div className="content-container mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner) => {
          // Safety checks for banner structure (Strapi 5 flat format)
          if (!banner?.image?.data?.attributes?.url) {
            return null
          }

          const imageUrl = getStrapiImageUrl(banner.image.data.attributes.url)
          const BannerContent = (
            <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow group">
              <div className="relative aspect-[16/9]">
                <Image
                  src={imageUrl}
                  alt={banner.image.data.attributes.alternativeText || banner.title || "Banner"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              {banner.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-semibold text-lg">
                    {banner.title}
                  </h3>
                </div>
              )}
            </div>
          )

          if (banner.link) {
            // Check if it's an internal link
            if (banner.link.startsWith('/')) {
              return (
                <LocalizedClientLink key={banner.id} href={banner.link}>
                  {BannerContent}
                </LocalizedClientLink>
              )
            }
            // External link
            return (
              <a
                key={banner.id}
                href={banner.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {BannerContent}
              </a>
            )
          }

          // No link, just display the banner
          return <div key={banner.id}>{BannerContent}</div>
        })}
      </div>
    </div>
  )
}
