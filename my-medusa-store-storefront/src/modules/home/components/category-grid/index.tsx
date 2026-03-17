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
        <div className="content-container py-24 bg-white">
            <div className="flex flex-col gap-3 mb-16 items-center text-center">
                <MedusaText className="text-[10px] small:text-xs font-bold uppercase tracking-[0.3em] text-brand-gold font-sans">Explorer l'excellence</MedusaText>
                <Heading level="h2" className="text-4xl small:text-6xl font-display font-bold text-brand-dark tracking-tight">
                    Nos <span className="text-brand-gold italic">Rayons</span>
                </Heading>
                <MedusaText className="text-base small:text-xl text-ui-fg-subtle max-w-2xl mt-4 font-sans leading-relaxed">
                    Naviguez à travers nos sélections exclusives issues du meilleur du terroir camerounais.
                </MedusaText>
            </div>

            <div className="grid grid-cols-1 small:grid-cols-2 medium:grid-cols-4 gap-6 small:gap-8">
                {categories.map((category) => (
                    <LocalizedClientLink
                        key={category.id}
                        href={`/categories/${category.handle}`}
                        className="group relative aspect-[3/4] overflow-hidden rounded-3xl bg-grey-5 transition-all duration-700 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)]"
                    >
                        <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-brand-dark/30 transition-colors z-10" />

                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent z-20" />

                        <Image
                            src={categoryImages[category.handle] || "/category-placeholder.jpg"}
                            alt={category.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                        />

                        <div className="absolute bottom-0 left-0 right-0 p-8 small:p-10 z-30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <Heading level="h3" className="text-2xl small:text-3xl font-display font-bold text-white mb-2 group-hover:text-brand-gold transition-colors">
                                {category.name}
                            </Heading>
                            <div className="h-0.5 w-0 group-hover:w-12 bg-brand-gold transition-all duration-500 mb-4" />
                            <MedusaText className="text-white/80 text-sm font-sans font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                                Découvrir <span className="text-lg">→</span>
                            </MedusaText>
                        </div>
                    </LocalizedClientLink>
                ))}
            </div>
        </div>
    )
}

export default CategoryGrid
