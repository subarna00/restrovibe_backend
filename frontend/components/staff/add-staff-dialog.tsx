"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface AddStaffDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddStaffDialog({ open, onOpenChange }: AddStaffDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    salary: "",
    joinDate: "",
    shift: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Adding staff member:", formData)
    onOpenChange(false)
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "",
      department: "",
      salary: "",
      joinDate: "",
      shift: "",
      notes: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Staff Member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Smith"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@restrovibe.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="head-chef">Head Chef</SelectItem>
                  <SelectItem value="sous-chef">Sous Chef</SelectItem>
                  <SelectItem value="line-cook">Line Cook</SelectItem>
                  <SelectItem value="server">Server</SelectItem>
                  <SelectItem value="bartender">Bartender</SelectItem>
                  <SelectItem value="host">Host/Hostess</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="cashier">Cashier</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => setFormData({ ...formData, department: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kitchen">Kitchen</SelectItem>
                  <SelectItem value="front-of-house">Front of House</SelectItem>
                  <SelectItem value="bar">Bar</SelectItem>
                  <SelectItem value="management">Management</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salary">Monthly Salary (₹)</Label>
              <Input
                id="salary"
                type="number"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                placeholder="25000"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="joinDate">Join Date</Label>
              <Input
                id="joinDate"
                type="date"
                value={formData.joinDate}
                onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shift">Preferred Shift</Label>
            <Select value={formData.shift} onValueChange={(value) => setFormData({ ...formData, shift: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select shift" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning (6 AM - 2 PM)</SelectItem>
                <SelectItem value="evening">Evening (2 PM - 10 PM)</SelectItem>
                <SelectItem value="night">Night (10 PM - 6 AM)</SelectItem>
                <SelectItem value="full-day">Full Day</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any additional information..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Staff Member</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
