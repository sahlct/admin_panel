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
import { Plus, Edit, ShoppingCart, Search, ImageIcon } from "lucide-react"

const mobiles = [
  {
    id: 1,
    model: "iPhone 15 Pro",
    brand: "Apple",
    imei: "352099001761481",
    color: "Space Black",
    variant: "256GB",
    country: "USA",
    battery: "100%",
    purchasePrice: 850,
    sellingPrice: 999,
    addedDate: "2024-01-10",
    soldDate: null,
    status: "In Stock",
    image: "/placeholder.svg?height=100&width=100",
    notes: "Pristine condition, original packaging included",
  },
  {
    id: 2,
    model: "Galaxy S24 Ultra",
    brand: "Samsung",
    imei: "490154203237518",
    color: "Titanium Gray",
    variant: "512GB",
    country: "South Korea",
    battery: "100%",
    purchasePrice: 700,
    sellingPrice: 849,
    addedDate: "2024-01-12",
    soldDate: "2024-01-20",
    status: "Sold",
    image: "/placeholder.svg?height=100&width=100",
    notes: "Minor scratch on back panel",
  },
  {
    id: 3,
    model: "Pixel 8 Pro",
    brand: "Google",
    imei: "358240051093832",
    color: "Obsidian",
    variant: "128GB",
    country: "Vietnam",
    battery: "100%",
    purchasePrice: 600,
    sellingPrice: 749,
    addedDate: "2024-01-15",
    soldDate: null,
    status: "In Stock",
    image: "/placeholder.svg?height=100&width=100",
    notes: "",
  },
  {
    id: 4,
    model: "OnePlus 12",
    brand: "OnePlus",
    imei: "867530020553090",
    color: "Flowy Emerald",
    variant: "256GB",
    country: "China",
    battery: "100%",
    purchasePrice: 550,
    sellingPrice: 699,
    addedDate: "2024-01-18",
    soldDate: null,
    status: "In Stock",
    image: "/placeholder.svg?height=100&width=100",
    notes: "Dual SIM model",
  },
]

export default function MobilesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isSellDialogOpen, setIsSellDialogOpen] = useState(false)
  const [selectedMobile, setSelectedMobile] = useState<any>(null)
  const [isGeneratingBill, setIsGeneratingBill] = useState(false)

  const filteredMobiles = mobiles.filter(
    (mobile) =>
      mobile.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mobile.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mobile.imei.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mobile.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mobile.variant.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mobile Management</h1>
          <p className="text-gray-600">Manage your mobile inventory and sales</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Mobile
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Mobile</DialogTitle>
              <DialogDescription>Add a new mobile device to your inventory.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="model">Model Name</Label>
                  <Input id="model" placeholder="iPhone 15 Pro" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="samsung">Samsung</SelectItem>
                      <SelectItem value="google">Google</SelectItem>
                      <SelectItem value="oneplus">OnePlus</SelectItem>
                      <SelectItem value="xiaomi">Xiaomi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="imei">IMEI Number</Label>
                  <Input id="imei" placeholder="352099001761481" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="country">Country of Origin</Label>
                  <Input id="country" placeholder="USA" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="color">Color</Label>
                  <Input id="color" placeholder="Space Black" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="variant">Variant (Storage/RAM)</Label>
                  <Input id="variant" placeholder="256GB" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="battery">Battery Health</Label>
                  <Input id="battery" placeholder="100%" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">Device Image</Label>
                  <div className="flex items-center gap-2">
                    <Input id="image" type="file" accept="image/*" />
                    <Button type="button" variant="outline" size="icon">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="purchase-price">Purchase Price</Label>
                  <Input id="purchase-price" type="number" placeholder="850" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="selling-price">Selling Price</Label>
                  <Input id="selling-price" type="number" placeholder="999" />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" placeholder="Any additional information about the device..." />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsAddDialogOpen(false)}>
                Add Mobile
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
              placeholder="Search mobiles by model, brand, IMEI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Mobile Table */}
      <Card>
        <CardHeader>
          <CardTitle>Mobile Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>IMEI</TableHead>
                  <TableHead>Variant</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Purchase Price</TableHead>
                  <TableHead>Selling Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Added Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMobiles.map((mobile) => (
                  <TableRow key={mobile.id}>
                    <TableCell>
                      <img
                        src={mobile.image || "/placeholder.svg"}
                        alt={mobile.model}
                        className="w-10 h-10 object-cover rounded-md"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div>{mobile.model}</div>
                      <div className="text-xs text-gray-500">{mobile.brand}</div>
                    </TableCell>
                    <TableCell>{mobile.imei}</TableCell>
                    <TableCell>{mobile.variant}</TableCell>
                    <TableCell>{mobile.color}</TableCell>
                    <TableCell>${mobile.purchasePrice}</TableCell>
                    <TableCell>${mobile.sellingPrice}</TableCell>
                    <TableCell>
                      <Badge variant={mobile.status === "In Stock" ? "default" : "secondary"}>{mobile.status}</Badge>
                    </TableCell>
                    <TableCell>{new Date(mobile.addedDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {mobile.status === "In Stock" && (
                          <Dialog open={isSellDialogOpen} onOpenChange={setIsSellDialogOpen}>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedMobile(mobile)}>
                                <ShoppingCart className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                              <DialogHeader>
                                <DialogTitle>Sell Mobile & Generate Bill</DialogTitle>
                                <DialogDescription>
                                  Record a sale and generate bill for {selectedMobile?.model}
                                </DialogDescription>
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
                                    <Label htmlFor="sale-price">Sale Price</Label>
                                    <Input id="sale-price" type="number" placeholder={selectedMobile?.sellingPrice} />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                                    <Input id="tax-rate" type="number" placeholder="8" defaultValue="8" />
                                  </div>
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="sale-date">Sale Date</Label>
                                  <Input
                                    id="sale-date"
                                    type="date"
                                    defaultValue={new Date().toISOString().split("T")[0]}
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="sale-notes">Sale Notes</Label>
                                  <Textarea id="sale-notes" placeholder="Any notes about this sale..." />
                                </div>

                                {/* Bill Preview */}
                                <div className="border rounded-lg p-4 bg-gray-50">
                                  <h4 className="font-medium mb-2">Bill Preview</h4>
                                  <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                      <span>Device Price:</span>
                                      <span>${selectedMobile?.sellingPrice}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Tax (8%):</span>
                                      <span>${((selectedMobile?.sellingPrice || 0) * 0.08).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold border-t pt-1">
                                      <span>Total:</span>
                                      <span>${((selectedMobile?.sellingPrice || 0) * 1.08).toFixed(2)}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  type="submit"
                                  onClick={() => {
                                    setIsGeneratingBill(true)
                                    // Simulate bill generation
                                    setTimeout(() => {
                                      setIsGeneratingBill(false)
                                      setIsSellDialogOpen(false)
                                      alert("Sale recorded and bill generated successfully!")
                                    }, 2000)
                                  }}
                                  disabled={isGeneratingBill}
                                >
                                  {isGeneratingBill ? "Generating Bill..." : "Record Sale & Generate Bill"}
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        )}
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
