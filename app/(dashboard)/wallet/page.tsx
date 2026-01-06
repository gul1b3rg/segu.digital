import { auth } from "@/lib/auth/auth"

export default async function WalletPage() {
  const session = await auth()

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Mi Billetera</h1>
        <p className="text-muted-foreground">
          Bienvenido, {session?.user?.name || session?.user?.email}
        </p>
      </div>

      <div className="glass p-6 rounded-lg">
        <p className="text-center text-muted-foreground">
          Aquí verás tus pólizas de seguro
        </p>
      </div>
    </div>
  )
}
