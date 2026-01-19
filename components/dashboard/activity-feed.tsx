"use client"

import {
  AlertTriangle,
  CreditCard,
  FileText,
  RefreshCw,
  UserCheck,
  Calendar,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { MockActivity } from "@/lib/mock/dashboard-data"
import { formatCurrency } from "@/lib/mock/dashboard-data"

const iconMap: Record<string, React.ElementType> = {
  AlertTriangle,
  CreditCard,
  FileText,
  RefreshCw,
  UserCheck,
  Calendar,
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
            <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Activity list */}
      <div className="space-y-2">
        {activities.map((activity) => {
          const Icon = iconMap[activity.icon] || FileText
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
                <Icon className="w-5 h-5" />
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
