import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, Calendar, Clock, Download } from "lucide-react"

export function StaffPayroll() {
  const payrollData = [
    {
      id: "STAFF001",
      name: "Alice Johnson",
      role: "Head Chef",
      baseSalary: 45000,
      overtime: 5000,
      bonus: 2000,
      deductions: 1500,
      netPay: 50500,
      hoursWorked: 180,
      status: "processed",
    },
    {
      id: "STAFF002",
      name: "Bob Smith",
      role: "Sous Chef",
      baseSalary: 35000,
      overtime: 3000,
      bonus: 1500,
      deductions: 1200,
      netPay: 38300,
      hoursWorked: 175,
      status: "processed",
    },
    {
      id: "STAFF003",
      name: "Carol Davis",
      role: "Server",
      baseSalary: 25000,
      overtime: 2000,
      bonus: 1000,
      deductions: 800,
      netPay: 27200,
      hoursWorked: 160,
      status: "pending",
    },
    {
      id: "STAFF004",
      name: "David Wilson",
      role: "Bartender",
      baseSalary: 28000,
      overtime: 2500,
      bonus: 1200,
      deductions: 900,
      netPay: 30800,
      hoursWorked: 165,
      status: "processed",
    },
    {
      id: "STAFF005",
      name: "Emma Brown",
      role: "Manager",
      baseSalary: 55000,
      overtime: 0,
      bonus: 5000,
      deductions: 2000,
      netPay: 58000,
      hoursWorked: 160,
      status: "processed",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processed":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Processed</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Failed</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const totalPayroll = payrollData.reduce((sum, staff) => sum + staff.netPay, 0)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Payroll</p>
                <p className="text-2xl font-bold text-foreground">₹{totalPayroll.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Processed</p>
                <p className="text-2xl font-bold text-foreground">
                  {payrollData.filter((s) => s.status === "processed").length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-foreground">
                  {payrollData.filter((s) => s.status === "pending").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <Button className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export Payroll
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>December 2024 Payroll</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payrollData.map((staff) => (
              <div key={staff.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{staff.name}</h3>
                      <Badge variant="outline">{staff.role}</Badge>
                      {getStatusBadge(staff.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Base: ₹{staff.baseSalary.toLocaleString()}</span>
                      {staff.overtime > 0 && <span>OT: ₹{staff.overtime.toLocaleString()}</span>}
                      {staff.bonus > 0 && <span>Bonus: ₹{staff.bonus.toLocaleString()}</span>}
                      {staff.deductions > 0 && <span>Deductions: -₹{staff.deductions.toLocaleString()}</span>}
                      <span>•</span>
                      <span>{staff.hoursWorked}h worked</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">₹{staff.netPay.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Net Pay</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    {staff.status === "pending" && <Button size="sm">Process</Button>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
