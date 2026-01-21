"use client"

import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import { Notification01Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

interface DashboardHeaderProps {
  userName: string
  subtitle?: string
  showNotification?: boolean
  notificationCount?: number
  avatarUrl?: string
  className?: string
}

export function DashboardHeader({
  userName,
  subtitle,
  showNotification = true,
  notificationCount = 0,
  avatarUrl = "/images/avatar-placeholder.svg",
  className,
}: DashboardHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between",
        "px-5 pt-safe-top",
        "pt-12 pb-4",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative w-11 h-11 rounded-full overflow-hidden bg-gray-200">
          <Image
            src={avatarUrl}
            alt={userName}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="text-xl font-bold text-rich-black">
            Hola, {userName}
          </h1>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>

      {showNotification && (
        <button
          className={cn(
            "relative flex items-center justify-center",
            "w-10 h-10 rounded-full",
            "bg-white shadow-sm",
            "transition-all hover:shadow-md"
          )}
        >
          <HugeiconsIcon icon={Notification01Icon} size={20} className="text-gray-600" />
          {notificationCount > 0 && (
            <span
              className={cn(
                "absolute -top-0.5 -right-0.5",
                "flex items-center justify-center",
                "min-w-[18px] h-[18px] px-1",
                "text-[10px] font-bold text-white",
                "bg-destructive rounded-full"
              )}
            >
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </button>
      )}
    </header>
  )
}
