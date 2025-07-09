
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
}

export const UserBookingManagement = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "BK001",
      guest: "John Doe",
      hotel: "Mountain View Lodge",
      checkIn: "2024-01-15",
      checkOut: "2024-01-18",
      status: "confirmed",
      amount: "$450"
    },
    {
      id: "BK002",
      guest: "Jane Smith",
      hotel: "Himalayan Resort",
      checkIn: "2024-01-20",
      checkOut: "2024-01-25",
      status: "pending",
      amount: "$890"
    }
  ]);

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
      // Update existing booking
      setBookings(prev => prev.map(booking => 
        booking.id === editingBooking.id 
          ? { ...booking, ...formData }
          : booking
      ));
      toast({
        title: "Booking Updated",
        description: "Your booking has been successfully updated.",
      });
    } else {
      // Create new booking
      const newBooking: Booking = {
        id: `BK${String(bookings.length + 1).padStart(3, '0')}`,
        ...formData
      };
      setBookings(prev => [...prev, newBooking]);
      toast({
        title: "Booking Created",
        description: "Your new booking has been created successfully.",
      });
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (booking: Booking) => {
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
    setBookings(prev => prev.filter(booking => booking.id !== id));
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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">My Bookings</h3>
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
                <Label htmlFor="hotel">Hotel</Label>
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
            <TableHead>Hotel</TableHead>
            <TableHead>Check-in</TableHead>
            <TableHead>Status</TableHead>
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
              <TableCell>{booking.amount}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(booking)}
                  >
                    <Pencil className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(booking.id)}
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
