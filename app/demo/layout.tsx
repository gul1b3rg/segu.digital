import { BottomNav } from "@/components/dashboard/bottom-nav"

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-misty">
      <main className="pb-20">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
