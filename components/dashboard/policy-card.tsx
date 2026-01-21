"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import {
  Car01Icon,
  Home01Icon,
  FavouriteIcon,
  Shield01Icon,
  Airplane01Icon,
  Building01Icon,
  Alert02Icon,
} from "@hugeicons/core-free-icons"
import type { IconSvgElement } from "@hugeicons/react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import type { MockPolicy, PolicyType } from "@/lib/mock/dashboard-data"
import { formatCurrency, getDaysUntilExpiry, formatDate } from "@/lib/mock/dashboard-data"

const policyIcons: Record<PolicyType, IconSvgElement> = {
  AUTO: Car01Icon,
  HOME: Home01Icon,
  HEALTH: FavouriteIcon,
  LIFE: Shield01Icon,
  TRAVEL: Airplane01Icon,
  BUSINESS: Building01Icon,
}

const policyColors: Record<PolicyType, string> = {
  AUTO: "bg-blue-50 text-blue-600",
  HOME: "bg-orange-50 text-orange-600",
  HEALTH: "bg-red-50 text-red-500",
  LIFE: "bg-purple-50 text-purple-600",
  TRAVEL: "bg-cyan-50 text-cyan-600",
  BUSINESS: "bg-gray-50 text-gray-600",
}

interface PolicyCardProps {
  policy: MockPolicy
  onClick?: () => void
  className?: string
}

export function PolicyCard({ policy, onClick, className }: PolicyCardProps) {
  const icon = policyIcons[policy.type]
  const iconColorClass = policyColors[policy.type]
  const daysUntilExpiry = getDaysUntilExpiry(policy.expiresAt)
  const isExpiring = daysUntilExpiry <= 30 && daysUntilExpiry > 0

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative flex-shrink-0 w-[280px]",
        "bg-white rounded-2xl p-4",
        "shadow-sm hover:shadow-md transition-shadow",
        "cursor-pointer",
        className
      )}
    >
      {/* Claim badge */}
      {policy.hasClaim && (
        <div className="absolute -top-2 -right-2">
          <div className="flex items-center gap-1 bg-secondary text-rich-black text-[10px] font-semibold px-2 py-1 rounded-full">
            <HugeiconsIcon icon={Alert02Icon} size={12} />
            Siniestro
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className={cn(
            "flex items-center justify-center",
            "w-12 h-12 rounded-xl",
            iconColorClass
          )}
        >
          <HugeiconsIcon icon={icon} size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-rich-black truncate">
            {policy.name}
          </h3>
          <p className="text-xs text-gray-500">{policy.provider}</p>
        </div>
      </div>

      {/* Policy number */}
      <p className="text-xs text-gray-400 mb-3 font-mono">
        {policy.policyNumber}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider">
            Vence
          </p>
          <p className="text-sm font-medium text-rich-black">
            {formatDate(policy.expiresAt)}
          </p>
        </div>

        <Badge
          variant={isExpiring ? "secondary" : "outline"}
          className={cn(
            "text-xs",
            isExpiring
              ? "bg-secondary/20 text-secondary-700 border-secondary"
              : "bg-primary/10 text-primary border-primary/20"
          )}
        >
          {isExpiring ? `Vence en ${daysUntilExpiry}d` : "Activa"}
        </Badge>
      </div>

      {/* Premium (optional) */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">Prima mensual</span>
          <span className="text-sm font-semibold text-rich-black">
            Gs. {formatCurrency(policy.premium)}
          </span>
        </div>
      </div>
    </div>
  )
}
