"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus, TrendingUp } from "lucide-react"
import { CustomerOverview } from "./customer-overview"
import { CustomerList } from "./customer-list"
import { LoyaltyProgram } from "./loyalty-program"
import { CustomerAnalytics } from "./customer-analytics"
import { AddCustomerDialog } from "./add-customer-dialog"

export function CustomerManagement() {
  const [addCustomerOpen, setAddCustomerOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customers</h1>
          <p className="text-muted-foreground">Manage customer relationships and loyalty programs</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setAddCustomerOpen(true)} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
          <Button>
            <TrendingUp className="h-4 w-4 mr-2" />
            Customer Report
          </Button>
        </div>
      </div>

      <CustomerOverview />

      <Tabs defaultValue="customers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="customers">All Customers</TabsTrigger>
          <TabsTrigger value="loyalty">Loyalty Program</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-6">
          <CustomerList />
        </TabsContent>

        <TabsContent value="loyalty" className="space-y-6">
          <LoyaltyProgram />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <CustomerAnalytics />
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Customer feedback system coming soon...</p>
          </div>
        </TabsContent>
      </Tabs>

      <AddCustomerDialog open={addCustomerOpen} onOpenChange={setAddCustomerOpen} />
    </div>
  )
}
