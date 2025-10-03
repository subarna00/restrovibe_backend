"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { UserCheck, Plus, Clock, DollarSign, Users, Utensils, Car, Calendar, MapPin } from "lucide-react"

export function ServiceManagement() {
  const services = [
    {
      id: 1,
      name: "Dine-In Service",
      description: "Traditional restaurant dining experience",
      price: "Free",
      duration: "Variable",
      active: true,
      category: "dining",
      icon: Utensils,
    },
    {
      id: 2,
      name: "Takeaway",
      description: "Quick pickup service for busy customers",
      price: "Free",
      duration: "15-20 mins",
      active: true,
      category: "delivery",
      icon: Car,
    },
    {
      id: 3,
      name: "Home Delivery",
      description: "Food delivered to your doorstep",
      price: "$3.99",
      duration: "30-45 mins",
      active: true,
      category: "delivery",
      icon: MapPin,
    },
    {
      id: 4,
      name: "Table Reservation",
      description: "Reserve tables in advance",
      price: "Free",
      duration: "Instant",
      active: true,
      category: "booking",
      icon: Calendar,
    },
  ]

  const activeServices = services.filter((s) => s.active).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <UserCheck className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Services</h1>
            <p className="text-muted-foreground">Manage your restaurant services and offerings</p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserCheck className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeServices}</p>
                <p className="text-sm text-muted-foreground">Active Services</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">$12,450</p>
                <p className="text-sm text-muted-foreground">Service Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">1,234</p>
                <p className="text-sm text-muted-foreground">Service Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">4.8</p>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Management</CardTitle>
          <CardDescription>Configure and manage your restaurant services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex space-x-1 bg-muted p-1 rounded-lg">
              <Button variant="default" size="sm" className="flex-1">
                All Services
              </Button>
              <Button variant="ghost" size="sm" className="flex-1">
                Dining
              </Button>
              <Button variant="ghost" size="sm" className="flex-1">
                Delivery
              </Button>
              <Button variant="ghost" size="sm" className="flex-1">
                Booking
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => (
                <Card key={service.id} className="transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <service.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{service.name}</CardTitle>
                          <Badge variant="outline">{service.category}</Badge>
                        </div>
                      </div>
                      <Switch checked={service.active} />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span>{service.price}</span>
                      <span>{service.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
