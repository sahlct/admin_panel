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
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, ShoppingCart, Search } from "lucide-react"

const accessories = [
  {
    id: 1,
    name: "iPhone 15 Case",
    type: "Case",
    brand: "Apple",
    purchasePrice: 15,
    sellingPrice: 25,
    quantity: 45,
    sold: 23,
    profit: 10 * 23,
  },
  {
    id: 2,
    name: "Wireless Charger",
    type: "Charger",
    brand: "Samsung",
    purchasePrice: 25,
    sellingPrice: 45,
    quantity: 30,
    sold: 18,
    profit: 20 * 18,
  },
  {
    id: 3,
    name: "Screen Protector",
    type: "Protection",
    brand: "Generic",
    purchasePrice: 5,
    sellingPrice: 15,
    quantity: 100,
    sold: 67,
    profit: 10 * 67,
  },
  {
    id: 4,
    name: "USB-C Cable",
    type: "Cable",
    brand: "Anker",
    purchasePrice: 8,
    sellingPrice: 18,
    quantity: 25,
    sold: 15,
    profit: 10 * 15,
  },
  {
    id: 5,
    name: "Car Mount",
    type: "Mount",
    brand: "iOttie",
    purchasePrice: 20,
    sellingPrice: 35,
    quantity: 12,
    sold: 8,
    profit: 15 * 8,
  },
]

export default function AccessoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isSellDialogOpen, setIsSellDialogOpen] = useState(false)
  const [selectedAccessory, setSelectedAccessory] = useState<any>(null)

  const filteredAccessories = accessories.filter(
    (accessory) =>
      accessory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      accessory.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      accessory.brand.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Accessories Management</h1>
          <p className="text-gray-600">Manage your accessories inventory and sales</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Accessory
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Accessory</DialogTitle>
              <DialogDescription>Add a new accessory to your inventory.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="accessory-name">Accessory Name</Label>
                <Input id="accessory-name" placeholder="iPhone 15 Case" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="accessory-type">Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="case">Case</SelectItem>
                    <SelectItem value="charger">Charger</SelectItem>
                    <SelectItem value="cable">Cable</SelectItem>
                    <SelectItem value="protection">Screen Protection</SelectItem>
                    <SelectItem value="mount">Mount</SelectItem>
                    <SelectItem value="headphones">Headphones</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="accessory-brand">Brand</Label>
                <Input id="accessory-brand" placeholder="Apple" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="accessory-purchase-price">Purchase Price</Label>
                  <Input id="accessory-purchase-price" type="number" placeholder="15" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="accessory-selling-price">Selling Price</Label>
                  <Input id="accessory-selling-price" type="number" placeholder="25" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="accessory-quantity">Quantity</Label>
                <Input id="accessory-quantity" type="number" placeholder="50" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsAddDialogOpen(false)}>
                Add Accessory
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
              placeholder="Search accessories by name, type, or brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Accessories Table */}
      <Card>
        <CardHeader>
          <CardTitle>Accessories Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Purchase Price</TableHead>
                  <TableHead>Selling Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Sold</TableHead>
                  <TableHead>Profit</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAccessories.map((accessory) => (
                  <TableRow key={accessory.id}>
                    <TableCell className="font-medium">{accessory.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{accessory.type}</Badge>
                    </TableCell>
                    <TableCell>{accessory.brand}</TableCell>
                    <TableCell>${accessory.purchasePrice}</TableCell>
                    <TableCell>${accessory.sellingPrice}</TableCell>
                    <TableCell>
                      <Badge variant={accessory.quantity < 10 ? "destructive" : "default"}>{accessory.quantity}</Badge>
                    </TableCell>
                    <TableCell>{accessory.sold}</TableCell>
                    <TableCell className="text-green-600 font-semibold">${accessory.profit}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Dialog open={isSellDialogOpen} onOpenChange={setIsSellDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedAccessory(accessory)}>
                              <ShoppingCart className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Sell Accessory</DialogTitle>
                              <DialogDescription>Record a sale for {selectedAccessory?.name}</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor="customer-name">Customer Name</Label>
                                <Input id="customer-name" placeholder="John Doe" />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="quantity-sold">Quantity</Label>
                                <Input
                                  id="quantity-sold"
                                  type="number"
                                  placeholder="1"
                                  max={selectedAccessory?.quantity}
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="sale-price">Sale Price</Label>
                                <Input id="sale-price" type="number" placeholder={selectedAccessory?.sellingPrice} />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit" onClick={() => setIsSellDialogOpen(false)}>
                                Record Sale
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
