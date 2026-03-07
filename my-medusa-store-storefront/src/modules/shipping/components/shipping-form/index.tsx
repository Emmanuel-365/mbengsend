"use client"

import { useState } from "react"
import { sdk } from "@lib/config"
import { Button, Heading, Text } from "@medusajs/ui"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircleSolid } from "@medusajs/icons"

export default function ShippingForm() {
    const [formData, setFormData] = useState({
        sender_name: "",
        sender_phone: "",
        sender_address: "",
        receiver_name: "",
        receiver_phone: "",
        receiver_address: "",
        origin_city: "",
        destination_city: "",
        package_description: "",
        package_weight: "", // Kept as string for controlled input simplicity, then parsed
    })

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(false)

        try {
            const payload = {
                ...formData,
                package_weight: formData.package_weight ? Number(formData.package_weight) : undefined,
            }

            await sdk.client.fetch("/store/parcel-requests", {
                method: "POST",
                body: payload, // plain object, SDK handles stringify
            })

            setSuccess(true)
            setFormData({
                sender_name: "",
                sender_phone: "",
                sender_address: "",
                receiver_name: "",
                receiver_phone: "",
                receiver_address: "",
                origin_city: "",
                destination_city: "",
                package_description: "",
                package_weight: "",
            })
        } catch (err: any) {
            setError(err.message || "Une erreur est survenue lors de la création de la requête.")
        } finally {
            setLoading(false)
        }
    }

    // A sleek input component wrapper
    const InputGroup = ({ label, name, type = "text", placeholder, required = true, isTextArea = false }: any) => (
        <div className="flex flex-col gap-y-1.5 focus-within:text-blue-600 transition-colors">
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {isTextArea ? (
                <textarea
                    id={name}
                    name={name}
                    value={(formData as any)[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required={required}
                    className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition-all outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 hover:border-gray-300 min-h-[100px] resize-y"
                />
            ) : (
                <input
                    id={name}
                    name={name}
                    type={type}
                    value={(formData as any)[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required={required}
                    className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition-all outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 hover:border-gray-300"
                />
            )}
        </div>
    )

    return (
        <div className="max-w-4xl mx-auto w-full">
            <AnimatePresence mode="wait">
                {success ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-10 bg-white border border-green-100 rounded-2xl shadow-xl shadow-green-900/5 text-center flex flex-col items-center gap-6"
                    >
                        <div className="h-20 w-20 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                            <CheckCircleSolid className="w-10 h-10" />
                        </div>
                        <div>
                            <Heading className="text-gray-900 mb-2 text-3xl font-semibold tracking-tight">C'est noté !</Heading>
                            <Text className="text-gray-500 max-w-md mx-auto text-lg leading-relaxed">
                                Votre demande d'expédition a été reçue avec succès. Notre équipe prendra contact avec vous dans les plus brefs délais pour organiser le ramassage.
                            </Text>
                        </div>
                        <Button
                            variant="secondary"
                            className="mt-4 rounded-full px-8"
                            onClick={() => setSuccess(false)}
                        >
                            Faire une nouvelle demande
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl shadow-slate-200/50 border border-white"
                    >
                        <div className="text-center mb-10">
                            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold tracking-wide uppercase mb-3">Service Logistique</span>
                            <Heading className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">Demander une expédition</Heading>
                            <Text className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto">Confiez-nous l'expédition de vos colis d'un point A à un point B en toute sécurité et simplicité.</Text>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-10">
                            {error && (
                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 flex items-center gap-3 text-sm font-medium">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                    {error}
                                </motion.div>
                            )}

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
                                {/* Expéditeur */}
                                <div className="space-y-6 relative">
                                    <div className="absolute top-0 -left-6 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-100 to-transparent hidden lg:block"></div>
                                    <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">A</div>
                                        <Heading level="h3" className="text-xl font-semibold text-slate-800">Origine (Vous)</Heading>
                                    </div>
                                    <div className="space-y-5">
                                        <InputGroup label="Nom complet" name="sender_name" placeholder="Ex: Jean Dupont" />
                                        <InputGroup label="Numéro de téléphone" name="sender_phone" type="tel" placeholder="+33 6 12 34 56 78" />
                                        <InputGroup label="Ville de départ" name="origin_city" placeholder="Ex: Paris" />
                                        <InputGroup label="Adresse complète" name="sender_address" placeholder="123 Rue de la République" />
                                    </div>
                                </div>

                                {/* Destinataire */}
                                <div className="space-y-6 relative">
                                    <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                                        <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">B</div>
                                        <Heading level="h3" className="text-xl font-semibold text-slate-800">Destination</Heading>
                                    </div>
                                    <div className="space-y-5">
                                        <InputGroup label="Nom complet du destinataire" name="receiver_name" placeholder="Ex: Marie Curie" />
                                        <InputGroup label="Numéro de téléphone" name="receiver_phone" type="tel" placeholder="+33 6 98 76 54 32" />
                                        <InputGroup label="Ville d'arrivée" name="destination_city" placeholder="Ex: Yaoundé" />
                                        <InputGroup label="Adresse complète" name="receiver_address" placeholder="Quartier Bastos" />
                                    </div>
                                </div>
                            </div>

                            {/* Détails du colis */}
                            <div className="pt-8 border-t border-gray-100 space-y-6 bg-slate-50/50 -mx-8 sm:-mx-10 px-8 sm:px-10 pb-4 rounded-b-3xl">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center">📦</div>
                                    <Heading level="h3" className="text-xl font-semibold text-slate-800">Détails du colis</Heading>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <InputGroup
                                            label="Description du colis"
                                            name="package_description"
                                            placeholder="Décrivez brièvement le contenu de votre colis (ex: Vêtements, Électronique, Documents)..."
                                            isTextArea
                                        />
                                    </div>
                                    <div>
                                        <InputGroup
                                            label="Poids estimé (en kg)"
                                            name="package_weight"
                                            type="number"
                                            placeholder="Ex: 2.5"
                                            required={false}
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Laissez vide si vous ne connaissez pas le poids exact.</p>
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <Button
                                        type="submit"
                                        className="w-full py-4 text-base font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 rounded-xl transition-all duration-300"
                                        size="large"
                                        isLoading={loading}
                                        disabled={loading}
                                    >
                                        {loading ? "Création de la demande..." : "Confirmer la demande d'expédition"}
                                    </Button>
                                    <p className="text-center text-xs text-gray-400 mt-4">En soumettant ce formulaire, vous acceptez nos conditions générales de transport.</p>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
