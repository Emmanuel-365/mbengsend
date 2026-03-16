"use client"

import { Input, Text } from "@medusajs/ui"
import { useState, useEffect } from "react"
import { HttpTypes } from "@medusajs/types"

type PriceFilterProps = {
    minPrice?: string
    maxPrice?: string
    setQueryParams: (name: string, value: string) => void
    region?: HttpTypes.StoreRegion | null
}

const PriceFilter = ({ minPrice, maxPrice, setQueryParams, region }: PriceFilterProps) => {
    const [localMin, setLocalMin] = useState(minPrice || "")
    const [localMax, setLocalMax] = useState(maxPrice || "")

    const currencyCode = region?.currency_code?.toUpperCase() || "EUR"

    useEffect(() => {
        setLocalMin(minPrice || "")
    }, [minPrice])

    useEffect(() => {
        setLocalMax(maxPrice || "")
    }, [maxPrice])

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalMin(e.target.value)
    }

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalMax(e.target.value)
    }

    const handleBlur = (name: string, value: string) => {
        setQueryParams(name, value)
    }

    return (
        <div className="flex flex-col gap-y-3">
            <Text className="text-base-semi font-display font-medium text-brand-dark">
                Prix ({currencyCode})
            </Text>
            <div className="flex items-center gap-x-2">
                <div className="relative flex-1">
                    <Input
                        type="number"
                        placeholder="Min"
                        value={localMin}
                        onChange={handleMinChange}
                        onBlur={() => handleBlur("min", localMin)}
                    />
                </div>
                <span className="text-ui-fg-muted">—</span>
                <div className="relative flex-1">
                    <Input
                        type="number"
                        placeholder="Max"
                        value={localMax}
                        onChange={handleMaxChange}
                        onBlur={() => handleBlur("max", localMax)}
                    />
                </div>
            </div>
        </div>
    )
}

export default PriceFilter
