import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Hotel, Package, Calendar, MapPin, User } from "lucide-react";

interface Booking {
  id: string;
  type: "hotel" | "equipment" | "trekking";
  userEmail: string;
  hotelId?: string;
  hotelName?: string;
  equipmentId?: string;
  equipmentName?: string;
  routeId?: string;
  routeName?: string;
  checkIn?: string;
  checkOut?: string;
  startDate?: string;
  endDate?: string;
  guests?: number;
  quantity?: number;
  size?: string;
  totalPrice?: number;
  dailyPrice?: number;
  status: string;
  bookingDate: string;
}

export const UserBookingsPage = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("user");
  const [bookings, setBookings] = useState<Booking[]>([]);

  const loadBookings = () => {
    // Load user's bookings from localStorage
    const allBookings = JSON.parse(localStorage.getItem("userBookings") || "[]");
    const userBookings = allBookings.filter((booking: Booking) => booking.userEmail === userEmail);
    setBookings(userBookings);
  };

  useEffect(() => {
    loadBookings();
    
    // Set up interval to check for changes (in case admin deletes bookings)
    const interval = setInterval(() => {
      loadBookings();
    }, 2000);

    return () => clearInterval(interval);
  }, [userEmail]);

  const hotelBookings = bookings.filter(booking => booking.type === "hotel");
  const equipmentBookings = bookings.filter(booking => booking.type === "equipment");
  const trekkingBookings = bookings.filter(booking => booking.type === "trekking");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      case "completed": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleCancelBooking = (bookingId: string) => {
    const allBookings = JSON.parse(localStorage.getItem("userBookings") || "[]");
    const updatedBookings = allBookings.map((booking: Booking) => 
      booking.id === bookingId ? { ...booking, status: "cancelled" } : booking
    );
    localStorage.setItem("userBookings", JSON.stringify(updatedBookings));
    loadBookings();
  };

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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Your Bookings
            </CardTitle>
            <CardDescription>
              View and manage all your hotel bookings, equipment rentals, and trekking adventures
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Bookings ({bookings.length})</TabsTrigger>
                <TabsTrigger value="hotels">Hotels ({hotelBookings.length})</TabsTrigger>
                <TabsTrigger value="equipment">Equipment ({equipmentBookings.length})</TabsTrigger>
                <TabsTrigger value="trekking">Trekking ({trekkingBookings.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="grid gap-4">
                  {bookings.length === 0 ? (
                    <Card>
                      <CardContent className="text-center py-8">
                        <p className="text-muted-foreground">You haven't made any bookings yet.</p>
                        <div className="flex gap-2 justify-center mt-4">
                          <Button onClick={() => navigate("/user-dashboard/hotels")}>
                            Book Hotels
                          </Button>
                          <Button variant="outline" onClick={() => navigate("/user-dashboard/equipment")}>
                            Rent Equipment
                          </Button>
                          <Button variant="outline" onClick={() => navigate("/user-dashboard/maps")}>
                            Book Trekking
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    bookings.map((booking) => (
                      <Card key={booking.id}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {booking.type === "hotel" ? (
                                  <Hotel className="w-4 h-4 text-blue-500" />
                                ) : booking.type === "equipment" ? (
                                  <Package className="w-4 h-4 text-green-500" />
                                ) : (
                                  <MapPin className="w-4 h-4 text-purple-500" />
                                )}
                                <h3 className="font-semibold">
                                  {booking.type === "hotel" ? booking.hotelName : 
                                   booking.type === "equipment" ? booking.equipmentName : 
                                   booking.routeName}
                                </h3>
                                <Badge className={getStatusColor(booking.status)}>
                                  {booking.status}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>Booked: {booking.bookingDate}</span>
                                </div>
                                
                                {booking.type === "hotel" ? (
                                  <>
                                    <div>Check-in: {booking.checkIn}</div>
                                    <div>Check-out: {booking.checkOut}</div>
                                    <div>Guests: {booking.guests}</div>
                                  </>
                                ) : (
                                  <>
                                    <div>Start: {booking.startDate}</div>
                                    <div>End: {booking.endDate}</div>
                                    <div>
                                      {booking.type === "equipment" 
                                        ? `Quantity: ${booking.quantity}${booking.size ? ` (Size: ${booking.size})` : ''}`
                                        : `Participants: ${booking.quantity || 1}`
                                      }
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="font-semibold">
                                {booking.type === "hotel" || booking.type === "trekking" ? (
                                  `$${booking.totalPrice}`
                                ) : (
                                  `$${booking.dailyPrice}/day`
                                )}
                              </div>
                              {booking.type === "equipment" && booking.startDate && booking.endDate && (
                                <div className="text-sm text-muted-foreground">
                                  Total: ${(booking.dailyPrice || 0) * calculateDays(booking.startDate, booking.endDate)}
                                </div>
                              )}
                              {booking.status === "pending" && (
                                <Button 
                                  size="sm" 
                                  variant="destructive" 
                                  className="mt-2"
                                  onClick={() => handleCancelBooking(booking.id)}
                                >
                                  Cancel
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="hotels">
                <div className="grid gap-4">
                  {hotelBookings.length === 0 ? (
                    <Card>
                      <CardContent className="text-center py-8">
                        <Hotel className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No hotel bookings found.</p>
                        <Button onClick={() => navigate("/user-dashboard/hotels")} className="mt-4">
                          Book Hotels
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    hotelBookings.map((booking) => (
                      <Card key={booking.id}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Hotel className="w-4 h-4 text-blue-500" />
                                <h3 className="font-semibold">{booking.hotelName}</h3>
                                <Badge className={getStatusColor(booking.status)}>
                                  {booking.status}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>Booked: {booking.bookingDate}</span>
                                </div>
                                <div>Check-in: {booking.checkIn}</div>
                                <div>Check-out: {booking.checkOut}</div>
                                <div>Guests: {booking.guests}</div>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="font-semibold">${booking.totalPrice}</div>
                              <div className="text-sm text-muted-foreground">per night</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="equipment">
                <div className="grid gap-4">
                  {equipmentBookings.length === 0 ? (
                    <Card>
                      <CardContent className="text-center py-8">
                        <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No equipment rentals found.</p>
                        <Button onClick={() => navigate("/user-dashboard/equipment")} className="mt-4">
                          Rent Equipment
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    equipmentBookings.map((booking) => (
                      <Card key={booking.id}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Package className="w-4 h-4 text-green-500" />
                                <h3 className="font-semibold">{booking.equipmentName}</h3>
                                <Badge className={getStatusColor(booking.status)}>
                                  {booking.status}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>Booked: {booking.bookingDate}</span>
                                </div>
                                <div>Start: {booking.startDate}</div>
                                <div>End: {booking.endDate}</div>
                                <div>Qty: {booking.quantity}{booking.size && ` (Size: ${booking.size})`}</div>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="font-semibold">${booking.dailyPrice}/day</div>
                              {booking.startDate && booking.endDate && (
                                <div className="text-sm text-muted-foreground">
                                  Total: ${(booking.dailyPrice || 0) * calculateDays(booking.startDate, booking.endDate)}
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="trekking">
                <div className="grid gap-4">
                  {trekkingBookings.length === 0 ? (
                    <Card>
                      <CardContent className="text-center py-8">
                        <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No trekking bookings found.</p>
                        <Button onClick={() => navigate("/user-dashboard/maps")} className="mt-4">
                          Book Trekking
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    trekkingBookings.map((booking) => (
                      <Card key={booking.id}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <MapPin className="w-4 h-4 text-purple-500" />
                                <h3 className="font-semibold">{booking.routeName}</h3>
                                <Badge className={getStatusColor(booking.status)}>
                                  {booking.status}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>Booked: {booking.bookingDate}</span>
                                </div>
                                <div>Start: {booking.startDate}</div>
                                <div>End: {booking.endDate}</div>
                                <div>Participants: {booking.quantity || 1}</div>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="font-semibold">${booking.totalPrice}</div>
                              <div className="text-sm text-muted-foreground">total cost</div>
                              {booking.status === "pending" && (
                                <Button 
                                  size="sm" 
                                  variant="destructive" 
                                  className="mt-2"
                                  onClick={() => handleCancelBooking(booking.id)}
                                >
                                  Cancel
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
