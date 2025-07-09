
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Rental {
  id: string;
  customer: string;
  equipment: string;
  quantity: number;
  rentDate: string;
  returnDate: string;
  status: string;
  amount: string;
}

interface RentalFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingRental: Rental | null;
  onSubmit: (formData: Omit<Rental, 'id'>) => void;
}

export const RentalForm = ({ isOpen, onClose, editingRental, onSubmit }: RentalFormProps) => {
  const [formData, setFormData] = useState({
    customer: editingRental?.customer || "",
    equipment: editingRental?.equipment || "",
    quantity: editingRental?.quantity || 1,
    rentDate: editingRental?.rentDate || "",
    returnDate: editingRental?.returnDate || "",
    status: editingRental?.status || "active",
    amount: editingRental?.amount || ""
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
            {editingRental ? "Edit Rental" : "Rent New Equipment"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="customer">Customer Name</Label>
            <Input
              id="customer"
              value={formData.customer}
              onChange={(e) => setFormData(prev => ({ ...prev, customer: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="equipment">Equipment</Label>
            <Input
              id="equipment"
              value={formData.equipment}
              onChange={(e) => setFormData(prev => ({ ...prev, equipment: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="rentDate">Rent Date</Label>
            <Input
              id="rentDate"
              type="date"
              value={formData.rentDate}
              onChange={(e) => setFormData(prev => ({ ...prev, rentDate: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="returnDate">Return Date</Label>
            <Input
              id="returnDate"
              type="date"
              value={formData.returnDate}
              onChange={(e) => setFormData(prev => ({ ...prev, returnDate: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              placeholder="$45"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {editingRental ? "Update" : "Create"} Rental
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
