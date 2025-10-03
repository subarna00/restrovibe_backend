import { Card, CardContent } from "@/components/ui/card"
import { Users, Clock, CheckCircle, AlertCircle } from "lucide-react"

export function TableStats() {
  const stats = [
    {
      title: "Total Tables",
      value: "29",
      change: "+2 this month",
      icon: Users,
      color: "text-primary",
    },
    {
      title: "Available Now",
      value: "18",
      change: "62% availability",
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      title: "Occupied",
      value: "8",
      change: "28% occupancy",
      icon: AlertCircle,
      color: "text-orange-500",
    },
    {
      title: "Reserved",
      value: "3",
      change: "Next 2 hours",
      icon: Clock,
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
