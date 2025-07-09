
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RentalForm } from "./rental/RentalForm";
import { RentalTable } from "./rental/RentalTable";

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

export const UserRentalManagement = () => {
  const { toast } = useToast();
  const [rentals, setRentals] = useState<Rental[]>([
    {
      id: "RT001",
      customer: "Alice Brown",
      equipment: "Trekking Boots",
      quantity: 1,
      rentDate: "2024-01-15",
      returnDate: "2024-01-22",
      status: "active",
      amount: "$45"
    },
    {
      id: "RT002",
      customer: "Bob Wilson",
      equipment: "Sleeping Bag",
      quantity: 2,
      rentDate: "2024-01-18",
      returnDate: "2024-01-25",
      status: "active",
      amount: "$60"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRental, setEditingRental] = useState<Rental | null>(null);

  const handleSubmit = (formData: Omit<Rental, 'id'>) => {
    if (editingRental) {
      setRentals(prev => prev.map(rental => 
        rental.id === editingRental.id 
          ? { ...rental, ...formData }
          : rental
      ));
      toast({
        title: "Rental Updated",
        description: "Your rental has been successfully updated.",
      });
    } else {
      const newRental: Rental = {
        id: `RT${String(rentals.length + 1).padStart(3, '0')}`,
        ...formData
      };
      setRentals(prev => [...prev, newRental]);
      toast({
        title: "Rental Created",
        description: "Your new rental has been created successfully.",
      });
    }
    
    setEditingRental(null);
  };

  const handleEdit = (rental: Rental) => {
    setEditingRental(rental);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setRentals(prev => prev.filter(rental => rental.id !== id));
    toast({
      title: "Rental Deleted",
      description: "The rental has been deleted successfully.",
    });
  };

  const resetForm = () => {
    setEditingRental(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">My Equipment Rentals</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Rent Equipment
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>
      
      <RentalTable 
        rentals={rentals}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <RentalForm
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        editingRental={editingRental}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
