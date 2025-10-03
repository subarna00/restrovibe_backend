"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OrderList } from "./order-list"
import { OrderStats } from "./order-stats"
import { NewOrderDialog } from "./new-order-dialog"
import { Plus, Search, Filter, Download } from "lucide-react"

export function OrderManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showNewOrderDialog, setShowNewOrderDialog] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="preparing">Preparing</SelectItem>
              <SelectItem value="ready">Ready</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowNewOrderDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </Button>
        </div>
      </div>

      {/* Order Stats */}
      <OrderStats />

      {/* Order Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">
            All Orders
            <Badge variant="secondary" className="ml-2">
              24
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending
            <Badge variant="secondary" className="ml-2">
              8
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="preparing">
            Preparing
            <Badge variant="secondary" className="ml-2">
              6
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="ready">
            Ready
            <Badge variant="secondary" className="ml-2">
              4
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="delivered">
            Delivered
            <Badge variant="secondary" className="ml-2">
              5
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelled
            <Badge variant="secondary" className="ml-2">
              1
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <OrderList status="all" searchQuery={searchQuery} />
        </TabsContent>
        <TabsContent value="pending">
          <OrderList status="pending" searchQuery={searchQuery} />
        </TabsContent>
        <TabsContent value="preparing">
          <OrderList status="preparing" searchQuery={searchQuery} />
        </TabsContent>
        <TabsContent value="ready">
          <OrderList status="ready" searchQuery={searchQuery} />
        </TabsContent>
        <TabsContent value="delivered">
          <OrderList status="delivered" searchQuery={searchQuery} />
        </TabsContent>
        <TabsContent value="cancelled">
          <OrderList status="cancelled" searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>

      {/* New Order Dialog */}
      <NewOrderDialog open={showNewOrderDialog} onOpenChange={setShowNewOrderDialog} />
    </div>
  )
}
