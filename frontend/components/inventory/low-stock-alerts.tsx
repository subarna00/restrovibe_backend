import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Package, ShoppingCart } from "lucide-react"

export function LowStockAlerts() {
  const lowStockItems = [
    {
      id: "ITM002",
      name: "Chicken Breast",
      category: "Meat",
      currentStock: 8,
      minStock: 15,
      unit: "kg",
      supplier: "Fresh Meat Co",
      urgency: "high",
    },
    {
      id: "ITM004",
      name: "Olive Oil",
      category: "Oils",
      currentStock: 0,
      minStock: 5,
      unit: "liters",
      supplier: "Premium Oils",
      urgency: "critical",
    },
    {
      id: "ITM006",
      name: "Bell Peppers",
      category: "Vegetables",
      currentStock: 3,
      minStock: 8,
      unit: "kg",
      supplier: "Green Valley",
      urgency: "medium",
    },
    {
      id: "ITM007",
      name: "Mozzarella Cheese",
      category: "Dairy",
      currentStock: 2,
      minStock: 6,
      unit: "kg",
      supplier: "Dairy Fresh",
      urgency: "high",
    },
  ]

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Critical</Badge>
      case "high":
        return <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Medium</Badge>
      default:
        return <Badge variant="secondary">Low</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Low Stock Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lowStockItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border border-border/50 rounded-lg bg-orange-500/5"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Package className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    {getUrgencyBadge(item.urgency)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{item.category}</span>
                    <span>•</span>
                    <span>
                      Current: {item.currentStock} {item.unit}
                    </span>
                    <span>•</span>
                    <span>
                      Min: {item.minStock} {item.unit}
                    </span>
                    <span>•</span>
                    <span>Supplier: {item.supplier}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Quick Order
                </Button>
                <Button size="sm">Contact Supplier</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
