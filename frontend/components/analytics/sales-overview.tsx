"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const salesData = [
  { month: "Jan", sales: 20, revenue: 25 },
  { month: "Feb", sales: 45, revenue: 50 },
  { month: "Mar", sales: 30, revenue: 35 },
  { month: "Apr", sales: 60, revenue: 65 },
  { month: "May", sales: 40, revenue: 45 },
  { month: "Jun", sales: 80, revenue: 85 },
]

export function SalesOverview() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">Sales Overview</CardTitle>
          <div className="text-3xl font-bold text-success mt-2">5,000.00</div>
        </div>
        <Select defaultValue="this-week">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-week">This Week</SelectItem>
            <SelectItem value="last-week">Last Week</SelectItem>
            <SelectItem value="this-month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Sales" />
              <Bar dataKey="revenue" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-muted-foreground">Sales</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
            <span className="text-muted-foreground">Revenue</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}