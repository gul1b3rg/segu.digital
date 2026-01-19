"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { PolicyCard } from "./policy-card"
import type { MockPolicy } from "@/lib/mock/dashboard-data"

interface PolicyCarouselProps {
  policies: MockPolicy[]
  className?: string
}

export function PolicyCarousel({ policies, className }: PolicyCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  if (policies.length === 0) return null

  return (
    <div className={cn("relative", className)}>
      {/* Section header */}
      <div className="flex items-center justify-between px-5 mb-3">
        <h2 className="text-base font-semibold text-rich-black">
          Mis pólizas
        </h2>
        <div className="flex gap-1">
          <button
            onClick={() => scroll("left")}
            className="p-1.5 rounded-full bg-white shadow-sm hover:shadow transition-shadow"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-1.5 rounded-full bg-white shadow-sm hover:shadow transition-shadow"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className={cn(
          "flex gap-4 overflow-x-auto scrollbar-hide",
          "px-5 pb-2",
          "snap-x snap-mandatory"
        )}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {policies.map((policy) => (
          <div key={policy.id} className="snap-start">
            <PolicyCard policy={policy} />
          </div>
        ))}
      </div>
    </div>
  )
}
