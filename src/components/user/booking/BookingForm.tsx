
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingBooking: Booking | null;
  onSubmit: (formData: Omit<Booking, 'id'>) => void;
}

export const BookingForm = ({ isOpen, onClose, editingBooking, onSubmit }: BookingFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    guest: editingBooking?.guest || "",
    hotel: editingBooking?.hotel || "",
    checkIn: editingBooking?.checkIn || "",
    checkOut: editingBooking?.checkOut || "",
    status: editingBooking?.status || "pending",
    amount: editingBooking?.amount || ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {editingBooking ? "Update" : "Create"} Booking
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
