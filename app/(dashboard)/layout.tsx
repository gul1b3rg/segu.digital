export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Auth is handled by middleware - no need for manual check here
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}
