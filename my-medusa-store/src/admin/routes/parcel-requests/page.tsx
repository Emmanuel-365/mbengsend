import { defineRouteConfig } from "@medusajs/admin-sdk"
import { ArchiveBox } from "@medusajs/icons"
import { Container, Heading, Table, Badge } from "@medusajs/ui"
import { useQuery } from "@tanstack/react-query"
import { sdk } from "../../lib/client"

const ParcelRequestsPage = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["parcel-requests"],
        queryFn: () => sdk.client.fetch("/admin/parcel-requests"),
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
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Expéditeur</Table.HeaderCell>
                        <Table.HeaderCell>Départ</Table.HeaderCell>
                        <Table.HeaderCell>Destinataire</Table.HeaderCell>
                        <Table.HeaderCell>Arrivée</Table.HeaderCell>
                        <Table.HeaderCell>Colis (Kg)</Table.HeaderCell>
                        <Table.HeaderCell>Statut</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {isLoading ? (
                        <Table.Row>
                            <Table.Cell className="text-center py-8" style={{ gridColumn: "span 7" } as React.CSSProperties}>Chargement en cours...</Table.Cell>
                        </Table.Row>
                    ) : (data as any)?.parcel_requests?.length === 0 ? (
                        <Table.Row>
                            <Table.Cell className="text-center py-8 text-ui-fg-subtle" style={{ gridColumn: "span 7" } as React.CSSProperties}>Aucune demande pour le moment.</Table.Cell>
                        </Table.Row>
                    ) : (
                        (data as any)?.parcel_requests?.map((request: any) => (
                            <Table.Row key={request.id}>
                                <Table.Cell className="text-xs font-mono text-ui-fg-subtle">{request.id.slice(0, 8)}...</Table.Cell>
                                <Table.Cell>
                                    <div className="font-medium text-sm">{request.sender_name}</div>
                                    <div className="text-xs text-ui-fg-subtle">{request.sender_phone}</div>
                                </Table.Cell>
                                <Table.Cell>{request.origin_city}</Table.Cell>
                                <Table.Cell>
                                    <div className="font-medium text-sm">{request.receiver_name}</div>
                                    <div className="text-xs text-ui-fg-subtle">{request.receiver_phone}</div>
                                </Table.Cell>
                                <Table.Cell>{request.destination_city}</Table.Cell>
                                <Table.Cell>
                                    {request.package_weight ? `${request.package_weight} kg` : "-"}
                                </Table.Cell>
                                <Table.Cell>
                                    <Badge color={getStatusColor(request.status)} size="small">
                                        {request.status}
                                    </Badge>
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
