"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TodaysSummary } from "./todays-summary"
import { SalesOverview } from "./sales-overview"
import { SalesSummary } from "./sales-summary"
import { CheckoutBreakdown } from "./checkout-breakdown"
import { OrderOverview } from "./order-overview"
import { StatsCards } from "./stats-cards"
import { TransactionHistory } from "./transaction-history"

export function AnalyticsDashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between pb-2 border-b border-border/50">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Track your restaurant's performance and insights</p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="this-month">
            <SelectTrigger className="w-36 focus-ring">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-36 focus-ring">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Daybook: All</SelectItem>
              <SelectItem value="dine-in">Dine In</SelectItem>
              <SelectItem value="takeaway">Takeaway</SelectItem>
              <SelectItem value="delivery">Delivery</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="grid w-fit grid-cols-3 p-1 bg-muted/50">
          <TabsTrigger value="overview" className="px-6">
            Overview
          </TabsTrigger>
          <TabsTrigger value="finance" className="px-6">
            Finance
          </TabsTrigger>
          <TabsTrigger value="order" className="px-6">
            Order
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Today's Summary */}
          <TodaysSummary />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SalesOverview />
            </div>
            <div>
              <SalesSummary />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CheckoutBreakdown />
            <OrderOverview />
          </div>

          {/* Stats Cards */}
          <StatsCards />

          {/* Transaction History */}
          <TransactionHistory />
        </TabsContent>

        <TabsContent value="finance">
          <Card>
            <CardHeader>
              <CardTitle>Finance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Finance analytics coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="order">
          <Card>
            <CardHeader>
              <CardTitle>Order Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Order analytics coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}