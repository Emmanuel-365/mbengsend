import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { getPages } from "@lib/data/strapi"
import { Text, clx } from "@medusajs/ui"
import Image from "next/image"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="border-t border-ui-border-base w-full bg-[#FDFDFD]">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-12 small:flex-row items-center small:items-start justify-between py-12 small:py-24 medium:py-32">
          <div className="flex flex-col items-center small:items-start gap-4 w-full small:w-auto text-center small:text-left">
            <LocalizedClientLink
              href="/"
              className="flex items-center gap-3 group/logo-footer"
            >
              <div className="relative w-10 small:w-12 h-10 small:h-12">
                <Image 
                  src="/logo.png" 
                  alt="Mbengsend Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
              <span className="text-xl small:text-2xl font-display font-bold text-brand-secondary tracking-tight">
                Mbengsend
              </span>
            </LocalizedClientLink>
            <Text className="text-sm small:text-base text-ui-fg-subtle max-w-[300px] mt-2 leading-relaxed">
              Votre passerelle privilégiée pour découvrir l&apos;excellence camerounaise et la faire rayonner en Europe.
            </Text>
          </div>
          <div className="text-small-regular flex flex-col items-center small:items-start small:grid small:grid-cols-4 gap-12 small:gap-10 medium:gap-x-16 w-full small:w-auto mt-8 small:mt-0">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col items-center small:items-start gap-y-4">
                <span className="text-brand-dark font-display font-bold text-sm uppercase tracking-widest">
                  Categories
                </span>
                <ul
                  className="flex flex-col items-center small:items-start gap-2"
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
                        className="flex flex-col items-center small:items-start gap-2 text-ui-fg-subtle txt-small"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-brand-gold transition-colors",
                            children && "font-semibold"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="flex flex-col items-center small:items-start gap-2 mt-1">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-brand-gold transition-colors"
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
              <div className="flex flex-col items-center small:items-start gap-y-4">
                <span className="text-brand-dark font-display font-bold text-sm uppercase tracking-widest">
                  Collections
                </span>
                <ul
                  className="flex flex-col items-center small:items-start gap-2 text-ui-fg-subtle txt-small"
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-brand-gold transition-colors"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="flex flex-col items-center small:items-start gap-y-4">
              <span className="text-brand-dark font-display font-bold text-sm uppercase tracking-widest">Assistance</span>
              <ul className="flex flex-col items-center small:items-start gap-y-2 text-ui-fg-subtle txt-small">
                <li>
                  <LocalizedClientLink href="/about" className="hover:text-brand-gold transition-colors">
                    À propos
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/contact" className="hover:text-brand-gold transition-colors">
                    Contactez-nous
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/faq" className="hover:text-brand-gold transition-colors">
                    FAQ
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center small:items-start gap-y-4">
              <span className="text-brand-dark font-display font-bold text-sm uppercase tracking-widest">Légal</span>
              <ul className="flex flex-col items-center small:items-start gap-y-2 text-ui-fg-subtle txt-small">
                <li>
                  <LocalizedClientLink href="/legal/terms" className="hover:text-brand-gold transition-colors">
                    Conditions Générales
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/legal/returns" className="hover:text-brand-gold transition-colors">
                    Retours & Remboursements
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/content/privacy-policy" className="hover:text-brand-gold transition-colors text-center small:text-left">
                    Charte des données
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/content/data-management" className="hover:text-brand-gold transition-colors text-center small:text-left">
                    Gestion des données
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/content/cookies" className="hover:text-brand-gold transition-colors text-center small:text-left">
                    Cookies
                  </LocalizedClientLink>
                </li>
                <li>
                  <button className="text-center small:text-left hover:text-brand-gold transition-colors decoration-dotted underline underline-offset-4 decoration-brand-gold/30">
                    Paramètres des cookies
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col small:flex-row w-full py-6 small:py-8 border-t border-grey-10 justify-between items-center text-ui-fg-muted gap-4 small:gap-0">
          <Text className="text-xs text-ui-fg-subtle font-medium text-center small:text-left">
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
