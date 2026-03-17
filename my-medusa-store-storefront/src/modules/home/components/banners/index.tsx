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
            <div className="relative overflow-hidden rounded-3xl shadow-lux-md hover:shadow-lux-lg transition-all duration-500 group">
              <div className="relative aspect-[16/9] small:aspect-video">
                <Image
                  src={imageUrl}
                  alt={banner.image.data.attributes.alternativeText || banner.title || "Banner"}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
              </div>
              {banner.title && (
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent flex items-end p-8">
                  <h3 className="text-white font-display font-bold text-2xl small:text-3xl group-hover:text-brand-gold transition-colors duration-300">
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
