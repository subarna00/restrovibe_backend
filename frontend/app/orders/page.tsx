import { Sidebar } from "@/components/sidebar"
import { OrderManagement } from "@/components/orders/order-management"

export default function OrdersPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <OrderManagement />
        </main>
      </div>
    </div>
  )
}
