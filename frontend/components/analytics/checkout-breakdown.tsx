"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const checkoutData = [
  { name: "Dine In", value: 45, color: "hsl(var(--primary))" },
  { name: "Takeaway", value: 30, color: "hsl(var(--primary-light))" },
  { name: "Delivery", value: 25, color: "hsl(var(--primary-dark))" },
]

export function CheckoutBreakdown() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Checkout Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={checkoutData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {checkoutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4">
          {checkoutData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-sm text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}