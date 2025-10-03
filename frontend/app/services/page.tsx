import { Sidebar } from "@/components/sidebar"
import { ServiceManagement } from "@/components/services/service-management"

export default function ServicesPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <ServiceManagement />
        </main>
      </div>
    </div>
  )
}
