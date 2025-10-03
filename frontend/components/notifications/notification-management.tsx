"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, AlertTriangle, Users, ShoppingCart, Package } from "lucide-react"

export function NotificationManagement() {
  const notifications = [
    {
      id: 1,
      type: "order",
      title: "New Order Received",
      message: "Order #1234 from John Doe - Table 5",
      time: "2 minutes ago",
      read: false,
      priority: "high",
      icon: ShoppingCart,
    },
    {
      id: 2,
      type: "inventory",
      title: "Low Stock Alert",
      message: "Chicken Breast is running low (5 units remaining)",
      time: "15 minutes ago",
      read: false,
      priority: "medium",
      icon: Package,
    },
    {
      id: 3,
      type: "staff",
      title: "Staff Check-in",
      message: "Sarah Johnson checked in for evening shift",
      time: "1 hour ago",
      read: true,
      priority: "low",
      icon: Users,
    },
  ]

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Bell className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
            <p className="text-muted-foreground">Stay updated with your restaurant activities</p>
          </div>
        </div>
        <Badge variant="secondary">{unreadCount} Unread</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Order Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Package className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Stock Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Staff Updates</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">High Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription>View and manage your restaurant notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex space-x-1 bg-muted p-1 rounded-lg">
              <Button variant="default" size="sm" className="flex-1">
                All
              </Button>
              <Button variant="ghost" size="sm" className="flex-1">
                Unread ({unreadCount})
              </Button>
              <Button variant="ghost" size="sm" className="flex-1">
                Orders
              </Button>
              <Button variant="ghost" size="sm" className="flex-1">
                Alerts
              </Button>
            </div>

            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${
                    !notification.read ? "bg-blue-50 border-blue-200" : "bg-background"
                  }`}
                >
                  <div className="p-2 rounded-lg bg-blue-100">
                    <notification.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
