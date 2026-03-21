import { HttpTypes } from "@medusajs/types"
import { Heading, Text as MedusaText } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

const HomeCollections = ({ collections }: { collections: HttpTypes.StoreCollection[] }) => {
    if (!collections || collections.length === 0) {
        return null
    }

    // Fallback images for collections if they don't have one
    const collectionImages: Record<string, string> = {
        // Example: "summer-collection": "/collections/summer.jpg",
    }

    return (
        <div className="py-24 bg-[#F8F9FA]">
            <div className="content-container">
                <div className="flex flex-col gap-4 mb-16 items-center text-center">
                    <MedusaText className="text-[10px] small:text-xs font-bold uppercase tracking-[0.4em] text-brand-gold font-sans">Sélections Mbengsend</MedusaText>
                    <Heading level="h2" className="text-4xl small:text-6xl font-display font-bold text-brand-dark tracking-tight">
                        Nos <span className="text-brand-gold italic">Collections</span> Signature
                    </Heading>
                    <MedusaText className="text-base small:text-lg text-ui-fg-subtle max-w-2xl mt-4 font-sans leading-relaxed">
                        Découvrez nos curations exclusives, conçues pour vous offrir le meilleur du terroir et de l'artisanat dans chaque sélection.
                    </MedusaText>
                </div>

                <div className="grid grid-cols-1 medium:grid-cols-2 lg:grid-cols-3 gap-8">
                    {collections.map((collection) => (
                        <LocalizedClientLink
                            key={collection.id}
                            href={`/collections/${collection.handle}`}
                            className="group relative h-[450px] overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-2xl transition-all duration-700"
                        >
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent z-10 group-hover:from-brand-dark/90 transition-all duration-500" />
                            
                            {/* Image Background */}
                            <Image
                                src={collectionImages[collection.handle] || "/collection-placeholder.jpg"}
                                alt={collection.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
                            />

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
                                <div className="overflow-hidden">
                                    <Heading level="h3" className="text-3xl font-display font-bold text-white mb-2 transform transition-transform duration-500 group-hover:-translate-y-1">
                                        {collection.title}
                                    </Heading>
                                </div>
                                <div className="h-0.5 w-12 bg-brand-gold mb-6 transition-all duration-500 group-hover:w-20" />
                                
                                <MedusaText className="text-white/90 text-sm font-sans font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 text-brand-gold">
                                    Voir la collection <span className="text-xl">→</span>
                                </MedusaText>
                            </div>

                            {/* Decorative element */}
                            <div className="absolute top-6 right-6 w-12 h-12 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-md z-20 group-hover:bg-brand-gold group-hover:border-brand-gold transition-all duration-500">
                                <span className="text-white text-xs font-bold font-sans">MB</span>
                            </div>
                        </LocalizedClientLink>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomeCollections
