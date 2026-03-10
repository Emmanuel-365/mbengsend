import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="flex items-start relative px-4 small:px-12">
      <div className="flex flex-col flex-1 gap-y-12">
        {images.map((image, index) => {
          return (
            <div
              key={image.id}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-huge-lg bg-white shadow-lux-lg border border-brand-dark/5 transition-all duration-700 hover:shadow-lux-huge group"
              id={image.id}
            >
              {!!image.url && (
                <Image
                  src={image.url}
                  priority={index <= 2 ? true : false}
                  className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110"
                  alt={`Product image ${index + 1}`}
                  fill
                  sizes="(max-width: 576px) 100vw, (max-width: 768px) 80vw, 1000px"
                  style={{
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
