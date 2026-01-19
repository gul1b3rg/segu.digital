"use client"

import Link from "next/link"
import { ShieldPlus, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface WelcomeCardProps {
  className?: string
}

export function WelcomeCard({ className }: WelcomeCardProps) {
  return (
    <div
      className={cn(
        "relative mx-5 p-6 rounded-2xl overflow-hidden",
        "bg-gradient-to-br from-primary to-primary/80",
        "text-white",
        className
      )}
    >
      {/* Shimmer animation overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_ease-in-out_infinite]">
        <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
      </div>

      <div className="relative flex items-start gap-4">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20">
          <ShieldPlus className="w-7 h-7" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-1">
            Comienza a protegerte
          </h3>
          <p className="text-sm text-white/80 mb-4">
            Tu futuro financiero comienza con una buena protección.
          </p>
          <Link href="/demo/explore">
            <Button
              className={cn(
                "bg-white text-primary hover:bg-white/90",
                "font-semibold",
                "gap-2"
              )}
            >
              Explorar seguros
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
