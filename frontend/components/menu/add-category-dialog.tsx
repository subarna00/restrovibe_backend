"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

interface AddCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const colorOptions = [
  "#10B981", // Green
  "#3B82F6", // Blue
  "#F59E0B", // Yellow
  "#8B5CF6", // Purple
  "#06B6D4", // Cyan
  "#EF4444", // Red
  "#F97316", // Orange
  "#84CC16", // Lime
]

export function AddCategoryDialog({ open, onOpenChange }: AddCategoryDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: colorOptions[0],
    isActive: true,
  })

  const handleSubmit = () => {
    console.log("Creating category:", formData)
    onOpenChange(false)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="categoryName">Category Name *</Label>
              <Input
                id="categoryName"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter category name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="categoryDescription">Description</Label>
              <Textarea
                id="categoryDescription"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe the category..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Category Color</Label>
              <div className="flex gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`w-8 h-8 rounded-full border-2 ${
                      formData.color === color ? "border-foreground" : "border-transparent"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleInputChange("color", color)}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="active">Active</Label>
                <p className="text-sm text-muted-foreground">Category is active and visible</p>
              </div>
              <Switch
                id="active"
                checked={formData.isActive}
                onCheckedChange={(checked) => handleInputChange("isActive", checked)}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              Add Category
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
