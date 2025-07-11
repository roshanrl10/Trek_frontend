
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  id: string;
  guest: string;
  hotel: string;
  checkIn: string;
  checkOut: string;
  status: string;
  amount: string;
  type?: string;
  userEmail?: string;
  isDefault?: boolean;
}

export const BookingManagement = () => {
  const { toast } = useToast();
  
  // Get all bookings from localStorage and default bookings
  const getAllBookings = () => {
    const userBookings = JSON.parse(localStorage.getItem("userBookings") || "[]");
    const adminBookings = JSON.parse(localStorage.getItem("adminBookings") || "[]");
    const defaultBookings = [
      {
        id: "BK001",
        guest: "John Doe",
        hotel: "Mountain View Lodge",
        checkIn: "2024-01-15",
        checkOut: "2024-01-18",
        status: "confirmed",
        amount: "$450",
        type: "hotel",
        isDefault: true
      },
      {
        id: "BK002",
        guest: "Jane Smith",
        hotel: "Himalayan Resort",
        checkIn: "2024-01-20",
        checkOut: "2024-01-25",
        status: "pending",
        amount: "$890",
        type: "hotel",
        isDefault: true
      },
      {
        id: "BK003",
        guest: "Mike Johnson",
        hotel: "Base Camp Hotel",
        checkIn: "2024-01-22",
        checkOut: "2024-01-24",
        status: "confirmed",
        amount: "$320",
        type: "hotel",
        isDefault: true
      }
    ];
    
    // Convert user bookings to admin format
    const convertedUserBookings = userBookings.map((booking: any) => {
      if (booking.type === "hotel") {
        return {
          id: booking.id,
          guest: booking.userEmail || "User",
          hotel: booking.hotelName || "Unknown Hotel",
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
          status: booking.status,
          amount: `$${booking.totalPrice || 0}`,
          type: "hotel",
          userEmail: booking.userEmail
        };
      } else if (booking.type === "equipment") {
        return {
          id: booking.id,
          guest: booking.userEmail || "User",
          hotel: booking.equipmentName || "Unknown Equipment",
          checkIn: booking.startDate,
          checkOut: booking.endDate,
          status: booking.status,
          amount: `$${booking.dailyPrice || 0}/day`,
          type: "equipment",
          userEmail: booking.userEmail
        };
      } else if (booking.type === "trekking") {
        return {
          id: booking.id,
          guest: booking.userEmail || "User",
          hotel: booking.routeName || "Unknown Route",
          checkIn: booking.startDate,
          checkOut: booking.endDate,
          status: booking.status,
          amount: `$${booking.totalPrice || 0}`,
          type: "trekking",
          userEmail: booking.userEmail
        };
      }
      return booking;
    });
    
    return [...defaultBookings, ...adminBookings, ...convertedUserBookings];
  };

  const [bookings, setBookings] = useState<Booking[]>(getAllBookings());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [formData, setFormData] = useState({
    guest: "",
    hotel: "",
    checkIn: "",
    checkOut: "",
    status: "pending",
    amount: ""
  });

  // Update bookings when user makes new bookings
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedBookings = getAllBookings();
      if (updatedBookings.length !== bookings.length) {
        setBookings(updatedBookings);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [bookings.length]);

  const resetForm = () => {
    setFormData({
      guest: "",
      hotel: "",
      checkIn: "",
      checkOut: "",
      status: "pending",
      amount: ""
    });
    setEditingBooking(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingBooking) {
      if (editingBooking.isDefault) {
        // Can't edit default bookings
        toast({
          title: "Cannot Edit",
          description: "Default bookings cannot be modified.",
          variant: "destructive"
        });
        return;
      }

      // Update booking logic
      const updatedBookings = bookings.map(booking => 
        booking.id === editingBooking.id 
          ? { ...booking, ...formData }
          : booking
      );
      
      // Update localStorage for admin bookings
      const adminBookings = updatedBookings.filter(b => !b.isDefault && !b.userEmail);
      localStorage.setItem("adminBookings", JSON.stringify(adminBookings));
      
      setBookings(getAllBookings());
      toast({
        title: "Booking Updated",
        description: "The booking has been successfully updated.",
      });
    } else {
      const newBooking: Booking = {
        id: `ADM${Date.now()}`,
        ...formData,
        type: "hotel"
      };
      
      // Add to admin bookings
      const existingAdminBookings = JSON.parse(localStorage.getItem("adminBookings") || "[]");
      const updatedAdminBookings = [...existingAdminBookings, newBooking];
      localStorage.setItem("adminBookings", JSON.stringify(updatedAdminBookings));
      
      setBookings(getAllBookings());
      toast({
        title: "Booking Created",
        description: "New booking has been created successfully.",
      });
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (booking: Booking) => {
    if (booking.isDefault) {
      toast({
        title: "Cannot Edit",
        description: "Default bookings cannot be modified.",
        variant: "destructive"
      });
      return;
    }
    
    setEditingBooking(booking);
    setFormData({
      guest: booking.guest,
      hotel: booking.hotel,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      status: booking.status,
      amount: booking.amount
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const bookingToDelete = bookings.find(b => b.id === id);
    
    if (bookingToDelete?.isDefault) {
      toast({
        title: "Cannot Delete",
        description: "Default bookings cannot be deleted.",
        variant: "destructive"
      });
      return;
    }

    if (bookingToDelete?.userEmail) {
      // This is a user booking, remove from userBookings
      const userBookings = JSON.parse(localStorage.getItem("userBookings") || "[]");
      const updatedUserBookings = userBookings.filter((booking: any) => booking.id !== id);
      localStorage.setItem("userBookings", JSON.stringify(updatedUserBookings));
    } else {
      // This is an admin booking, remove from adminBookings
      const adminBookings = JSON.parse(localStorage.getItem("adminBookings") || "[]");
      const updatedAdminBookings = adminBookings.filter((booking: any) => booking.id !== id);
      localStorage.setItem("adminBookings", JSON.stringify(updatedAdminBookings));
    }

    setBookings(getAllBookings());
    toast({
      title: "Booking Deleted",
      description: "The booking has been deleted successfully.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type?: string) => {
    switch (type) {
      case "hotel": return "bg-blue-100 text-blue-800";
      case "trekking": return "bg-green-100 text-green-800";
      case "equipment": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">All Bookings ({bookings.length})</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Booking
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingBooking ? "Edit Booking" : "Create New Booking"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="guest">Guest Name</Label>
                <Input
                  id="guest"
                  value={formData.guest}
                  onChange={(e) => setFormData(prev => ({ ...prev, guest: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="hotel">Hotel/Service</Label>
                <Input
                  id="hotel"
                  value={formData.hotel}
                  onChange={(e) => setFormData(prev => ({ ...prev, hotel: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="checkIn">Check-in Date</Label>
                <Input
                  id="checkIn"
                  type="date"
                  value={formData.checkIn}
                  onChange={(e) => setFormData(prev => ({ ...prev, checkIn: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="checkOut">Check-out Date</Label>
                <Input
                  id="checkOut"
                  type="date"
                  value={formData.checkOut}
                  onChange={(e) => setFormData(prev => ({ ...prev, checkOut: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                  placeholder="$450"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingBooking ? "Update" : "Create"} Booking
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Guest</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Check-in</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">{booking.id}</TableCell>
              <TableCell>{booking.guest}</TableCell>
              <TableCell>{booking.hotel}</TableCell>
              <TableCell>{booking.checkIn}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(booking.status)}>
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getTypeColor(booking.type)}>
                  {booking.type || 'hotel'}
                </Badge>
              </TableCell>
              <TableCell>{booking.amount}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(booking)}
                    disabled={booking.isDefault}
                  >
                    <Pencil className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(booking.id)}
                    disabled={booking.isDefault}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
