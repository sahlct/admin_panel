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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Search, Edit, Trash2, Eye, ImageIcon } from "lucide-react"
import Link from "next/link"

const users = [
  {
    m01_id: 1,
    m01_name: "John Doe",
    m01_contact_number: 1234567890,
    m01_email: "john.doe@email.com",
    m01_place: "New York, NY",
    m01_profile_photo: "/placeholder.svg?height=100&width=100",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    totalPurchases: 2,
    totalSpent: 1848,
    lastPurchase: "2024-01-20",
  },
  {
    m01_id: 2,
    m01_name: "Jane Smith",
    m01_contact_number: 9876543210,
    m01_email: "jane.smith@email.com",
    m01_place: "Los Angeles, CA",
    m01_profile_photo: "/placeholder.svg?height=100&width=100",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-22",
    totalPurchases: 1,
    totalSpent: 849,
    lastPurchase: "2024-01-22",
  },
  {
    m01_id: 3,
    m01_name: "Mike Johnson",
    m01_contact_number: 5555555555,
    m01_email: "mike.johnson@email.com",
    m01_place: "Chicago, IL",
    m01_profile_photo: "/placeholder.svg?height=100&width=100",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-25",
    totalPurchases: 3,
    totalSpent: 1274,
    lastPurchase: "2024-01-25",
  },
  {
    m01_id: 4,
    m01_name: "Sarah Wilson",
    m01_contact_number: 7777777777,
    m01_email: "sarah.wilson@email.com",
    m01_place: "Houston, TX",
    m01_profile_photo: "/placeholder.svg?height=100&width=100",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-18",
    totalPurchases: 2,
    totalSpent: 145,
    lastPurchase: "2024-01-18",
  },
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)

  const filteredUsers = users.filter(
    (user) =>
      user.m01_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.m01_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.m01_place.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.m01_contact_number.toString().includes(searchTerm),
  )

  const handleEditUser = (user: any) => {
    setSelectedUser(user)
    setIsEditDialogOpen(true)
  }

  const handleDeleteUser = (userId: number) => {
    // In a real application, this would make an API call to delete the user
    console.log("Deleting user:", userId)
    alert("User deleted successfully!")
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600">Manage customer accounts and view purchase history</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new customer account.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="user-name">Full Name</Label>
                <Input id="user-name" placeholder="John Doe" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="user-email">Email Address</Label>
                <Input id="user-email" type="email" placeholder="john.doe@email.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="user-contact">Contact Number</Label>
                <Input id="user-contact" type="tel" placeholder="1234567890" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="user-place">Location</Label>
                <Input id="user-place" placeholder="New York, NY" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="user-photo">Profile Photo</Label>
                <div className="flex items-center gap-2">
                  <Input id="user-photo" type="file" accept="image/*" />
                  <Button type="button" variant="outline" size="icon">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsAddDialogOpen(false)}>
                Add User
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
              placeholder="Search users by name, email, contact, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Database</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Profile</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Purchases</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Last Purchase</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.m01_id}>
                    <TableCell>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.m01_profile_photo || "/placeholder.svg"} alt={user.m01_name} />
                        <AvatarFallback>
                          {user.m01_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{user.m01_name}</TableCell>
                    <TableCell>{user.m01_contact_number}</TableCell>
                    <TableCell>{user.m01_email}</TableCell>
                    <TableCell>{user.m01_place}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.totalPurchases}</Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-green-600">${user.totalSpent}</TableCell>
                    <TableCell>{new Date(user.lastPurchase).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link href={`/dashboard/users/${user.m01_id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the user account and all
                                associated data.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteUser(user.m01_id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update customer information.</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-user-name">Full Name</Label>
                <Input id="edit-user-name" defaultValue={selectedUser.m01_name} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-user-email">Email Address</Label>
                <Input id="edit-user-email" type="email" defaultValue={selectedUser.m01_email} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-user-contact">Contact Number</Label>
                <Input id="edit-user-contact" type="tel" defaultValue={selectedUser.m01_contact_number.toString()} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-user-place">Location</Label>
                <Input id="edit-user-place" defaultValue={selectedUser.m01_place} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-user-photo">Profile Photo</Label>
                <div className="flex items-center gap-2">
                  <Input id="edit-user-photo" type="file" accept="image/*" />
                  <Button type="button" variant="outline" size="icon">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" onClick={() => setIsEditDialogOpen(false)}>
              Update User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
