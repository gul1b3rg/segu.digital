import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { WelcomeCard } from "@/components/dashboard/welcome-card"
import { ImportPolicyCard } from "@/components/dashboard/import-policy-card"
import { ProfileProgress } from "@/components/dashboard/profile-progress"
import { InsuranceSuggestions } from "@/components/dashboard/insurance-suggestions"
import { mockNewUser } from "@/lib/mock/dashboard-data"

export default function NewUserDemoPage() {
  return (
    <div className="min-h-screen pb-24">
      <DashboardHeader
        userName={mockNewUser.name}
        subtitle="Bienvenido a SeguDigital"
      />

      {/* Card principal de conversión */}
      <WelcomeCard className="mb-4" />

      {/* Card para importar póliza existente */}
      <ImportPolicyCard className="mb-6" />

      {/* Seguros populares */}
      <InsuranceSuggestions showOnlyPopular className="mb-6" />

      {/* Widget de progreso de perfil */}
      <ProfileProgress />
    </div>
  )
}
