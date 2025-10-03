import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Clock, Phone, Calendar } from "lucide-react"

export function ReservationList() {
  const reservations = [
    {
      id: "R001",
      customer: "Smith Family",
      phone: "+1 234-567-8901",
      date: "Today",
      time: "7:30 PM",
      guests: 4,
      table: "T3",
      status: "confirmed",
      notes: "Anniversary dinner",
    },
    {
      id: "R002",
      customer: "Brown Wedding",
      phone: "+1 234-567-8902",
      date: "Today",
      time: "8:00 PM",
      guests: 6,
      table: "T9",
      status: "confirmed",
      notes: "Wedding celebration",
    },
    {
      id: "R003",
      customer: "Corporate Meeting",
      phone: "+1 234-567-8903",
      date: "Tomorrow",
      time: "12:00 PM",
      guests: 8,
      table: "P1",
      status: "pending",
      notes: "Business lunch",
    },
    {
      id: "R004",
      customer: "Johnson Party",
      phone: "+1 234-567-8904",
      date: "Tomorrow",
      time: "6:00 PM",
      guests: 12,
      table: "P3",
      status: "confirmed",
      notes: "Birthday party",
    },
    {
      id: "R005",
      customer: "Davis Couple",
      phone: "+1 234-567-8905",
      date: "Dec 30",
      time: "7:00 PM",
      guests: 2,
      table: "T1",
      status: "waitlist",
      notes: "Date night",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Pending</Badge>
      case "waitlist":
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Waitlist</Badge>
      case "cancelled":
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Cancelled</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reservations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="p-4 border border-border/50 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{reservation.customer}</h3>
                    {getStatusBadge(reservation.status)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      <span>{reservation.phone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{reservation.guests} guests</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm font-medium mb-1">
                    <Calendar className="h-4 w-4" />
                    <span>{reservation.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{reservation.time}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-muted-foreground">Table: </span>
                  <span className="font-medium">{reservation.table}</span>
                  {reservation.notes && (
                    <>
                      <span className="text-muted-foreground"> • </span>
                      <span className="text-muted-foreground">{reservation.notes}</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {reservation.status === "pending" && (
                    <>
                      <Button size="sm" variant="outline">
                        Decline
                      </Button>
                      <Button size="sm">Confirm</Button>
                    </>
                  )}
                  {reservation.status === "confirmed" && (
                    <>
                      <Button size="sm" variant="outline">
                        Modify
                      </Button>
                      <Button size="sm">Check In</Button>
                    </>
                  )}
                  {reservation.status === "waitlist" && <Button size="sm">Assign Table</Button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
