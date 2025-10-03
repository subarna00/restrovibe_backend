"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText } from "lucide-react"

export function TransactionHistory() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Transaction History</CardTitle>
        <Button variant="ghost" size="sm" className="text-primary">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sl</TableHead>
              <TableHead>Entry Date</TableHead>
              <TableHead>TXN Date</TableHead>
              <TableHead>TXN NO</TableHead>
              <TableHead>Particular</TableHead>
              <TableHead>TXN Type</TableHead>
              <TableHead>Parties</TableHead>
              <TableHead>PMT Mode</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Entry By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={11} className="text-center py-12">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">No Data!</p>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}