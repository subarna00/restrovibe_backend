import { Card, CardContent } from "@/components/ui/card"
import { Users, UserPlus, Gift, TrendingUp } from "lucide-react"

export function CustomerOverview() {
  const stats = [
    {
      title: "Total Customers",
      value: "1,247",
      change: "+12% this month",
      icon: Users,
      color: "text-primary",
    },
    {
      title: "New This Month",
      value: "89",
      change: "+23% vs last month",
      icon: UserPlus,
      color: "text-green-500",
    },
    {
      title: "Loyalty Members",
      value: "456",
      change: "36.6% of total",
      icon: Gift,
      color: "text-purple-500",
    },
    {
      title: "Avg. Order Value",
      value: "₹850",
      change: "+8.5% this month",
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
