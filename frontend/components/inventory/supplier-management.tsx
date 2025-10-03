import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Star, MoreHorizontal } from "lucide-react"

export function SupplierManagement() {
  const suppliers = [
    {
      id: "SUP001",
      name: "Green Valley Suppliers",
      category: "Vegetables & Fruits",
      contact: "+91 98765 43210",
      email: "orders@greenvalley.com",
      address: "123 Farm Road, Green Valley",
      rating: 4.8,
      status: "active",
      lastOrder: "2024-12-28",
      totalOrders: 45,
    },
    {
      id: "SUP002",
      name: "Fresh Meat Co",
      category: "Meat & Poultry",
      contact: "+91 98765 43211",
      email: "sales@freshmeat.com",
      address: "456 Market Street, City Center",
      rating: 4.6,
      status: "active",
      lastOrder: "2024-12-27",
      totalOrders: 32,
    },
    {
      id: "SUP003",
      name: "Dairy Fresh",
      category: "Dairy Products",
      contact: "+91 98765 43212",
      email: "info@dairyfresh.com",
      address: "789 Dairy Lane, Milk Town",
      rating: 4.9,
      status: "active",
      lastOrder: "2024-12-26",
      totalOrders: 28,
    },
    {
      id: "SUP004",
      name: "Spice World",
      category: "Spices & Seasonings",
      contact: "+91 98765 43213",
      email: "orders@spiceworld.com",
      address: "321 Spice Market, Old City",
      rating: 4.4,
      status: "inactive",
      lastOrder: "2024-12-15",
      totalOrders: 18,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Active</Badge>
      case "inactive":
        return <Badge className="bg-gray-500/10 text-gray-500 border-gray-500/20">Inactive</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Suppliers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="p-4 border border-border/50 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{supplier.name}</h3>
                    {getStatusBadge(supplier.status)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{supplier.category}</p>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{supplier.rating}</span>
                    <span className="text-sm text-muted-foreground">({supplier.totalOrders} orders)</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{supplier.contact}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{supplier.email}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span>{supplier.address}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Last order: {new Date(supplier.lastOrder).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  View Orders
                </Button>
                <Button size="sm" variant="outline">
                  Contact
                </Button>
                <Button size="sm">New Order</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
