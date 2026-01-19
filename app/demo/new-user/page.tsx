import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProtectionRing } from "@/components/dashboard/protection-ring"
import { WelcomeCard } from "@/components/dashboard/welcome-card"
import { InsuranceSuggestions } from "@/components/dashboard/insurance-suggestions"
import { mockNewUser } from "@/lib/mock/dashboard-data"

export default function NewUserDemoPage() {
  return (
    <div className="min-h-screen">
      <DashboardHeader
        userName={mockNewUser.name}
        subtitle="Comienza a protegerte"
      />

      <ProtectionRing totalPolicies={0} />

      <WelcomeCard className="mb-6" />

      <InsuranceSuggestions showOnlyPopular />
    </div>
  )
}
