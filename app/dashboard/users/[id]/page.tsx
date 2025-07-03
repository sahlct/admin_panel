"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Phone, Mail, MapPin, Calendar, DollarSign, Smartphone, Package, Settings } from "lucide-react"
import Link from "next/link"

// Mock data for a specific user
const userData = {
  m01_id: 1,
  m01_name: "John Doe",
  m01_contact_number: 1234567890,
  m01_email: "john.doe@email.com",
  m01_place: "New York, NY",
  m01_profile_photo: "/placeholder.svg?height=150&width=150",
  createdAt: "2024-01-15",
  updatedAt: "2024-01-20",
}

const userMobiles = [
  {
    id: 1,
    model: "iPhone 15 Pro",
    brand: "Apple",
    imei: "352099001761481",
    purchaseDate: "2024-01-20",
    price: 999,
    billId: "BILL-001",
    status: "Active",
  },
  {
    id: 2,
    model: "Samsung Galaxy S24",
    brand: "Samsung",
    imei: "490154203237518",
    purchaseDate: "2024-01-22",
    price: 849,
    billId: "BILL-002",
    status: "Active",
  },
]

const userAccessories = [
  {
    id: 1,
    name: "iPhone 15 Case",
    type: "Case",
    purchaseDate: "2024-01-20",
    price: 25,
    billId: "BILL-001",
    quantity: 1,
  },
  {
    id: 2,
    name: "Wireless Charger",
    type: "Charger",
    purchaseDate: "2024-01-22",
    price: 45,
    billId: "BILL-003",
    quantity: 1,
  },
]

const userServices = [
  {
    id: 1,
    serviceType: "Screen Replacement",
    device: "iPhone 13 Pro",
    serviceDate: "2024-01-18",
    cost: 120,
    status: "Completed",
    notes: "Screen replaced successfully",
  },
  {
    id: 2,
    serviceType: "Battery Replacement",
    device: "Samsung Galaxy S22",
    serviceDate: "2024-01-25",
    cost: 85,
    status: "In Progress",
    notes: "Waiting for battery part",
  },
]

const userBills = [
  {
    id: "BILL-001",
    date: "2024-01-20",
    amount: 999,
    tax: 79.92,
    total: 1078.92,
    status: "Paid",
    items: "iPhone 15 Pro, iPhone Case",
  },
  {
    id: "BILL-002",
    date: "2024-01-22",
    amount: 849,
    tax: 67.92,
    total: 916.92,
    status: "Paid",
    items: "Samsung Galaxy S24",
  },
  {
    id: "BILL-003",
    date: "2024-01-22",
    amount: 45,
    tax: 3.6,
    total: 48.6,
    status: "Paid",
    items: "Wireless Charger",
  },
]

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")

  const totalSpent = userBills.reduce((sum, bill) => sum + bill.total, 0)
  const totalMobiles = userMobiles.length
  const totalAccessories = userAccessories.reduce((sum, acc) => sum + acc.quantity, 0)
  const totalServices = userServices.length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/users">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Users
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
          <p className="text-gray-600">Detailed customer information and purchase history</p>
        </div>
      </div>

      {/* User Info Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <Avatar className="h-32 w-32">
                <AvatarImage src={userData.m01_profile_photo || "/placeholder.svg"} alt={userData.m01_name} />
                <AvatarFallback className="text-2xl">
                  {userData.m01_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{userData.m01_name}</h2>
                <p className="text-gray-600">Customer ID: #{userData.m01_id}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{userData.m01_contact_number}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{userData.m01_email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{userData.m01_place}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>Customer since {new Date(userData.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">${totalSpent.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Smartphone className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Mobiles Purchased</p>
                <p className="text-2xl font-bold text-gray-900">{totalMobiles}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Accessories</p>
                <p className="text-2xl font-bold text-gray-900">{totalAccessories}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Settings className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Services Used</p>
                <p className="text-2xl font-bold text-gray-900">{totalServices}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="mobiles">Mobiles</TabsTrigger>
          <TabsTrigger value="accessories">Accessories</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Purchase History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bill ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userBills.map((bill) => (
                      <TableRow key={bill.id}>
                        <TableCell className="font-medium">{bill.id}</TableCell>
                        <TableCell>{new Date(bill.date).toLocaleDateString()}</TableCell>
                        <TableCell>{bill.items}</TableCell>
                        <TableCell>${bill.amount}</TableCell>
                        <TableCell className="font-semibold">${bill.total}</TableCell>
                        <TableCell>
                          <Badge variant={bill.status === "Paid" ? "default" : "secondary"}>{bill.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mobiles">
          <Card>
            <CardHeader>
              <CardTitle>Mobile Devices Purchased</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Model</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>IMEI</TableHead>
                      <TableHead>Purchase Date</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Bill ID</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userMobiles.map((mobile) => (
                      <TableRow key={mobile.id}>
                        <TableCell className="font-medium">{mobile.model}</TableCell>
                        <TableCell>{mobile.brand}</TableCell>
                        <TableCell>{mobile.imei}</TableCell>
                        <TableCell>{new Date(mobile.purchaseDate).toLocaleDateString()}</TableCell>
                        <TableCell>${mobile.price}</TableCell>
                        <TableCell>{mobile.billId}</TableCell>
                        <TableCell>
                          <Badge variant="default">{mobile.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accessories">
          <Card>
            <CardHeader>
              <CardTitle>Accessories Purchased</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Purchase Date</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Bill ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userAccessories.map((accessory) => (
                      <TableRow key={accessory.id}>
                        <TableCell className="font-medium">{accessory.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{accessory.type}</Badge>
                        </TableCell>
                        <TableCell>{new Date(accessory.purchaseDate).toLocaleDateString()}</TableCell>
                        <TableCell>{accessory.quantity}</TableCell>
                        <TableCell>${accessory.price}</TableCell>
                        <TableCell>{accessory.billId}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Service History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service Type</TableHead>
                      <TableHead>Device</TableHead>
                      <TableHead>Service Date</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userServices.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">{service.serviceType}</TableCell>
                        <TableCell>{service.device}</TableCell>
                        <TableCell>{new Date(service.serviceDate).toLocaleDateString()}</TableCell>
                        <TableCell>${service.cost}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              service.status === "Completed"
                                ? "default"
                                : service.status === "In Progress"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {service.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{service.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
