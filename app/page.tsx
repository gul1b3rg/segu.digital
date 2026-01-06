import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-4xl font-bold text-primary">
          SeguDigital
        </h1>
        <p className="text-xl text-muted-foreground">
          Tu seguro en un toque
        </p>
        <p className="text-sm text-muted-foreground">
          Gestiona tus seguros, cotiza y realiza reclamos desde tu celular
        </p>
        <div className="flex flex-col gap-4 pt-6">
          <Button asChild size="lg" className="w-full">
            <Link href="/login">
              Iniciar Sesión
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link href="/register">
              Registrarse
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
