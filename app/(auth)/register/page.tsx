import { Metadata } from "next"
import { AuthCard } from "@/components/auth/auth-card"

export const metadata: Metadata = {
  title: "Registrarse - SeguDigital",
  description: "Crea tu cuenta en SeguDigital",
}

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-rich-black px-6 py-12">
      <AuthCard initialTab="register" />
    </main>
  )
}
