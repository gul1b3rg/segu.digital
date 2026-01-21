"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerUser, loginUser, signInWithGoogle } from "@/app/actions/auth"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Mail01Icon,
  LockIcon,
  UserIcon,
  ViewIcon,
  ViewOffIcon,
  ArrowLeft01Icon,
} from "@hugeicons/core-free-icons"

interface AuthCardProps {
  initialTab?: "login" | "register"
}

export function AuthCard({ initialTab = "login" }: AuthCardProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"login" | "register">(initialTab)
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)

    try {
      const result = await loginUser(formData)

      if (result.error) {
        setError(result.error)
        setIsLoading(false)
        return
      }

      router.push("/wallet")
      router.refresh()
    } catch {
      setError("Ocurrió un error inesperado")
      setIsLoading(false)
    }
  }

  async function handleRegisterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)

    try {
      const result = await registerUser(formData)

      if (result.error) {
        setError(result.error)
        setIsLoading(false)
        return
      }

      // With Supabase, user is automatically signed in after registration
      router.push("/wallet")
      router.refresh()
    } catch {
      setError("Ocurrió un error inesperado")
      setIsLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    setIsLoading(true)
    try {
      const result = await signInWithGoogle()
      if (result?.error) {
        setError(result.error)
        setIsLoading(false)
      }
      // If successful, the user will be redirected by the server action
    } catch {
      setError("Error al conectar con Google")
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white mb-8 hover:bg-white/20 transition-colors"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {activeTab === "login" ? "Bienvenido de nuevo" : "Crea tu cuenta"}
        </h1>
        <p className="text-gray-400">
          {activeTab === "login"
            ? "Inicia sesión para gestionar tus seguros"
            : "Regístrate para comenzar a gestionar tus seguros"}
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl p-6 shadow-xl">
        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-full p-1 mb-6">
          <button
            type="button"
            onClick={() => {
              setActiveTab("login")
              setError("")
            }}
            className={`flex-1 py-2.5 text-sm font-medium rounded-full transition-all ${
              activeTab === "login"
                ? "bg-white text-rich-black shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Ingresar
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("register")
              setError("")
            }}
            className={`flex-1 py-2.5 text-sm font-medium rounded-full transition-all ${
              activeTab === "register"
                ? "bg-white text-rich-black shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        {activeTab === "login" && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="login-email" className="text-xs text-gray-500 font-medium">
                Correo electrónico
              </Label>
              <div className="relative">
                <HugeiconsIcon icon={Mail01Icon} size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  required
                  disabled={isLoading}
                  className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-xl focus:bg-white"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="login-password" className="text-xs text-gray-500 font-medium">
                Contraseña
              </Label>
              <div className="relative">
                <HugeiconsIcon icon={LockIcon} size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  className="pl-10 pr-10 h-12 bg-gray-50 border-gray-200 rounded-xl focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <HugeiconsIcon icon={showPassword ? ViewOffIcon : ViewIcon} size={20} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                <span className="text-gray-600">Recordarme</span>
              </label>
              <Link href="/forgot-password" className="text-lime-600 hover:text-lime-700 font-medium">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-lime-burst hover:bg-lime-400 text-rich-black font-semibold rounded-xl transition-all"
            >
              {isLoading ? "Ingresando..." : "Ingresar"}
            </Button>
          </form>
        )}

        {/* Register Form */}
        {activeTab === "register" && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="register-name" className="text-xs text-gray-500 font-medium">
                Nombre completo
              </Label>
              <div className="relative">
                <HugeiconsIcon icon={UserIcon} size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  id="register-name"
                  name="name"
                  type="text"
                  placeholder="Juan Pérez"
                  required
                  disabled={isLoading}
                  className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-xl focus:bg-white"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="register-email" className="text-xs text-gray-500 font-medium">
                Correo electrónico
              </Label>
              <div className="relative">
                <HugeiconsIcon icon={Mail01Icon} size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  id="register-email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  required
                  disabled={isLoading}
                  className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-xl focus:bg-white"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="register-password" className="text-xs text-gray-500 font-medium">
                Contraseña
              </Label>
              <div className="relative">
                <HugeiconsIcon icon={LockIcon} size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  id="register-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  className="pl-10 pr-10 h-12 bg-gray-50 border-gray-200 rounded-xl focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <HugeiconsIcon icon={showPassword ? ViewOffIcon : ViewIcon} size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="register-confirm" className="text-xs text-gray-500 font-medium">
                Confirmar contraseña
              </Label>
              <div className="relative">
                <HugeiconsIcon icon={LockIcon} size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  id="register-confirm"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-xl focus:bg-white"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-lime-burst hover:bg-lime-400 text-rich-black font-semibold rounded-xl transition-all"
            >
              {isLoading ? "Registrando..." : "Registrarse"}
            </Button>
          </form>
        )}

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-3 text-gray-400">O continúa con</span>
          </div>
        </div>

        {/* Social buttons */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="flex-1 h-12 rounded-xl border-gray-200 hover:bg-gray-50"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </Button>
        </div>
      </div>
    </div>
  )
}
