"use client"

import Image from "next/image"
import Link from "next/link"
import { Car, Home, Heart, MoreHorizontal, ArrowRight, Shield, Clock, ThumbsUp } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { cn } from "@/lib/utils"

const insuranceTypes = [
  {
    id: "auto",
    name: "Auto",
    description: "Vehículos",
    icon: Car,
    image: "/icons/car.png",
    href: "/demo/explore/auto",
    color: "bg-blue-50",
  },
  {
    id: "home",
    name: "Hogar",
    description: "Casa y depto",
    icon: Home,
    image: "/icons/house.png",
    href: "/demo/explore/home",
    color: "bg-orange-50",
  },
  {
    id: "life",
    name: "Vida",
    description: "Protección familiar",
    icon: Heart,
    image: "/icons/life.png",
    href: "/demo/explore/life",
    color: "bg-red-50",
  },
  {
    id: "other",
    name: "Otros",
    description: "Más opciones",
    icon: MoreHorizontal,
    href: "/demo/explore/other",
    color: "bg-gray-100",
  },
]

const benefits = [
  {
    icon: Clock,
    title: "En minutos",
    description: "Cotiza y contrata en menos de 5 minutos",
  },
  {
    icon: Shield,
    title: "100% Digital",
    description: "Sin papeles ni trámites presenciales",
  },
  {
    icon: ThumbsUp,
    title: "Mejores precios",
    description: "Comparamos entre aseguradoras por ti",
  },
]

export default function ExplorePage() {
  return (
    <div className="min-h-screen pb-24 bg-misty">
      {/* Header */}
      <DashboardHeader
        userName="Usuario"
        subtitle="Explora seguros"
        showNotification={false}
      />

      {/* Hero Card - Pareja tomando café */}
      <div className="mx-5 mb-6">
        <div className="relative rounded-2xl overflow-hidden bg-white">
          {/* Image */}
          <div className="relative h-48 w-full">
            <Image
              src="/images/couple-new-insurance.png"
              alt="Pareja disfrutando un café"
              fill
              className="object-cover object-top"
              priority
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="px-5 pb-5 -mt-8 relative">
            <h2 className="text-xl font-bold text-rich-black mb-2">
              Tan fácil como tomar un café
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Cotiza, compara y contrata tu seguro en minutos. Sin complicaciones, sin letra chica.
            </p>
          </div>
        </div>
      </div>

      {/* Insurance Type Selector */}
      <div className="px-5 mb-6">
        <h3 className="text-base font-semibold text-rich-black mb-3">
          ¿Qué quieres proteger?
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {insuranceTypes.map((type) => {
            const Icon = type.icon
            return (
              <Link
                key={type.id}
                href={type.href}
                className={cn(
                  "flex flex-col items-center gap-2 p-3",
                  "rounded-2xl transition-all",
                  "bg-white hover:shadow-md",
                  "group"
                )}
              >
                {type.image ? (
                  <div className="w-12 h-12 relative">
                    <Image
                      src={type.image}
                      alt={type.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div
                    className={cn(
                      "flex items-center justify-center",
                      "w-12 h-12 rounded-xl",
                      type.color
                    )}
                  >
                    <Icon className="w-6 h-6 text-gray-600" />
                  </div>
                )}
                <div className="text-center">
                  <p className="text-xs font-medium text-rich-black">
                    {type.name}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="px-5 mb-6">
        <h3 className="text-base font-semibold text-rich-black mb-3">
          ¿Por qué con SeguDigital?
        </h3>
        <div className="space-y-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div
                key={benefit.title}
                className="flex items-start gap-4 p-4 bg-white rounded-2xl"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-rich-black">
                    {benefit.title}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {benefit.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA - ¿Necesitas ayuda? */}
      <div className="px-5">
        <div className="p-4 bg-rich-black rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">
                ¿No sabes qué seguro necesitas?
              </h4>
              <p className="text-xs text-gray-400">
                Te ayudamos a encontrar el ideal para ti
              </p>
            </div>
            <Link
              href="/demo/explore/advisor"
              className={cn(
                "flex items-center justify-center",
                "w-10 h-10 rounded-full",
                "bg-lime-burst",
                "transition-transform hover:scale-105"
              )}
            >
              <ArrowRight className="w-5 h-5 text-rich-black" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
