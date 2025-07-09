
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BookingForm } from "./booking/BookingForm";
import { BookingTable } from "./booking/BookingTable";

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

  const handleSubmit = (formData: Omit<Booking, 'id'>) => {
    if (editingBooking) {
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
    
    setEditingBooking(null);
  };

  const handleEdit = (booking: Booking) => {
    setEditingBooking(booking);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setBookings(prev => prev.filter(booking => booking.id !== id));
    toast({
      title: "Booking Deleted",
      description: "The booking has been deleted successfully.",
    });
  };

  const resetForm = () => {
    setEditingBooking(null);
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
        </Dialog>
      </div>
      
      <BookingTable 
        bookings={bookings}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <BookingForm
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        editingBooking={editingBooking}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
