import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Text, Table, Button, Input, FocusModal, toast, StatusBadge } from "@medusajs/ui"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { sdk } from "../../lib/client"
import { PencilSquare, TruckFast } from "@medusajs/icons"

const LogisticsPage = () => {
    const queryClient = useQueryClient()
    const [editingRate, setEditingRate] = useState<any>(null)

    const { data, isLoading } = useQuery({
        queryKey: ["shipping-rates"],
        queryFn: () => sdk.client.fetch(`/admin/shipping-rates`) as Promise<any>,
    })

    const updateRate = useMutation({
        mutationFn: (payload: any) =>
            sdk.client.fetch(`/admin/shipping-rates/${payload.id}`, {
                method: "POST",
                body: payload,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["shipping-rates"] })
            toast.success("Tarif mis à jour")
            setEditingRate(null)
        },
        onError: (err: any) => {
            toast.error(err.message || "Erreur lors de la mise à jour")
        }
    })

    const rates = data?.shipping_rates || []

    return (
        <Container className="flex flex-col gap-y-8 py-8">
            <div className="flex items-center gap-x-4">
                <div className="bg-ui-bg-component p-3 rounded-lg shadow-elevation-card-rest">
                    <TruckFast className="text-ui-fg-subtle" />
                </div>
                <div>
                    <Heading level="h1">Gestion Logistique Mbengsend</Heading>
                    <Text size="small" className="text-ui-fg-subtle">
                        Configure les tarifs de fret et livraison pour l'Europe et le Cameroun.
                    </Text>
                </div>
            </div>

            <Container className="p-0 overflow-hidden">
                <div className="px-6 py-4 border-b border-ui-border-base bg-ui-bg-base flex items-center justify-between">
                    <Heading level="h2">Tarifs d'expédition</Heading>
                    <StatusBadge color="green">Actif</StatusBadge>
                </div>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Méthode</Table.HeaderCell>
                            <Table.HeaderCell>Code</Table.HeaderCell>
                            <Table.HeaderCell>Tarif XAF / kg</Table.HeaderCell>
                            <Table.HeaderCell>Tarif EUR / kg</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {isLoading ? (
                            <Table.Row>
                                <Table.Cell className="text-center py-8">Chargement...</Table.Cell>
                            </Table.Row>
                        ) : rates.map((rate: any) => (
                            <Table.Row key={rate.id}>
                                <Table.Cell className="font-medium">{rate.name}</Table.Cell>
                                <Table.Cell>
                                    <code className="text-xs bg-ui-bg-subtle px-2 py-1 rounded">{rate.key}</code>
                                </Table.Cell>
                                <Table.Cell>{rate.price_xaf || 0} XAF</Table.Cell>
                                <Table.Cell>{rate.price_eur || 0} EUR</Table.Cell>
                                <Table.Cell className="text-right">
                                    <Button
                                        size="small"
                                        variant="secondary"
                                        onClick={() => setEditingRate(rate)}
                                    >
                                        <PencilSquare />
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Container>

            {editingRate && (
                <FocusModal open={!!editingRate} onOpenChange={() => setEditingRate(null)}>
                    <FocusModal.Content>
                        <FocusModal.Header>
                            <div className="flex items-center justify-end gap-x-2">
                                <FocusModal.Close asChild>
                                    <Button variant="secondary" size="small">Annuler</Button>
                                </FocusModal.Close>
                                <Button
                                    size="small"
                                    isLoading={updateRate.isPending}
                                    onClick={() => updateRate.mutate(editingRate)}
                                >
                                    Enregistrer
                                </Button>
                            </div>
                        </FocusModal.Header>
                        <FocusModal.Body className="flex flex-col gap-y-4 max-w-[600px] mx-auto pt-8">
                            <Heading level="h2">Modifier {editingRate.name}</Heading>
                            <Text className="text-ui-fg-subtle mb-4">
                                Les changements impacteront immédiatement les nouveaux calculs de livraison au checkout.
                            </Text>
                            <div className="flex flex-col gap-y-2">
                                <Text size="small" weight="plus">Prix en XAF / kg</Text>
                                <Input
                                    type="number"
                                    value={editingRate.price_xaf}
                                    onChange={(e) => setEditingRate({ ...editingRate, price_xaf: parseInt(e.target.value) })}
                                />
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <Text size="small" weight="plus">Prix en EUR / kg</Text>
                                <Input
                                    type="number"
                                    value={editingRate.price_eur}
                                    onChange={(e) => setEditingRate({ ...editingRate, price_eur: parseInt(e.target.value) })}
                                />
                            </div>
                        </FocusModal.Body>
                    </FocusModal.Content>
                </FocusModal>
            )}
        </Container>
    )
}

export const config = defineRouteConfig({
    label: "Logistique",
    icon: TruckFast,
})

export default LogisticsPage
