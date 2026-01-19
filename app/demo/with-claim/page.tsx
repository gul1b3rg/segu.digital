import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ClaimAlert } from "@/components/dashboard/claim-alert"
import { ClaimTracker } from "@/components/dashboard/claim-tracker"
import { PolicyCarousel } from "@/components/dashboard/policy-carousel"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import {
  mockUser,
  mockPoliciesWithClaim,
  mockClaim,
  mockActivitiesWithClaim,
} from "@/lib/mock/dashboard-data"

export default function WithClaimDemoPage() {
  return (
    <div className="min-h-screen">
      <DashboardHeader
        userName={mockUser.name}
        subtitle="Seguimos tu caso"
        notificationCount={3}
      />

      <ClaimAlert claim={mockClaim} className="mt-2 mb-6" />

      <ClaimTracker steps={mockClaim.steps} className="mb-6" />

      <PolicyCarousel policies={mockPoliciesWithClaim} className="mb-6" />

      <ActivityFeed
        activities={mockActivitiesWithClaim}
        title="Actualizaciones"
      />
    </div>
  )
}
