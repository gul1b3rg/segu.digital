"use server"

import { hash } from "bcryptjs"
import { prisma } from "@/lib/db/prisma"
import { signIn } from "@/lib/auth/auth"
import { AuthError } from "next-auth"

export async function registerUser(formData: FormData) {
  console.log("=== REGISTER USER START ===")

  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string | null
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    console.log("Form data received:", { name, email, phone, hasPassword: !!password, hasConfirmPassword: !!confirmPassword })

    // Validaciones
    if (!name || !email || !password || !confirmPassword) {
      console.log("Validation failed: missing fields")
      return { error: "Todos los campos obligatorios deben estar completos" }
    }

    if (password !== confirmPassword) {
      console.log("Validation failed: passwords don't match")
      return { error: "Las contraseñas no coinciden" }
    }

    if (password.length < 8) {
      console.log("Validation failed: password too short")
      return { error: "La contraseña debe tener al menos 8 caracteres" }
    }

    console.log("Checking if user exists...")

    // Verificar si el usuario ya existe
    let existingUser
    try {
      existingUser = await prisma.user.findUnique({
        where: { email },
      })
      console.log("User lookup result:", existingUser ? "User exists" : "User not found")
    } catch (dbError) {
      console.error("Database error during user lookup:", dbError)
      return { error: `Error de base de datos: ${dbError instanceof Error ? dbError.message : 'Unknown error'}` }
    }

    if (existingUser) {
      return { error: "Este correo electrónico ya está registrado" }
    }

    console.log("Hashing password...")
    // Hash de la contraseña
    const hashedPassword = await hash(password, 12)
    console.log("Password hashed successfully")

    console.log("Creating user in database...")
    // Crear el usuario
    let user
    try {
      user = await prisma.user.create({
        data: {
          name,
          email,
          phone: phone || null,
          password: hashedPassword,
        },
      })
      console.log("User created successfully:", { id: user.id, email: user.email })
    } catch (createError) {
      console.error("Database error during user creation:", createError)
      return { error: `Error al crear usuario: ${createError instanceof Error ? createError.message : 'Unknown error'}` }
    }

    console.log("=== REGISTER USER SUCCESS ===")
    return { success: true, userId: user.id }
  } catch (error) {
    console.error("=== REGISTER USER ERROR ===")
    console.error("Error type:", error?.constructor?.name)
    console.error("Error message:", error instanceof Error ? error.message : String(error))
    console.error("Full error:", error)
    return { error: `Error al crear la cuenta: ${error instanceof Error ? error.message : 'Error desconocido'}` }
  }
}

export async function loginUser(formData: FormData) {
  console.log("=== LOGIN USER START ===")

  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    console.log("Login attempt for:", email)

    if (!email || !password) {
      console.log("Validation failed: missing email or password")
      return { error: "Email y contraseña son requeridos" }
    }

    console.log("Calling signIn...")
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    console.log("=== LOGIN USER SUCCESS ===")
    return { success: true }
  } catch (error) {
    console.error("=== LOGIN USER ERROR ===")
    console.error("Error type:", error?.constructor?.name)
    console.error("Error message:", error instanceof Error ? error.message : String(error))

    if (error instanceof AuthError) {
      console.error("AuthError type:", error.type)
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciales inválidas" }
        default:
          return { error: `Error de autenticación: ${error.type}` }
      }
    }

    // Si el error tiene un cause, puede tener más info
    if (error instanceof Error && error.cause) {
      console.error("Error cause:", error.cause)
    }

    throw error
  }
}
