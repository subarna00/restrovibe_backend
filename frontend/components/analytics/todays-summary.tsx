"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  TrendingUp,
  TrendingDown,
  Minus,
  DollarSign,
  Chrome as Income,
  ShoppingCart,
  CreditCard,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react"

const summaryData = [
  {
    title: "Sales",
    value: "Rs. 20000",
    change: "10%",
    trend: "up" as const,
    color: "text-success",
    icon: DollarSign,
    bgColor: "bg-gradient-to-br from-primary/10 to-primary/5",
    iconBg: "bg-primary/10",
  },
  {
    title: "Income",
    value: "Rs. 20000",
    change: "30%",
    trend: "up" as const,
    color: "text-success",
    icon: Income,
    bgColor: "bg-gradient-to-br from-success/10 to-success/5",
    iconBg: "bg-success/10",
  },
  {
    title: "Purchase",
    value: "Rs. 20000",
    change: "0.00%",
    trend: "neutral" as const,
    color: "text-muted-foreground",
    icon: ShoppingCart,
    bgColor: "bg-gradient-to-br from-chart-3/10 to-chart-3/5",
    iconBg: "bg-chart-3/10",
  },
  {
    title: "Expenses",
    value: "Rs. 20000",
    change: "0.00%",
    trend: "neutral" as const,
    color: "text-muted-foreground",
    icon: CreditCard,
    bgColor: "bg-gradient-to-br from-warning/10 to-warning/5",
    iconBg: "bg-warning/10",
  },
  {
    title: "Payment In",
    value: "Rs. 20000",
    change: "0.00%",
    trend: "neutral" as const,
    color: "text-muted-foreground",
    icon: ArrowDownLeft,
    bgColor: "bg-gradient-to-br from-chart-6/10 to-chart-6/5",
    iconBg: "bg-chart-6/10",
  },
  {
    title: "Payment Out",
    value: "Rs. 20000",
    change: "0.00%",
    trend: "neutral" as const,
    color: "text-muted-foreground",
    icon: ArrowUpRight,
    bgColor: "bg-gradient-to-br from-chart-5/10 to-chart-5/5",
    iconBg: "bg-chart-5/10",
  },
]

export function TodaysSummary() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Today's Summary</h2>
        <button className="text-sm text-muted-foreground hover:text-primary transition-colors">View Yesterday →</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {summaryData.map((item, index) => {
          const IconComponent = item.icon
          return (
            <Card
              key={index}
              className={`relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-200 ${item.bgColor} card-elevated`}
            >
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg ${item.iconBg}`}>
                      <IconComponent className="h-4 w-4 text-foreground" />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`text-xs font-medium ${item.color}`}>{item.change}</span>
                      {item.trend === "up" && <TrendingUp className="h-3 w-3 text-success" />}
                      {item.trend === "down" && <TrendingDown className="h-3 w-3 text-destructive" />}
                      {item.trend === "neutral" && <Minus className="h-3 w-3 text-muted-foreground" />}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
                    <p className="text-2xl font-bold tracking-tight">{item.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}