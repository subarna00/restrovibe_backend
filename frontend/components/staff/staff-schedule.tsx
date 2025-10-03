import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Calendar, Users } from "lucide-react"

export function StaffSchedule() {
  const schedule = [
    {
      day: "Monday",
      date: "Dec 30",
      shifts: [
        { time: "6:00 AM - 2:00 PM", staff: ["Alice Johnson", "Carol Davis", "Mike Chen"], type: "Morning" },
        { time: "2:00 PM - 10:00 PM", staff: ["Bob Smith", "David Wilson", "Sarah Lee"], type: "Evening" },
        { time: "10:00 PM - 6:00 AM", staff: ["Night Security"], type: "Night" },
      ],
    },
    {
      day: "Tuesday",
      date: "Dec 31",
      shifts: [
        { time: "6:00 AM - 2:00 PM", staff: ["Alice Johnson", "Carol Davis", "Tom Brown"], type: "Morning" },
        { time: "2:00 PM - 10:00 PM", staff: ["Bob Smith", "David Wilson", "Lisa Wang"], type: "Evening" },
        { time: "10:00 PM - 6:00 AM", staff: ["Night Security"], type: "Night" },
      ],
    },
  ]

  const getShiftBadge = (type: string) => {
    const colors: { [key: string]: string } = {
      Morning: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      Evening: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      Night: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    }
    return <Badge className={colors[type] || "bg-gray-500/10 text-gray-500"}>{type}</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            This Week
          </Button>
          <Button variant="outline" size="sm">
            <Users className="h-4 w-4 mr-2" />
            Manage Shifts
          </Button>
        </div>
        <Button>
          <Clock className="h-4 w-4 mr-2" />
          Add Shift
        </Button>
      </div>

      <div className="space-y-4">
        {schedule.map((day) => (
          <Card key={day.day}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>
                  {day.day}, {day.date}
                </span>
                <Badge variant="outline">
                  {day.shifts.reduce((acc, shift) => acc + shift.staff.length, 0)} staff scheduled
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {day.shifts.map((shift, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">{shift.time}</span>
                        {getShiftBadge(shift.type)}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{shift.staff.length} staff</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {shift.staff.map((name, staffIndex) => (
                          <Badge key={staffIndex} variant="secondary" className="text-xs">
                            {name}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
