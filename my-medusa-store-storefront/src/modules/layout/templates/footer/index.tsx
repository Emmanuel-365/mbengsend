import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { getPages } from "@lib/data/strapi"
import { Text, clx } from "@medusajs/ui"
import Image from "next/image"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()
  const cmsPages = await getPages()

  return (
    <footer className="border-t border-ui-border-base w-full bg-[#FDFDFD]">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-12 small:flex-row items-start justify-between py-24 small:py-32">
          <div className="flex flex-col gap-4">
            <LocalizedClientLink
              href="/"
              className="flex items-center gap-3 group/logo-footer"
            >
              <div className="relative w-12 h-12">
                <Image 
                  src="/logo.png" 
                  alt="Mbengsend Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-display font-bold text-brand-secondary tracking-tight">
                Mbengsend
              </span>
            </LocalizedClientLink>
            <Text className="text-base text-ui-fg-subtle max-w-[300px] mt-2">
              Votre passerelle privilégiée pour vos achats en Europe et leur livraison ultra-rapide au Cameroun.
            </Text>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-4 mt-12 small:mt-0">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-4">
                <span className="text-brand-dark font-display font-bold text-sm uppercase tracking-widest">
                  Categories
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li
                        className="flex flex-col gap-2 text-ui-fg-subtle txt-small"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-brand-primary transition-colors",
                            children && "font-semibold"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-brand-primary transition-colors"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-4">
                <span className="text-brand-dark font-display font-bold text-sm uppercase tracking-widest">
                  Collections
                </span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-2 text-ui-fg-subtle txt-small",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-brand-primary transition-colors"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="flex flex-col gap-y-4">
              <span className="text-brand-dark font-display font-bold text-sm uppercase tracking-widest">Assistance</span>
              <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle txt-small">
                <li>
                  <LocalizedClientLink href="/about" className="hover:text-brand-primary transition-colors">
                    À propos
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/contact" className="hover:text-brand-primary transition-colors">
                    Contactez-nous
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/faq" className="hover:text-brand-primary transition-colors">
                    FAQ
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-y-4">
              <span className="text-brand-dark font-display font-bold text-sm uppercase tracking-widest">Légal</span>
              <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle txt-small">
                <li>
                  <LocalizedClientLink href="/legal/terms" className="hover:text-brand-primary transition-colors">
                    Conditions Générales
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/legal/returns" className="hover:text-brand-primary transition-colors">
                    Retours & Remboursements
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/legal/privacy" className="hover:text-brand-primary transition-colors">
                    Confidentialité
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full py-8 border-t border-grey-10 justify-between items-center text-ui-fg-muted">
          <Text className="text-xs text-ui-fg-subtle font-medium">
            © {new Date().getFullYear()} Mbengsend. Tous droits réservés.
          </Text>
          <div className="flex gap-4">
             {/* Social or payment icons could go here */}
          </div>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Mbengsend",
            "url": "https://mbengsend.com",
            "logo": "https://mbengsend.com/logo.png",
            "sameAs": [
              "https://www.instagram.com/mbengsend",
              "https://www.facebook.com/mbengsend"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+237...",
              "contactType": "customer service",
              "areaServed": "CM",
              "availableLanguage": ["French", "English"]
            }
          }),
        }}
      />
    </footer>

  )
}
