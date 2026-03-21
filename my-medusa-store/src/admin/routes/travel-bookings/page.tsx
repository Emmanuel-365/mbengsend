import { Container, Heading, Table, Badge, Button, toast } from "@medusajs/ui"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { sdk } from "../../lib/client" 
import { Bookmark, Trash, PencilSquare, CheckCircle } from "@medusajs/icons"
import { defineRouteConfig } from "@medusajs/admin-sdk"

const TravelBookingsPage = () => {
  const queryClient = useQueryClient()

  // 1. Fetch all bookings
  const { data, isLoading } = useQuery({
    queryKey: ["travel_bookings"],
    queryFn: async () => {
      const response = await sdk.client.fetch<any>("/admin/travel-bookings", { method: "GET" })
      return response.travel_bookings
    }
  })

  // 2. Mutation for status update
  const { mutate: updateStatus } = useMutation({
    mutationFn: async ({ id, status, payment_status }: { id: string, status?: string, payment_status?: string }) => {
      return await sdk.client.fetch<any>(`/admin/travel-bookings/${id}`, { 
        method: "POST",
        body: { status, payment_status }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["travel_bookings"] })
      toast.success("Réservation mise à jour")
    }
  })

  // 3. Mutation for deletion
  const { mutate: deleteBooking, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      return await sdk.client.fetch<any>(`/admin/travel-bookings/${id}`, { 
        method: "DELETE"
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["travel_bookings"] })
      toast.success("Réservation supprimée")
    }
  })

  const handleDelete = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette réservation ?")) {
      deleteBooking(id)
    }
  }

  if (isLoading) return <div>Chargement...</div>

  return (
    <Container className="flex flex-col gap-y-6">
      <div className="flex items-center justify-between">
        <Heading level="h1" className="flex items-center gap-x-2">
          <Bookmark /> Réservations GP (Kilos)
        </Heading>
      </div>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Client</Table.HeaderCell>
            <Table.HeaderCell>Trajet (Voyageur)</Table.HeaderCell>
            <Table.HeaderCell>Kilos</Table.HeaderCell>
            <Table.HeaderCell>Prix Total</Table.HeaderCell>
            <Table.HeaderCell>Paiement</Table.HeaderCell>
            <Table.HeaderCell>Statut</Table.HeaderCell>
            <Table.HeaderCell className="text-right">Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.map((booking: any) => (
            <Table.Row key={booking.id}>
              <Table.Cell>
                <div className="flex flex-col">
                  <span className="font-bold">{booking.buyer_first_name} {booking.buyer_last_name}</span>
                  <span className="text-xs text-ui-fg-subtle">{booking.buyer_email}</span>
                  <span className="text-xs text-ui-fg-subtle">{booking.buyer_phone}</span>
                </div>
              </Table.Cell>
              <Table.Cell>
                <div className="flex flex-col">
                   <span>{booking.travel_offer?.departure_city} → {booking.travel_offer?.destination_city}</span>
                   <span className="text-xs text-ui-fg-subtle">({booking.travel_offer?.first_name} {booking.travel_offer?.last_name})</span>
                </div>
              </Table.Cell>
              <Table.Cell>{booking.kilos_reserved} Kg</Table.Cell>
              <Table.Cell>{booking.total_price} €</Table.Cell>
              <Table.Cell>
                <Badge color={booking.payment_status === "paid" ? "green" : "orange"}>
                  {booking.payment_status}
                </Badge>
              </Table.Cell>
              <Table.Cell>
                <Badge color={booking.status === "delivered" ? "green" : "blue"}>
                  {booking.status}
                </Badge>
              </Table.Cell>
              <Table.Cell className="text-right">
                <div className="flex items-center justify-end gap-x-2">
                  {booking.payment_status === "pending" && (
                     <Button variant="secondary" size="small" onClick={() => updateStatus({ id: booking.id, payment_status: "paid" })}>
                        <CheckCircle /> Payé
                     </Button>
                  )}
                  {booking.status === "pending" && (
                     <Button variant="secondary" size="small" onClick={() => updateStatus({ id: booking.id, status: "package_received" })}>
                        <PencilSquare /> Colis reçu
                     </Button>
                  )}
                  <Button 
                    variant="secondary" 
                    size="small" 
                    disabled={isDeleting}
                    className="text-ui-fg-muted hover:text-red-500"
                    onClick={() => handleDelete(booking.id)}
                  >
                    <Trash />
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  )
}

export const config = defineRouteConfig({
    label: "Réservations GP",
    icon: Bookmark,
})

export default TravelBookingsPage
