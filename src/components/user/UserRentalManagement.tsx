
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const [formData, setFormData] = useState({
    customer: "",
    equipment: "",
    quantity: 1,
    rentDate: "",
    returnDate: "",
    status: "active",
    amount: ""
  });

  const resetForm = () => {
    setFormData({
      customer: "",
      equipment: "",
      quantity: 1,
      rentDate: "",
      returnDate: "",
      status: "active",
      amount: ""
    });
    setEditingRental(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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
    
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (rental: Rental) => {
    setEditingRental(rental);
    setFormData({
      customer: rental.customer,
      equipment: rental.equipment,
      quantity: rental.quantity,
      rentDate: rental.rentDate,
      returnDate: rental.returnDate,
      status: rental.status,
      amount: rental.amount
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setRentals(prev => prev.filter(rental => rental.id !== id));
    toast({
      title: "Rental Deleted",
      description: "The rental has been deleted successfully.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-blue-100 text-blue-800";
      case "returned": return "bg-green-100 text-green-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
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
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingRental ? "Update" : "Create"} Rental
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
            <TableHead>Customer</TableHead>
            <TableHead>Equipment</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Return Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rentals.map((rental) => (
            <TableRow key={rental.id}>
              <TableCell className="font-medium">{rental.id}</TableCell>
              <TableCell>{rental.customer}</TableCell>
              <TableCell>{rental.equipment}</TableCell>
              <TableCell>{rental.quantity}</TableCell>
              <TableCell>{rental.returnDate}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(rental.status)}>
                  {rental.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(rental)}
                  >
                    <Pencil className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(rental.id)}
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
