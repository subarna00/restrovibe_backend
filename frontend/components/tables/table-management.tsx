"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Clock, MapPin, Settings } from "lucide-react"
import { TableStats } from "./table-stats"
import { TableLayout } from "./table-layout"
import { TableList } from "./table-list"
import { ReservationList } from "./reservation-list"
import { AddTableDialog } from "./add-table-dialog"
import { AddReservationDialog } from "./add-reservation-dialog"

export function TableManagement() {
  const [addTableOpen, setAddTableOpen] = useState(false)
  const [addReservationOpen, setAddReservationOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Table & Spaces</h1>
          <p className="text-muted-foreground">Manage dining areas, tables, and reservations</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setAddReservationOpen(true)} variant="outline">
            <Clock className="h-4 w-4 mr-2" />
            New Reservation
          </Button>
          <Button onClick={() => setAddTableOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Table
          </Button>
        </div>
      </div>

      <TableStats />

      <Tabs defaultValue="layout" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="layout">Layout View</TabsTrigger>
          <TabsTrigger value="tables">Table List</TabsTrigger>
          <TabsTrigger value="reservations">Reservations</TabsTrigger>
          <TabsTrigger value="areas">Dining Areas</TabsTrigger>
        </TabsList>

        <TabsContent value="layout" className="space-y-6">
          <TableLayout />
        </TabsContent>

        <TabsContent value="tables" className="space-y-6">
          <TableList />
        </TabsContent>

        <TabsContent value="reservations" className="space-y-6">
          <ReservationList />
        </TabsContent>

        <TabsContent value="areas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Dining Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "Main Dining", tables: 12, capacity: 48, status: "Active" },
                  { name: "Private Room", tables: 3, capacity: 24, status: "Active" },
                  { name: "Outdoor Patio", tables: 8, capacity: 32, status: "Seasonal" },
                  { name: "Bar Area", tables: 6, capacity: 18, status: "Active" },
                ].map((area) => (
                  <Card key={area.name} className="border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{area.name}</h3>
                        <Badge variant={area.status === "Active" ? "default" : "secondary"}>{area.status}</Badge>
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>{area.tables} tables</p>
                        <p>{area.capacity} total capacity</p>
                      </div>
                      <Button variant="ghost" size="sm" className="mt-2 w-full">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AddTableDialog open={addTableOpen} onOpenChange={setAddTableOpen} />
      <AddReservationDialog open={addReservationOpen} onOpenChange={setAddReservationOpen} />
    </div>
  )
}
