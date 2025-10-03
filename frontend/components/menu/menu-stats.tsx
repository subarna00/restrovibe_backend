"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Utensils, DollarSign, Star, Eye } from "lucide-react"

const statsData = [
  {
    title: "Total Menu Items",
    value: "124",
    change: "+8%",
    trend: "up" as const,
    icon: Utensils,
    color: "text-primary",
  },
  {
    title: "Average Price",
    value: "Rs. 450",
    change: "+5%",
    trend: "up" as const,
    icon: DollarSign,
    color: "text-success",
  },
  {
    title: "Top Rated Items",
    value: "18",
    change: "+12%",
    trend: "up" as const,
    icon: Star,
    color: "text-warning",
  },
  {
    title: "Most Viewed",
    value: "32",
    change: "-3%",
    trend: "down" as const,
    icon: Eye,
    color: "text-blue-500",
  },
]

export function MenuStats() {
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
