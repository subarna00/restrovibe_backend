"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, MapPin, Phone, User, CreditCard } from "lucide-react"

interface OrderDetailsDialogProps {
  order: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OrderDetailsDialog({ order, open, onOpenChange }: OrderDetailsDialogProps) {
  if (!order) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={order.customerAvatar || "/placeholder.svg"} />
              <AvatarFallback>
                {order.customer
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">{order.customer}</p>
              <p className="text-sm text-muted-foreground">Order #{order.id}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Status */}
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-sm px-3 py-1">
              <Clock className="h-4 w-4 mr-2" />
              Status: {order.status}
            </Badge>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Order Time</p>
              <p className="font-medium">{order.time}</p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Customer Details</span>
              </div>
              <p className="text-sm">{order.customer}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-3 w-3" />
                <span>+91 98765 43210</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Service Type</span>
              </div>
              <p className="text-sm capitalize">{order.orderType}</p>
              <p className="text-sm text-muted-foreground">{order.table}</p>
            </div>
          </div>

          <Separator />

          {/* Order Items */}
          <div className="space-y-4">
            <h3 className="font-semibold">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item: string, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-xs font-medium">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{item}</p>
                      <p className="text-sm text-muted-foreground">Qty: 1</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Rs. {Math.floor(Math.random() * 500) + 200}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Order Summary */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>Rs. 1,200</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Tax (5%)</span>
              <span>Rs. 60</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Service Charge</span>
              <span>Rs. 50</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{order.total}</span>
            </div>
          </div>

          {/* Payment Info */}
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Payment Method: Cash</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button className="flex-1">Print Receipt</Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              Edit Order
            </Button>
            {order.status !== "delivered" && order.status !== "cancelled" && (
              <Button variant="destructive" className="flex-1">
                Cancel Order
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
