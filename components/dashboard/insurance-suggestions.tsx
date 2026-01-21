"use client"

import Link from "next/link"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Car01Icon,
  Home01Icon,
  FavouriteIcon,
  Shield01Icon,
  Airplane01Icon,
} from "@hugeicons/core-free-icons"
import type { IconSvgElement } from "@hugeicons/react"
import { cn } from "@/lib/utils"
import { insuranceTypes } from "@/lib/mock/dashboard-data"

const iconMap: Record<string, IconSvgElement> = {
  Car: Car01Icon,
  Home: Home01Icon,
  Heart: FavouriteIcon,
  Shield: Shield01Icon,
  Plane: Airplane01Icon,
}

const colorMap: Record<string, string> = {
  AUTO: "bg-blue-50 text-blue-600 hover:bg-blue-100",
  HOME: "bg-orange-50 text-orange-600 hover:bg-orange-100",
  LIFE: "bg-red-50 text-red-500 hover:bg-red-100",
  HEALTH: "bg-purple-50 text-purple-600 hover:bg-purple-100",
  TRAVEL: "bg-cyan-50 text-cyan-600 hover:bg-cyan-100",
}

interface InsuranceSuggestionsProps {
  showOnlyPopular?: boolean
  className?: string
}

export function InsuranceSuggestions({
  showOnlyPopular = true,
  className,
}: InsuranceSuggestionsProps) {
  const items = showOnlyPopular
    ? insuranceTypes.filter((i) => i.popular)
    : insuranceTypes

  return (
    <div className={cn("px-5", className)}>
      <h2 className="text-base font-semibold text-rich-black mb-3">
        Seguros populares
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {items.map((item) => {
          const icon = iconMap[item.icon] || Shield01Icon
          const colorClass = colorMap[item.type] || colorMap.LIFE

          return (
            <Link
              key={item.id}
              href={`/demo/explore?type=${item.type.toLowerCase()}`}
              className={cn(
                "flex flex-col items-center gap-2 p-4",
                "rounded-2xl transition-all",
                "bg-white hover:shadow-md",
                "group"
              )}
            >
              {item.image ? (
                <div className="w-14 h-14 relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div
                  className={cn(
                    "flex items-center justify-center",
                    "w-12 h-12 rounded-xl",
                    "transition-colors",
                    colorClass
                  )}
                >
                  <HugeiconsIcon icon={icon} size={24} />
                </div>
              )}
              <div className="text-center">
                <p className="text-sm font-medium text-rich-black">
                  {item.name}
                </p>
                <p className="text-[10px] text-gray-400">{item.description}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
