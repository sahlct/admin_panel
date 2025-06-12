"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, Download, Printer } from "lucide-react"

const bills = [
  {
    id: "BILL-001",
    date: "2024-01-20",
    customer: "John Doe",
    phone: "+1 234 567 8900",
    device: "iPhone 15 Pro",
    imei: "352099001761481",
    amount: 999,
    tax: 79.92,
    total: 1078.92,
    status: "Paid",
  },
  {
    id: "BILL-002",
    date: "2024-01-22",
    customer: "Jane Smith",
    phone: "+1 234 567 8901",
    device: "Samsung Galaxy S24",
    imei: "490154203237518",
    amount: 849,
    tax: 67.92,
    total: 916.92,
    status: "Paid",
  },
  {
    id: "BILL-003",
    date: "2024-01-25",
    customer: "Mike Johnson",
    phone: "+1 234 567 8902",
    device: "Google Pixel 8 Pro",
    imei: "358240051093832",
    amount: 749,
    tax: 59.92,
    total: 808.92,
    status: "Pending",
  },
]

export default function BillsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBill, setSelectedBill] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const filteredBills = bills.filter(
    (bill) =>
      bill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.imei.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewBill = (bill: any) => {
    setSelectedBill(bill)
    setIsViewDialogOpen(true)
  }

  const handleDownloadBill = (bill: any) => {
    // In a real application, this would generate and download a PDF
    const billContent = generateBillHTML(bill)
    const blob = new Blob([billContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${bill.id}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handlePrintBill = (bill: any) => {
    const billContent = generateBillHTML(bill)
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(billContent)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const generateBillHTML = (bill: any) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Bill ${bill.id}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .company-name { font-size: 24px; font-weight: bold; color: #2563eb; }
          .bill-details { margin: 20px 0; }
          .customer-details { margin: 20px 0; }
          .item-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .item-table th, .item-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          .item-table th { background-color: #f8f9fa; }
          .total-section { margin-top: 20px; text-align: right; }
          .total-row { font-weight: bold; font-size: 18px; }
          .footer { margin-top: 40px; text-align: center; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="company-name">Mobile Shop Management System</div>
          <p>123 Tech Street, Digital City, DC 12345</p>
          <p>Phone: +1 (555) 123-4567 | Email: info@mobileshop.com</p>
        </div>
        
        <div class="bill-details">
          <h2>Sales Invoice</h2>
          <p><strong>Bill ID:</strong> ${bill.id}</p>
          <p><strong>Date:</strong> ${new Date(bill.date).toLocaleDateString()}</p>
        </div>
        
        <div class="customer-details">
          <h3>Customer Details</h3>
          <p><strong>Name:</strong> ${bill.customer}</p>
          <p><strong>Phone:</strong> ${bill.phone}</p>
        </div>
        
        <table class="item-table">
          <thead>
            <tr>
              <th>Device</th>
              <th>IMEI</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${bill.device}</td>
              <td>${bill.imei}</td>
              <td>$${bill.amount.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        
        <div class="total-section">
          <p>Subtotal: $${bill.amount.toFixed(2)}</p>
          <p>Tax (8%): $${bill.tax.toFixed(2)}</p>
          <p class="total-row">Total: $${bill.total.toFixed(2)}</p>
        </div>
        
        <div class="footer">
          <p>Thank you for your business!</p>
          <p>This is a computer-generated invoice.</p>
        </div>
      </body>
      </html>
    `
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bills Management</h1>
          <p className="text-gray-600">View and manage all generated sales bills</p>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search bills by ID, customer, device, or IMEI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Bills Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Bills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bill ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBills.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell className="font-medium">{bill.id}</TableCell>
                    <TableCell>{new Date(bill.date).toLocaleDateString()}</TableCell>
                    <TableCell>{bill.customer}</TableCell>
                    <TableCell>{bill.device}</TableCell>
                    <TableCell>${bill.amount}</TableCell>
                    <TableCell className="font-semibold">${bill.total}</TableCell>
                    <TableCell>
                      <Badge variant={bill.status === "Paid" ? "default" : "secondary"}>{bill.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewBill(bill)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handlePrintBill(bill)}>
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDownloadBill(bill)}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Bill Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Bill Details - {selectedBill?.id}</DialogTitle>
            <DialogDescription>Complete bill information and preview</DialogDescription>
          </DialogHeader>
          {selectedBill && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Mobile Shop Management System</h3>
                <p className="text-sm text-gray-600">123 Tech Street, Digital City, DC 12345</p>
                <p className="text-sm text-gray-600">Phone: +1 (555) 123-4567</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Bill ID</Label>
                  <p className="text-sm">{selectedBill.id}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Date</Label>
                  <p className="text-sm">{new Date(selectedBill.date).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Customer Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Name</Label>
                    <p className="text-sm">{selectedBill.customer}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Phone</Label>
                    <p className="text-sm">{selectedBill.phone}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Device Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Device</Label>
                    <p className="text-sm">{selectedBill.device}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">IMEI</Label>
                    <p className="text-sm">{selectedBill.imei}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Payment Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Device Price:</span>
                    <span>${selectedBill.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8%):</span>
                    <span>${selectedBill.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>${selectedBill.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => handlePrintBill(selectedBill)}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button onClick={() => handleDownloadBill(selectedBill)}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
