"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Calendar, Filter } from "lucide-react"

const salesData = [
  {
    id: 1,
    date: "2024-01-15",
    customer: "John Doe",
    product: "iPhone 15 Pro",
    category: "Mobile",
    quantity: 1,
    amount: 999,
    profit: 149,
  },
  {
    id: 2,
    date: "2024-01-16",
    customer: "Jane Smith",
    product: "Samsung Galaxy S24",
    category: "Mobile",
    quantity: 1,
    amount: 849,
    profit: 149,
  },
  {
    id: 3,
    date: "2024-01-17",
    customer: "Mike Johnson",
    product: "Phone Case",
    category: "Accessory",
    quantity: 2,
    amount: 50,
    profit: 20,
  },
  {
    id: 4,
    date: "2024-01-18",
    customer: "Sarah Wilson",
    product: "Wireless Charger",
    category: "Accessory",
    quantity: 1,
    amount: 45,
    profit: 20,
  },
  {
    id: 5,
    date: "2024-01-19",
    customer: "David Brown",
    product: "Google Pixel 8",
    category: "Mobile",
    quantity: 1,
    amount: 749,
    profit: 149,
  },
]

const expenseData = [
  {
    id: 1,
    date: "2024-01-01",
    category: "Rent",
    description: "Monthly shop rent",
    amount: 2500,
  },
  {
    id: 2,
    date: "2024-01-01",
    category: "Salary",
    description: "Staff salaries",
    amount: 3000,
  },
  {
    id: 3,
    date: "2024-01-05",
    category: "Utilities",
    description: "Electricity and water",
    amount: 450,
  },
  {
    id: 4,
    date: "2024-01-10",
    category: "Marketing",
    description: "Social media ads",
    amount: 800,
  },
]

export default function ReportsPage() {
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [reportType, setReportType] = useState("all")

  const totalSales = salesData.reduce((sum, sale) => sum + sale.amount, 0)
  const totalProfit = salesData.reduce((sum, sale) => sum + sale.profit, 0)
  const totalExpenses = expenseData.reduce((sum, expense) => sum + expense.amount, 0)
  const netProfit = totalProfit - totalExpenses

  const handleExportPDF = () => {
    // In a real application, you would implement PDF export functionality
    alert("PDF export functionality would be implemented here")
  }

  const handleExportExcel = () => {
    // In a real application, you would implement Excel export functionality
    alert("Excel export functionality would be implemented here")
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600">Generate and export detailed business reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportPDF}>
            <FileText className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={handleExportExcel}>
            <Download className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date-from">From Date</Label>
              <Input id="date-from" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-to">To Date</Label>
              <Input id="date-to" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="report-type">Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="sales">Sales Only</SelectItem>
                  <SelectItem value="expenses">Expenses Only</SelectItem>
                  <SelectItem value="profit">Profit Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-blue-600">${totalSales.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Total Profit</p>
              <p className="text-2xl font-bold text-green-600">${totalProfit.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600">${totalExpenses.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Net Profit</p>
              <p className="text-2xl font-bold text-purple-600">${netProfit.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sales" className="space-y-6">
        <TabsList>
          <TabsTrigger value="sales">Sales Report</TabsTrigger>
          <TabsTrigger value="expenses">Expense Report</TabsTrigger>
          <TabsTrigger value="profit">Profit Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>Sales Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Profit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesData.map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell>{new Date(sale.date).toLocaleDateString()}</TableCell>
                        <TableCell className="font-medium">{sale.customer}</TableCell>
                        <TableCell>{sale.product}</TableCell>
                        <TableCell>
                          <Badge variant={sale.category === "Mobile" ? "default" : "secondary"}>{sale.category}</Badge>
                        </TableCell>
                        <TableCell>{sale.quantity}</TableCell>
                        <TableCell className="font-semibold">${sale.amount}</TableCell>
                        <TableCell className="text-green-600 font-semibold">${sale.profit}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses">
          <Card>
            <CardHeader>
              <CardTitle>Expense Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenseData.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{expense.category}</Badge>
                        </TableCell>
                        <TableCell>{expense.description}</TableCell>
                        <TableCell className="font-semibold text-red-600">${expense.amount.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profit">
          <Card>
            <CardHeader>
              <CardTitle>Profit Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Mobile Sales Profit</h3>
                    {salesData
                      .filter((sale) => sale.category === "Mobile")
                      .map((sale) => (
                        <div key={sale.id} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <div>
                            <p className="font-medium">{sale.product}</p>
                            <p className="text-sm text-gray-600">{sale.customer}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${sale.amount}</p>
                            <p className="text-sm text-green-600">+${sale.profit}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Accessory Sales Profit</h3>
                    {salesData
                      .filter((sale) => sale.category === "Accessory")
                      .map((sale) => (
                        <div key={sale.id} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <div>
                            <p className="font-medium">{sale.product}</p>
                            <p className="text-sm text-gray-600">{sale.customer}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${sale.amount}</p>
                            <p className="text-sm text-green-600">+${sale.profit}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
