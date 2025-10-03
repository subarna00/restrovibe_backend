import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreditCard, Smartphone, Banknote, Settings } from "lucide-react"

export function PaymentMethods() {
  const paymentMethods = [
    {
      id: "cash",
      name: "Cash",
      icon: Banknote,
      transactions: 145,
      amount: 32000,
      percentage: 25.6,
      status: "active",
    },
    {
      id: "card",
      name: "Credit/Debit Cards",
      icon: CreditCard,
      transactions: 289,
      amount: 65000,
      percentage: 52.0,
      status: "active",
    },
    {
      id: "upi",
      name: "UPI/Digital Wallets",
      icon: Smartphone,
      transactions: 156,
      amount: 28000,
      percentage: 22.4,
      status: "active",
    },
  ]

  const recentTransactions = [
    { id: "TXN001", method: "UPI", amount: 1250, time: "2 mins ago", status: "completed" },
    { id: "TXN002", method: "Card", amount: 2800, time: "5 mins ago", status: "completed" },
    { id: "TXN003", method: "Cash", amount: 850, time: "8 mins ago", status: "completed" },
    { id: "TXN004", method: "UPI", amount: 1950, time: "12 mins ago", status: "completed" },
    { id: "TXN005", method: "Card", amount: 3200, time: "15 mins ago", status: "failed" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {paymentMethods.map((method) => (
          <Card key={method.id} className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <method.icon className="h-8 w-8 text-primary" />
                <Badge variant={method.status === "active" ? "default" : "secondary"}>{method.status}</Badge>
              </div>
              <h3 className="font-semibold mb-2">{method.name}</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-medium">₹{method.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Transactions</span>
                  <span className="font-medium">{method.transactions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Share</span>
                  <span className="font-medium">{method.percentage}%</span>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mt-4">
                <div className="h-2 rounded-full bg-primary" style={{ width: `${method.percentage}%` }}></div>
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-4">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 border border-border/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {transaction.method === "UPI" && <Smartphone className="h-5 w-5 text-primary" />}
                    {transaction.method === "Card" && <CreditCard className="h-5 w-5 text-primary" />}
                    {transaction.method === "Cash" && <Banknote className="h-5 w-5 text-primary" />}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.method} Payment</p>
                    <p className="text-sm text-muted-foreground">{transaction.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-semibold">₹{transaction.amount.toLocaleString()}</p>
                  <Badge variant={transaction.status === "completed" ? "default" : "destructive"}>
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
