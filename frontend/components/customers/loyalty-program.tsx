import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Gift, Crown, Award, Star } from "lucide-react"

export function LoyaltyProgram() {
  const loyaltyTiers = [
    {
      name: "Bronze",
      icon: Award,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      members: 156,
      benefits: ["5% discount", "Birthday offer"],
      minSpend: 0,
    },
    {
      name: "Silver",
      icon: Star,
      color: "text-gray-500",
      bgColor: "bg-gray-500/10",
      members: 89,
      benefits: ["10% discount", "Free appetizer", "Priority seating"],
      minSpend: 10000,
    },
    {
      name: "Gold",
      icon: Gift,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      members: 67,
      benefits: ["15% discount", "Free dessert", "VIP events"],
      minSpend: 25000,
    },
    {
      name: "Platinum",
      icon: Crown,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      members: 23,
      benefits: ["20% discount", "Complimentary drinks", "Personal chef consultation"],
      minSpend: 50000,
    },
  ]

  const recentRewards = [
    {
      customer: "John Smith",
      reward: "Free Dessert",
      tier: "Gold",
      date: "2024-12-28",
      points: 150,
    },
    {
      customer: "Mike Davis",
      reward: "20% Discount",
      tier: "Platinum",
      date: "2024-12-27",
      points: 200,
    },
    {
      customer: "Sarah Johnson",
      reward: "Free Appetizer",
      tier: "Silver",
      date: "2024-12-26",
      points: 100,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loyaltyTiers.map((tier) => (
          <Card key={tier.name} className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-full ${tier.bgColor} flex items-center justify-center`}>
                  <tier.icon className={`h-6 w-6 ${tier.color}`} />
                </div>
                <Badge variant="outline">{tier.members} members</Badge>
              </div>
              <h3 className="font-semibold text-lg mb-2">{tier.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">Min spend: ₹{tier.minSpend.toLocaleString()}</p>
              <div className="space-y-1">
                {tier.benefits.map((benefit, index) => (
                  <div key={index} className="text-sm text-muted-foreground">
                    • {benefit}
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-4">
                Manage Tier
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Loyalty Program Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Program Participation</span>
                <span>36.6%</span>
              </div>
              <Progress value={36.6} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Average Points per Customer</span>
                <span>1,250 pts</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Redemption Rate</span>
                <span>68%</span>
              </div>
              <Progress value={68} className="h-2" />
            </div>
            <div className="pt-4 border-t">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">₹2.4L</p>
                  <p className="text-sm text-muted-foreground">Revenue from loyalty</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">4.2x</p>
                  <p className="text-sm text-muted-foreground">Higher retention</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRewards.map((reward, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                  <div>
                    <p className="font-medium">{reward.customer}</p>
                    <p className="text-sm text-muted-foreground">{reward.reward}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{reward.tier}</Badge>
                    <p className="text-sm text-muted-foreground mt-1">
                      {reward.points} pts • {new Date(reward.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
