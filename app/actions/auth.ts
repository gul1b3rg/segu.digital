"use server"

import { hash } from "bcryptjs"
import { prisma } from "@/lib/db/prisma"
import { signIn } from "@/lib/auth/auth"
import { AuthError } from "next-auth"

export async function registerUser(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string | null
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

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { error: "Este correo electrónico ya está registrado" }
    }

    // Hash de la contraseña
    const hashedPassword = await hash(password, 12)

    // Crear el usuario
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || null,
        password: hashedPassword,
      },
    })

    return { success: true, userId: user.id }
  } catch (error) {
    console.error("Error en registro:", error)
    return { error: "Error al crear la cuenta. Intenta nuevamente." }
  }
}

export async function loginUser(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
      return { error: "Email y contraseña son requeridos" }
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    return { success: true }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciales inválidas" }
        default:
          return { error: "Error al iniciar sesión" }
      }
    }
    throw error
  }
}
