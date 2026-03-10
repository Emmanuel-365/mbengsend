"use client"

import React, { useEffect, useState, useActionState } from "react"
import { PencilSquare as Edit, Trash } from "@medusajs/icons"
import { Button, Heading, Text, clx } from "@medusajs/ui"

import useToggleState from "@lib/hooks/use-toggle-state"
import CountrySelect from "@modules/checkout/components/country-select"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import Spinner from "@modules/common/icons/spinner"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { HttpTypes } from "@medusajs/types"
import {
  deleteCustomerAddress,
  updateCustomerAddress,
} from "@lib/data/customer"

type EditAddressProps = {
  region: HttpTypes.StoreRegion
  address: HttpTypes.StoreCustomerAddress
  isActive?: boolean
}

const EditAddress: React.FC<EditAddressProps> = ({
  region,
  address,
  isActive = false,
}) => {
  const [removing, setRemoving] = useState(false)
  const [successState, setSuccessState] = useState(false)
  const { state, open, close: closeModal } = useToggleState(false)

  const [formState, formAction] = useActionState(updateCustomerAddress, {
    success: false,
    error: null,
    addressId: address.id,
  })

  const close = () => {
    setSuccessState(false)
    closeModal()
  }

  useEffect(() => {
    if (successState) {
      close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successState])

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true)
    }
  }, [formState])

  const removeAddress = async () => {
    setRemoving(true)
    await deleteCustomerAddress(address.id)
    setRemoving(false)
  }

  return (
    <>
      <div
        className={clx(
          "rounded-3xl p-8 min-h-[220px] h-full w-full flex flex-col justify-between transition-all duration-300 bg-white border shadow-lux-sm hover:shadow-lux-md group",
          {
            "border-brand-primary ring-2 ring-brand-primary/10": isActive,
            "border-gray-100": !isActive,
          }
        )}
        data-testid="address-container"
      >
        <div className="flex flex-col">
          <Heading
            className="text-left text-xl font-display font-bold text-brand-dark mb-3 tracking-tight"
            data-testid="address-name"
          >
            {address.first_name} {address.last_name}
          </Heading>
          {address.company && (
            <div className="mb-4">
              <span
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary px-2 py-1 bg-brand-primary/5 rounded-md"
                data-testid="address-company"
              >
                {address.company}
              </span>
            </div>
          )}
          <div className="flex flex-col text-left text-sm text-ui-fg-subtle space-y-1 mt-auto">
            <span data-testid="address-address" className="font-semibold text-brand-dark">
              {address.address_1}
              {address.address_2 && <span>, {address.address_2}</span>}
            </span>
            <span data-testid="address-postal-city" className="font-medium">
              {address.postal_code}, {address.city}
            </span>
            <span data-testid="address-province-country" className="font-medium">
              {address.province && `${address.province}, `}
              {address.country_code?.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-x-8 mt-10 pt-8 border-t border-gray-100">
          <button
            className="text-xs font-bold text-brand-primary flex items-center gap-x-2 hover:text-brand-secondary transition-all hover:translate-x-0.5"
            onClick={open}
            data-testid="address-edit-button"
          >
            <Edit width={16} height={16} />
            MODIFIER
          </button>
          <button
            className="text-xs font-bold text-gray-400 flex items-center gap-x-2 hover:text-red-500 transition-all"
            onClick={removeAddress}
            data-testid="address-delete-button"
          >
            {removing ? <Spinner className="animate-spin" /> : <Trash width={16} height={16} />}
            SUPPRIMER
          </button>
        </div>
      </div>

      <Modal isOpen={state} close={close} data-testid="edit-address-modal">
        <Modal.Title>
          <Heading className="mb-2 font-display">Modifier l&apos;adresse</Heading>
        </Modal.Title>
        <form action={formAction}>
          <input type="hidden" name="addressId" value={address.id} />
          <Modal.Body>
            <div className="grid grid-cols-1 gap-y-4">
              <div className="grid grid-cols-2 gap-x-4">
                <Input
                  label="Prénom"
                  name="first_name"
                  required
                  autoComplete="given-name"
                  defaultValue={address.first_name || undefined}
                  data-testid="first-name-input"
                />
                <Input
                  label="Nom"
                  name="last_name"
                  required
                  autoComplete="family-name"
                  defaultValue={address.last_name || undefined}
                  data-testid="last-name-input"
                />
              </div>
              <Input
                label="Entreprise"
                name="company"
                autoComplete="organization"
                defaultValue={address.company || undefined}
                data-testid="company-input"
              />
              <Input
                label="Adresse"
                name="address_1"
                required
                autoComplete="address-line1"
                defaultValue={address.address_1 || undefined}
                data-testid="address-1-input"
              />
              <Input
                label="Appartement, suite, etc. (optionnel)"
                name="address_2"
                autoComplete="address-line2"
                defaultValue={address.address_2 || undefined}
                data-testid="address-2-input"
              />
              <div className="grid grid-cols-[144px_1fr] gap-x-4">
                <Input
                  label="Code postal"
                  name="postal_code"
                  required
                  autoComplete="postal-code"
                  defaultValue={address.postal_code || undefined}
                  data-testid="postal-code-input"
                />
                <Input
                  label="Ville"
                  name="city"
                  required
                  autoComplete="locality"
                  defaultValue={address.city || undefined}
                  data-testid="city-input"
                />
              </div>
              <Input
                label="Région / État"
                name="province"
                autoComplete="address-level1"
                defaultValue={address.province || undefined}
                data-testid="state-input"
              />
              <CountrySelect
                name="country_code"
                region={region}
                required
                autoComplete="country"
                defaultValue={address.country_code || undefined}
                data-testid="country-select"
              />
              <Input
                label="Téléphone"
                name="phone"
                autoComplete="phone"
                defaultValue={address.phone || undefined}
                data-testid="phone-input"
              />
            </div>
            {formState.error && (
              <div className="text-red-500 text-sm py-2 px-4 bg-red-50 rounded-lg mt-4">
                {formState.error}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <div className="flex gap-3 mt-6">
              <Button
                type="reset"
                variant="secondary"
                onClick={close}
                className="h-12 px-6 rounded-full border-gray-200 text-brand-dark font-bold hover:bg-gray-50 transition-all text-xs"
                data-testid="cancel-button"
              >
                Annuler
              </Button>
              <SubmitButton data-testid="save-button" className="h-12 px-8 rounded-full bg-brand-primary hover:bg-brand-secondary text-white font-bold transition-all shadow-lux-sm hover:shadow-lux-md border-none">Enregistrer</SubmitButton>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default EditAddress
