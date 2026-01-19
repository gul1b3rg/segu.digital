"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ClaimStep } from "@/lib/mock/dashboard-data"

interface ClaimTrackerProps {
  steps: ClaimStep[]
  className?: string
}

export function ClaimTracker({ steps, className }: ClaimTrackerProps) {
  return (
    <div className={cn("px-5", className)}>
      <h2 className="text-base font-semibold text-rich-black mb-4">
        Seguimiento del siniestro
      </h2>

      <div className="bg-white rounded-2xl p-4">
        <div className="relative">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1
            const isActive =
              step.completed && !steps[index + 1]?.completed

            return (
              <div key={step.name} className="flex gap-3">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  {/* Circle */}
                  <div
                    className={cn(
                      "flex items-center justify-center",
                      "w-8 h-8 rounded-full",
                      "transition-all",
                      step.completed
                        ? "bg-primary text-white"
                        : "bg-misty text-gray-400 border-2 border-gray-200"
                    )}
                  >
                    {step.completed ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-semibold">
                        {index + 1}
                      </span>
                    )}
                  </div>

                  {/* Line */}
                  {!isLast && (
                    <div
                      className={cn(
                        "w-0.5 h-12 my-1",
                        step.completed && steps[index + 1]?.completed
                          ? "bg-primary"
                          : step.completed
                          ? "bg-gradient-to-b from-primary to-gray-200"
                          : "bg-gray-200"
                      )}
                    />
                  )}
                </div>

                {/* Content */}
                <div className={cn("flex-1 pb-6", isLast && "pb-0")}>
                  <div className="flex items-center justify-between">
                    <h4
                      className={cn(
                        "font-medium",
                        step.completed
                          ? "text-rich-black"
                          : "text-gray-400"
                      )}
                    >
                      {step.name}
                    </h4>
                    <span
                      className={cn(
                        "text-xs",
                        step.completed
                          ? "text-gray-500"
                          : "text-gray-300"
                      )}
                    >
                      {step.date}
                    </span>
                  </div>
                  {step.description && (
                    <p
                      className={cn(
                        "text-sm mt-0.5",
                        step.completed
                          ? "text-gray-500"
                          : "text-gray-300"
                      )}
                    >
                      {step.description}
                    </p>
                  )}
                  {isActive && (
                    <div className="mt-2">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        En curso
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
