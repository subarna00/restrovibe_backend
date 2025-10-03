"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface AddTableDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddTableDialog({ open, onOpenChange }: AddTableDialogProps) {
  const [formData, setFormData] = useState({
    tableNumber: "",
    seats: "",
    area: "",
    location: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Adding table:", formData)
    onOpenChange(false)
    setFormData({ tableNumber: "", seats: "", area: "", location: "", notes: "" })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Table</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tableNumber">Table Number</Label>
              <Input
                id="tableNumber"
                value={formData.tableNumber}
                onChange={(e) => setFormData({ ...formData, tableNumber: e.target.value })}
                placeholder="T10"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seats">Number of Seats</Label>
              <Select value={formData.seats} onValueChange={(value) => setFormData({ ...formData, seats: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select seats" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 seats</SelectItem>
                  <SelectItem value="4">4 seats</SelectItem>
                  <SelectItem value="6">6 seats</SelectItem>
                  <SelectItem value="8">8 seats</SelectItem>
                  <SelectItem value="10">10 seats</SelectItem>
                  <SelectItem value="12">12 seats</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="area">Dining Area</Label>
            <Select value={formData.area} onValueChange={(value) => setFormData({ ...formData, area: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main">Main Dining</SelectItem>
                <SelectItem value="private">Private Room</SelectItem>
                <SelectItem value="outdoor">Outdoor Patio</SelectItem>
                <SelectItem value="bar">Bar Area</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location Description</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g., Window side, Near kitchen"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any special notes about this table..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Table</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
