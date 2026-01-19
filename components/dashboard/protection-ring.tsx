"use client"

import { cn } from "@/lib/utils"

interface ProtectionRingProps {
  totalPolicies: number
  maxPolicies?: number
  className?: string
}

export function ProtectionRing({
  totalPolicies,
  maxPolicies = 5,
  className,
}: ProtectionRingProps) {
  const percentage = Math.min((totalPolicies / maxPolicies) * 100, 100)
  const hasProtection = totalPolicies > 0

  // SVG circle properties
  const size = 120
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className={cn("flex flex-col items-center py-6", className)}>
      <div className="relative">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#E2EBED"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={hasProtection ? "#00D66C" : "#E2EBED"}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center content */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center"
          )}
        >
          <span
            className={cn(
              "text-3xl font-bold",
              hasProtection ? "text-primary" : "text-gray-400"
            )}
          >
            {totalPolicies}
          </span>
          <span className="text-xs text-gray-500">
            {totalPolicies === 1 ? "póliza" : "pólizas"}
          </span>
        </div>
      </div>

      {/* Status text */}
      <p
        className={cn(
          "mt-3 text-sm font-medium",
          hasProtection ? "text-primary" : "text-gray-400"
        )}
      >
        {hasProtection
          ? totalPolicies === 1
            ? "Tienes cobertura activa"
            : "Estás protegido"
          : "Sin cobertura activa"}
      </p>
    </div>
  )
}
