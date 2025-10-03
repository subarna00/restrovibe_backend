import { Card, CardContent } from "@/components/ui/card"
import { Package, AlertTriangle, TrendingDown, DollarSign } from "lucide-react"

export function InventoryOverview() {
  const stats = [
    {
      title: "Total Items",
      value: "156",
      change: "+8 this week",
      icon: Package,
      color: "text-primary",
    },
    {
      title: "Low Stock Items",
      value: "12",
      change: "Need attention",
      icon: AlertTriangle,
      color: "text-orange-500",
    },
    {
      title: "Out of Stock",
      value: "3",
      change: "Critical",
      icon: TrendingDown,
      color: "text-red-500",
    },
    {
      title: "Inventory Value",
      value: "₹2,45,000",
      change: "+5.2% this month",
      icon: DollarSign,
      color: "text-green-500",
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
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
