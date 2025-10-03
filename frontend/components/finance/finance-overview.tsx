import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, TrendingUp, TrendingDown, Receipt } from "lucide-react"

export function FinanceOverview() {
  const stats = [
    {
      title: "Total Revenue",
      value: "₹1,25,000",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "Total Expenses",
      value: "₹45,000",
      change: "+8.2%",
      trend: "up",
      icon: Receipt,
      color: "text-red-500",
    },
    {
      title: "Net Profit",
      value: "₹80,000",
      change: "+15.3%",
      trend: "up",
      icon: TrendingUp,
      color: "text-primary",
    },
    {
      title: "Profit Margin",
      value: "64%",
      change: "+2.1%",
      trend: "up",
      icon: TrendingUp,
      color: "text-blue-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={`text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
