"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, ShoppingCart, Search, ImageIcon } from "lucide-react"
import axios from "axios"

const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

interface Mobile {
  m02_id: number;
  m02_model_name: string;
  m02_brand: string;
  m02_imei: string;
  m02_country: string;
  m02_color: string;
  m02_varient: string;
  m02_battery: string;
  m02_purchase_price: string;
  m02_selling_price: string;
  m02_photos: string[];
  m02_notes: string;
  m02_status: string;
  m02_m01_user_id: number | null;
  m02_care_warrenty: string;
  m02_purchase_date: string;
  m02_selling_date: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data: {
    mobiles: Mobile[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export default function MobilesPage() {
  const [mobiles, setMobiles] = useState<Mobile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSellDialogOpen, setIsSellDialogOpen] = useState(false);
  const [selectedMobile, setSelectedMobile] = useState<Mobile | null>(null);
  const [isGeneratingBill, setIsGeneratingBill] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editMobile, setEditMobile] = useState<Mobile | null>(null);

  useEffect(() => {
    fetchMobiles();
  }, []);

  const fetchMobiles = async () => {
    try {
      const response = await axios.get<ApiResponse>(`${apiUrl}/mobiles`);
      setMobiles(response.data.data.mobiles);
    } catch (error) {
      console.error("Error fetching mobiles:", error);
    }
  };

  const handleAddMobile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      m02_model_name: formData.get("model") as string,
      m02_brand: formData.get("brand") as string,
      m02_imei: formData.get("imei") as string,
      m02_country: formData.get("country") as string,
      m02_color: formData.get("color") as string,
      m02_varient: formData.get("variant") as string,
      m02_battery: formData.get("battery") as string,
      m02_purchase_price: formData.get("purchase-price") as string,
      m02_selling_price: formData.get("selling-price") as string,
      m02_notes: formData.get("notes") as string,
      m02_photos: Array.from(formData.getAll("image") as unknown as FileList).map(file => file.name),
      m02_status: "In Stock" as const,
      m02_care_warrenty: "3 Month" as const,
      m02_purchase_date: new Date().toISOString(),
    };
    try {
      await axios.post(`${apiUrl}/mobiles`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setIsAddDialogOpen(false);
      fetchMobiles();
    } catch (error) {
      console.error("Error adding mobile:", error);
    }
  };

  const handleEditMobile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editMobile) return;
    const formData = new FormData(e.currentTarget);
    const data = {
      m02_model_name: formData.get("model") as string,
      m02_brand: formData.get("brand") as string,
      m02_imei: formData.get("imei") as string,
      m02_country: formData.get("country") as string,
      m02_color: formData.get("color") as string,
      m02_varient: formData.get("variant") as string,
      m02_battery: formData.get("battery") as string,
      m02_purchase_price: formData.get("purchase-price") as string,
      m02_selling_price: formData.get("selling-price") as string,
      m02_notes: formData.get("notes") as string,
      m02_photos: Array.from(formData.getAll("image") as unknown as FileList).map(file => file.name),
      m02_status: formData.get("status") as string,
      m02_care_warrenty: formData.get("care-warrenty") as string,
      m02_purchase_date: formData.get("purchase-date") as string,
    };
    try {
      await axios.put(`${apiUrl}/mobiles/${editMobile.m02_id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setIsEditDialogOpen(false);
      fetchMobiles();
    } catch (error) {
      console.error("Error editing mobile:", error);
    }
  };

  const handleSellMobile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedMobile) return;
    const formData = new FormData(e.currentTarget);
    const data = {
      m02_status: "SOLD" as const,
      m02_selling_date: formData.get("sale-date") as string,
      m02_notes: formData.get("sale-notes") as string,
    };
    try {
      await axios.put(`${apiUrl}/mobiles/${selectedMobile.m02_id}`, data);
      setIsSellDialogOpen(false);
      fetchMobiles();
    } catch (error) {
      console.error("Error selling mobile:", error);
    }
  };

  const filteredMobiles = mobiles.filter(
    (mobile) =>
      mobile.m02_model_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mobile.m02_brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mobile.m02_imei.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mobile.m02_color.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mobile.m02_varient.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Mobile</DialogTitle>
              <DialogDescription>Add a new mobile device to your inventory.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddMobile} className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="model">Model Name</Label>
                  <Input id="model" name="model" placeholder="S24" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Select name="brand">
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="samsung">Samsung</SelectItem>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="google">Google</SelectItem>
                      <SelectItem value="oneplus">OnePlus</SelectItem>
                      <SelectItem value="Xiaomi">Xiaomi</SelectItem>
                      <SelectItem value="Others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="imei">IMEI Number</Label>
                  <Input id="imei" name="imei" placeholder="354267930064073" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="country">Country of Origin</Label>
                  <Input id="country" name="country" placeholder="India" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="color">Color</Label>
                  <Input id="color" name="color" placeholder="Cream" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="variant">Variant (Storage/RAM)</Label>
                  <Input id="variant" name="variant" placeholder="8/256" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="battery">Battery Health</Label>
                  <Input id="battery" name="battery" placeholder="100" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">Device Image</Label>
                  <div className="flex items-center gap-2">
                    <Input id="image" name="image" type="file" accept="image/*" multiple />
                    <Button type="button" variant="outline" size="icon">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="purchase-price">Purchase Price</Label>
                  <Input id="purchase-price" name="purchase-price" type="number" placeholder="36500" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="selling-price">Selling Price</Label>
                  <Input id="selling-price" name="selling-price" type="number" placeholder="36500" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" name="notes" placeholder="Full Kit" />
              </div>
              <DialogFooter>
                <Button type="submit">Add Mobile</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

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
                  <TableRow key={mobile.m02_id}>
                    <TableCell>
                      <img
                        src={mobile.m02_photos && mobile.m02_photos.length > 0 ? mobile.m02_photos[0] : "/placeholder.svg"}
                        alt={mobile.m02_model_name}
                        className="w-10 h-10 object-cover rounded-md"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div>{mobile.m02_model_name}</div>
                      <div className="text-xs text-gray-500">{mobile.m02_brand}</div>
                    </TableCell>
                    <TableCell>{mobile.m02_imei}</TableCell>
                    <TableCell>{mobile.m02_varient}</TableCell>
                    <TableCell>{mobile.m02_color}</TableCell>
                    <TableCell>₹{mobile.m02_purchase_price}</TableCell>
                    <TableCell>₹{mobile.m02_selling_price}</TableCell>
                    <TableCell>
                      <Badge variant={mobile.m02_status === "In Stock" ? "default" : "secondary"}>{mobile.m02_status}</Badge>
                    </TableCell>
                    <TableCell>{new Date(mobile.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={async () => {
                          const response = await axios.get<ApiResponse>(`${apiUrl}/mobiles/${mobile.m02_id}`);
                          setEditMobile(response.data.data.mobiles[0]);
                          setIsEditDialogOpen(true);
                        }}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        {mobile.m02_status === "In Stock" && (
                          <Dialog open={isSellDialogOpen} onOpenChange={setIsSellDialogOpen}>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedMobile(mobile)}>
                                <ShoppingCart className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-h-[90vh] overflow-y-auto bg-white/80">
                              <DialogHeader>
                                <DialogTitle>Sell Mobile & Generate Bill</DialogTitle>
                                <DialogDescription>
                                  Record a sale and generate bill for {selectedMobile?.m02_model_name}
                                </DialogDescription>
                              </DialogHeader>
                              <form onSubmit={handleSellMobile} className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="customer-name">Customer Name</Label>
                                    <Input id="customer-name" name="customer-name" placeholder="John Doe" />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="customer-phone">Customer Phone</Label>
                                    <Input id="customer-phone" name="customer-phone" placeholder="+1 234 567 8900" />
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="sale-price">Sale Price</Label>
                                    <Input id="sale-price" name="sale-price" type="number" placeholder={selectedMobile?.m02_selling_price} />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                                    <Input id="tax-rate" name="tax-rate" type="number" placeholder="8" defaultValue="8" />
                                  </div>
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="sale-date">Sale Date</Label>
                                  <Input
                                    id="sale-date"
                                    name="sale-date"
                                    type="date"
                                    defaultValue={new Date().toISOString().split("T")[0]}
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="sale-notes">Sale Notes</Label>
                                  <Textarea id="sale-notes" name="sale-notes" placeholder="Any notes about this sale..." />
                                </div>
                                <div className="border rounded-lg p-4 bg-gray-50">
                                  <h4 className="font-medium mb-2">Bill Preview</h4>
                                  <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                      <span>Device Price:</span>
                                      <span>${selectedMobile?.m02_selling_price}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Tax (8%):</span>
                                     <span>${((parseFloat(selectedMobile?.m02_selling_price || "0") * 0.08).toFixed(2))}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold border-t pt-1">
                                      <span>Total:</span>
                                      <span>${((parseFloat(selectedMobile?.m02_selling_price || "0") * 1.08).toFixed(2))}</span>
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button
                                    type="submit"
                                    disabled={isGeneratingBill}
                                  >
                                    {isGeneratingBill ? "Generating Bill..." : "Record Sale & Generate Bill"}
                                  </Button>
                                </DialogFooter>
                              </form>
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Mobile</DialogTitle>
            <DialogDescription>Edit the details of the mobile device.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditMobile} className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="model">Model Name</Label>
                <Input id="model" name="model" defaultValue={editMobile?.m02_model_name || ""} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="brand">Brand</Label>
                <Select name="brand" defaultValue={editMobile?.m02_brand || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="samsung">Samsung</SelectItem>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="google">Google</SelectItem>
                    <SelectItem value="oneplus">OnePlus</SelectItem>
                    <SelectItem value="Xiaomi">Xiaomi</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="imei">IMEI Number</Label>
                <Input id="imei" name="imei" defaultValue={editMobile?.m02_imei || ""} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="country">Country of Origin</Label>
                <Input id="country" name="country" defaultValue={editMobile?.m02_country || ""} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="color">Color</Label>
                <Input id="color" name="color" defaultValue={editMobile?.m02_color || ""} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="variant">Variant (Storage/RAM)</Label>
                <Input id="variant" name="variant" defaultValue={editMobile?.m02_varient || ""} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="battery">Battery Health</Label>
                <Input id="battery" name="battery" defaultValue={editMobile?.m02_battery || ""} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Device Image</Label>
                <div className="flex items-center gap-2">
                  <Input id="image" name="image" type="file" accept="image/*" multiple />
                  <Button type="button" variant="outline" size="icon">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="purchase-price">Purchase Price</Label>
                <Input id="purchase-price" name="purchase-price" type="number" defaultValue={editMobile?.m02_purchase_price || ""} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="selling-price">Selling Price</Label>
                <Input id="selling-price" name="selling-price" type="number" defaultValue={editMobile?.m02_selling_price || ""} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea id="notes" name="notes" defaultValue={editMobile?.m02_notes || ""} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue={editMobile?.m02_status || "In Stock"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="In Stock">In Stock</SelectItem>
                    <SelectItem value="SOLD">SOLD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="care-warrenty">Care Warranty</Label>
                <Input id="care-warrenty" name="care-warrenty" defaultValue={editMobile?.m02_care_warrenty || ""} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="purchase-date">Purchase Date</Label>
              <Input id="purchase-date" name="purchase-date" type="date" defaultValue={editMobile?.m02_purchase_date ? new Date(editMobile.m02_purchase_date).toISOString().split("T")[0] : ""} />
            </div>
            <DialogFooter>
              <Button type="submit">Update Mobile</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}