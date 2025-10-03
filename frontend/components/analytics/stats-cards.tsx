"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Users, CreditCard } from "lucide-react"

const statsData = [
  {
    title: "Sales By Staff",
    icon: ShoppingBag,
    message: "No Order by Staff !",
    action: "View All",
  },
  {
    title: "Top Customers By Spend",
    icon: Users,
    message: "No Customer Order !",
    action: "View All",
  },
  {
    title: "Payment Methods",
    icon: CreditCard,
    message: "No Payment Method Used !",
    action: "View All",
  },
]

const bottomStatsData = [
  {
    title: "Order Service Overview",
    message: "No Order Yet!",
    action: "View All",
  },
  {
    title: "Top Selling Categories",
    message: "No Categories Sold Yet!",
    action: "View All",
  },
  {
    title: "Top Selling Dishes",
    message: "No Dishes Sold Yet!",
    action: "View All",
  },
]

export function StatsCards() {
  return (
    <div className="space-y-6">
      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsData.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">
                {item.action}
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-4">
                <item.icon className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground text-center">{item.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bottomStatsData.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">
                {item.action}
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-4">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground text-center">{item.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}