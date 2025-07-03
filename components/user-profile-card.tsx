"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Calendar } from "lucide-react"

interface UserProfileCardProps {
  user: {
    m01_id: number
    m01_name: string
    m01_contact_number: number
    m01_email: string
    m01_place: string
    m01_profile_photo?: string
    createdAt: string
    totalPurchases?: number
    totalSpent?: number
  }
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.m01_profile_photo || "/placeholder.svg"} alt={user.m01_name} />
            <AvatarFallback className="text-lg">
              {user.m01_name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{user.m01_name}</h3>
              <Badge variant="outline">ID: #{user.m01_id}</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                <span>{user.m01_contact_number}</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                <span>{user.m01_email}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{user.m01_place}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Since {new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            {(user.totalPurchases !== undefined || user.totalSpent !== undefined) && (
              <div className="flex gap-4 pt-2">
                {user.totalPurchases !== undefined && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Purchases</p>
                    <p className="font-semibold">{user.totalPurchases}</p>
                  </div>
                )}
                {user.totalSpent !== undefined && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Total Spent</p>
                    <p className="font-semibold text-green-600">${user.totalSpent}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
