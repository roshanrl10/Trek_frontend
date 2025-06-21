
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const BookingManagement = () => {
  const [bookings] = useState([
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
    },
    {
      id: "BK003",
      guest: "Mike Johnson",
      hotel: "Base Camp Hotel",
      checkIn: "2024-01-22",
      checkOut: "2024-01-24",
      status: "confirmed",
      amount: "$320"
    }
  ]);

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
        <h3 className="text-lg font-semibold">Recent Bookings</h3>
        <Button size="sm">Add Booking</Button>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
