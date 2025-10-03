"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Plus, Minus, X } from "lucide-react"

interface NewOrderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewOrderDialog({ open, onOpenChange }: NewOrderDialogProps) {
  const [orderItems, setOrderItems] = useState([{ name: "", quantity: 1, price: 0 }])
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [orderType, setOrderType] = useState("")
  const [tableNumber, setTableNumber] = useState("")
  const [notes, setNotes] = useState("")

  const addOrderItem = () => {
    setOrderItems([...orderItems, { name: "", quantity: 1, price: 0 }])
  }

  const removeOrderItem = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index))
  }

  const updateOrderItem = (index: number, field: string, value: any) => {
    const updatedItems = orderItems.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    setOrderItems(updatedItems)
  }

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + item.quantity * item.price, 0)
  }

  const handleSubmit = () => {
    // Handle order creation logic here
    console.log("Creating order:", {
      customerName,
      customerPhone,
      orderType,
      tableNumber,
      orderItems,
      notes,
      total: calculateTotal(),
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Customer Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter customer name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerPhone">Phone Number</Label>
                <Input
                  id="customerPhone"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-4">
            <h3 className="font-semibold">Order Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="orderType">Order Type</Label>
                <Select value={orderType} onValueChange={setOrderType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select order type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dine-in">Dine In</SelectItem>
                    <SelectItem value="takeaway">Takeaway</SelectItem>
                    <SelectItem value="delivery">Delivery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tableNumber">Table Number</Label>
                <Input
                  id="tableNumber"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder="Enter table number"
                  disabled={orderType !== "dine-in"}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Order Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Order Items</h3>
              <Button onClick={addOrderItem} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>

            <div className="space-y-3">
              {orderItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="flex-1">
                    <Input
                      placeholder="Item name"
                      value={item.name}
                      onChange={(e) => updateOrderItem(index, "name", e.target.value)}
                    />
                  </div>
                  <div className="w-24">
                    <div className="flex items-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateOrderItem(index, "quantity", Math.max(1, item.quantity - 1))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="mx-3 font-medium">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateOrderItem(index, "quantity", item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="w-24">
                    <Input
                      type="number"
                      placeholder="Price"
                      value={item.price}
                      onChange={(e) => updateOrderItem(index, "price", Number.parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="w-20 text-right font-medium">Rs. {(item.quantity * item.price).toFixed(2)}</div>
                  {orderItems.length > 1 && (
                    <Button size="sm" variant="ghost" onClick={() => removeOrderItem(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Order Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Special Instructions</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special instructions for the order..."
              rows={3}
            />
          </div>

          <Separator />

          {/* Order Summary */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total Amount</span>
              <span>Rs. {calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              Create Order
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
