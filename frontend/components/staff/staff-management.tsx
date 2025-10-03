"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus, DollarSign } from "lucide-react"
import { StaffOverview } from "./staff-overview"
import { StaffList } from "./staff-list"
import { StaffSchedule } from "./staff-schedule"
import { StaffPayroll } from "./staff-payroll"
import { AddStaffDialog } from "./add-staff-dialog"

export function StaffManagement() {
  const [addStaffOpen, setAddStaffOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Staff</h1>
          <p className="text-muted-foreground">Manage team members, schedules, and payroll</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setAddStaffOpen(true)} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Staff
          </Button>
          <Button>
            <DollarSign className="h-4 w-4 mr-2" />
            Payroll Report
          </Button>
        </div>
      </div>

      <StaffOverview />

      <Tabs defaultValue="staff" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="staff">All Staff</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="staff" className="space-y-6">
          <StaffList />
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <StaffSchedule />
        </TabsContent>

        <TabsContent value="payroll" className="space-y-6">
          <StaffPayroll />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Staff performance tracking coming soon...</p>
          </div>
        </TabsContent>
      </Tabs>

      <AddStaffDialog open={addStaffOpen} onOpenChange={setAddStaffOpen} />
    </div>
  )
}
