import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProtectionRing } from "@/components/dashboard/protection-ring"
import { PolicyCarousel } from "@/components/dashboard/policy-carousel"
import { QuickActions, defaultQuickActions } from "@/components/dashboard/quick-actions"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { mockUser, mockPolicies, mockActivities } from "@/lib/mock/dashboard-data"

export default function WithPoliciesDemoPage() {
  return (
    <div className="min-h-screen">
      <DashboardHeader
        userName={mockUser.name}
        subtitle="Estás protegido"
        notificationCount={2}
      />

      <ProtectionRing totalPolicies={mockPolicies.length} />

      <PolicyCarousel policies={mockPolicies} className="mb-6" />

      <QuickActions actions={defaultQuickActions} className="mb-6" />

      <ActivityFeed activities={mockActivities} />
    </div>
  )
}
