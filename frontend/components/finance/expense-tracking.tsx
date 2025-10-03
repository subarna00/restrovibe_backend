import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, DollarSign, Tag, User, MoreHorizontal } from "lucide-react"

export function ExpenseTracking() {
  const expenses = [
    {
      id: "EXP001",
      description: "Fresh Vegetables & Fruits",
      category: "Food & Ingredients",
      amount: 8500,
      date: "2024-12-28",
      vendor: "Green Valley Suppliers",
      status: "paid",
      receipt: true,
    },
    {
      id: "EXP002",
      description: "Electricity Bill",
      category: "Utilities",
      amount: 12000,
      date: "2024-12-27",
      vendor: "State Electricity Board",
      status: "paid",
      receipt: true,
    },
    {
      id: "EXP003",
      description: "Kitchen Equipment Repair",
      category: "Maintenance",
      amount: 3500,
      date: "2024-12-26",
      vendor: "TechFix Services",
      status: "pending",
      receipt: false,
    },
    {
      id: "EXP004",
      description: "Staff Uniforms",
      category: "Staff",
      amount: 6000,
      date: "2024-12-25",
      vendor: "Uniform World",
      status: "paid",
      receipt: true,
    },
    {
      id: "EXP005",
      description: "Marketing Materials",
      category: "Marketing",
      amount: 2500,
      date: "2024-12-24",
      vendor: "Print Pro",
      status: "paid",
      receipt: true,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Paid</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Pending</Badge>
      case "overdue":
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Overdue</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Food & Ingredients": "bg-green-500/10 text-green-500",
      Utilities: "bg-blue-500/10 text-blue-500",
      Maintenance: "bg-orange-500/10 text-orange-500",
      Staff: "bg-purple-500/10 text-purple-500",
      Marketing: "bg-pink-500/10 text-pink-500",
    }
    return colors[category] || "bg-gray-500/10 text-gray-500"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div key={expense.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{expense.description}</h3>
                    {getStatusBadge(expense.status)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Tag className="h-4 w-4" />
                      <Badge variant="outline" className={getCategoryColor(expense.category)}>
                        {expense.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{expense.vendor}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(expense.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-lg font-semibold">₹{expense.amount.toLocaleString()}</p>
                  {expense.receipt && <p className="text-xs text-muted-foreground">Receipt available</p>}
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
