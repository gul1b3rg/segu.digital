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
        "mx-5 p-6 rounded-2xl",
        "bg-gradient-to-br from-primary to-primary-600",
        "text-white",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20">
          <ShieldPlus className="w-7 h-7" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-1">
            Comienza a protegerte
          </h3>
          <p className="text-sm text-white/80 mb-4">
            Explora nuestros seguros y encuentra la cobertura perfecta para ti.
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
