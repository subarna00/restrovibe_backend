"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MenuGrid } from "./menu-grid"
import { CategoryManagement } from "./category-management"
import { MenuStats } from "./menu-stats"
import { AddMenuItemDialog } from "./add-menu-item-dialog"
import { Plus, Search, Filter, Grid, List, Download } from "lucide-react"

export function MenuManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showAddItemDialog, setShowAddItemDialog] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="appetizers">Appetizers</SelectItem>
              <SelectItem value="mains">Main Course</SelectItem>
              <SelectItem value="desserts">Desserts</SelectItem>
              <SelectItem value="beverages">Beverages</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Menu
          </Button>
          <Button onClick={() => setShowAddItemDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Menu Item
          </Button>
        </div>
      </div>

      {/* Menu Stats */}
      <MenuStats />

      {/* Menu Tabs */}
      <Tabs defaultValue="items" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="items">Menu Items</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="items">
          <MenuGrid viewMode={viewMode} searchQuery={searchQuery} categoryFilter={categoryFilter} />
        </TabsContent>

        <TabsContent value="categories">
          <CategoryManagement />
        </TabsContent>
      </Tabs>

      {/* Add Menu Item Dialog */}
      <AddMenuItemDialog open={showAddItemDialog} onOpenChange={setShowAddItemDialog} />
    </div>
  )
}
