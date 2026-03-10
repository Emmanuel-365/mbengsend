import { HttpTypes } from "@medusajs/types"
import { Table, Text } from "@medusajs/ui"

import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import Thumbnail from "@modules/products/components/thumbnail"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  currencyCode: string
}

const Item = ({ item, currencyCode }: ItemProps) => {
  return (
    <Table.Row className="w-full border-b last:border-b-0 border-white/5 hover:bg-white/5 transition-colors" data-testid="product-row">
      <Table.Cell className="!pl-0 p-4 w-24">
        <div className="flex w-16">
          <Thumbnail thumbnail={item.thumbnail} size="square" className="rounded-lg border border-white/10" />
        </div>
      </Table.Cell>

      <Table.Cell className="text-left py-4">
        <Text
          className="text-lg font-display font-bold text-white mb-1"
          data-testid="product-name"
        >
          {item.product_title}
        </Text>
        <LineItemOptions variant={item.variant} className="text-white/40" data-testid="product-variant" />
      </Table.Cell>

      <Table.Cell className="!pr-0 py-4">
        <span className="!pr-0 flex flex-col items-end h-full justify-center">
          <span className="flex gap-x-1 items-center mb-1">
            <Text className="text-white/40 text-sm">
              <span data-testid="product-quantity" className="font-bold text-brand-primary">{item.quantity}</span> x{" "}
            </Text>
            <LineItemUnitPrice
              item={item}
              style="tight"
              currencyCode={currencyCode}
              className="text-white/60 text-sm"
            />
          </span>

          <LineItemPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
            className="text-white font-bold text-lg"
          />
        </span>
      </Table.Cell>
    </Table.Row>
  )
}

export default Item
