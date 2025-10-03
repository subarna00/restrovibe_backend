import { Sidebar } from "@/components/sidebar"
import { TableManagement } from "@/components/tables/table-management"

export default function TablesPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <TableManagement />
        </main>
      </div>
    </div>
  )
}
