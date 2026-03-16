import { HttpTypes } from "@medusajs/types"
import { Heading, Text as MedusaText } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

const CategoryGrid = ({ categories }: { categories: HttpTypes.StoreProductCategory[] }) => {
    // Map categories to images (or use placeholders / generate them)
    const categoryImages: Record<string, string> = {
        "beauté-&-cosmétiques": "/categories/beauty.jpg",
        "électronique": "/categories/electronics.jpg",
        "santé-&-bien-être": "/categories/health.jpg",
        "alimentation": "/categories/food.jpg",
    }

    return (
        <div className="content-container py-12 small:py-24 bg-white">
            <div className="flex flex-col gap-2 mb-8 small:mb-12 items-center text-center">
                <MedusaText className="text-xs small:text-sm font-bold uppercase tracking-widest text-brand-primary">Explorez</MedusaText>
                <Heading level="h2" className="text-2xl small:text-4xl medium:text-5xl font-display font-bold text-brand-dark tracking-tight">
                    Nos <span className="text-brand-primary">Rayons</span>
                </Heading>
                <MedusaText className="text-sm small:text-base text-ui-fg-subtle max-w-[600px] mt-2 small:mt-4">
                    Naviguez à travers nos sélections exclusives importées d'Europe pour votre plus grand plaisir.
                </MedusaText>
            </div>

            <div className="grid grid-cols-1 small:grid-cols-2 medium:grid-cols-4 gap-4 small:gap-6">
                {categories.map((category) => (
                    <LocalizedClientLink
                        key={category.id}
                        href={`/categories/${category.handle}`}
                        className="group relative aspect-[4/5] overflow-hidden rounded-xl small:rounded-2xl bg-grey-5 transition-all duration-500 hover:shadow-lux-lg shadow-sm"
                    >
                        <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-brand-dark/40 transition-colors z-10" />

                        {/* Fallback pattern if image is missing */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20" />

                        <Image
                            src={categoryImages[category.handle] || "/category-placeholder.jpg"}
                            alt={category.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />

                        <div className="absolute bottom-0 left-0 right-0 p-4 small:p-8 z-30 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                            <Heading level="h3" className="text-lg small:text-2xl font-display font-bold text-white mb-1 small:mb-2">
                                {category.name}
                            </Heading>
                            <MedusaText className="text-white/80 text-xs small:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Découvrir la collection →
                            </MedusaText>
                        </div>
                    </LocalizedClientLink>
                ))}
            </div>
        </div>
    )
}

export default CategoryGrid
