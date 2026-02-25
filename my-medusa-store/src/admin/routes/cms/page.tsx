import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Text, Table, Button, Input, toast, Tabs, Switch, Label, Textarea } from "@medusajs/ui"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { sdk } from "../../lib/client"
import { Photo, DocumentText, Plus } from "@medusajs/icons"
import { useState } from "react"

const CmsPage = () => {
    const queryClient = useQueryClient()
    const [isAddingBanner, setIsAddingBanner] = useState(false)
    const [isAddingPage, setIsAddingPage] = useState(false)

    // Banners Queries
    const { data: bannersData, isLoading: isLoadingBanners } = useQuery({
        queryKey: ["admin-banners"],
        queryFn: () => sdk.client.fetch(`/admin/cms/banners`) as Promise<any>,
    })

    // Pages Queries
    const { data: pagesData, isLoading: isLoadingPages } = useQuery({
        queryKey: ["admin-pages"],
        queryFn: () => sdk.client.fetch(`/admin/cms/pages`) as Promise<any>,
    })

    return (
        <Container className="flex flex-col gap-y-8 py-8">
            <div className="flex items-center gap-x-4">
                <div className="bg-ui-bg-component p-3 rounded-lg shadow-elevation-card-rest">
                    <Photo className="text-ui-fg-subtle" />
                </div>
                <div>
                    <Heading level="h1">Gestion de Contenu (CMS)</Heading>
                    <Text size="small" className="text-ui-fg-subtle">
                        Gère les bannières publicitaires et les pages statiques de ton store.
                    </Text>
                </div>
            </div>

            <Tabs defaultValue="banners">
                <Tabs.List>
                    <Tabs.Trigger value="banners">Bannières</Tabs.Trigger>
                    <Tabs.Trigger value="pages">Pages</Tabs.Trigger>
                </Tabs.List>
                
                <Tabs.Content value="banners" className="pt-4">
                    <Container className="p-0 overflow-hidden">
                        <div className="px-6 py-4 border-b flex justify-between items-center">
                            <Heading level="h2">Bannières</Heading>
                            <Button size="small" variant="secondary" onClick={() => setIsAddingBanner(true)}>
                                <Plus /> Ajouter
                            </Button>
                        </div>
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Image</Table.HeaderCell>
                                    <Table.HeaderCell>Titre</Table.HeaderCell>
                                    <Table.HeaderCell>Lien</Table.HeaderCell>
                                    <Table.HeaderCell>Statut</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {isLoadingBanners ? (
                                    <Table.Row><Table.Cell colSpan={4} className="text-center py-4">Chargement...</Table.Cell></Table.Row>
                                ) : bannersData?.banners?.map((banner: any) => (
                                    <Table.Row key={banner.id}>
                                        <Table.Cell>
                                            <img src={banner.image_url} alt={banner.title} className="w-20 h-10 object-cover rounded border" />
                                        </Table.Cell>
                                        <Table.Cell>{banner.title}</Table.Cell>
                                        <Table.Cell className="text-xs text-ui-fg-muted">{banner.link}</Table.Cell>
                                        <Table.Cell>{banner.is_active ? "Actif" : "Inactif"}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Container>
                </Tabs.Content>

                <Tabs.Content value="pages" className="pt-4">
                    <Container className="p-0 overflow-hidden">
                        <div className="px-6 py-4 border-b flex justify-between items-center">
                            <Heading level="h2">Pages Statiques</Heading>
                            <Button size="small" variant="secondary" onClick={() => setIsAddingPage(true)}>
                                <Plus /> Créer une page
                            </Button>
                        </div>
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Titre</Table.HeaderCell>
                                    <Table.HeaderCell>Handle</Table.HeaderCell>
                                    <Table.HeaderCell>Statut</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {isLoadingPages ? (
                                    <Table.Row><Table.Cell colSpan={3} className="text-center py-4">Chargement...</Table.Cell></Table.Row>
                                ) : pagesData?.pages?.map((page: any) => (
                                    <Table.Row key={page.id}>
                                        <Table.Cell className="font-medium">{page.title}</Table.Cell>
                                        <Table.Cell><code>/{page.handle}</code></Table.Cell>
                                        <Table.Cell>{page.is_published ? "Publié" : "Brouillon"}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Container>
                </Tabs.Content>
            </Tabs>
        </Container>
    )
}

export const config = defineRouteConfig({
    label: "CMS",
    icon: DocumentText,
})

export default CmsPage
