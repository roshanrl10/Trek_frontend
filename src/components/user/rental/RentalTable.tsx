
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";

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

interface RentalTableProps {
  rentals: Rental[];
  onEdit: (rental: Rental) => void;
  onDelete: (id: string) => void;
}

export const RentalTable = ({ rentals, onEdit, onDelete }: RentalTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-blue-100 text-blue-800";
      case "returned": return "bg-green-100 text-green-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
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
                  onClick={() => onEdit(rental)}
                >
                  <Pencil className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(rental.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
