import { Sidebar } from "@/components/sidebar"
import { CustomerManagement } from "@/components/customers/customer-management"

export default function CustomersPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <CustomerManagement />
        </main>
      </div>
    </div>
  )
}
