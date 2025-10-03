"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Clock, MoreHorizontal } from "lucide-react"

export function TableLayout() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null)

  const tables = [
    { id: "T1", seats: 2, status: "available", x: 10, y: 10, area: "main" },
    { id: "T2", seats: 4, status: "occupied", x: 25, y: 10, area: "main", customer: "John Doe", time: "45 min" },
    { id: "T3", seats: 6, status: "reserved", x: 40, y: 10, area: "main", customer: "Smith Family", time: "7:30 PM" },
    { id: "T4", seats: 2, status: "available", x: 55, y: 10, area: "main" },
    { id: "T5", seats: 4, status: "cleaning", x: 70, y: 10, area: "main" },
    { id: "T6", seats: 8, status: "available", x: 10, y: 30, area: "main" },
    { id: "T7", seats: 4, status: "occupied", x: 30, y: 30, area: "main", customer: "Johnson Party", time: "1h 20min" },
    { id: "T8", seats: 2, status: "available", x: 50, y: 30, area: "main" },
    { id: "T9", seats: 6, status: "reserved", x: 70, y: 30, area: "main", customer: "Brown Wedding", time: "8:00 PM" },
    { id: "P1", seats: 4, status: "available", x: 15, y: 60, area: "private" },
    {
      id: "P2",
      seats: 8,
      status: "occupied",
      x: 40,
      y: 60,
      area: "private",
      customer: "Corporate Meeting",
      time: "2h 15min",
    },
    {
      id: "P3",
      seats: 12,
      status: "reserved",
      x: 65,
      y: 60,
      area: "private",
      customer: "Birthday Party",
      time: "6:00 PM",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "occupied":
        return "bg-red-500"
      case "reserved":
        return "bg-blue-500"
      case "cleaning":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Restaurant Layout</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative bg-muted/20 rounded-lg p-4 min-h-[500px]">
              {/* Main Dining Area */}
              <div className="absolute top-4 left-4 right-4 h-48 border-2 border-dashed border-muted-foreground/30 rounded-lg p-2">
                <span className="text-sm font-medium text-muted-foreground">Main Dining Area</span>
              </div>

              {/* Private Dining Area */}
              <div className="absolute bottom-4 left-4 right-4 h-32 border-2 border-dashed border-muted-foreground/30 rounded-lg p-2">
                <span className="text-sm font-medium text-muted-foreground">Private Dining Area</span>
              </div>

              {/* Tables */}
              {tables.map((table) => (
                <div
                  key={table.id}
                  className={`absolute w-12 h-12 rounded-full border-2 cursor-pointer transition-all hover:scale-110 ${
                    selectedTable === table.id ? "ring-2 ring-primary ring-offset-2" : ""
                  } ${getStatusColor(table.status)} flex items-center justify-center text-white font-semibold text-sm`}
                  style={{ left: `${table.x}%`, top: `${table.y}%` }}
                  onClick={() => setSelectedTable(selectedTable === table.id ? null : table.id)}
                >
                  {table.id}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-sm">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span className="text-sm">Occupied</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <span className="text-sm">Reserved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span className="text-sm">Cleaning</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {selectedTable ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Table {selectedTable}
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(() => {
                const table = tables.find((t) => t.id === selectedTable)
                if (!table) return null

                return (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      {getStatusBadge(table.status)}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Capacity</span>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{table.seats} seats</span>
                      </div>
                    </div>

                    {table.customer && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Customer</span>
                        <span className="font-medium">{table.customer}</span>
                      </div>
                    )}

                    {table.time && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Duration</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{table.time}</span>
                        </div>
                      </div>
                    )}

                    <div className="pt-4 space-y-2">
                      {table.status === "available" && (
                        <>
                          <Button className="w-full">Assign Customer</Button>
                          <Button variant="outline" className="w-full bg-transparent">
                            Reserve Table
                          </Button>
                        </>
                      )}
                      {table.status === "occupied" && (
                        <>
                          <Button className="w-full">View Order</Button>
                          <Button variant="outline" className="w-full bg-transparent">
                            Request Bill
                          </Button>
                        </>
                      )}
                      {table.status === "reserved" && (
                        <>
                          <Button className="w-full">Check In</Button>
                          <Button variant="outline" className="w-full bg-transparent">
                            Cancel Reservation
                          </Button>
                        </>
                      )}
                      {table.status === "cleaning" && <Button className="w-full">Mark as Clean</Button>}
                    </div>
                  </>
                )
              })()}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">Click on a table to view details</p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Users className="h-4 w-4 mr-2" />
              Seat Walk-in Customer
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Clock className="h-4 w-4 mr-2" />
              View Today's Reservations
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <MoreHorizontal className="h-4 w-4 mr-2" />
              Manage Table Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
