import { Sidebar } from "@/components/sidebar"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <AnalyticsDashboard />
        </main>
      </div>
    </div>
  )
}
