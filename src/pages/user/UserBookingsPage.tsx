
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Hotel, Package, Users, Calendar } from "lucide-react";

interface Booking {
  id: string;
  type: 'hotel' | 'equipment' | 'guide';
  item: string;
  date: string;
  status: string;
  amount: string;
  details: string;
}

export const UserBookingsPage = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("user");
  
  // Filter bookings by current user
  const [userBookings] = useState<Booking[]>([
    {
      id: "BK001",
      type: "hotel",
      item: "Mountain View Lodge",
      date: "2024-01-15",
      status: "confirmed",
      amount: "$450",
      details: "3 nights, 2 guests"
    },
    {
      id: "RT001",
      type: "equipment",
      item: "Trekking Boots",
      date: "2024-01-15",
      status: "active",
      amount: "$45",
      details: "7 days rental"
    },
    {
      id: "GD001",
      type: "guide",
      item: "Mountain Guide - Raj",
      date: "2024-01-20",
      status: "pending",
      amount: "$300",
      details: "5 days guided trek"
    },
    {
      id: "BK002",
      type: "hotel",
      item: "Himalayan Resort",
      date: "2024-02-01",
      status: "pending",
      amount: "$600",
      details: "5 nights, 2 guests"
    },
    {
      id: "RT002",
      type: "equipment",
      item: "Sleeping Bag",
      date: "2024-01-28",
      status: "returned",
      amount: "$60",
      details: "10 days rental"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "active": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "returned": return "bg-gray-100 text-gray-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "hotel": return <Hotel className="w-4 h-4" />;
      case "equipment": return <Package className="w-4 h-4" />;
      case "guide": return <Users className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const hotelBookings = userBookings.filter(b => b.type === 'hotel');
  const equipmentBookings = userBookings.filter(b => b.type === 'equipment');
  const guideBookings = userBookings.filter(b => b.type === 'guide');

  const totalSpent = userBookings.reduce((sum, booking) => {
    return sum + parseInt(booking.amount.replace('$', ''));
  }, 0);

  const renderBookingTable = (bookings: Booking[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Item/Service</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Details</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell className="font-medium">{booking.id}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {getTypeIcon(booking.type)}
                {booking.item}
              </div>
            </TableCell>
            <TableCell>{booking.date}</TableCell>
            <TableCell className="text-muted-foreground">{booking.details}</TableCell>
            <TableCell>
              <Badge className={getStatusColor(booking.status)}>
                {booking.status}
              </Badge>
            </TableCell>
            <TableCell className="font-medium">{booking.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="border-b border-border/40 backdrop-blur-sm bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" onClick={() => navigate("/user-dashboard")} className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-xl font-bold">My Bookings</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userBookings.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Hotel Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{hotelBookings.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Equipment Rentals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{equipmentBookings.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalSpent}</div>
            </CardContent>
          </Card>
        </div>

        {/* User Info */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Logged in as: {userEmail}</CardDescription>
          </CardHeader>
        </Card>

        {/* Bookings Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Booking History</CardTitle>
            <CardDescription>View all your bookings and their current status</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All Bookings</TabsTrigger>
                <TabsTrigger value="hotels">Hotels</TabsTrigger>
                <TabsTrigger value="equipment">Equipment</TabsTrigger>
                <TabsTrigger value="guides">Guides</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {renderBookingTable(userBookings)}
              </TabsContent>

              <TabsContent value="hotels" className="space-y-4">
                {hotelBookings.length > 0 ? (
                  renderBookingTable(hotelBookings)
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No hotel bookings found.
                  </div>
                )}
              </TabsContent>

              <TabsContent value="equipment" className="space-y-4">
                {equipmentBookings.length > 0 ? (
                  renderBookingTable(equipmentBookings)
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No equipment rentals found.
                  </div>
                )}
              </TabsContent>

              <TabsContent value="guides" className="space-y-4">
                {guideBookings.length > 0 ? (
                  renderBookingTable(guideBookings)
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No guide bookings found.
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
