"use client"

import { clx } from "@medusajs/ui"
import { ArrowRightOnRectangle } from "@medusajs/icons"
import { useParams, usePathname } from "next/navigation"

import ChevronDown from "@modules/common/icons/chevron-down"
import User from "@modules/common/icons/user"
import MapPin from "@modules/common/icons/map-pin"
import Package from "@modules/common/icons/package"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { signout } from "@lib/data/customer"

const AccountNav = ({
  customer,
}: {
  customer: HttpTypes.StoreCustomer | null
}) => {
  const route = usePathname()
  const { countryCode } = useParams() as { countryCode: string }

  const handleLogout = async () => {
    await signout(countryCode)
  }

  return (
    <div>
      <div className="small:hidden" data-testid="mobile-account-nav">
        {route !== `/${countryCode}/account` ? (
          <LocalizedClientLink
            href="/account"
            className="flex items-center gap-x-2 text-sm font-bold py-2 text-ui-fg-subtle hover:text-brand-primary transition-colors"
            data-testid="account-main-link"
          >
            <>
              <ChevronDown className="transform rotate-90" />
              <span>Compte</span>
            </>
          </LocalizedClientLink>
        ) : (
          <>
            <div className="text-2xl font-display font-bold text-brand-dark mb-6 px-4">
              Bonjour {customer?.first_name}
            </div>
            <div className="text-base text-brand-dark">
              <ul className="flex flex-col gap-y-2">
                <li>
                  <LocalizedClientLink
                    href="/account/profile"
                    className="flex items-center justify-between py-4 border-b border-gray-100 px-4 hover:bg-gray-50 transition-all rounded-xl"
                    data-testid="profile-link"
                  >
                    <>
                      <div className="flex items-center gap-x-3">
                        <User size={20} className="text-brand-primary" />
                        <span className="font-semibold">Profil</span>
                      </div>
                      <ChevronDown className="transform -rotate-90 text-gray-300" />
                    </>
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/addresses"
                    className="flex items-center justify-between py-4 border-b border-gray-100 px-4 hover:bg-gray-50 transition-all rounded-xl"
                    data-testid="addresses-link"
                  >
                    <>
                      <div className="flex items-center gap-x-3">
                        <MapPin size={20} className="text-brand-primary" />
                        <span className="font-semibold">Adresses</span>
                      </div>
                      <ChevronDown className="transform -rotate-90 text-gray-300" />
                    </>
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/orders"
                    className="flex items-center justify-between py-4 border-b border-gray-100 px-4 hover:bg-gray-50 transition-all rounded-xl"
                    data-testid="orders-link"
                  >
                    <div className="flex items-center gap-x-3">
                      <Package size={20} className="text-brand-primary" />
                      <span className="font-semibold">Commandes</span>
                    </div>
                    <ChevronDown className="transform -rotate-90 text-gray-300" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <button
                    type="button"
                    className="flex items-center justify-between py-4 border-b border-gray-100 px-4 w-full hover:bg-gray-50 transition-all rounded-xl text-left"
                    onClick={handleLogout}
                    data-testid="logout-button"
                  >
                    <div className="flex items-center gap-x-3">
                      <ArrowRightOnRectangle className="text-red-500" />
                      <span className="font-semibold text-red-500">Se déconnecter</span>
                    </div>
                    <ChevronDown className="transform -rotate-90 text-gray-300" />
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="hidden small:block" data-testid="account-nav">
        <div>
          <div className="pb-6 border-b border-gray-100 mb-6 font-display">
            <h3 className="text-xs font-bold text-brand-dark uppercase tracking-widest opacity-40">Mon Compte</h3>
          </div>
          <div className="text-base font-medium">
            <ul className="flex mb-0 justify-start items-start flex-col gap-y-2">
              <li className="w-full">
                <AccountNavLink
                  href="/account"
                  route={route!}
                  data-testid="overview-link"
                >
                  Aperçu
                </AccountNavLink>
              </li>
              <li className="w-full">
                <AccountNavLink
                  href="/account/profile"
                  route={route!}
                  data-testid="profile-link"
                >
                  Profil
                </AccountNavLink>
              </li>
              <li className="w-full">
                <AccountNavLink
                  href="/account/addresses"
                  route={route!}
                  data-testid="addresses-link"
                >
                  Adresses
                </AccountNavLink>
              </li>
              <li className="w-full">
                <AccountNavLink
                  href="/account/orders"
                  route={route!}
                  data-testid="orders-link"
                >
                  Commandes
                </AccountNavLink>
              </li>
              <li className="w-full mt-6 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-x-3 text-ui-fg-subtle hover:text-red-500 transition-colors font-semibold py-2"
                  data-testid="logout-button"
                >
                  <ArrowRightOnRectangle />
                  Se déconnecter
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

type AccountNavLinkProps = {
  href: string
  route: string
  children: React.ReactNode
  "data-testid"?: string
}

const AccountNavLink = ({
  href,
  route,
  children,
  "data-testid": dataTestId,
}: AccountNavLinkProps) => {
  const { countryCode }: { countryCode: string } = useParams()

  const active = route.split(countryCode)[1] === href
  return (
    <LocalizedClientLink
      href={href}
      className={clx("text-ui-fg-subtle hover:text-ui-fg-base", {
        "text-ui-fg-base font-semibold": active,
      })}
      data-testid={dataTestId}
    >
      {children}
    </LocalizedClientLink>
  )
}

export default AccountNav
