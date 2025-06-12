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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Settings, CheckCircle } from "lucide-react"

const services = [
  {
    id: 1,
    date: "2024-01-15",
    customer: "John Doe",
    phone: "iPhone 13 Pro",
    serviceType: "Screen Replacement",
    status: "Completed",
    cost: 120,
    charge: 180,
    profit: 60,
  },
  {
    id: 2,
    date: "2024-01-18",
    customer: "Jane Smith",
    phone: "Samsung Galaxy S22",
    serviceType: "Battery Replacement",
    status: "In Progress",
    cost: 45,
    charge: 85,
    profit: 40,
  },
  {
    id: 3,
    date: "2024-01-20",
    customer: "Mike Johnson",
    phone: "Google Pixel 6",
    serviceType: "Water Damage Repair",
    status: "Pending",
    cost: 150,
    charge: 250,
    profit: 100,
  },
  {
    id: 4,
    date: "2024-01-22",
    customer: "Sarah Wilson",
    phone: "OnePlus 10",
    serviceType: "Charging Port Repair",
    status: "Completed",
    cost: 60,
    charge: 100,
    profit: 40,
  },
]

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<any>(null)

  const filteredServices = services.filter(
    (service) =>
      service.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.serviceType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Service Management</h1>
          <p className="text-gray-600">Manage repair services and track service profits</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>Record a new repair service request.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="customer-name">Customer Name</Label>
                  <Input id="customer-name" placeholder="John Doe" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="customer-phone">Customer Phone</Label>
                  <Input id="customer-phone" placeholder="+1 234 567 8900" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="device-model">Device Model</Label>
                  <Input id="device-model" placeholder="iPhone 13 Pro" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="service-type">Service Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="screen">Screen Replacement</SelectItem>
                      <SelectItem value="battery">Battery Replacement</SelectItem>
                      <SelectItem value="charging">Charging Port Repair</SelectItem>
                      <SelectItem value="water">Water Damage Repair</SelectItem>
                      <SelectItem value="software">Software Issue</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="service-cost">Service Cost</Label>
                  <Input id="service-cost" type="number" placeholder="50" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="service-charge">Service Charge</Label>
                  <Input id="service-charge" type="number" placeholder="100" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="service-description">Description</Label>
                <Textarea id="service-description" placeholder="Describe the issue and required service..." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="service-status">Status</Label>
                <Select defaultValue="pending">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsAddDialogOpen(false)}>
                Add Service
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search services by customer, device, or service type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Services Table */}
      <Card>
        <CardHeader>
          <CardTitle>Service Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Service Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Charge</TableHead>
                  <TableHead>Profit</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>{new Date(service.date).toLocaleDateString()}</TableCell>
                    <TableCell className="font-medium">{service.customer}</TableCell>
                    <TableCell>{service.phone}</TableCell>
                    <TableCell>{service.serviceType}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(service.status)} variant="outline">
                        {service.status}
                      </Badge>
                    </TableCell>
                    <TableCell>${service.cost}</TableCell>
                    <TableCell>${service.charge}</TableCell>
                    <TableCell className="text-green-600 font-semibold">${service.profit}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedService(service)}
                              className="flex gap-1 items-center"
                            >
                              <Settings className="h-3 w-3" />
                              <span>Update</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Update Service Status</DialogTitle>
                              <DialogDescription>Update the status of this service request.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor="update-status">Status</Label>
                                <Select defaultValue={selectedService?.status.toLowerCase()}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="update-notes">Service Notes</Label>
                                <Textarea id="update-notes" placeholder="Add notes about the service..." />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                type="submit"
                                onClick={() => setIsUpdateDialogOpen(false)}
                                className="flex gap-1 items-center"
                              >
                                <CheckCircle className="h-4 w-4" />
                                <span>Update Status</span>
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
