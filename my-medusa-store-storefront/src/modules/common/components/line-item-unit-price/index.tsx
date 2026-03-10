import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"

type LineItemUnitPriceProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  style?: "default" | "tight"
  currencyCode: string
  className?: string
}

const LineItemUnitPrice = ({
  item,
  style = "default",
  currencyCode,
  className,
}: LineItemUnitPriceProps) => {
  const total = item.total ?? 0
  const original_total = item.original_total ?? 0
  const hasReducedPrice = total < original_total

  const percentage_diff = original_total > 0 ? Math.round(
    ((original_total - total) / original_total) * 100
  ) : 0

  return (
    <div className={clx("flex flex-col text-ui-fg-muted justify-center h-full", className)}>
      {hasReducedPrice && (
        <div className="flex items-center gap-x-2">
          <p className="text-xs">
            {style === "default" && (
              <span className="text-ui-fg-muted font-medium">Prix initial: </span>
            )}
            <span
              className="line-through text-brand-dark/40"
              data-testid="product-unit-original-price"
            >
              {convertToLocale({
                amount: original_total / item.quantity,
                currency_code: currencyCode,
              })}
            </span>
          </p>
          {style === "default" && (
            <span className="text-red-500 font-bold text-xs">-{percentage_diff}%</span>
          )}
        </div>
      )}
      <span
        className={clx("text-sm font-semibold", {
          "text-red-500": hasReducedPrice,
          "text-brand-dark/60": !hasReducedPrice
        })}
        data-testid="product-unit-price"
      >
        {convertToLocale({
          amount: total / item.quantity,
          currency_code: currencyCode,
        })}
      </span>
    </div>
  )
}

export default LineItemUnitPrice
