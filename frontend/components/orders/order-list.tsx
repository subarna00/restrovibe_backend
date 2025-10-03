"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { OrderDetailsDialog } from "./order-details-dialog"
import { Eye, Clock, CheckCircle, XCircle, Truck, ChefHat } from "lucide-react"

interface OrderListProps {
  status: string
  searchQuery: string
}

// Mock order data
const mockOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    customerAvatar: "/placeholder.svg?height=32&width=32",
    table: "Table 5",
    items: ["Margherita Pizza", "Caesar Salad", "Coke"],
    total: "Rs. 1,250",
    status: "pending",
    orderType: "dine-in",
    time: "2 mins ago",
    estimatedTime: "15 mins",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    customerAvatar: "/placeholder.svg?height=32&width=32",
    table: "Takeaway",
    items: ["Chicken Burger", "French Fries", "Pepsi"],
    total: "Rs. 850",
    status: "preparing",
    orderType: "takeaway",
    time: "5 mins ago",
    estimatedTime: "10 mins",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    customerAvatar: "/placeholder.svg?height=32&width=32",
    table: "Delivery",
    items: ["Pasta Carbonara", "Garlic Bread", "Wine"],
    total: "Rs. 1,450",
    status: "ready",
    orderType: "delivery",
    time: "8 mins ago",
    estimatedTime: "Ready",
  },
  {
    id: "ORD-004",
    customer: "Sarah Wilson",
    customerAvatar: "/placeholder.svg?height=32&width=32",
    table: "Table 2",
    items: ["Fish & Chips", "Coleslaw", "Beer"],
    total: "Rs. 950",
    status: "delivered",
    orderType: "dine-in",
    time: "15 mins ago",
    estimatedTime: "Completed",
  },
  {
    id: "ORD-005",
    customer: "Tom Brown",
    customerAvatar: "/placeholder.svg?height=32&width=32",
    table: "Table 8",
    items: ["Steak", "Mashed Potatoes", "Red Wine"],
    total: "Rs. 2,200",
    status: "cancelled",
    orderType: "dine-in",
    time: "20 mins ago",
    estimatedTime: "Cancelled",
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <Clock className="h-4 w-4" />
    case "preparing":
      return <ChefHat className="h-4 w-4" />
    case "ready":
      return <CheckCircle className="h-4 w-4" />
    case "delivered":
      return <Truck className="h-4 w-4" />
    case "cancelled":
      return <XCircle className="h-4 w-4" />
    default:
      return <Clock className="h-4 w-4" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-warning/10 text-warning border-warning/20"
    case "preparing":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    case "ready":
      return "bg-success/10 text-success border-success/20"
    case "delivered":
      return "bg-primary/10 text-primary border-primary/20"
    case "cancelled":
      return "bg-destructive/10 text-destructive border-destructive/20"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export function OrderList({ status, searchQuery }: OrderListProps) {
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [showOrderDetails, setShowOrderDetails] = useState(false)

  // Filter orders based on status and search query
  const filteredOrders = mockOrders.filter((order) => {
    const matchesStatus = status === "all" || order.status === status
    const matchesSearch =
      searchQuery === "" ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order)
    setShowOrderDetails(true)
  }

  if (filteredOrders.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-4">
            <Clock className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">No orders found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={order.customerAvatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {order.customer
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-sm font-medium">{order.customer}</CardTitle>
                    <p className="text-xs text-muted-foreground">{order.table}</p>
                  </div>
                </div>
                <Badge variant="outline" className={getStatusColor(order.status)}>
                  {getStatusIcon(order.status)}
                  <span className="ml-1 capitalize">{order.status}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Order #{order.id}</p>
                <div className="space-y-1">
                  {order.items.slice(0, 2).map((item, index) => (
                    <p key={index} className="text-xs text-muted-foreground">
                      • {item}
                    </p>
                  ))}
                  {order.items.length > 2 && (
                    <p className="text-xs text-muted-foreground">+ {order.items.length - 2} more items</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{order.total}</p>
                  <p className="text-xs text-muted-foreground">{order.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Est. Time</p>
                  <p className="text-sm font-medium">{order.estimatedTime}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => handleViewOrder(order)}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View Details
                </Button>
                {order.status === "pending" && (
                  <Button size="sm" className="flex-1">
                    Start Preparing
                  </Button>
                )}
                {order.status === "preparing" && (
                  <Button size="sm" className="flex-1">
                    Mark Ready
                  </Button>
                )}
                {order.status === "ready" && (
                  <Button size="sm" className="flex-1">
                    Mark Delivered
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <OrderDetailsDialog order={selectedOrder} open={showOrderDetails} onOpenChange={setShowOrderDetails} />
    </>
  )
}
