import { Sidebar } from "@/components/sidebar"
import { NotificationManagement } from "@/components/notifications/notification-management"

export default function NotificationsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <NotificationManagement />
        </main>
      </div>
    </div>
  )
}
