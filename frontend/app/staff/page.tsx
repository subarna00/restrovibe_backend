import { Sidebar } from "@/components/sidebar"
import { StaffManagement } from "@/components/staff/staff-management"

export default function StaffPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <StaffManagement />
        </main>
      </div>
    </div>
  )
}
