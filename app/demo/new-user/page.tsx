import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { WelcomeCard } from "@/components/dashboard/welcome-card"
import { ImportPolicyCard } from "@/components/dashboard/import-policy-card"
import { ProfileProgress } from "@/components/dashboard/profile-progress"
import { InsuranceSuggestions } from "@/components/dashboard/insurance-suggestions"

export default function NewUserDemoPage() {
  return (
    <div className="min-h-screen pb-24 bg-misty">
      {/* Header con avatar y saludo */}
      <DashboardHeader
        userName="Usuario"
        showNotification={false}
      />

      {/* Barra de progreso del perfil */}
      <ProfileProgress className="mb-4" />

      {/* Card principal de conversión */}
      <WelcomeCard className="mb-4" />

      {/* Card para importar póliza existente */}
      <ImportPolicyCard className="mb-6" />

      {/* Seguros populares */}
      <InsuranceSuggestions showOnlyPopular />
    </div>
  )
}
