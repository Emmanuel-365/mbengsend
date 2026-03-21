import { defineRouteConfig } from "@medusajs/admin-sdk"
import { ArchiveBox, Trash, CheckCircle, PencilSquare, Phone } from "@medusajs/icons"
import { Container, Heading, Table, Badge, Button, toast, Text } from "@medusajs/ui"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { sdk } from "../../lib/client"

const ParcelRequestsPage = () => {
    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery({
        queryKey: ["parcel-requests"],
        queryFn: () => sdk.client.fetch("/admin/parcel-requests"),
    })

    const { mutate: updateStatus } = useMutation({
        mutationFn: ({ id, status }: { id: string, status: string }) => 
            sdk.client.fetch(`/admin/parcel-requests/${id}`, {
                method: "POST",
                body: { status }
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["parcel-requests"] })
            toast.success("Statut mis à jour")
        },
        onError: (err: any) => {
            toast.error(err.message || "Erreur lors de la mise à jour")
        }
    })

    const { mutate: deleteRequest, isPending: isDeleting } = useMutation({
        mutationFn: (id: string) => sdk.client.fetch(`/admin/parcel-requests/${id}`, {
            method: "DELETE"
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["parcel-requests"] })
            toast.success("Demande d'expédition supprimée")
        },
        onError: (err: any) => {
            toast.error(err.message || "Erreur lors de la suppression")
        }
    })

    // Basic styling for the status badges
    const getStatusColor = (status: string) => {
        switch (status) {
            case "PENDING":
                return "orange"
            case "ACCEPTED":
                return "blue"
            case "IN_TRANSIT":
                return "purple"
            case "DELIVERED":
                return "green"
            case "CANCELLED":
                return "red"
            default:
                return "grey"
        }
    }

    const handleDelete = (id: string) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette demande ?")) {
            deleteRequest(id)
        }
    }

    return (
        <Container className="p-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <Heading level="h1" className="text-2xl font-semibold">Demandes d'expédition</Heading>
                    <p className="text-ui-fg-subtle text-sm mt-1">Gérez les demandes de livraison de vos clients (Point A à Point B).</p>
                </div>
            </div>

            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Expéditeur</Table.HeaderCell>
                        <Table.HeaderCell>Départ ➔ Arrivée</Table.HeaderCell>
                        <Table.HeaderCell>Destinataire</Table.HeaderCell>
                        <Table.HeaderCell>Colis / Mode</Table.HeaderCell>
                        <Table.HeaderCell>Prix Est.</Table.HeaderCell>
                        <Table.HeaderCell>Statut</Table.HeaderCell>
                        <Table.HeaderCell className="text-right">Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {isLoading ? (
                        <Table.Row>
                            <Table.Cell className="text-center py-8" style={{ gridColumn: "span 8" } as React.CSSProperties}>Chargement en cours...</Table.Cell>
                        </Table.Row>
                    ) : (data as any)?.parcel_requests?.length === 0 ? (
                        <Table.Row>
                            <Table.Cell className="text-center py-8 text-ui-fg-subtle" style={{ gridColumn: "span 8" } as React.CSSProperties}>Aucune demande pour le moment.</Table.Cell>
                        </Table.Row>
                    ) : (
                        (data as any)?.parcel_requests?.map((request: any) => (
                            <Table.Row key={request.id}>
                                <Table.Cell className="text-xs">
                                     {new Date(request.created_at).toLocaleDateString('fr-FR', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                     })}
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="font-medium text-sm">{request.sender_name}</div>
                                    <div className="flex items-center gap-1 text-xs text-ui-fg-subtle">
                                        {request.sender_phone}
                                        <a 
                                            href={`https://wa.me/${request.sender_phone.replace(/\+/g, '').replace(/\s/g, '')}`} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="ml-1 text-green-600 hover:text-green-700"
                                        >
                                            <Phone className="w-3 h-3" />
                                        </a>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="flex flex-col">
                                        <Text size="small" className="font-medium">{request.origin_city}</Text>
                                        <Text size="xsmall" className="text-ui-fg-muted">➔ {request.destination_city}</Text>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="font-medium text-sm">{request.receiver_name}</div>
                                    <div className="text-xs text-ui-fg-subtle">{request.receiver_phone}</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="flex flex-col gap-1">
                                        <div className="text-xs font-medium uppercase text-ui-fg-muted">
                                            {request.shipping_mode === "air_freight" ? "Aérien" 
                                                : request.shipping_mode === "sea_freight" ? "Maritime" 
                                                : request.shipping_mode === "local_delivery" ? "Local" 
                                                : "N/A"}
                                        </div>
                                        <div className="text-xs">{request.package_weight ? `${request.package_weight} kg` : "-"}</div>
                                    </div>
                                </Table.Cell>
                                <Table.Cell className="text-sm font-medium">
                                    {request.estimated_price ? `${request.estimated_price} XAF` : "-"}
                                </Table.Cell>
                                <Table.Cell>
                                    <Badge color={getStatusColor(request.status)} size="small">
                                        {request.status}
                                    </Badge>
                                </Table.Cell>
                                <Table.Cell className="text-right">
                                    <div className="flex items-center justify-end gap-x-2">
                                        {request.status === "PENDING" && (
                                            <Button variant="secondary" size="small" onClick={() => updateStatus({ id: request.id, status: "ACCEPTED" })}>
                                                <CheckCircle /> Accepter
                                            </Button>
                                        )}
                                        {request.status === "ACCEPTED" && (
                                            <Button variant="secondary" size="small" onClick={() => updateStatus({ id: request.id, status: "IN_TRANSIT" })}>
                                                <PencilSquare /> Expédier
                                            </Button>
                                        )}
                                        {request.status === "IN_TRANSIT" && (
                                            <Button variant="secondary" size="small" onClick={() => updateStatus({ id: request.id, status: "DELIVERED" })}>
                                                <CheckCircle /> Livré
                                            </Button>
                                        )}
                                        <Button 
                                            variant="secondary" 
                                            size="small" 
                                            className="text-ui-fg-muted hover:text-red-500"
                                            disabled={isDeleting}
                                            onClick={() => handleDelete(request.id)}
                                        >
                                            <Trash />
                                        </Button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    )}
                </Table.Body>
            </Table>
        </Container>
    )
}

export const config = defineRouteConfig({
    label: "Expéditions",
    icon: ArchiveBox,
})

export default ParcelRequestsPage
