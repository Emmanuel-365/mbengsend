import { Text } from "@medusajs/ui"

import NextJs from "../../../common/icons/nextjs"

const MedusaCTA = () => {
  return (
    <Text className="flex gap-x-2 txt-compact-small-plus items-center text-ui-fg-subtle hover:text-ui-fg-base transition-colors duration-200">
      <span className="text-brand-dark/50">Propulsé avec excellence par</span>
      <span className="font-display font-medium text-brand-primary tracking-wide">Mbengsend</span>
      <span className="text-brand-dark/30">&</span>
      <a href="https://nextjs.org" target="_blank" rel="noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
        <NextJs fill="#9ca3af" />
      </a>
    </Text>
  )
}

export default MedusaCTA
