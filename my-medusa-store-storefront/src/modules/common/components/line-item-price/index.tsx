import { getPercentageDiff } from "@lib/util/get-percentage-diff"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"

type LineItemPriceProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  style?: "default" | "tight"
  currencyCode: string
  className?: string
}

const LineItemPrice = ({
  item,
  style = "default",
  currencyCode,
  className,
}: LineItemPriceProps) => {
  const total = item.total ?? 0
  const original_total = item.original_total ?? 0
  const hasReducedPrice = total < original_total

  return (
    <div className={clx("flex flex-col gap-x-2 text-ui-fg-subtle items-end", className)}>
      <div className="text-right">
        {hasReducedPrice && (
          <>
            <p className="text-xs">
              {style === "default" && (
                <span className="text-ui-fg-muted font-medium">Prix initial: </span>
              )}
              <span
                className="line-through text-brand-dark/40"
                data-testid="product-original-price"
              >
                {convertToLocale({
                  amount: original_total,
                  currency_code: currencyCode,
                })}
              </span>
            </p>
            {style === "default" && (
              <span className="text-red-500 font-bold text-xs">
                -{getPercentageDiff(original_total, total)}%
              </span>
            )}
          </>
        )}
        <span
          className={clx("text-base font-bold", {
            "text-red-500": hasReducedPrice,
            "text-brand-primary": !hasReducedPrice
          })}
          data-testid="product-price"
        >
          {convertToLocale({
            amount: total,
            currency_code: currencyCode,
          })}
        </span>
      </div>
    </div>
  )
}

export default LineItemPrice
