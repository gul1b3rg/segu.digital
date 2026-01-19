"use client"

import { cn } from "@/lib/utils"
import { CheckCircle2, Circle } from "lucide-react"

interface ProfileProgressProps {
  className?: string
}

const onboardingSteps = [
  { id: "email", label: "Verificar email", completed: true },
  { id: "phone", label: "Agregar teléfono", completed: false },
  { id: "identity", label: "Verificar identidad", completed: false },
  { id: "policy", label: "Agregar primera póliza", completed: false },
]

export function ProfileProgress({ className }: ProfileProgressProps) {
  const completedSteps = onboardingSteps.filter((s) => s.completed).length
  const totalSteps = onboardingSteps.length
  const progressPercent = Math.round((completedSteps / totalSteps) * 100)

  return (
    <div className={cn("px-5 py-6", className)}>
      {/* Progress header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-base font-semibold text-rich-black">
            Perfil de seguridad
          </h2>
          <p className="text-sm text-gray-500">
            Completa tu perfil para una mejor experiencia
          </p>
        </div>
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10">
          <span className="text-lg font-bold text-primary">{progressPercent}%</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-primary to-lime-burst rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Steps list */}
      <div className="space-y-2">
        {onboardingSteps.map((step) => (
          <div
            key={step.id}
            className={cn(
              "flex items-center gap-3 p-3 rounded-xl transition-colors",
              step.completed ? "bg-primary/5" : "bg-gray-50"
            )}
          >
            {step.completed ? (
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
            ) : (
              <Circle className="w-5 h-5 text-gray-300 flex-shrink-0" />
            )}
            <span
              className={cn(
                "text-sm",
                step.completed ? "text-primary font-medium" : "text-gray-600"
              )}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
