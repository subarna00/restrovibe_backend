"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Clock, CheckCircle, XCircle, DollarSign } from "lucide-react"

const statsData = [
  {
    title: "Total Orders",
    value: "156",
    change: "+12%",
    trend: "up" as const,
    icon: DollarSign,
    color: "text-primary",
  },
  {
    title: "Pending Orders",
    value: "8",
    change: "-5%",
    trend: "down" as const,
    icon: Clock,
    color: "text-warning",
  },
  {
    title: "Completed Orders",
    value: "142",
    change: "+18%",
    trend: "up" as const,
    icon: CheckCircle,
    color: "text-success",
  },
  {
    title: "Cancelled Orders",
    value: "6",
    change: "+2%",
    trend: "up" as const,
    icon: XCircle,
    color: "text-destructive",
  },
]

export function OrderStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {stat.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-success mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive mr-1" />
              )}
              <span className={stat.trend === "up" ? "text-success" : "text-destructive"}>{stat.change}</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
