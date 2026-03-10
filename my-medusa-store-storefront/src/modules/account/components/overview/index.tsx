import { Container } from "@medusajs/ui"

import ChevronDown from "@modules/common/icons/chevron-down"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null
  orders: HttpTypes.StoreOrder[] | null
}

const Overview = ({ customer, orders }: OverviewProps) => {
  return (
    <div data-testid="overview-page-wrapper">
      <div className="hidden small:block">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-display font-bold text-brand-dark tracking-tight" data-testid="welcome-message" data-value={customer?.first_name}>
            Bonjour <span className="text-brand-primary">{customer?.first_name}</span> 👋
          </h2>
          <div className="text-sm text-gray-400 font-medium">
            Connecté en tant que :{" "}
            <span
              className="font-bold text-brand-dark"
              data-testid="customer-email"
              data-value={customer?.email}
            >
              {customer?.email}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-y-12">
          <div className="grid grid-cols-1 small:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-100 p-10 rounded-3xl shadow-lux-sm group hover:bg-gray-50/50 transition-all duration-300">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary mb-6">Profil Mbengsend</h3>
              <div className="flex items-end gap-x-4">
                <span
                  className="text-6xl font-display font-bold text-brand-dark leading-none tracking-tighter"
                  data-testid="customer-profile-completion"
                  data-value={getProfileCompletion(customer)}
                >
                  {getProfileCompletion(customer)}%
                </span>
                <span className="uppercase text-[10px] font-bold text-gray-400 mb-1.5 tracking-widest px-2 py-1 bg-gray-50 rounded-md">
                  Complété
                </span>
              </div>
            </div>

            <div className="bg-white border border-gray-100 p-10 rounded-3xl shadow-lux-sm group hover:bg-gray-50/50 transition-all duration-300">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary mb-6">Adresses Enregistrées</h3>
              <div className="flex items-end gap-x-4">
                <span
                  className="text-6xl font-display font-bold text-brand-dark leading-none tracking-tighter"
                  data-testid="addresses-count"
                  data-value={customer?.addresses?.length || 0}
                >
                  {customer?.addresses?.length || 0}
                </span>
                <span className="uppercase text-[10px] font-bold text-gray-400 mb-1.5 tracking-widest px-2 py-1 bg-gray-50 rounded-md">
                  Lieux
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="text-xl font-display font-bold text-brand-dark tracking-tight">Commandes récentes</h3>
              <LocalizedClientLink href="/account/orders" className="text-sm font-bold text-brand-primary hover:text-brand-secondary transition-all hover:translate-x-1">
                Voir tout l&apos;historique →
              </LocalizedClientLink>
            </div>

            <ul
              className="flex flex-col gap-y-4"
              data-testid="orders-wrapper"
            >
              {orders && orders.length > 0 ? (
                orders.slice(0, 5).map((order) => {
                  return (
                    <li
                      key={order.id}
                      data-testid="order-wrapper"
                      data-value={order.id}
                    >
                      <LocalizedClientLink
                        href={`/account/orders/details/${order.id}`}
                      >
                        <Container className="bg-white border border-gray-100 hover:bg-gray-50 transition-all flex justify-between items-center p-8 rounded-3xl group shadow-sm hover:shadow-lux-sm border-none ring-1 ring-gray-100">
                          <div className="grid grid-cols-3 gap-x-12 flex-1">
                            <div className="flex flex-col gap-y-1.5">
                              <span className="text-[10px] uppercase font-bold tracking-[0.15em] text-gray-400">Date</span>
                              <span className="text-sm font-semibold text-brand-dark tracking-tight" data-testid="order-created-date">
                                {new Date(order.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </span>
                            </div>
                            <div className="flex flex-col gap-y-1.5">
                              <span className="text-[10px] uppercase font-bold tracking-[0.15em] text-gray-400">Référence</span>
                              <span
                                className="text-sm font-bold text-brand-primary tracking-tight"
                                data-testid="order-id"
                                data-value={order.display_id}
                              >
                                #{order.display_id}
                              </span>
                            </div>
                            <div className="flex flex-col gap-y-1.5">
                              <span className="text-[10px] uppercase font-bold tracking-[0.15em] text-gray-400">Total</span>
                              <span className="text-sm font-bold text-brand-dark tracking-tight" data-testid="order-amount">
                                {convertToLocale({
                                  amount: order.total,
                                  currency_code: order.currency_code,
                                })}
                              </span>
                            </div>
                          </div>
                          <div
                            className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 border border-gray-100 text-gray-400 group-hover:border-brand-primary/30 group-hover:bg-brand-primary/5 group-hover:text-brand-primary transition-all duration-300"
                            data-testid="open-order-button"
                          >
                            <ChevronDown className="-rotate-90 w-4 h-4" />
                          </div>
                        </Container>
                      </LocalizedClientLink>
                    </li>
                  )
                })
              ) : (
                <div className="text-center py-24 bg-gray-50/50 border border-dashed border-gray-200 rounded-3xl">
                  <span className="text-gray-400 font-medium tracking-tight" data-testid="no-orders-message">Aucune commande récente trouvée</span>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

const getProfileCompletion = (customer: HttpTypes.StoreCustomer | null) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) {
    count++
  }

  if (customer.first_name && customer.last_name) {
    count++
  }

  if (customer.phone) {
    count++
  }

  const billingAddress = customer.addresses?.find(
    (addr) => addr.is_default_billing
  )

  if (billingAddress) {
    count++
  }

  return (count / 4) * 100
}

export default Overview
