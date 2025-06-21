
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const RentalManagement = () => {
  const [rentals] = useState([
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
    },
    {
      id: "RT003",
      customer: "Carol Davis",
      equipment: "Backpack Set",
      quantity: 1,
      rentDate: "2024-01-10",
      returnDate: "2024-01-17",
      status: "returned",
      amount: "$35"
    }
  ]);

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
        <h3 className="text-lg font-semibold">Equipment Rentals</h3>
        <Button size="sm">Add Rental</Button>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
