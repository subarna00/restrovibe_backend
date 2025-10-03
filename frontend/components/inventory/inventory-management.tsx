"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus, Package } from "lucide-react"
import { InventoryOverview } from "./inventory-overview"
import { StockList } from "./stock-list"
import { LowStockAlerts } from "./low-stock-alerts"
import { SupplierManagement } from "./supplier-management"
import { AddItemDialog } from "./add-item-dialog"

export function InventoryManagement() {
  const [addItemOpen, setAddItemOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory</h1>
          <p className="text-muted-foreground">Manage stock levels, suppliers, and inventory tracking</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setAddItemOpen(true)} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
          <Button>
            <Package className="h-4 w-4 mr-2" />
            Stock Report
          </Button>
        </div>
      </div>

      <InventoryOverview />

      <Tabs defaultValue="stock" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="stock">Stock Items</TabsTrigger>
          <TabsTrigger value="alerts">Low Stock</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="stock" className="space-y-6">
          <StockList />
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <LowStockAlerts />
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-6">
          <SupplierManagement />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Inventory reports coming soon...</p>
          </div>
        </TabsContent>
      </Tabs>

      <AddItemDialog open={addItemOpen} onOpenChange={setAddItemOpen} />
    </div>
  )
}
