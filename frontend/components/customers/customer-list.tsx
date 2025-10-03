import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Phone, Mail, Calendar, Star, MoreHorizontal } from "lucide-react"

export function CustomerList() {
  const customers = [
    {
      id: "CUST001",
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+91 98765 43210",
      joinDate: "2024-01-15",
      totalOrders: 24,
      totalSpent: 18500,
      lastVisit: "2024-12-28",
      loyaltyTier: "Gold",
      rating: 4.8,
    },
    {
      id: "CUST002",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+91 98765 43211",
      joinDate: "2024-03-22",
      totalOrders: 18,
      totalSpent: 14200,
      lastVisit: "2024-12-27",
      loyaltyTier: "Silver",
      rating: 4.6,
    },
    {
      id: "CUST003",
      name: "Mike Davis",
      email: "mike.davis@email.com",
      phone: "+91 98765 43212",
      joinDate: "2024-06-10",
      totalOrders: 32,
      totalSpent: 25600,
      lastVisit: "2024-12-28",
      loyaltyTier: "Platinum",
      rating: 4.9,
    },
    {
      id: "CUST004",
      name: "Emily Brown",
      email: "emily.brown@email.com",
      phone: "+91 98765 43213",
      joinDate: "2024-11-05",
      totalOrders: 6,
      totalSpent: 4800,
      lastVisit: "2024-12-26",
      loyaltyTier: "Bronze",
      rating: 4.4,
    },
    {
      id: "CUST005",
      name: "David Wilson",
      email: "david.w@email.com",
      phone: "+91 98765 43214",
      joinDate: "2024-02-18",
      totalOrders: 21,
      totalSpent: 16800,
      lastVisit: "2024-12-25",
      loyaltyTier: "Gold",
      rating: 4.7,
    },
  ]

  const getTierBadge = (tier: string) => {
    const colors: { [key: string]: string } = {
      Platinum: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      Gold: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      Silver: "bg-gray-500/10 text-gray-500 border-gray-500/20",
      Bronze: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    }
    return <Badge className={colors[tier] || "bg-gray-500/10 text-gray-500"}>{tier}</Badge>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Directory</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {customers.map((customer) => (
            <div key={customer.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{customer.name}</h3>
                    {getTierBadge(customer.loyaltyTier)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      <span>{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      <span>{customer.phone}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span>{customer.totalOrders} orders</span>
                    <span>•</span>
                    <span>₹{customer.totalSpent.toLocaleString()} spent</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{customer.rating}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Last visit: {new Date(customer.lastVisit).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  View Profile
                </Button>
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
