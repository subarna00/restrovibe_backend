"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, Clock, DollarSign, Flame, Leaf, Edit, Trash2 } from "lucide-react"

interface MenuItemDialogProps {
  item: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MenuItemDialog({ item, open, onOpenChange }: MenuItemDialogProps) {
  if (!item) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{item.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Item Image */}
          <div className="relative">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className="w-full h-64 object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=256&width=600"
              }}
            />
            <div className="absolute top-4 right-4 flex gap-2">
              {item.isVegetarian && (
                <Badge className="bg-success text-success-foreground">
                  <Leaf className="h-3 w-3 mr-1" />
                  Vegetarian
                </Badge>
              )}
              {item.isSpicy && (
                <Badge className="bg-destructive text-destructive-foreground">
                  <Flame className="h-3 w-3 mr-1" />
                  Spicy
                </Badge>
              )}
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-success" />
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="font-semibold">Rs. {item.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-warning fill-current" />
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="font-semibold">{item.rating}/5</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Prep Time</p>
                  <p className="font-semibold">{item.prepTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Calories</p>
                  <p className="font-semibold">{item.calories}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Availability Status */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Availability Status</h3>
              <p className="text-sm text-muted-foreground">
                This item is currently {item.isAvailable ? "available" : "unavailable"} for orders
              </p>
            </div>
            <Badge variant={item.isAvailable ? "default" : "secondary"} className="text-sm px-3 py-1">
              {item.isAvailable ? "Available" : "Unavailable"}
            </Badge>
          </div>

          <Separator />

          {/* Category & Tags */}
          <div>
            <h3 className="font-semibold mb-2">Category & Tags</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="capitalize">
                {item.category}
              </Badge>
              {item.isVegetarian && <Badge variant="outline">Vegetarian</Badge>}
              {item.isSpicy && <Badge variant="outline">Spicy</Badge>}
              <Badge variant="outline">Popular</Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button className="flex-1">
              <Edit className="h-4 w-4 mr-2" />
              Edit Item
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              Duplicate Item
            </Button>
            <Button variant="destructive" className="flex-1">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Item
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
