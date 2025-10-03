import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export function CustomerAnalytics() {
  const customerGrowth = [
    { month: "Jan", new: 45, returning: 120 },
    { month: "Feb", new: 52, returning: 135 },
    { month: "Mar", new: 48, returning: 142 },
    { month: "Apr", new: 61, returning: 158 },
    { month: "May", new: 58, returning: 165 },
    { month: "Jun", new: 67, returning: 178 },
    { month: "Jul", new: 72, returning: 185 },
    { month: "Aug", new: 69, returning: 192 },
    { month: "Sep", new: 75, returning: 198 },
    { month: "Oct", new: 82, returning: 205 },
    { month: "Nov", new: 89, returning: 218 },
    { month: "Dec", new: 94, returning: 225 },
  ]

  const ageGroups = [
    { name: "18-25", value: 18, color: "#8884d8" },
    { name: "26-35", value: 32, color: "#82ca9d" },
    { name: "36-45", value: 28, color: "#ffc658" },
    { name: "46-55", value: 15, color: "#ff7c7c" },
    { name: "55+", value: 7, color: "#8dd1e1" },
  ]

  const visitFrequency = [
    { frequency: "Daily", customers: 45 },
    { frequency: "Weekly", customers: 156 },
    { frequency: "Monthly", customers: 289 },
    { frequency: "Quarterly", customers: 178 },
    { frequency: "Rarely", customers: 89 },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={customerGrowth}>
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
                <Line type="monotone" dataKey="new" stroke="hsl(var(--primary))" strokeWidth={2} name="New Customers" />
                <Line
                  type="monotone"
                  dataKey="returning"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  name="Returning Customers"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Age Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ageGroups}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {ageGroups.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Visit Frequency</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={visitFrequency}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="frequency" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="customers" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 border border-border/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">4.7</p>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </div>
              <div className="text-center p-4 border border-border/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">₹850</p>
                <p className="text-sm text-muted-foreground">Avg Order</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Customer Satisfaction</span>
                  <span>94%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: "94%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Repeat Customer Rate</span>
                  <span>78%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="h-2 rounded-full bg-primary" style={{ width: "78%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Referral Rate</span>
                  <span>23%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="h-2 rounded-full bg-blue-500" style={{ width: "23%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
