import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Heading, Table } from "@medusajs/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items
  return (
    <div>
      <div className="pb-4 small:pb-8 flex items-center">
        <Heading className="text-2xl small:text-4xl font-display font-bold text-brand-dark tracking-tight">Panier</Heading>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <Table.Header className="border-t-0 border-b border-brand-dark/5">
            <Table.Row className="text-brand-dark/60 text-xs small:text-sm font-bold uppercase tracking-widest">
              <Table.HeaderCell className="!pl-0">Article</Table.HeaderCell>
              <Table.HeaderCell className="hidden small:table-cell"></Table.HeaderCell>
              <Table.HeaderCell className="text-center">Quantité</Table.HeaderCell>
              <Table.HeaderCell className="hidden small:table-cell">
                Prix
              </Table.HeaderCell>
              <Table.HeaderCell className="!pr-0 text-right">
                Total
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items
              ? items
                  .sort((a, b) => {
                    return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                  })
                  .map((item) => {
                    return (
                      <Item
                        key={item.id}
                        item={item}
                        currencyCode={cart?.currency_code}
                      />
                    )
                  })
              : repeat(5).map((i) => {
                  return <SkeletonLineItem key={i} />
                })}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

export default ItemsTemplate
