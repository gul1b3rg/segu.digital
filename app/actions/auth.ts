"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function registerUser(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  // Validaciones
  if (!name || !email || !password || !confirmPassword) {
    return { error: "Todos los campos obligatorios deben estar completos" }
  }

  if (password !== confirmPassword) {
    return { error: "Las contraseñas no coinciden" }
  }

  if (password.length < 8) {
    return { error: "La contraseña debe tener al menos 8 caracteres" }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        full_name: name,
      },
    },
  })

  if (error) {
    console.error("Supabase auth error:", error)

    if (error.message.includes("already registered")) {
      return { error: "Este correo electrónico ya está registrado" }
    }

    return { error: error.message }
  }

  if (!data.user) {
    return { error: "Error al crear la cuenta" }
  }

  // Check if email confirmation is required
  if (data.user.identities?.length === 0) {
    return { error: "Este correo electrónico ya está registrado" }
  }

  return { success: true, userId: data.user.id }
}

export async function loginUser(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email y contraseña son requeridos" }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("Supabase login error:", error)

    if (error.message.includes("Invalid login credentials")) {
      return { error: "Credenciales inválidas" }
    }

    return { error: error.message }
  }

  return { success: true }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/login")
}

export async function signInWithGoogle() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  if (data.url) {
    redirect(data.url)
  }

  return { error: "No se pudo iniciar sesión con Google" }
}

export async function getUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
