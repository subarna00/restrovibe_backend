import { Sidebar } from "@/components/sidebar"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6">
            <AnalyticsDashboard />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
