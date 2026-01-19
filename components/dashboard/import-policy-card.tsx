"use client"

import Link from "next/link"
import { Upload, FileText, Camera, Link2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImportPolicyCardProps {
  className?: string
}

export function ImportPolicyCard({ className }: ImportPolicyCardProps) {
  return (
    <div
      className={cn(
        "relative mx-5 p-5 rounded-2xl overflow-hidden",
        "bg-rich-black",
        "border border-dashed border-gray-600",
        className
      )}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-lime-burst/5 pointer-events-none" />

      <div className="relative">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10">
            <Upload className="w-6 h-6 text-lime-burst" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-white mb-1">
              ¿Ya tienes un seguro?
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Agregalo sin costo y gestiona todos tus servicios desde un solo lugar.
            </p>
          </div>
        </div>

        {/* Import options */}
        <div className="flex gap-2 mt-2">
          <Link
            href="/demo/import?type=pdf"
            className={cn(
              "flex-1 flex items-center justify-center gap-2",
              "py-3 px-4 rounded-xl",
              "bg-white/10 hover:bg-white/15",
              "text-white text-sm font-medium",
              "transition-colors"
            )}
          >
            <FileText className="w-4 h-4" />
            PDF
          </Link>
          <Link
            href="/demo/import?type=photo"
            className={cn(
              "flex-1 flex items-center justify-center gap-2",
              "py-3 px-4 rounded-xl",
              "bg-white/10 hover:bg-white/15",
              "text-white text-sm font-medium",
              "transition-colors"
            )}
          >
            <Camera className="w-4 h-4" />
            Foto
          </Link>
          <Link
            href="/demo/import?type=manual"
            className={cn(
              "flex-1 flex items-center justify-center gap-2",
              "py-3 px-4 rounded-xl",
              "bg-white/10 hover:bg-white/15",
              "text-white text-sm font-medium",
              "transition-colors"
            )}
          >
            <Link2 className="w-4 h-4" />
            Manual
          </Link>
        </div>
      </div>
    </div>
  )
}
