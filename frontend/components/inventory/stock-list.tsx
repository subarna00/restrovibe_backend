import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Calendar, AlertTriangle, MoreHorizontal } from "lucide-react"

export function StockList() {
  const stockItems = [
    {
      id: "ITM001",
      name: "Tomatoes",
      category: "Vegetables",
      currentStock: 25,
      unit: "kg",
      minStock: 10,
      maxStock: 50,
      supplier: "Green Valley",
      lastUpdated: "2024-12-28",
      status: "good",
    },
    {
      id: "ITM002",
      name: "Chicken Breast",
      category: "Meat",
      currentStock: 8,
      unit: "kg",
      minStock: 15,
      maxStock: 40,
      supplier: "Fresh Meat Co",
      lastUpdated: "2024-12-28",
      status: "low",
    },
    {
      id: "ITM003",
      name: "Basmati Rice",
      category: "Grains",
      currentStock: 45,
      unit: "kg",
      minStock: 20,
      maxStock: 100,
      supplier: "Rice Mills",
      lastUpdated: "2024-12-27",
      status: "good",
    },
    {
      id: "ITM004",
      name: "Olive Oil",
      category: "Oils",
      currentStock: 0,
      unit: "liters",
      minStock: 5,
      maxStock: 20,
      supplier: "Premium Oils",
      lastUpdated: "2024-12-26",
      status: "out",
    },
    {
      id: "ITM005",
      name: "Onions",
      category: "Vegetables",
      currentStock: 30,
      unit: "kg",
      minStock: 15,
      maxStock: 60,
      supplier: "Green Valley",
      lastUpdated: "2024-12-28",
      status: "good",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "good":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Good Stock</Badge>
      case "low":
        return <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20">Low Stock</Badge>
      case "out":
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Out of Stock</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getStockPercentage = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stockItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    {getStatusBadge(item.status)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{item.category}</span>
                    <span>•</span>
                    <span>Supplier: {item.supplier}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(item.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">
                        {item.currentStock} {item.unit}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        / {item.maxStock} {item.unit} max
                      </span>
                    </div>
                    <div className="w-48 bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          item.status === "good"
                            ? "bg-green-500"
                            : item.status === "low"
                              ? "bg-orange-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${getStockPercentage(item.currentStock, item.maxStock)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {item.status === "low" && (
                  <Button size="sm" variant="outline">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Reorder
                  </Button>
                )}
                {item.status === "out" && <Button size="sm">Order Now</Button>}
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
