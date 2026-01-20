"use client"

import { useState, useCallback, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Upload,
  FileText,
  Check,
  Car,
  Calendar,
  Shield,
  Building2,
  User,
  Hash,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  PartyPopper,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type Step = "upload" | "preview" | "saving" | "success"

// Mock extracted data from PDF
const mockExtractedData = {
  insurer: {
    name: "La Consolidada S.A.",
    logo: "/icons/insurance-company.png",
  },
  policy: {
    number: "POL-2024-0847291",
    type: "Seguro de Vehículo",
    status: "Vigente",
  },
  validity: {
    from: "15/01/2024",
    to: "15/01/2025",
    daysRemaining: 361,
  },
  insured: {
    name: "Juan Carlos Pérez",
    document: "4.521.876",
  },
  vehicle: {
    brand: "Toyota",
    model: "Corolla XEI",
    year: 2022,
    plate: "ABC 123",
    chassis: "9BR53ZEC8N8******",
    color: "Blanco",
  },
  coverage: [
    { name: "Responsabilidad Civil", limit: "500.000.000", included: true },
    { name: "Daños a Terceros", limit: "300.000.000", included: true },
    { name: "Robo Total", limit: "120.000.000", included: true },
    { name: "Robo Parcial", limit: "60.000.000", included: true },
    { name: "Todo Riesgo", limit: "120.000.000", included: true },
    { name: "Asistencia en Ruta 24/7", limit: "Incluido", included: true },
    { name: "Grúa (hasta 200km)", limit: "Incluido", included: true },
  ],
  sumInsured: "120.000.000",
  premium: {
    annual: "4.620.000",
    monthly: "385.000",
  },
}

function formatGuaranies(value: string): string {
  return `Gs. ${value}`
}

function ImportPolicyContent() {
  const searchParams = useSearchParams()
  const importType = searchParams.get("type") || "pdf"

  const [step, setStep] = useState<Step>("upload")
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [showAllCoverages, setShowAllCoverages] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }, [])

  const handleFileSelect = (file: File) => {
    setFileName(file.name)
    // Simulate processing delay
    setTimeout(() => {
      setStep("preview")
    }, 1500)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleConfirm = () => {
    setStep("saving")
    // Simulate saving delay
    setTimeout(() => {
      setStep("success")
    }, 2000)
  }

  const getTitle = () => {
    switch (importType) {
      case "pdf":
        return "Cargar PDF"
      case "photo":
        return "Tomar Foto"
      case "manual":
        return "Carga Manual"
      default:
        return "Importar Póliza"
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-5 py-4">
          <Link
            href="/demo/new-user"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-rich-black" />
          </Link>
          <h1 className="text-lg font-semibold text-rich-black">{getTitle()}</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Upload Step */}
      {step === "upload" && (
        <div className="px-5 py-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-rich-black mb-2">
              Sube tu póliza en PDF
            </h2>
            <p className="text-sm text-gray-500">
              Extraeremos automáticamente los datos de tu seguro
            </p>
          </div>

          {/* Upload Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "relative border-2 border-dashed rounded-3xl p-8 transition-all",
              "flex flex-col items-center justify-center min-h-[280px]",
              isDragging
                ? "border-primary bg-primary/5"
                : "border-gray-300 bg-gray-50 hover:border-gray-400"
            )}
          >
            {fileName ? (
              // Processing state
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
                <p className="font-semibold text-rich-black mb-1">
                  Procesando documento...
                </p>
                <p className="text-sm text-gray-500">{fileName}</p>
              </div>
            ) : (
              // Upload state
              <>
                <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center mb-4">
                  <FileText className="w-10 h-10 text-gray-400" />
                </div>
                <p className="font-semibold text-rich-black mb-1">
                  Arrastra tu archivo aquí
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  o haz clic para seleccionar
                </p>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Upload className="w-4 h-4" />
                  <span>PDF hasta 10MB</span>
                </div>
              </>
            )}
          </div>

          {/* Tips */}
          <div className="mt-6 p-4 bg-blue-50 rounded-2xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900 mb-1">
                  Consejos para mejores resultados
                </p>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Asegúrate que el PDF sea legible</li>
                  <li>• Usa el documento original de la aseguradora</li>
                  <li>• Evita documentos escaneados en baja calidad</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Step */}
      {step === "preview" && (
        <div className="px-5 py-6 pb-48">
          {/* Success banner */}
          <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-2xl mb-6">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-rich-black">
                Datos extraídos correctamente
              </p>
              <p className="text-xs text-gray-600">
                Revisa que la información sea correcta
              </p>
            </div>
          </div>

          {/* Insurer & Policy Info */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <Building2 className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-rich-black">
                  {mockExtractedData.insurer.name}
                </p>
                <p className="text-xs text-gray-500">
                  {mockExtractedData.policy.type}
                </p>
              </div>
              <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                {mockExtractedData.policy.status}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Hash className="w-4 h-4" />
              <span>Póliza: {mockExtractedData.policy.number}</span>
            </div>
          </div>

          {/* Validity */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-gray-500" />
              <p className="font-semibold text-rich-black text-sm">Vigencia</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Desde</p>
                <p className="font-semibold text-rich-black">
                  {mockExtractedData.validity.from}
                </p>
              </div>
              <div className="h-px w-8 bg-gray-300" />
              <div>
                <p className="text-xs text-gray-500">Hasta</p>
                <p className="font-semibold text-rich-black">
                  {mockExtractedData.validity.to}
                </p>
              </div>
              <div className="px-3 py-1.5 bg-primary/10 rounded-lg">
                <p className="text-xs text-primary font-semibold">
                  {mockExtractedData.validity.daysRemaining} días
                </p>
              </div>
            </div>
          </div>

          {/* Insured Person */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <User className="w-4 h-4 text-gray-500" />
              <p className="font-semibold text-rich-black text-sm">Asegurado</p>
            </div>
            <p className="font-semibold text-rich-black">
              {mockExtractedData.insured.name}
            </p>
            <p className="text-sm text-gray-500">
              CI: {mockExtractedData.insured.document}
            </p>
          </div>

          {/* Vehicle Data */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Car className="w-4 h-4 text-gray-500" />
              <p className="font-semibold text-rich-black text-sm">
                Datos del Vehículo
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-500">Marca</p>
                <p className="font-semibold text-rich-black text-sm">
                  {mockExtractedData.vehicle.brand}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Modelo</p>
                <p className="font-semibold text-rich-black text-sm">
                  {mockExtractedData.vehicle.model}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Año</p>
                <p className="font-semibold text-rich-black text-sm">
                  {mockExtractedData.vehicle.year}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Color</p>
                <p className="font-semibold text-rich-black text-sm">
                  {mockExtractedData.vehicle.color}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Chapa</p>
                <p className="font-semibold text-rich-black text-sm">
                  {mockExtractedData.vehicle.plate}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Chasis</p>
                <p className="font-semibold text-rich-black text-sm">
                  {mockExtractedData.vehicle.chassis}
                </p>
              </div>
            </div>
          </div>

          {/* Capital Insured */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Capital Asegurado</p>
                <p className="text-xl font-bold text-rich-black">
                  {formatGuaranies(mockExtractedData.sumInsured)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Prima Mensual</p>
                <p className="text-lg font-bold text-primary">
                  {formatGuaranies(mockExtractedData.premium.monthly)}
                </p>
              </div>
            </div>
          </div>

          {/* Coverages */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-gray-500" />
              <p className="font-semibold text-rich-black text-sm">Coberturas</p>
            </div>
            <div className="space-y-2">
              {mockExtractedData.coverage
                .slice(0, showAllCoverages ? undefined : 4)
                .map((coverage) => (
                  <div
                    key={coverage.name}
                    className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm text-rich-black">
                        {coverage.name}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">
                      {coverage.limit.includes("Incluido")
                        ? coverage.limit
                        : formatGuaranies(coverage.limit)}
                    </span>
                  </div>
                ))}
            </div>
            {mockExtractedData.coverage.length > 4 && (
              <button
                onClick={() => setShowAllCoverages(!showAllCoverages)}
                className="flex items-center justify-center gap-1 w-full mt-3 py-2 text-sm text-primary font-medium"
              >
                {showAllCoverages ? (
                  <>
                    Ver menos <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Ver todas ({mockExtractedData.coverage.length}){" "}
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>

          {/* Fixed Bottom CTA */}
          <div className="fixed bottom-20 left-0 right-0 p-5 bg-white border-t border-gray-100">
            <Button
              onClick={handleConfirm}
              className="w-full h-14 rounded-2xl text-base font-semibold bg-primary hover:bg-primary/90"
            >
              Confirmar y guardar póliza
            </Button>
          </div>
        </div>
      )}

      {/* Saving Step */}
      {step === "saving" && (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-5">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
          <h2 className="text-xl font-bold text-rich-black mb-2">
            Guardando tu póliza...
          </h2>
          <p className="text-sm text-gray-500 text-center">
            Estamos registrando tu seguro en la plataforma
          </p>
        </div>
      )}

      {/* Success Step */}
      {step === "success" && (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-5">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6 relative">
            <PartyPopper className="w-12 h-12 text-primary" />
            <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <Check className="w-5 h-5 text-rich-black" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-rich-black mb-2 text-center">
            ¡Felicitaciones!
          </h2>
          <p className="text-base text-gray-600 text-center mb-2">
            Cargaste tu primera póliza
          </p>
          <p className="text-sm text-gray-500 text-center mb-8 max-w-xs">
            Ahora puedes gestionar tu seguro, ver coberturas y recibir alertas
            de vencimiento desde un solo lugar.
          </p>

          {/* Policy Summary Card */}
          <div className="w-full max-w-sm bg-gray-50 rounded-2xl p-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Car className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-rich-black">
                  {mockExtractedData.vehicle.brand} {mockExtractedData.vehicle.model}
                </p>
                <p className="text-xs text-gray-500">
                  {mockExtractedData.insurer.name}
                </p>
              </div>
              <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                Activa
              </span>
            </div>
          </div>

          <div className="w-full space-y-3">
            <Link href="/demo/with-policies">
              <Button className="w-full h-14 rounded-2xl text-base font-semibold bg-primary hover:bg-primary/90">
                Ver mis pólizas
              </Button>
            </Link>
            <Link
              href="/demo/new-user"
              className="block w-full text-center py-3 text-sm text-gray-500 hover:text-gray-700"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ImportPolicyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      }
    >
      <ImportPolicyContent />
    </Suspense>
  )
}
