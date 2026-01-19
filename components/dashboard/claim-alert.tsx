"use client"

import Link from "next/link"
import { AlertTriangle, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MockClaim } from "@/lib/mock/dashboard-data"

interface ClaimAlertProps {
  claim: MockClaim
  className?: string
}

const statusColors: Record<string, string> = {
  SUBMITTED: "bg-blue-500",
  IN_REVIEW: "bg-yellow-500",
  IN_PROGRESS: "bg-primary",
  COMPLETED: "bg-green-600",
  REJECTED: "bg-destructive",
}

export function ClaimAlert({ claim, className }: ClaimAlertProps) {
  const currentStep = claim.steps.filter((s) => s.completed).length
  const totalSteps = claim.steps.length
  const progress = (currentStep / totalSteps) * 100

  return (
    <div
      className={cn(
        "mx-5 p-4 rounded-2xl",
        "bg-secondary/10 border border-secondary/30",
        className
      )}
    >
      <Link href={`/demo/claims/${claim.id}`} className="block">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary/20">
            <AlertTriangle className="w-5 h-5 text-secondary-700" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-rich-black">
                Siniestro #{claim.id.split("-").pop()}
              </h3>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600">{claim.description}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-2">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-gray-500">Progreso</span>
            <span className="font-medium text-rich-black">
              {currentStep} de {totalSteps}
            </span>
          </div>
          <div className="h-2 bg-white rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                statusColors[claim.status]
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Current status */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Estado actual:</span>
          <span className="text-xs font-semibold text-primary">
            {claim.steps[currentStep - 1]?.name || "Iniciado"}
          </span>
        </div>
      </Link>
    </div>
  )
}
