"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Smartphone,
  Package,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Activity,
  Settings,
  FileText,
  User,
} from "lucide-react"

const stats = [
  {
    name: "Total Mobiles in Stock",
    value: "247",
    change: "+12%",
    changeType: "increase",
    icon: Smartphone,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    name: "Mobiles Sold",
    value: "89",
    change: "+23%",
    changeType: "increase",
    icon: ShoppingCart,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    name: "Accessories in Stock",
    value: "156",
    change: "-5%",
    changeType: "decrease",
    icon: Package,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    name: "Total Users",
    value: "342",
    change: "+32%",
    changeType: "increase",
    icon: User,
    color: "text-cyan-600",
    bgColor: "bg-cyan-100",
  },
  {
    name: "Active Services",
    value: "24",
    change: "+15%",
    changeType: "increase",
    icon: Settings,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
  {
    name: "Total Profit",
    value: "$12,450",
    change: "+18%",
    changeType: "increase",
    icon: TrendingUp,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    name: "Total Expenses",
    value: "$8,230",
    change: "+8%",
    changeType: "increase",
    icon: TrendingDown,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    name: "Bills Generated",
    value: "156",
    change: "+28%",
    changeType: "increase",
    icon: FileText,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
]

const recentSales = [
  {
    id: "1",
    customer: "John Doe",
    product: "iPhone 15 Pro",
    amount: "$999",
    status: "completed",
  },
  {
    id: "2",
    customer: "Jane Smith",
    product: "Samsung Galaxy S24",
    amount: "$849",
    status: "completed",
  },
  {
    id: "3",
    customer: "Mike Johnson",
    product: "Phone Case",
    amount: "$25",
    status: "pending",
  },
  {
    id: "4",
    customer: "Sarah Wilson",
    product: "Wireless Charger",
    amount: "$45",
    status: "completed",
  },
]

const lowStockItems = [
  { name: "iPhone 14", stock: 3, threshold: 10 },
  { name: "Samsung Charger", stock: 5, threshold: 15 },
  { name: "Phone Cases", stock: 8, threshold: 20 },
  { name: "Screen Protectors", stock: 12, threshold: 25 },
]

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your shop.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.name} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <Badge variant={stat.changeType === "increase" ? "default" : "destructive"} className="ml-2">
                      {stat.changeType === "increase" ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {stat.change}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Sales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Recent Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{sale.customer}</p>
                    <p className="text-sm text-gray-600">{sale.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{sale.amount}</p>
                    <Badge variant={sale.status === "completed" ? "default" : "secondary"}>{sale.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200"
                >
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">Threshold: {item.threshold}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-red-600">{item.stock}</p>
                    <p className="text-xs text-red-500">in stock</p>
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
