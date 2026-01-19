import { createClient } from "@/lib/supabase/server"

export default async function WalletPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Mi Billetera</h1>
        <p className="text-muted-foreground">
          Bienvenido, {user?.user_metadata?.name || user?.email}
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
