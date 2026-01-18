import { Metadata } from "next"
import { AuthCard } from "@/components/auth/auth-card"

export const metadata: Metadata = {
  title: "Iniciar Sesión - SeguDigital",
  description: "Inicia sesión en tu cuenta de SeguDigital",
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-rich-black px-6 py-12">
      <AuthCard initialTab="login" />
    </main>
  )
}
