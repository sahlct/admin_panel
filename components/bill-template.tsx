"use client"

import { Card, CardContent } from "@/components/ui/card"

interface BillTemplateProps {
  bill: {
    id: string
    date: string
    customer: string
    phone: string
    device: string
    imei: string
    amount: number
    tax: number
    total: number
  }
}

export function BillTemplate({ bill }: BillTemplateProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-blue-600 mb-2">Mobile Shop Management System</h1>
          <p className="text-gray-600">123 Tech Street, Digital City, DC 12345</p>
          <p className="text-gray-600">Phone: +1 (555) 123-4567 | Email: info@mobileshop.com</p>
        </div>

        {/* Bill Info */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Sales Invoice</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Bill ID</p>
              <p className="font-medium">{bill.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-medium">{new Date(bill.date).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Customer Details */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Customer Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-medium">{bill.customer}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium">{bill.phone}</p>
            </div>
          </div>
        </div>

        {/* Item Details */}
        <div className="mb-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 p-3 text-left">Device</th>
                <th className="border border-gray-300 p-3 text-left">IMEI</th>
                <th className="border border-gray-300 p-3 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3">{bill.device}</td>
                <td className="border border-gray-300 p-3">{bill.imei}</td>
                <td className="border border-gray-300 p-3 text-right">${bill.amount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Total Section */}
        <div className="text-right mb-8">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${bill.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (8%):</span>
              <span>${bill.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total:</span>
              <span>${bill.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 text-sm">
          <p>Thank you for your business!</p>
          <p>This is a computer-generated invoice.</p>
        </div>
      </CardContent>
    </Card>
  )
}
