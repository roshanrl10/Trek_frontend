
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  const [formData, setFormData] = useState({
    guest: "",
    hotel: "",
    checkIn: "",
    checkOut: "",
    status: "pending",
    amount: ""
  });

  useEffect(() => {
    if (editingBooking) {
      setFormData({
        guest: editingBooking.guest,
        hotel: editingBooking.hotel,
        checkIn: editingBooking.checkIn,
        checkOut: editingBooking.checkOut,
        status: editingBooking.status,
        amount: editingBooking.amount
      });
    } else {
      setFormData({
        guest: "",
        hotel: "",
        checkIn: "",
        checkOut: "",
        status: "pending",
        amount: ""
      });
    }
  }, [editingBooking]);

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
            {editingBooking ? "Edit Booking" : "Add New Booking"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="guest">Guest Name</Label>
            <Input
              id="guest"
              value={formData.guest}
              onChange={(e) => setFormData({ ...formData, guest: e.target.value })}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="hotel">Hotel</Label>
            <Input
              id="hotel"
              value={formData.hotel}
              onChange={(e) => setFormData({ ...formData, hotel: e.target.value })}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="checkIn">Check-in Date</Label>
            <Input
              id="checkIn"
              type="date"
              value={formData.checkIn}
              onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="checkOut">Check-out Date</Label>
            <Input
              id="checkOut"
              type="date"
              value={formData.checkOut}
              onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="e.g., $450"
              required
            />
          </div>
          
          <div className="flex justify-end gap-2">
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
