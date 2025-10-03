"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { TrendingUp, Receipt } from "lucide-react"
import { FinanceOverview } from "./finance-overview"
import { ExpenseTracking } from "./expense-tracking"
import { RevenueAnalysis } from "./revenue-analysis"
import { PaymentMethods } from "./payment-methods"
import { AddExpenseDialog } from "./add-expense-dialog"

export function FinanceManagement() {
  const [addExpenseOpen, setAddExpenseOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Finance</h1>
          <p className="text-muted-foreground">Track revenue, expenses, and financial performance</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setAddExpenseOpen(true)} variant="outline">
            <Receipt className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
          <Button>
            <TrendingUp className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      <FinanceOverview />

      <Tabs defaultValue="expenses" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="payments">Payment Methods</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="expenses" className="space-y-6">
          <ExpenseTracking />
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <RevenueAnalysis />
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <PaymentMethods />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Financial reports coming soon...</p>
          </div>
        </TabsContent>
      </Tabs>

      <AddExpenseDialog open={addExpenseOpen} onOpenChange={setAddExpenseOpen} />
    </div>
  )
}
