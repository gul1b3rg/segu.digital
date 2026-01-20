"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight, ArrowLeft, Car, Briefcase, Shield, Check, HelpCircle, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type Step = "hero" | "plate" | "usage" | "plan" | "sum" | "result"
type Plan = "esencial" | "full" | "blindado" | null
type Usage = "particular" | "comercial" | null

const plans = {
  esencial: {
    name: "Plan Esencial",
    tagline: "Cubre terceros y grúa básica",
    price: 185000,
    color: "bg-blue-50 border-blue-200",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    requiresSum: false,
  },
  full: {
    name: "Plan Full",
    tagline: "Todo riesgo, robo y asistencia",
    price: 385000,
    color: "bg-primary/5 border-primary/30",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    requiresSum: true,
  },
  blindado: {
    name: "Plan Blindado",
    tagline: "Premium: todo riesgo, robo, asistencia y descuentos",
    price: 545000,
    color: "bg-secondary/10 border-secondary/50",
    iconBg: "bg-secondary/20",
    iconColor: "text-secondary",
    requiresSum: true,
  },
}

const coverages = {
  esencial: [
    { name: "Responsabilidad civil", included: true },
    { name: "Daños a terceros", included: true },
    { name: "Grúa básica (50km)", included: true },
    { name: "Asistencia en ruta 24/7", included: true },
    { name: "Todo riesgo", included: false },
    { name: "Robo total", included: false },
    { name: "Robo parcial", included: false },
    { name: "Descuentos afiliados", included: false },
  ],
  full: [
    { name: "Responsabilidad civil", included: true },
    { name: "Daños a terceros", included: true },
    { name: "Grúa extendida (200km)", included: true },
    { name: "Asistencia en ruta 24/7", included: true },
    { name: "Todo riesgo", included: true },
    { name: "Robo total", included: true },
    { name: "Robo parcial", included: true },
    { name: "Descuentos afiliados", included: false },
  ],
  blindado: [
    { name: "Responsabilidad civil", included: true },
    { name: "Daños a terceros", included: true },
    { name: "Grúa ilimitada", included: true },
    { name: "Asistencia en ruta 24/7", included: true },
    { name: "Todo riesgo", included: true },
    { name: "Robo total", included: true },
    { name: "Robo parcial", included: true },
    { name: "Descuentos afiliados", included: true },
  ],
}

function formatGuaranies(value: number): string {
  return value.toLocaleString("es-PY")
}

function parseGuaranies(value: string): number {
  return parseInt(value.replace(/\D/g, "")) || 0
}

export default function AutoQuotePage() {
  const [step, setStep] = useState<Step>("hero")
  const [plate, setPlate] = useState("")
  const [usage, setUsage] = useState<Usage>(null)
  const [selectedPlan, setSelectedPlan] = useState<Plan>(null)
  const [sumInsured, setSumInsured] = useState("")
  const [isFinanced, setIsFinanced] = useState(false)

  const handleSumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseGuaranies(e.target.value)
    if (raw <= 999999999999) {
      setSumInsured(raw ? formatGuaranies(raw) : "")
    }
  }

  const getMonthlyPrice = () => {
    if (!selectedPlan) return 0
    const base = plans[selectedPlan].price
    return base
  }

  const getAnnualPrice = () => {
    return getMonthlyPrice() * 12
  }

  const canProceed = () => {
    switch (step) {
      case "plate":
        return plate.length >= 6
      case "usage":
        return usage !== null
      case "plan":
        return selectedPlan !== null
      case "sum":
        return parseGuaranies(sumInsured) >= 10000000
      default:
        return true
    }
  }

  const nextStep = () => {
    switch (step) {
      case "hero":
        setStep("plate")
        break
      case "plate":
        setStep("usage")
        break
      case "usage":
        setStep("plan")
        break
      case "plan":
        if (selectedPlan && plans[selectedPlan].requiresSum) {
          setStep("sum")
        } else {
          setStep("result")
        }
        break
      case "sum":
        setStep("result")
        break
    }
  }

  const prevStep = () => {
    switch (step) {
      case "plate":
        setStep("hero")
        break
      case "usage":
        setStep("plate")
        break
      case "plan":
        setStep("usage")
        break
      case "sum":
        setStep("plan")
        break
      case "result":
        if (selectedPlan && plans[selectedPlan].requiresSum) {
          setStep("sum")
        } else {
          setStep("plan")
        }
        break
    }
  }

  const getStepNumber = () => {
    switch (step) {
      case "plate":
        return 1
      case "usage":
        return 2
      case "plan":
      case "sum":
      case "result":
        return 3
      default:
        return 0
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Always Visible */}
      <div className="relative bg-white pt-4">
        {/* Back button */}
        {step !== "hero" && (
          <button
            onClick={prevStep}
            className="absolute top-4 left-4 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-rich-black" />
          </button>
        )}

        {/* Progress indicator */}
        {step !== "hero" && (
          <div className="absolute top-6 right-4 z-20 flex items-center gap-1.5">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  num <= getStepNumber()
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-gray-300"
                )}
              />
            ))}
          </div>
        )}

        {/* Text at top */}
        <div className="px-6 pt-2 pb-2 text-center">
          <h1 className="text-2xl font-bold text-rich-black mb-1">
            Aseguremos tu camino.
          </h1>
          {step === "hero" && (
            <p className="text-sm text-gray-600">
              Completa estos 3 simples pasos y asegurá tu vehículo.
            </p>
          )}
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-[200px]">
          <Image
            src="/images/car-img.png"
            alt="Auto en la carretera"
            fill
            className="object-contain object-center"
            priority
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="px-5 relative z-10">
        <div className="bg-gray-50 rounded-3xl p-6 min-h-[320px] flex flex-col">
          {/* Hero Step */}
          {step === "hero" && (
            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Car className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-rich-black mb-2">
                Cotiza tu seguro de auto
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Rápido, fácil y sin compromiso.
              </p>
              <Button
                onClick={nextStep}
                className="w-full h-14 rounded-2xl text-base font-semibold bg-primary hover:bg-primary/90"
              >
                Comenzar cotización
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 1: Plate */}
          {step === "plate" && (
            <div className="flex-1 flex flex-col">
              <div className="mb-6">
                <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  Paso 1 de 3
                </span>
              </div>
              <h2 className="text-xl font-bold text-rich-black mb-2">
                ¿Cuál es la chapa de tu vehículo?
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Ingresa la patente para identificar tu auto.
              </p>
              <div className="flex-1">
                <input
                  type="text"
                  value={plate}
                  onChange={(e) => setPlate(e.target.value.toUpperCase())}
                  placeholder="Ej: ABC 123"
                  maxLength={10}
                  className="w-full h-16 px-5 text-xl font-semibold text-center bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-primary focus:ring-0 focus:outline-none transition-colors uppercase tracking-widest"
                />
              </div>
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="w-full h-14 rounded-2xl text-base font-semibold bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                Continuar
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 2: Usage */}
          {step === "usage" && (
            <div className="flex-1 flex flex-col">
              <div className="mb-6">
                <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  Paso 2 de 3
                </span>
              </div>
              <h2 className="text-xl font-bold text-rich-black mb-2">
                ¿Cuál es el uso de tu vehículo?
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Esto nos ayuda a darte la mejor cobertura.
              </p>
              <div className="flex-1 space-y-3">
                <button
                  onClick={() => setUsage("particular")}
                  className={cn(
                    "w-full p-4 rounded-2xl border-2 transition-all text-left flex items-center gap-4",
                    usage === "particular"
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  )}
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      usage === "particular" ? "bg-primary/10" : "bg-gray-100"
                    )}
                  >
                    <Car
                      className={cn(
                        "w-6 h-6",
                        usage === "particular" ? "text-primary" : "text-gray-500"
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-rich-black">Uso particular</p>
                    <p className="text-xs text-gray-500">Personal y familiar</p>
                  </div>
                  {usage === "particular" && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>

                <button
                  onClick={() => setUsage("comercial")}
                  className={cn(
                    "w-full p-4 rounded-2xl border-2 transition-all text-left flex items-center gap-4",
                    usage === "comercial"
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  )}
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      usage === "comercial" ? "bg-primary/10" : "bg-gray-100"
                    )}
                  >
                    <Briefcase
                      className={cn(
                        "w-6 h-6",
                        usage === "comercial" ? "text-primary" : "text-gray-500"
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-rich-black">
                      Comercial / Trabajo / Plataformas
                    </p>
                    <p className="text-xs text-gray-500">Uber, Muv, delivery, etc.</p>
                  </div>
                  {usage === "comercial" && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              </div>
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="w-full h-14 rounded-2xl text-base font-semibold bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                Continuar
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 3: Plan Selection */}
          {step === "plan" && (
            <div className="flex-1 flex flex-col">
              <div className="mb-6">
                <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  Paso 3 de 3
                </span>
              </div>
              <h2 className="text-xl font-bold text-rich-black mb-2">
                Selección de cobertura
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Elige el plan que más se adecua a tus necesidades.
              </p>
              <div className="flex-1 space-y-3">
                {(Object.keys(plans) as Plan[]).filter(Boolean).map((planKey) => {
                  if (!planKey) return null
                  const plan = plans[planKey]
                  return (
                    <button
                      key={planKey}
                      onClick={() => setSelectedPlan(planKey)}
                      className={cn(
                        "w-full p-4 rounded-2xl border-2 transition-all text-left",
                        selectedPlan === planKey
                          ? "border-primary bg-primary/5"
                          : `${plan.color} hover:border-gray-300`
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center",
                            selectedPlan === planKey ? "bg-primary/10" : plan.iconBg
                          )}
                        >
                          <Shield
                            className={cn(
                              "w-5 h-5",
                              selectedPlan === planKey ? "text-primary" : plan.iconColor
                            )}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-bold text-rich-black">{plan.name}</p>
                            {selectedPlan === planKey && (
                              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{plan.tagline}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="w-full h-14 rounded-2xl text-base font-semibold bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {selectedPlan && plans[selectedPlan].requiresSum
                  ? "Continuar"
                  : "Ver cotización"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}

          {/* Sum Insured Step */}
          {step === "sum" && (
            <div className="flex-1 flex flex-col">
              <div className="mb-6">
                <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  Paso 3 de 3
                </span>
              </div>
              <h2 className="text-xl font-bold text-rich-black mb-2">
                ¿Cuál es la suma asegurada?
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Ingresa el valor de tu vehículo en guaraníes.
              </p>
              <div className="flex-1">
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl font-semibold text-gray-400">
                    Gs.
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={sumInsured}
                    onChange={handleSumChange}
                    placeholder="50.000.000"
                    className="w-full h-16 pl-14 pr-5 text-xl font-semibold bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-primary focus:ring-0 focus:outline-none transition-colors"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Mínimo: Gs. 10.000.000
                </p>
              </div>
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="w-full h-14 rounded-2xl text-base font-semibold bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                Ver cotización
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}

          {/* Result Step */}
          {step === "result" && selectedPlan && (
            <div className="flex-1 flex flex-col">
              {/* Plan Badge */}
              <div className="text-center mb-4">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full",
                    selectedPlan === "esencial" && "bg-blue-100 text-blue-700",
                    selectedPlan === "full" && "bg-primary/10 text-primary",
                    selectedPlan === "blindado" && "bg-secondary/20 text-amber-700"
                  )}
                >
                  <Shield className="w-3.5 h-3.5" />
                  {plans[selectedPlan].name}
                </span>
              </div>

              {/* Price Display */}
              <div className="text-center mb-4">
                <p className="text-sm text-gray-500 mb-1">Tu cuota mensual</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-sm font-medium text-gray-500">Gs.</span>
                  <span className="text-4xl font-bold text-rich-black">
                    {formatGuaranies(getMonthlyPrice())}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Vehículo: {plate}
                </p>
              </div>

              {/* Financing Option */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <p className="font-semibold text-rich-black text-sm">
                      Plan financiado
                    </p>
                    <p className="text-xs text-gray-500">
                      Paga en cuotas sin interés
                    </p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={isFinanced}
                      onChange={(e) => setIsFinanced(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-primary transition-colors"></div>
                    <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform peer-checked:translate-x-5 shadow"></div>
                  </div>
                </label>

                {isFinanced && (
                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Costo anual</span>
                      <span className="font-semibold text-rich-black">
                        Gs. {formatGuaranies(getAnnualPrice())}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">12 cuotas de</span>
                      <span className="font-semibold text-primary">
                        Gs. {formatGuaranies(getMonthlyPrice())}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Coverages */}
              <div className="mb-4">
                <p className="font-semibold text-rich-black text-sm mb-3">
                  Coberturas incluidas
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {coverages[selectedPlan].map((coverage) => (
                    <div
                      key={coverage.name}
                      className={cn(
                        "flex items-center gap-2 text-xs p-2 rounded-lg",
                        coverage.included
                          ? "bg-primary/5 text-rich-black"
                          : "bg-gray-50 text-gray-400 line-through"
                      )}
                    >
                      {coverage.included ? (
                        <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      ) : (
                        <div className="w-3.5 h-3.5 flex-shrink-0" />
                      )}
                      <span className="leading-tight">{coverage.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 mt-auto">
                <Button className="w-full h-14 rounded-2xl text-base font-semibold bg-primary hover:bg-primary/90">
                  Contratar ahora
                </Button>
                <button className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-700">
                  <HelpCircle className="w-4 h-4" />
                  ¿Alguna duda? Contactanos
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Help floating button */}
      {step !== "hero" && step !== "result" && (
        <button className="fixed bottom-24 right-5 w-12 h-12 rounded-full bg-rich-black text-white flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors">
          <Phone className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
