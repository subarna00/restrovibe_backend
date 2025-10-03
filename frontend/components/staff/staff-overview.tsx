import { Card, CardContent } from "@/components/ui/card"
import { Users, UserCheck, Clock, DollarSign } from "lucide-react"

export function StaffOverview() {
  const stats = [
    {
      title: "Total Staff",
      value: "24",
      change: "+2 this month",
      icon: Users,
      color: "text-primary",
    },
    {
      title: "On Duty Today",
      value: "18",
      change: "75% attendance",
      icon: UserCheck,
      color: "text-green-500",
    },
    {
      title: "Total Hours (Week)",
      value: "856",
      change: "+12 vs last week",
      icon: Clock,
      color: "text-blue-500",
    },
    {
      title: "Payroll (Month)",
      value: "₹2,45,000",
      change: "+8% vs last month",
      icon: DollarSign,
      color: "text-purple-500",
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
