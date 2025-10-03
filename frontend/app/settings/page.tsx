import { Sidebar } from "@/components/sidebar"
import { SettingsManagement } from "@/components/settings/settings-management"

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <SettingsManagement />
        </main>
      </div>
    </div>
  )
}
