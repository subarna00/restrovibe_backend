import { Sidebar } from "@/components/sidebar"
import { FinanceManagement } from "@/components/finance/finance-management"

export default function FinancePage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <FinanceManagement />
        </main>
      </div>
    </div>
  )
}
