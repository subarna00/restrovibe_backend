import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Clock, MapPin, MoreHorizontal } from "lucide-react"

export function TableList() {
  const tables = [
    { id: "T1", seats: 2, status: "available", area: "Main Dining", location: "Window side" },
    { id: "T2", seats: 4, status: "occupied", area: "Main Dining", customer: "John Doe", duration: "45 min" },
    { id: "T3", seats: 6, status: "reserved", area: "Main Dining", customer: "Smith Family", time: "7:30 PM" },
    { id: "T4", seats: 2, status: "available", area: "Main Dining", location: "Center" },
    { id: "T5", seats: 4, status: "cleaning", area: "Main Dining", location: "Near kitchen" },
    { id: "P1", seats: 8, status: "available", area: "Private Room", location: "Room A" },
    {
      id: "P2",
      seats: 12,
      status: "occupied",
      area: "Private Room",
      customer: "Corporate Meeting",
      duration: "2h 15min",
    },
    { id: "O1", seats: 4, status: "available", area: "Outdoor Patio", location: "Garden view" },
    { id: "B1", seats: 2, status: "occupied", area: "Bar Area", customer: "Date Night", duration: "1h 30min" },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Available</Badge>
      case "occupied":
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Occupied</Badge>
      case "reserved":
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Reserved</Badge>
      case "cleaning":
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Cleaning</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Tables</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tables.map((table) => (
            <div key={table.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                  {table.id}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">Table {table.id}</h3>
                    {getStatusBadge(table.status)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{table.seats} seats</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{table.area}</span>
                    </div>
                    {table.location && <span>• {table.location}</span>}
                  </div>
                  {table.customer && (
                    <div className="flex items-center gap-4 text-sm mt-1">
                      <span className="font-medium">{table.customer}</span>
                      {table.duration && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{table.duration}</span>
                        </div>
                      )}
                      {table.time && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Reserved for {table.time}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {table.status === "available" && <Button size="sm">Assign</Button>}
                {table.status === "occupied" && (
                  <Button size="sm" variant="outline">
                    View Order
                  </Button>
                )}
                {table.status === "reserved" && (
                  <Button size="sm" variant="outline">
                    Check In
                  </Button>
                )}
                {table.status === "cleaning" && (
                  <Button size="sm" variant="outline">
                    Mark Clean
                  </Button>
                )}
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
