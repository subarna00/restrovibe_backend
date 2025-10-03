"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SalesSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Sales Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Visual Bar */}
        <div className="space-y-2">
          <div className="flex h-8 rounded-lg overflow-hidden">
            <div className="bg-primary-light flex-1"></div>
            <div className="bg-primary-dark flex-1"></div>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary-light rounded-full"></div>
              <span className="text-sm text-muted-foreground">Paid</span>
            </div>
            <span className="font-semibold">Rs. 10000</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary-dark rounded-full"></div>
              <span className="text-sm text-muted-foreground">Unpaid Sales</span>
            </div>
            <span className="font-semibold">Rs. 20000</span>
          </div>
        </div>

        <div className="pt-3 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Total Sales:</span>
            <span className="text-xl font-bold">Rs. 30000</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}