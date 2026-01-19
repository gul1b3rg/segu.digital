"use client"

import { cn } from "@/lib/utils"
import { CheckCircle2, Circle } from "lucide-react"

interface ProfileProgressProps {
  className?: string
}

const onboardingSteps = [
  { id: "email", label: "Verificar email", completed: true },
  { id: "profile", label: "Perfil completo", completed: false },
  { id: "policy", label: "Agregar tu primera póliza", completed: false },
  { id: "second", label: "Contratar un segundo seguro", completed: false },
]

export function ProfileProgress({ className }: ProfileProgressProps) {
  const completedSteps = onboardingSteps.filter((s) => s.completed).length
  const totalSteps = onboardingSteps.length
  const progressPercent = Math.round((completedSteps / totalSteps) * 100)

  // Find first incomplete step index for fade effect
  const firstIncompleteIndex = onboardingSteps.findIndex((s) => !s.completed)

  return (
    <div className={cn("px-5 py-4", className)}>
      {/* Level badge and progress */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full">
            Nivel: Inicial
          </span>
        </div>
        <span className="text-sm font-semibold text-primary">{progressPercent}%</span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-primary to-lime-burst rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 mb-4">
        Completa tu perfil y asegúrate para una mejor experiencia.
      </p>

      {/* Steps list with fade effect */}
      <div className="relative">
        <div className="space-y-2">
          {onboardingSteps.map((step, index) => {
            // Calculate opacity: completed = full, first incomplete = full, rest fade out
            const isFirstIncomplete = index === firstIncompleteIndex
            const stepsAfterFirst = index - firstIncompleteIndex
            const opacity = step.completed || isFirstIncomplete
              ? 1
              : Math.max(0.3, 1 - (stepsAfterFirst * 0.35))

            return (
              <div
                key={step.id}
                style={{ opacity }}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl transition-all",
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
            )
          })}
        </div>
        {/* Gradient fade overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-misty to-transparent pointer-events-none" />
      </div>
    </div>
  )
}
