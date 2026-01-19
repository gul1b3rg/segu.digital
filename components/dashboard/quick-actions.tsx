"use client"

import Link from "next/link"
import {
  FileText,
  AlertCircle,
  Phone,
  CreditCard,
  Search,
  Plus,
} from "lucide-react"
import { cn } from "@/lib/utils"

const iconMap: Record<string, React.ElementType> = {
  FileText,
  AlertCircle,
  Phone,
  CreditCard,
  Search,
  Plus,
}

interface QuickAction {
  id: string
  label: string
  icon: string
  href: string
  highlighted?: boolean
}

interface QuickActionsProps {
  actions: QuickAction[]
  className?: string
}

export function QuickActions({ actions, className }: QuickActionsProps) {
  return (
    <div className={cn("px-5", className)}>
      <h2 className="text-base font-semibold text-rich-black mb-3">
        Acciones rápidas
      </h2>
      <div className="grid grid-cols-4 gap-3">
        {actions.map((action) => {
          const Icon = iconMap[action.icon] || FileText

          return (
            <Link
              key={action.id}
              href={action.href}
              className={cn(
                "flex flex-col items-center gap-2 p-3",
                "rounded-2xl transition-all",
                action.highlighted
                  ? "bg-lime-burst text-rich-black shadow-sm"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center",
                  "w-10 h-10 rounded-xl",
                  action.highlighted
                    ? "bg-rich-black/10"
                    : "bg-misty"
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-medium text-center leading-tight">
                {action.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// Default actions for users with policies
export const defaultQuickActions: QuickAction[] = [
  {
    id: "policies",
    label: "Mis Pólizas",
    icon: "FileText",
    href: "/demo/policies",
  },
  {
    id: "claim",
    label: "Siniestro",
    icon: "AlertCircle",
    href: "/demo/claims/new",
  },
  {
    id: "assistance",
    label: "Asistencia",
    icon: "Phone",
    href: "/demo/assistance",
  },
  {
    id: "payments",
    label: "Pagos",
    icon: "CreditCard",
    href: "/demo/payments",
  },
]

// Actions for new users (no policies)
export const newUserQuickActions: QuickAction[] = [
  {
    id: "explore",
    label: "Explorar seguros",
    icon: "Search",
    href: "/demo/explore",
    highlighted: true,
  },
]
