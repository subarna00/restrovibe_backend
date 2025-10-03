"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { MenuItemDialog } from "./menu-item-dialog"
import { Edit, Eye, Star, Clock, DollarSign, Utensils } from "lucide-react"

interface MenuGridProps {
  viewMode: "grid" | "list"
  searchQuery: string
  categoryFilter: string
}

// Mock menu data
const mockMenuItems = [
  {
    id: "1",
    name: "Margherita Pizza",
    description: "Fresh tomatoes, mozzarella cheese, basil leaves",
    price: 450,
    category: "mains",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.5,
    prepTime: "15-20 mins",
    isAvailable: true,
    isVegetarian: true,
    isSpicy: false,
    calories: 320,
  },
  {
    id: "2",
    name: "Chicken Caesar Salad",
    description: "Grilled chicken, romaine lettuce, parmesan, croutons",
    price: 380,
    category: "appetizers",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.2,
    prepTime: "10-15 mins",
    isAvailable: true,
    isVegetarian: false,
    isSpicy: false,
    calories: 280,
  },
  {
    id: "3",
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center, vanilla ice cream",
    price: 220,
    category: "desserts",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    prepTime: "12-15 mins",
    isAvailable: false,
    isVegetarian: true,
    isSpicy: false,
    calories: 450,
  },
  {
    id: "4",
    name: "Fresh Orange Juice",
    description: "Freshly squeezed orange juice",
    price: 120,
    category: "beverages",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.0,
    prepTime: "2-3 mins",
    isAvailable: true,
    isVegetarian: true,
    isSpicy: false,
    calories: 110,
  },
  {
    id: "5",
    name: "Spicy Chicken Wings",
    description: "Buffalo-style chicken wings with blue cheese dip",
    price: 320,
    category: "appetizers",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.3,
    prepTime: "18-22 mins",
    isAvailable: true,
    isVegetarian: false,
    isSpicy: true,
    calories: 380,
  },
  {
    id: "6",
    name: "Beef Burger",
    description: "Juicy beef patty with lettuce, tomato, cheese, and fries",
    price: 520,
    category: "mains",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.6,
    prepTime: "20-25 mins",
    isAvailable: true,
    isVegetarian: false,
    isSpicy: false,
    calories: 650,
  },
]

export function MenuGrid({ viewMode, searchQuery, categoryFilter }: MenuGridProps) {
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [showItemDialog, setShowItemDialog] = useState(false)

  // Filter menu items
  const filteredItems = mockMenuItems.filter((item) => {
    const matchesSearch = searchQuery === "" || item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleViewItem = (item: any) => {
    setSelectedItem(item)
    setShowItemDialog(true)
  }

  const toggleAvailability = (itemId: string) => {
    // Handle availability toggle
    console.log("Toggle availability for item:", itemId)
  }

  if (filteredItems.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-4">
            <Utensils className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">No menu items found</p>
        </CardContent>
      </Card>
    )
  }

  if (viewMode === "list") {
    return (
      <>
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=96&width=96"
                    }}
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <div className="flex items-center gap-2">
                        <Switch checked={item.isAvailable} onCheckedChange={() => toggleAvailability(item.id)} />
                        <span className="text-sm text-muted-foreground">
                          {item.isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-success" />
                        <span className="font-semibold">Rs. {item.price}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-warning fill-current" />
                        <span className="text-sm">{item.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{item.prepTime}</span>
                      </div>
                      <div className="flex gap-1">
                        {item.isVegetarian && <Badge variant="outline">Veg</Badge>}
                        {item.isSpicy && <Badge variant="outline">Spicy</Badge>}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleViewItem(item)}>
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <MenuItemDialog item={selectedItem} open={showItemDialog} onOpenChange={setShowItemDialog} />
      </>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow overflow-hidden">
            <div className="relative">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=192&width=300"
                }}
              />
              <div className="absolute top-2 right-2 flex gap-1">
                {item.isVegetarian && <Badge className="bg-success text-success-foreground">Veg</Badge>}
                {item.isSpicy && <Badge className="bg-destructive text-destructive-foreground">Spicy</Badge>}
              </div>
              <div className="absolute top-2 left-2">
                <Badge variant={item.isAvailable ? "default" : "secondary"}>
                  {item.isAvailable ? "Available" : "Unavailable"}
                </Badge>
              </div>
            </div>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold line-clamp-1">{item.name}</CardTitle>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-warning fill-current" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-success" />
                  <span className="text-xl font-bold">Rs. {item.price}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{item.prepTime}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch checked={item.isAvailable} onCheckedChange={() => toggleAvailability(item.id)} size="sm" />
                  <span className="text-xs text-muted-foreground">Available</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleViewItem(item)}>
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <MenuItemDialog item={selectedItem} open={showItemDialog} onOpenChange={setShowItemDialog} />
    </>
  )
}
