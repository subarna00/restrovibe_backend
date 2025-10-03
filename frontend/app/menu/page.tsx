import { Sidebar } from "@/components/sidebar"
import { MenuManagement } from "@/components/menu/menu-management"

export default function MenuPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <MenuManagement />
        </main>
      </div>
    </div>
  )
}
