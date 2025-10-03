"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AddCategoryDialog } from "./add-category-dialog"
import { Plus, Edit, Trash2, Utensils } from "lucide-react"

const mockCategories = [
  {
    id: "1",
    name: "Appetizers",
    description: "Start your meal with our delicious appetizers",
    itemCount: 12,
    isActive: true,
    color: "#10B981",
  },
  {
    id: "2",
    name: "Main Course",
    description: "Hearty and satisfying main dishes",
    itemCount: 28,
    isActive: true,
    color: "#3B82F6",
  },
  {
    id: "3",
    name: "Desserts",
    description: "Sweet treats to end your meal",
    itemCount: 15,
    isActive: true,
    color: "#F59E0B",
  },
  {
    id: "4",
    name: "Beverages",
    description: "Refreshing drinks and beverages",
    itemCount: 18,
    isActive: true,
    color: "#8B5CF6",
  },
  {
    id: "5",
    name: "Salads",
    description: "Fresh and healthy salad options",
    itemCount: 8,
    isActive: false,
    color: "#06B6D4",
  },
]

export function CategoryManagement() {
  const [showAddCategoryDialog, setShowAddCategoryDialog] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCategories = mockCategories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
        </div>
        <Button onClick={() => setShowAddCategoryDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <Utensils className="h-5 w-5" style={{ color: category.color }} />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">{category.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{category.itemCount} items</p>
                  </div>
                </div>
                <Badge variant={category.isActive ? "default" : "secondary"}>
                  {category.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{category.description}</p>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Category Dialog */}
      <AddCategoryDialog open={showAddCategoryDialog} onOpenChange={setShowAddCategoryDialog} />
    </div>
  )
}
