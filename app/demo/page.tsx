import Link from "next/link"
import { UserPlus, Shield, AlertTriangle, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const demoPages = [
  {
    href: "/demo/new-user",
    title: "Usuario nuevo",
    description: "Vista de un usuario que acaba de registrarse, sin pólizas activas",
    icon: UserPlus,
    color: "bg-blue-50 text-blue-600",
  },
  {
    href: "/demo/with-policies",
    title: "Con pólizas",
    description: "Vista de un usuario con múltiples pólizas de seguro activas",
    icon: Shield,
    color: "bg-primary/10 text-primary",
  },
  {
    href: "/demo/with-claim",
    title: "Con siniestro",
    description: "Vista de un usuario que tiene un siniestro activo en proceso",
    icon: AlertTriangle,
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
        {demoPages.map((page) => {
          const Icon = page.icon

          return (
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
                <Icon className="w-6 h-6" />
              </div>

              <div className="flex-1">
                <h2 className="font-semibold text-rich-black group-hover:text-primary transition-colors">
                  {page.title}
                </h2>
                <p className="text-sm text-gray-500">{page.description}</p>
              </div>

              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" />
            </Link>
          )
        })}
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
