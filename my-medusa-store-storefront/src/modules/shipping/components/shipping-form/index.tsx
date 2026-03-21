"use client"

import { useState, useEffect } from "react"
import { sdk } from "@lib/config"
import { Button, Heading, Text } from "@medusajs/ui"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircleSolid } from "@medusajs/icons"
import { Package } from "lucide-react"

// A sleek input component wrapper
const InputGroup = ({ label, name, type = "text", placeholder, required = true, isTextArea = false, value, onChange }: any) => (
    <div className="flex flex-col gap-y-1.5 focus-within:text-blue-600 transition-colors">
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {isTextArea ? (
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition-all outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 hover:border-gray-300 min-h-[100px] resize-y"
            />
        ) : (
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition-all outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 hover:border-gray-300"
            />
        )}
    </div>
)

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
        length: "",
        width: "",
        height: "",
        shipping_mode: "", // will default to smart detection if empty
    })

    const [estimation, setEstimation] = useState<{ price: number, mode: string, weight: number } | null>(null)
    const [estimating, setEstimating] = useState(false)

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // Effet pour estimer le prix dès que les données clés changent
    useEffect(() => {
        const fetchEstimation = async () => {
            const hasCities = formData.origin_city && formData.destination_city
            const hasWeightOrDims = formData.package_weight || (formData.length && formData.width && formData.height)

            if (!hasCities || !hasWeightOrDims) {
                setEstimation(null)
                return
            }

            setEstimating(true)
            try {
                const payload = {
                    ...formData,
                    package_weight: formData.package_weight ? Number(formData.package_weight) : undefined,
                    length: formData.length ? Number(formData.length) : undefined,
                    width: formData.width ? Number(formData.width) : undefined,
                    height: formData.height ? Number(formData.height) : undefined,
                }
                
                // If mode is explicitely chosen, send it, otherwise let backend guess
                if (!payload.shipping_mode) {
                    delete (payload as any).shipping_mode;
                }

                const res = await sdk.client.fetch("/store/parcel-requests/estimate", {
                    method: "POST",
                    body: payload,
                }) as { estimated_price?: number, applied_mode: string, billable_weight: number }
                
                if (res.estimated_price) {
                    setEstimation({
                        price: res.estimated_price,
                        mode: res.applied_mode,
                        weight: res.billable_weight
                    })
                }
            } catch (err) {
                console.error("Erreur d'estimation", err)
            } finally {
                setEstimating(false)
            }
        }

        const timer = setTimeout(() => {
            fetchEstimation()
        }, 800) // Debounce de 800ms
        
        return () => clearTimeout(timer)
    }, [formData.origin_city, formData.destination_city, formData.package_weight, formData.length, formData.width, formData.height, formData.shipping_mode])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(false)

        try {
            const payload = {
                ...formData,
                package_weight: formData.package_weight ? Number(formData.package_weight) : undefined,
                length: formData.length ? Number(formData.length) : undefined,
                width: formData.width ? Number(formData.width) : undefined,
                height: formData.height ? Number(formData.height) : undefined,
                shipping_mode: formData.shipping_mode || (estimation?.mode) || undefined,
                estimated_price: estimation?.price
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
                length: "",
                width: "",
                height: "",
                shipping_mode: ""
            })
            setEstimation(null)
        } catch (err: any) {
            setError(err.message || "Une erreur est survenue lors de la création de la requête.")
        } finally {
            setLoading(false)
        }
    }

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
                            <Text className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto">Confiez-nous l'expédition de vos colis locaux ou internationaux en toute sécurité. Obtenez une estimation immédiate.</Text>
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
                                <div className="flex flex-col gap-6 relative">
                                    <div className="absolute top-0 -left-6 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-100 to-transparent hidden lg:block"></div>
                                    <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">A</div>
                                        <Heading level="h3" className="text-xl font-semibold text-slate-800">Origine (Vous)</Heading>
                                    </div>
                                    <div className="space-y-5">
                                        <InputGroup label="Nom complet" name="sender_name" value={formData.sender_name} onChange={handleChange} placeholder="Ex: Jean Dupont" />
                                        <InputGroup label="Numéro de téléphone" name="sender_phone" type="tel" value={formData.sender_phone} onChange={handleChange} placeholder="+33 6 12 34 56 78" />
                                        <InputGroup label="Ville de départ" name="origin_city" value={formData.origin_city} onChange={handleChange} placeholder="Ex: Paris" />
                                        <InputGroup label="Adresse complète" name="sender_address" value={formData.sender_address} onChange={handleChange} placeholder="123 Rue de la République" />
                                    </div>
                                </div>

                                {/* Destinataire */}
                                <div className="flex flex-col gap-6 relative">
                                    <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                                        <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">B</div>
                                        <Heading level="h3" className="text-xl font-semibold text-slate-800">Destination</Heading>
                                    </div>
                                    <div className="space-y-5">
                                        <InputGroup label="Nom complet du destinataire" name="receiver_name" value={formData.receiver_name} onChange={handleChange} placeholder="Ex: Marie Curie" />
                                        <InputGroup label="Numéro de téléphone" name="receiver_phone" type="tel" value={formData.receiver_phone} onChange={handleChange} placeholder="+33 6 98 76 54 32" />
                                        <InputGroup label="Ville d'arrivée" name="destination_city" value={formData.destination_city} onChange={handleChange} placeholder="Ex: Yaoundé" />
                                        <InputGroup label="Adresse complète" name="receiver_address" value={formData.receiver_address} onChange={handleChange} placeholder="Quartier Bastos" />
                                    </div>
                                </div>
                            </div>

                            {/* Détails du colis */}
                            <div className="pt-8 border-t border-gray-100 space-y-6 bg-slate-50/50 -mx-8 sm:-mx-10 px-8 sm:px-10 pb-4 rounded-b-3xl">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center">
                                        <Package className="w-5 h-5" />
                                    </div>
                                    <Heading level="h3" className="text-xl font-semibold text-slate-800">Détails du colis</Heading>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <InputGroup
                                            label="Description du colis"
                                            name="package_description"
                                            value={formData.package_description}
                                            onChange={handleChange}
                                            placeholder="Décrivez brièvement le contenu de votre colis (ex: Vêtements, Électronique, Documents)..."
                                            isTextArea
                                        />
                                    </div>
                                    <div>
                                        <InputGroup
                                            label="Poids estimé (kg)"
                                            name="package_weight"
                                            type="number"
                                            value={formData.package_weight}
                                            onChange={handleChange}
                                            placeholder="Ex: 2.5"
                                            required={false}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="flex-1">
                                            <InputGroup label="L (cm)" name="length" type="number" value={formData.length} onChange={handleChange} placeholder="40" required={false} />
                                        </div>
                                        <div className="flex-1">
                                            <InputGroup label="l (cm)" name="width" type="number" value={formData.width} onChange={handleChange} placeholder="30" required={false} />
                                        </div>
                                        <div className="flex-1">
                                            <InputGroup label="H (cm)" name="height" type="number" value={formData.height} onChange={handleChange} placeholder="20" required={false} />
                                        </div>
                                    </div>
                                    
                                    <div className="md:col-span-2 flex flex-col gap-y-1.5 focus-within:text-blue-600 transition-colors">
                                        <label htmlFor="shipping_mode" className="text-sm font-medium text-gray-700">Mode d'expédition préféré</label>
                                        <select
                                            id="shipping_mode"
                                            name="shipping_mode"
                                            value={formData.shipping_mode}
                                            onChange={handleChange}
                                            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition-all outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 hover:border-gray-300"
                                        >
                                            <option value="">Détection automatique (Recommandé)</option>
                                            <option value="local_delivery">Livraison Locale (Même pays)</option>
                                            <option value="air_freight">Fret Aérien (Rapide)</option>
                                            <option value="sea_freight">Fret Maritime (Économique)</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <AnimatePresence>
                                    {(estimation || estimating) && (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="mt-4 bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm text-blue-800 font-medium">
                                                        Estimation du tarif
                                                        {estimation && <span className="ml-2 text-xs bg-blue-200 text-blue-900 px-2 py-0.5 rounded-full uppercase tracking-wider">{
                                                            estimation.mode === 'local_delivery' ? 'Local' :
                                                            estimation.mode === 'air_freight' ? 'Aérien' : 'Maritime'
                                                        }</span>}
                                                    </p>
                                                    <p className="text-xs text-blue-600/80 mt-1">
                                                        {estimating ? "Calcul en cours..." : `Basé sur ${estimation?.weight} kg (Poids facturable)`}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    {estimating ? (
                                                        <div className="h-6 w-24 bg-blue-200/50 animate-pulse rounded"></div>
                                                    ) : (
                                                        <span className="text-2xl font-bold tracking-tight text-blue-900">{estimation?.price} <span className="text-sm font-medium text-blue-700">XAF</span></span>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

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
