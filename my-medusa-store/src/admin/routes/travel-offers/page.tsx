import { Container, Heading, Table, Badge, Button } from "@medusajs/ui"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { sdk } from "../../lib/client" 
import { FlyingBox } from "@medusajs/icons"

const TravelOffersPage = () => {
  const queryClient = useQueryClient()

  // On récupère toutes les offres via l'API (on utilisera une route admin existante ou générique)
  const { data, isLoading } = useQuery({
    queryKey: ["travel_offers"],
    queryFn: async () => {
      const response = await sdk.client.fetch<any>("/admin/travel-offers", { method: "GET" })
      return response.travel_offers
    }
  })

  // Mutation pour approuver
  const { mutate: approveOffer } = useMutation({
    mutationFn: async (id: string) => {
      return await sdk.client.fetch<any>(`/admin/travel-offers/${id}/approve`, { method: "POST" })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["travel_offers"] })
    }
  })

  if (isLoading) return <div>Chargement...</div>

  return (
    <Container className="flex flex-col gap-y-6">
      <div className="flex items-center justify-between">
        <Heading level="h1" className="flex items-center gap-x-2">
          <FlyingBox /> Offres GP (Voyageurs)
        </Heading>
      </div>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Voyageur</Table.HeaderCell>
            <Table.HeaderCell>Trajet</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Kilos</Table.HeaderCell>
            <Table.HeaderCell>Prix/kg</Table.HeaderCell>
            <Table.HeaderCell>Statut</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.map((offer: any) => (
            <Table.Row key={offer.id}>
              <Table.Cell>
                <div className="flex flex-col">
                  <span className="font-bold">{offer.first_name} {offer.last_name}</span>
                  <span className="text-xs text-ui-fg-subtle">{offer.email}</span>
                </div>
              </Table.Cell>
              <Table.Cell>{offer.departure_city} → {offer.destination_city}</Table.Cell>
              <Table.Cell>{new Date(offer.departure_date).toLocaleDateString()}</Table.Cell>
              <Table.Cell>{offer.available_kilos} Kg</Table.Cell>
              <Table.Cell>{offer.price_per_kilo} €</Table.Cell>
              <Table.Cell>
                <Badge color={offer.status === "approved" ? "green" : "orange"}>
                  {offer.status}
                </Badge>
              </Table.Cell>
              <Table.Cell>
                {offer.status === "pending" && (
                  <Button variant="secondary" size="small" onClick={() => approveOffer(offer.id)}>
                    Approuver
                  </Button>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  )
}

export const config = {
  label: "Gestion GP",
  icon: FlyingBox,
}

export default TravelOffersPage
