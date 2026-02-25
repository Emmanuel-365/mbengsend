import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Text, Table, Button, StatusBadge, toast, usePrompt } from "@medusajs/ui"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { sdk } from "../../lib/client"
import { StarSolid, CheckCircleSolid, XCircleSolid, Trash } from "@medusajs/icons"

const ReviewsPage = () => {
    const queryClient = useQueryClient()
    const prompt = usePrompt()

    const { data, isLoading } = useQuery({
        queryKey: ["admin-reviews"],
        queryFn: () => sdk.client.fetch(`/admin/reviews`) as Promise<any>,
    })

    const updateStatus = useMutation({
        mutationFn: ({ id, status }: { id: string, status: string }) =>
            sdk.client.fetch(`/admin/reviews/${id}`, {
                method: "POST",
                body: { status },
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-reviews"] })
            toast.success("Statut de l'avis mis à jour")
        },
        onError: (err: any) => {
            toast.error(err.message || "Une erreur est survenue")
        }
    })

    const deleteReview = useMutation({
        mutationFn: (id: string) =>
            sdk.client.fetch(`/admin/reviews/${id}`, {
                method: "DELETE"
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-reviews"] })
            toast.success("Avis supprimé")
        }
    })

    const handleDelete = async (id: string) => {
        const confirm = await prompt({
            title: "Supprimer l'avis ?",
            description: "Cette action est irréversible.",
            confirmText: "Supprimer",
            cancelText: "Annuler",
        })

        if (confirm) {
            deleteReview.mutate(id)
        }
    }

    const reviews = data?.reviews || []

    const getStatusColor = (status: string) => {
        switch (status) {
            case "approved": return "green"
            case "rejected": return "red"
            default: return "orange"
        }
    }

    return (
        <Container className="flex flex-col gap-y-8 py-8">
            <div className="flex items-center gap-x-4">
                <div className="bg-ui-bg-component p-3 rounded-lg shadow-elevation-card-rest">
                    <StarSolid className="text-ui-fg-subtle" />
                </div>
                <div>
                    <Heading level="h1">Modération des Avis</Heading>
                    <Text size="small" className="text-ui-fg-subtle">
                        Gère les témoignages clients et leur visibilité sur le store.
                    </Text>
                </div>
            </div>

            <Container className="p-0 overflow-hidden">
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Client</Table.HeaderCell>
                            <Table.HeaderCell>Note</Table.HeaderCell>
                            <Table.HeaderCell>Commentaire</Table.HeaderCell>
                            <Table.HeaderCell>Statut</Table.HeaderCell>
                            <Table.HeaderCell className="text-right">Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {isLoading ? (
                            <Table.Row>
                                <Table.Cell className="text-center py-8">Chargement...</Table.Cell>
                            </Table.Row>
                        ) : reviews.length === 0 ? (
                            <Table.Row>
                                <Table.Cell className="text-center py-8">Aucun avis trouvé</Table.Cell>
                            </Table.Row>
                        ) : reviews.map((review: any) => (
                            <Table.Row key={review.id}>
                                <Table.Cell className="font-medium">
                                    <div className="flex flex-col">
                                        <span>{review.author_name}</span>
                                        <span className="text-xs text-ui-fg-muted">{review.customer_id}</span>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="flex items-center gap-x-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <StarSolid key={i} className={`h-3 w-3 ${i < review.rating ? "text-orange-400" : "text-ui-fg-muted"}`} />
                                        ))}
                                    </div>
                                </Table.Cell>
                                <Table.Cell className="max-w-md">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-sm">{review.title}</span>
                                        <span className="text-sm line-clamp-2">{review.comment}</span>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <StatusBadge color={getStatusColor(review.status)}>
                                        {review.status}
                                    </StatusBadge>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="flex items-center justify-end gap-x-2">
                                        {review.status !== "approved" && (
                                            <Button 
                                                size="small" 
                                                variant="secondary"
                                                onClick={() => updateStatus.mutate({ id: review.id, status: "approved" })}
                                            >
                                                <CheckCircleSolid className="text-green-500" />
                                            </Button>
                                        )}
                                        {review.status !== "rejected" && (
                                            <Button 
                                                size="small" 
                                                variant="secondary"
                                                onClick={() => updateStatus.mutate({ id: review.id, status: "rejected" })}
                                            >
                                                <XCircleSolid className="text-red-500" />
                                            </Button>
                                        )}
                                        <Button 
                                            size="small" 
                                            variant="secondary"
                                            onClick={() => handleDelete(review.id)}
                                        >
                                            <Trash className="text-ui-fg-subtle" />
                                        </Button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Container>
        </Container>
    )
}

export const config = defineRouteConfig({
    label: "Avis Clients",
    icon: StarSolid,
})

export default ReviewsPage
