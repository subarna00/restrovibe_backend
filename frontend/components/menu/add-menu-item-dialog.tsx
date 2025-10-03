"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Upload } from "lucide-react"

interface AddMenuItemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddMenuItemDialog({ open, onOpenChange }: AddMenuItemDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    prepTime: "",
    calories: "",
    isVegetarian: false,
    isSpicy: false,
    isAvailable: true,
  })

  const handleSubmit = () => {
    console.log("Creating menu item:", formData)
    onOpenChange(false)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Menu Item</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Item Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter item name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="appetizers">Appetizers</SelectItem>
                    <SelectItem value="mains">Main Course</SelectItem>
                    <SelectItem value="desserts">Desserts</SelectItem>
                    <SelectItem value="beverages">Beverages</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe the menu item..."
                rows={3}
              />
            </div>
          </div>

          <Separator />

          {/* Pricing & Details */}
          <div className="space-y-4">
            <h3 className="font-semibold">Pricing & Details</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (Rs.) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prepTime">Prep Time</Label>
                <Input
                  id="prepTime"
                  value={formData.prepTime}
                  onChange={(e) => handleInputChange("prepTime", e.target.value)}
                  placeholder="e.g., 15-20 mins"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="calories">Calories</Label>
                <Input
                  id="calories"
                  type="number"
                  value={formData.calories}
                  onChange={(e) => handleInputChange("calories", e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Image Upload */}
          <div className="space-y-4">
            <h3 className="font-semibold">Item Image</h3>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground mb-2">Drag and drop an image, or click to browse</p>
              <Button variant="outline" size="sm">
                Choose File
              </Button>
            </div>
          </div>

          <Separator />

          {/* Properties */}
          <div className="space-y-4">
            <h3 className="font-semibold">Item Properties</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="vegetarian">Vegetarian</Label>
                  <p className="text-sm text-muted-foreground">Mark if this item is vegetarian</p>
                </div>
                <Switch
                  id="vegetarian"
                  checked={formData.isVegetarian}
                  onCheckedChange={(checked) => handleInputChange("isVegetarian", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="spicy">Spicy</Label>
                  <p className="text-sm text-muted-foreground">Mark if this item is spicy</p>
                </div>
                <Switch
                  id="spicy"
                  checked={formData.isSpicy}
                  onCheckedChange={(checked) => handleInputChange("isSpicy", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="available">Available</Label>
                  <p className="text-sm text-muted-foreground">Item is available for ordering</p>
                </div>
                <Switch
                  id="available"
                  checked={formData.isAvailable}
                  onCheckedChange={(checked) => handleInputChange("isAvailable", checked)}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              Add Menu Item
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
