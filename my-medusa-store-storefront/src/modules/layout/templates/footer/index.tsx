import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { getPages } from "@lib/data/strapi"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()
  const cmsPages = await getPages()

  return (
    <footer className="border-t border-ui-border-base w-full">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-40">
          <div>
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase font-bold tracking-widest"
            >
              Mbengsend
            </LocalizedClientLink>

          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-4">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base">
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
                            "hover:text-ui-fg-base",
                            children && "txt-small-plus"
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
                                    className="hover:text-ui-fg-base"
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
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base">
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
                        className="hover:text-ui-fg-base"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {cmsPages && cmsPages.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base">
                  À propos
                </span>
                <ul className="grid grid-cols-1 gap-2 text-ui-fg-subtle txt-small">
                  {cmsPages.map((page) => {
                    // Safety check for page structure
                    if (!page?.handle || !page?.title) {
                      return null
                    }
                    
                    return (
                      <li key={page.id}>
                        <LocalizedClientLink
                          className="hover:text-ui-fg-base"
                          href={`/pages/${page.handle}`}
                        >
                          {page.title}
                        </LocalizedClientLink>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus txt-ui-fg-base">Assistance</span>
              <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle txt-small">
                <li>
                  <LocalizedClientLink href="/about" className="hover:text-ui-fg-base">
                    À propos
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/contact" className="hover:text-ui-fg-base">
                    Contactez-nous
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/faq" className="hover:text-ui-fg-base">
                    FAQ
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus txt-ui-fg-base">Légal</span>
              <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle txt-small">
                <li>
                  <LocalizedClientLink href="/legal/terms" className="hover:text-ui-fg-base">
                    Conditions Générales
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/legal/returns" className="hover:text-ui-fg-base">
                    Retours & Remboursements
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/legal/privacy" className="hover:text-ui-fg-base">
                    Confidentialité
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full mb-16 justify-between text-ui-fg-muted">
          <Text className="txt-compact-small text-ui-fg-subtle">
            © {new Date().getFullYear()} Mbengsend. Tous droits réservés.
          </Text>
        </div>

      </div>
    </footer>
  )
}
