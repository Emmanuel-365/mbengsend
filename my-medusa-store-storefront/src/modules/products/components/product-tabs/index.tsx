"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Informations Produit",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Livraison & Retours",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="text-sm py-8 text-ui-fg-subtle">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-bold text-brand-dark block mb-1">Matière</span>
            <p>{product.material ? product.material : "-"}</p>
          </div>
          <div>
            <span className="font-bold text-brand-dark block mb-1">Pays d&apos;origine</span>
            <p>{product.origin_country ? product.origin_country : "-"}</p>
          </div>
          <div>
            <span className="font-bold text-brand-dark block mb-1">Type</span>
            <p>{product.type ? product.type.value : "-"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-bold text-brand-dark block mb-1">Poids</span>
            <p>{product.weight ? `${product.weight} g` : "-"}</p>
          </div>
          <div>
            <span className="font-bold text-brand-dark block mb-1">Dimensions</span>
            <p>
              {product.length && product.width && product.height
                ? `${product.length}L x ${product.width}W x ${product.height}H`
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-sm py-8 text-ui-fg-subtle">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-3">
          <FastDelivery className="text-brand-primary" />
          <div>
            <span className="font-bold text-brand-dark block mb-1 text-base">Livraison Rapide</span>
            <p className="max-w-sm leading-relaxed">
              Votre colis arrivera en 5 à 10 jours ouvrés directement au Cameroun (Douala/Yaoundé) ou à votre domicile.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-3">
          <Refresh className="text-brand-primary" />
          <div>
            <span className="font-bold text-brand-dark block mb-1 text-base">Échanges Simples</span>
            <p className="max-w-sm leading-relaxed">
              La taille ne convient pas ? Pas de souci - nous échangerons votre produit contre un nouveau.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-3">
          <Back className="text-brand-primary" />
          <div>
            <span className="font-bold text-brand-dark block mb-1 text-base">Retours Faciles</span>
            <p className="max-w-sm leading-relaxed">
              Il suffit de nous retourner votre produit et nous vous rembourserons. Nous ferons tout pour que votre retour soit sans tracas.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
