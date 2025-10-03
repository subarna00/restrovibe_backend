"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const orderData = [
  { month: "Jan", value: -20 },
  { month: "Feb", value: 30 },
  { month: "Mar", value: -40 },
  { month: "Apr", value: -60 },
  { month: "May", value: 20 },
  { month: "Jun", value: 10 },
]

export function OrderOverview() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">Order Overview</CardTitle>
          <div className="text-3xl font-bold text-warning mt-2">
            5000 <span className="text-sm font-normal text-muted-foreground">Orders</span>
          </div>
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
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={orderData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--warning))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--warning))", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-muted-foreground">Content</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-2 rounded-full"></div>
            <span className="text-muted-foreground">Content</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-3 rounded-full"></div>
            <span className="text-muted-foreground">Content</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}