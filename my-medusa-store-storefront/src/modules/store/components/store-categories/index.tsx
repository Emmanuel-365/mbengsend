import { listCategories } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@medusajs/ui"

type StoreCategoriesProps = {
    activeCategory?: string
    'data-testid'?: string
}

export default async function StoreCategories({ activeCategory, 'data-testid': dataTestId }: StoreCategoriesProps) {
    const categories = await listCategories()

    if (!categories || categories.length === 0) {
        return null
    }

    // Only get top-level categories
    const topLevelCategories = categories.filter((c) => !c.parent_category)

    return (
        <div className="flex flex-col gap-y-4" data-testid={dataTestId}>
            <h3 className="text-base-semi font-display font-medium text-brand-dark">Catégories</h3>
            <ul className="flex flex-col gap-y-3" data-testid="category-filter-list">
                <li>
                    <LocalizedClientLink
                        href="/store"
                        className={clx(
                            "text-ui-fg-subtle hover:text-brand-primary transition-colors text-sm",
                            !activeCategory && "font-semibold text-brand-primary"
                        )}
                        data-testid="all-products-link"
                    >
                        Tous les Produits
                    </LocalizedClientLink>
                </li>
                {topLevelCategories.map((c) => (
                    <li key={c.id}>
                        <LocalizedClientLink
                            href={`/categories/${c.handle}`}
                            className={clx(
                                "text-ui-fg-subtle hover:text-brand-primary transition-colors text-sm",
                                activeCategory === c.id && "font-semibold text-brand-primary"
                            )}
                            data-testid="category-link"
                        >
                            {c.name}
                        </LocalizedClientLink>

                        {/* If it has children and is the active category or a parent, we could optionally map them here */}
                        {c.category_children && activeCategory && (activeCategory === c.id || c.category_children.some(child => child.id === activeCategory)) && (
                            <ul className="flex flex-col gap-y-2 mt-2 ml-4 border-l border-brand-dark/10 pl-4">
                                {c.category_children.map((child) => (
                                    <li key={child.id}>
                                        <LocalizedClientLink
                                            href={`/categories/${child.handle}`}
                                            className={clx(
                                                "text-ui-fg-subtle hover:text-brand-primary transition-colors text-sm",
                                                activeCategory === child.id && "font-semibold text-brand-primary"
                                            )}
                                        >
                                            {child.name}
                                        </LocalizedClientLink>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}
