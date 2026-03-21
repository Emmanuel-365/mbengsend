import { Container, Heading, Table, Badge, Button, toast } from "@medusajs/ui"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { sdk } from "../../lib/client" 
import { FlyingBox, Trash } from "@medusajs/icons"
import { defineRouteConfig } from "@medusajs/admin-sdk"
import { useState } from "react"

const TravelOffersPage = () => {
  const queryClient = useQueryClient()

  // On récupère toutes les offres via l'API
  const { data, isLoading } = useQuery({
    queryKey: ["travel_offers"],
    queryFn: async () => {
      const response = await sdk.client.fetch<any>("/admin/travel-offers", { method: "GET" })
      return response.travel_offers
    }
  })

  // Mutation pour approuver
  const { mutate: approveOffer } = useMutation({
    mutationFn: async ({ id, sellingPrice }: { id: string, sellingPrice: number }) => {
      return await sdk.client.fetch<any>(`/admin/travel-offers/${id}/approve`, { 
        method: "POST",
        body: { selling_price_per_kilo: sellingPrice }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["travel_offers"] })
      toast.success("Offre approuvée")
    }
  })

  // Mutation pour supprimer
  const { mutate: deleteOffer, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      return await sdk.client.fetch<any>(`/admin/travel-offers/${id}`, { 
        method: "DELETE"
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["travel_offers"] })
      toast.success("Offre supprimée")
    },
    onError: (err: any) => {
      toast.error(err.message || "Erreur lors de la suppression")
    }
  })

  const [sellingPrices, setSellingPrices] = useState<Record<string, number>>({})

  const handleDelete = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette offre ?")) {
      deleteOffer(id)
    }
  }

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
            <Table.HeaderCell>Prix/kg (Achat)</Table.HeaderCell>
            <Table.HeaderCell>Prix/kg (Vente)</Table.HeaderCell>
            <Table.HeaderCell>Statut</Table.HeaderCell>
            <Table.HeaderCell className="text-right">Actions</Table.HeaderCell>
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
                {offer.status === "pending" ? (
                  <input 
                    type="number" 
                    className="w-20 px-2 py-1 border border-ui-border-base rounded-md text-sm"
                    placeholder="Prix vente"
                    value={sellingPrices[offer.id] || ""}
                    onChange={(e) => setSellingPrices(prev => ({ ...prev, [offer.id]: Number(e.target.value) }))}
                  />
                ) : (
                  <span>{offer.selling_price_per_kilo || offer.price_per_kilo} €</span>
                )}
              </Table.Cell>
              <Table.Cell>
                <Badge color={offer.status === "approved" ? "green" : "orange"}>
                  {offer.status}
                </Badge>
              </Table.Cell>
              <Table.Cell className="text-right">
                <div className="flex items-center justify-end gap-x-2">
                  {offer.status === "pending" && (
                    <Button 
                      variant="secondary" 
                      size="small" 
                      disabled={!sellingPrices[offer.id] || isDeleting}
                      onClick={() => approveOffer({ id: offer.id, sellingPrice: sellingPrices[offer.id] })}
                    >
                      Approuver
                    </Button>
                  )}
                  <Button 
                    variant="secondary" 
                    size="small" 
                    disabled={isDeleting}
                    className="text-ui-fg-muted hover:text-red-500"
                    onClick={() => handleDelete(offer.id)}
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
    label: "Gestion GP",
    icon: FlyingBox,
})

export default TravelOffersPage
