import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { UserAdd01Icon, Shield01Icon, Alert02Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"
import type { IconSvgElement } from "@hugeicons/react"
import { cn } from "@/lib/utils"

const demoPages: {
  href: string
  title: string
  description: string
  icon: IconSvgElement
  color: string
}[] = [
  {
    href: "/demo/new-user",
    title: "Usuario nuevo",
    description: "Vista de un usuario que acaba de registrarse, sin pólizas activas",
    icon: UserAdd01Icon,
    color: "bg-blue-50 text-blue-600",
  },
  {
    href: "/demo/with-policies",
    title: "Con pólizas",
    description: "Vista de un usuario con múltiples pólizas de seguro activas",
    icon: Shield01Icon,
    color: "bg-primary/10 text-primary",
  },
  {
    href: "/demo/with-claim",
    title: "Con siniestro",
    description: "Vista de un usuario que tiene un siniestro activo en proceso",
    icon: Alert02Icon,
    color: "bg-secondary/20 text-secondary-700",
  },
]

export default function DemoIndexPage() {
  return (
    <div className="min-h-screen px-5 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-rich-black mb-2">
          Demo Dashboard
        </h1>
        <p className="text-gray-500">
          Explora las diferentes vistas del dashboard según el estado del usuario.
        </p>
      </div>

      {/* Demo cards */}
      <div className="space-y-3">
        {demoPages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className={cn(
                "flex items-center gap-4 p-4",
                "bg-white rounded-2xl",
                "shadow-sm hover:shadow-md transition-shadow",
                "group"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center",
                  "w-12 h-12 rounded-xl",
                  page.color
                )}
              >
                <HugeiconsIcon icon={page.icon} size={24} />
              </div>

              <div className="flex-1">
                <h2 className="font-semibold text-rich-black group-hover:text-primary transition-colors">
                  {page.title}
                </h2>
                <p className="text-sm text-gray-500">{page.description}</p>
              </div>

              <HugeiconsIcon icon={ArrowRight01Icon} size={20} className="text-gray-300 group-hover:text-primary transition-colors" />
            </Link>
          ))}
      </div>

      {/* Info */}
      <div className="mt-8 p-4 bg-white rounded-2xl">
        <h3 className="font-semibold text-rich-black mb-2">
          Sobre estas demos
        </h3>
        <p className="text-sm text-gray-500">
          Estas vistas utilizan datos mock para mostrar el diseño del dashboard
          sin necesidad de autenticación. Usa la navegación inferior para
          explorar.
        </p>
      </div>
    </div>
  )
}
