"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginUser, signInWithGoogle } from "@/app/actions/auth"

export function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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

  async function handleGoogleSignIn() {
    setIsLoading(true)
    try {
      const result = await signInWithGoogle()
      if (result?.error) {
        setError(result.error)
        setIsLoading(false)
      }
    } catch {
      setError("Error al iniciar sesión con Google")
      setIsLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-emerald-100 text-sm font-semibold"
          >
            Correo electrónico
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="tu@ejemplo.com"
            required
            disabled={isLoading}
            className="bg-slate-950/50 border-emerald-500/30 text-white placeholder:text-slate-400 focus:border-primary focus:ring-primary/50 h-12"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="password"
              className="text-emerald-100 text-sm font-semibold"
            >
              Contraseña
            </Label>
            <Link
              href="/forgot-password"
              className="text-sm text-emerald-400 hover:text-primary transition-colors font-medium"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            disabled={isLoading}
            className="bg-slate-950/50 border-emerald-500/30 text-white placeholder:text-slate-400 focus:border-primary focus:ring-primary/50 h-12"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-emerald-400 hover:from-emerald-400 hover:to-primary text-slate-950 shadow-lg shadow-primary/50 hover:shadow-primary/70 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-emerald-500/20"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-slate-900 px-3 text-emerald-100/50 font-semibold">
            O continúa con
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="w-full h-12 bg-slate-950/50 border-emerald-500/30 text-emerald-100 hover:bg-slate-900 hover:border-primary hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        type="button"
      >
        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
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
    </>
  )
}
