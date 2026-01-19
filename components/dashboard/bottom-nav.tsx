"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Wallet, Search, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  href: string
  icon: React.ElementType
  label: string
}

const navItems: NavItem[] = [
  { href: "/demo/with-policies", icon: Home, label: "Inicio" },
  { href: "/demo/policies", icon: Wallet, label: "Billetera" },
  { href: "/demo/explore", icon: Search, label: "Explorar" },
  { href: "/demo/profile", icon: User, label: "Perfil" },
]

interface BottomNavProps {
  className?: string
}

export function BottomNav({ className }: BottomNavProps) {
  const pathname = usePathname()

  // Determine active tab based on pathname
  const getIsActive = (href: string) => {
    if (href === "/demo/with-policies") {
      return (
        pathname === "/demo/with-policies" ||
        pathname === "/demo/new-user" ||
        pathname === "/demo/with-claim" ||
        pathname === "/demo"
      )
    }
    return pathname.startsWith(href)
  }

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50",
        "bg-rich-black rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.15)]",
        "px-2 pb-safe-bottom",
        className
      )}
    >
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = getIsActive(item.href)
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center",
                "min-w-[64px] h-full px-3 py-2",
                "transition-all duration-200",
                isActive
                  ? "text-lime-burst"
                  : "text-gray-400 hover:text-gray-300"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center",
                  "rounded-full transition-all duration-200",
                  isActive && "bg-lime-burst/15 px-4 py-1.5"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 transition-all",
                    isActive && "w-5 h-5"
                  )}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {isActive && (
                  <span className="ml-2 text-xs font-semibold">
                    {item.label}
                  </span>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
