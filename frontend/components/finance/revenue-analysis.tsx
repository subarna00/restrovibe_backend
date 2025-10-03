import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

export function RevenueAnalysis() {
  const revenueData = [
    { month: "Jan", revenue: 85000, expenses: 35000, profit: 50000 },
    { month: "Feb", revenue: 92000, expenses: 38000, profit: 54000 },
    { month: "Mar", revenue: 88000, expenses: 36000, profit: 52000 },
    { month: "Apr", revenue: 95000, expenses: 40000, profit: 55000 },
    { month: "May", revenue: 105000, expenses: 42000, profit: 63000 },
    { month: "Jun", revenue: 110000, expenses: 45000, profit: 65000 },
    { month: "Jul", revenue: 115000, expenses: 43000, profit: 72000 },
    { month: "Aug", revenue: 120000, expenses: 46000, profit: 74000 },
    { month: "Sep", revenue: 118000, expenses: 44000, profit: 74000 },
    { month: "Oct", revenue: 125000, expenses: 47000, profit: 78000 },
    { month: "Nov", revenue: 130000, expenses: 48000, profit: 82000 },
    { month: "Dec", revenue: 125000, expenses: 45000, profit: 80000 },
  ]

  const dailyRevenue = [
    { day: "Mon", amount: 18000 },
    { day: "Tue", amount: 22000 },
    { day: "Wed", amount: 19000 },
    { day: "Thu", amount: 25000 },
    { day: "Fri", amount: 32000 },
    { day: "Sat", amount: 38000 },
    { day: "Sun", amount: 35000 },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-muted-foreground" />
              <YAxis className="text-muted-foreground" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} name="Revenue" />
              <Line type="monotone" dataKey="profit" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Profit" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyRevenue}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="day" className="text-muted-foreground" />
              <YAxis className="text-muted-foreground" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Revenue Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { source: "Dine-in", amount: 85000, percentage: 68, color: "bg-primary" },
              { source: "Takeaway", amount: 25000, percentage: 20, color: "bg-chart-2" },
              { source: "Delivery", amount: 15000, percentage: 12, color: "bg-chart-3" },
            ].map((item) => (
              <div key={item.source} className="p-4 border border-border/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{item.source}</h3>
                  <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                </div>
                <p className="text-2xl font-bold mb-2">₹{item.amount.toLocaleString()}</p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
