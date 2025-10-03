"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Settings, User, Bell, Shield, CreditCard, Smartphone, Mail, Globe, Clock, DollarSign } from "lucide-react"

export function SettingsManagement() {
  const [notifications, setNotifications] = useState({
    orderAlerts: true,
    lowStock: true,
    dailyReports: false,
    customerFeedback: true,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Settings className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your restaurant settings and preferences</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Restaurant Profile
              </CardTitle>
              <CardDescription>Update your restaurant information and branding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback>RV</AvatarFallback>
                </Avatar>
                <Button variant="outline">Change Logo</Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="restaurant-name">Restaurant Name</Label>
                  <Input id="restaurant-name" defaultValue="RestroVibe Demo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cuisine-type">Cuisine Type</Label>
                  <Input id="cuisine-type" defaultValue="Multi-Cuisine" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Food Street, Culinary District, CD 12345" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="contact@restrovibe.com" />
                </div>
              </div>

              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Operating Hours
              </CardTitle>
              <CardDescription>Set your restaurant's operating hours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                <div key={day} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Switch defaultChecked={day !== "Sunday"} />
                    <span className="font-medium w-20">{day}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input className="w-24" defaultValue="09:00" />
                    <span>to</span>
                    <Input className="w-24" defaultValue="22:00" />
                  </div>
                </div>
              ))}
              <Button>Update Hours</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Order Alerts</h4>
                    <p className="text-sm text-muted-foreground">Get notified when new orders are placed</p>
                  </div>
                  <Switch
                    checked={notifications.orderAlerts}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, orderAlerts: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Low Stock Alerts</h4>
                    <p className="text-sm text-muted-foreground">Get notified when inventory is running low</p>
                  </div>
                  <Switch
                    checked={notifications.lowStock}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, lowStock: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Daily Reports</h4>
                    <p className="text-sm text-muted-foreground">Receive daily sales and performance reports</p>
                  </div>
                  <Switch
                    checked={notifications.dailyReports}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, dailyReports: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Customer Feedback</h4>
                    <p className="text-sm text-muted-foreground">Get notified about new customer reviews</p>
                  </div>
                  <Switch
                    checked={notifications.customerFeedback}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, customerFeedback: checked }))}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Notification Channels</h4>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <h5 className="font-medium">Email</h5>
                        <p className="text-sm text-muted-foreground">contact@restrovibe.com</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-primary" />
                      <div>
                        <h5 className="font-medium">SMS</h5>
                        <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Manage your account security and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Change Password</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button>Update Password</Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      <Badge variant="outline" className="mt-1">
                        Not Enabled
                      </Badge>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">Active Sessions</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-muted-foreground">Chrome on Windows • 192.168.1.100</p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Mobile App</p>
                        <p className="text-sm text-muted-foreground">iOS App • Last active 2 hours ago</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Revoke
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Billing & Subscription
              </CardTitle>
              <CardDescription>Manage your subscription and billing information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-primary">Professional Plan</h4>
                    <p className="text-sm text-muted-foreground">Billed monthly</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">$99</p>
                    <p className="text-sm text-muted-foreground">/month</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm">
                    Change Plan
                  </Button>
                  <Button variant="outline" size="sm">
                    Cancel Subscription
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Payment Method</h4>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5" />
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/25</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Update
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Billing History</h4>
                <div className="space-y-2">
                  {[
                    { date: "Dec 1, 2024", amount: "$99.00", status: "Paid" },
                    { date: "Nov 1, 2024", amount: "$99.00", status: "Paid" },
                    { date: "Oct 1, 2024", amount: "$99.00", status: "Paid" },
                  ].map((invoice, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{invoice.date}</p>
                        <p className="text-sm text-muted-foreground">Professional Plan</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{invoice.amount}</span>
                        <Badge variant="outline">{invoice.status}</Badge>
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Integrations
              </CardTitle>
              <CardDescription>Connect with third-party services and platforms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Stripe", description: "Payment processing", connected: true, icon: DollarSign },
                  { name: "Uber Eats", description: "Food delivery platform", connected: false, icon: Smartphone },
                  { name: "DoorDash", description: "Food delivery service", connected: true, icon: Smartphone },
                  { name: "Google Analytics", description: "Website analytics", connected: false, icon: Globe },
                  { name: "Mailchimp", description: "Email marketing", connected: false, icon: Mail },
                  { name: "Slack", description: "Team communication", connected: true, icon: Bell },
                ].map((integration) => (
                  <Card key={integration.name} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <integration.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h5 className="font-medium">{integration.name}</h5>
                          <p className="text-sm text-muted-foreground">{integration.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {integration.connected ? (
                          <>
                            <Badge className="bg-green-100 text-green-800">Connected</Badge>
                            <Button variant="outline" size="sm">
                              Configure
                            </Button>
                          </>
                        ) : (
                          <Button size="sm">Connect</Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
