import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Phone, Mail, Calendar, MoreHorizontal } from "lucide-react"

export function StaffList() {
  const staff = [
    {
      id: "STAFF001",
      name: "Alice Johnson",
      role: "Head Chef",
      department: "Kitchen",
      email: "alice.j@restrovibe.com",
      phone: "+91 98765 43210",
      joinDate: "2023-01-15",
      salary: 45000,
      status: "active",
      shift: "Morning",
      experience: "8 years",
    },
    {
      id: "STAFF002",
      name: "Bob Smith",
      role: "Sous Chef",
      department: "Kitchen",
      email: "bob.s@restrovibe.com",
      phone: "+91 98765 43211",
      joinDate: "2023-03-22",
      salary: 35000,
      status: "active",
      shift: "Evening",
      experience: "5 years",
    },
    {
      id: "STAFF003",
      name: "Carol Davis",
      role: "Server",
      department: "Front of House",
      email: "carol.d@restrovibe.com",
      phone: "+91 98765 43212",
      joinDate: "2023-06-10",
      salary: 25000,
      status: "active",
      shift: "Morning",
      experience: "3 years",
    },
    {
      id: "STAFF004",
      name: "David Wilson",
      role: "Bartender",
      department: "Bar",
      email: "david.w@restrovibe.com",
      phone: "+91 98765 43213",
      joinDate: "2023-08-05",
      salary: 28000,
      status: "active",
      shift: "Evening",
      experience: "4 years",
    },
    {
      id: "STAFF005",
      name: "Emma Brown",
      role: "Manager",
      department: "Management",
      email: "emma.b@restrovibe.com",
      phone: "+91 98765 43214",
      joinDate: "2022-11-18",
      salary: 55000,
      status: "active",
      shift: "Full Day",
      experience: "10 years",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Active</Badge>
      case "inactive":
        return <Badge className="bg-gray-500/10 text-gray-500 border-gray-500/20">Inactive</Badge>
      case "on-leave":
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">On Leave</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    const colors: { [key: string]: string } = {
      "Head Chef": "bg-red-500/10 text-red-500",
      "Sous Chef": "bg-orange-500/10 text-orange-500",
      Server: "bg-blue-500/10 text-blue-500",
      Bartender: "bg-purple-500/10 text-purple-500",
      Manager: "bg-green-500/10 text-green-500",
    }
    return (
      <Badge variant="outline" className={colors[role] || "bg-gray-500/10 text-gray-500"}>
        {role}
      </Badge>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Staff Directory</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {staff.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{member.name}</h3>
                    {getRoleBadge(member.role)}
                    {getStatusBadge(member.status)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{member.department}</span>
                    <span>•</span>
                    <span>{member.shift} shift</span>
                    <span>•</span>
                    <span>{member.experience} experience</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {new Date(member.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-semibold">₹{member.salary.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">per month</p>
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
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
