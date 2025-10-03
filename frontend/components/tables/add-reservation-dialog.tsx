"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface AddReservationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddReservationDialog({ open, onOpenChange }: AddReservationDialogProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    guests: "",
    table: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Adding reservation:", formData)
    onOpenChange(false)
    setFormData({ customerName: "", phone: "", email: "", date: "", time: "", guests: "", table: "", notes: "" })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>New Reservation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 234-567-8900"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email (Optional)</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="guests">Number of Guests</Label>
              <Select value={formData.guests} onValueChange={(value) => setFormData({ ...formData, guests: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select guests" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "guest" : "guests"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="table">Preferred Table (Optional)</Label>
              <Select value={formData.table} onValueChange={(value) => setFormData({ ...formData, table: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Auto assign" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="T1">Table T1 (2 seats)</SelectItem>
                  <SelectItem value="T2">Table T2 (4 seats)</SelectItem>
                  <SelectItem value="T3">Table T3 (6 seats)</SelectItem>
                  <SelectItem value="P1">Table P1 (8 seats)</SelectItem>
                  <SelectItem value="P2">Table P2 (12 seats)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Special Requests</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Anniversary dinner, dietary restrictions, etc."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Reservation</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
