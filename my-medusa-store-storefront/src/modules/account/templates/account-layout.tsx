import React from "react"

import UnderlineLink from "@modules/common/components/interactive-link"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div className="flex-1 py-12" data-testid="account-page">
      <div className="content-container mx-auto max-w-5xl">
        {customer ? (
          <div className="grid grid-cols-1 small:grid-cols-[240px_1fr] py-12 gap-12 items-start">
            <div className="small:sticky small:top-32 small:border-r border-gray-100 pr-0 small:pr-8">
              <AccountNav customer={customer} />
            </div>
            <div className="flex-1">{children}</div>
          </div>
        ) : (
          <div className="py-12">
            {children}
          </div>
        )}
        <div className="flex flex-col small:flex-row items-end justify-between border-t border-gray-100 py-12 gap-8 mt-12">
          <div>
            <h3 className="text-2xl font-display font-bold text-brand-dark mb-4">Des questions ?</h3>
            <span className="text-ui-fg-subtle leading-relaxed">
              Vous trouverez les questions fréquemment posées et les réponses sur notre page de service client.
            </span>
          </div>
          <div className="flex-shrink-0">
            <UnderlineLink href="/customer-service" className="text-brand-primary font-bold hover:text-brand-secondary transition-colors underline-offset-8">
              Service Client
            </UnderlineLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
