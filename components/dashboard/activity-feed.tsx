"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import {
  Alert02Icon,
  CreditCardIcon,
  Pdf01Icon,
  RefreshIcon,
  UserCheck01Icon,
  Calendar01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"
import type { IconSvgElement } from "@hugeicons/react"
import { cn } from "@/lib/utils"
import type { MockActivity } from "@/lib/mock/dashboard-data"
import { formatCurrency } from "@/lib/mock/dashboard-data"

const iconMap: Record<string, IconSvgElement> = {
  AlertTriangle: Alert02Icon,
  CreditCard: CreditCardIcon,
  FileText: Pdf01Icon,
  RefreshCw: RefreshIcon,
  UserCheck: UserCheck01Icon,
  Calendar: Calendar01Icon,
}

const typeColors: Record<string, string> = {
  EXPIRING: "bg-secondary/10 text-secondary-600",
  PAYMENT: "bg-primary/10 text-primary",
  CLAIM_UPDATE: "bg-blue-50 text-blue-600",
  RENEWAL: "bg-purple-50 text-purple-600",
  DOCUMENT: "bg-gray-100 text-gray-600",
}

interface ActivityFeedProps {
  activities: MockActivity[]
  title?: string
  showViewAll?: boolean
  className?: string
}

export function ActivityFeed({
  activities,
  title = "Actividad reciente",
  showViewAll = true,
  className,
}: ActivityFeedProps) {
  if (activities.length === 0) return null

  return (
    <div className={cn("px-5", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-rich-black">{title}</h2>
        {showViewAll && (
          <button className="text-xs text-primary font-medium flex items-center gap-1">
            Ver todo
            <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
          </button>
        )}
      </div>

      {/* Activity list */}
      <div className="space-y-2">
        {activities.map((activity) => {
          const icon = iconMap[activity.icon] || Pdf01Icon
          const colorClass = typeColors[activity.type] || typeColors.DOCUMENT

          return (
            <div
              key={activity.id}
              className={cn(
                "flex items-center gap-3 p-3",
                "bg-white rounded-xl",
                "cursor-pointer hover:shadow-sm transition-shadow"
              )}
            >
              {/* Icon */}
              <div
                className={cn(
                  "flex items-center justify-center",
                  "w-10 h-10 rounded-xl flex-shrink-0",
                  colorClass
                )}
              >
                <HugeiconsIcon icon={icon} size={20} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-rich-black truncate">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {activity.description}
                </p>
              </div>

              {/* Right side */}
              <div className="text-right flex-shrink-0">
                {activity.amount ? (
                  <p className="text-sm font-semibold text-rich-black">
                    Gs. {formatCurrency(activity.amount)}
                  </p>
                ) : null}
                <p className="text-[10px] text-gray-400">{activity.date}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
