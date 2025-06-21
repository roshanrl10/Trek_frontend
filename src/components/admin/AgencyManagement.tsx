
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Star, Users, MapPin } from "lucide-react";

export const AgencyManagement = () => {
  const [agencies] = useState([
    {
      id: "AG001",
      name: "Himalayan Adventures",
      location: "Kathmandu",
      rating: 4.8,
      guides: 15,
      speciality: "High Altitude Treks",
      status: "active",
      bookings: 45
    },
    {
      id: "AG002",
      name: "Mountain Explorer Co.",
      location: "Pokhara",
      rating: 4.6,
      guides: 12,
      speciality: "Cultural Treks",
      status: "active",
      bookings: 32
    },
    {
      id: "AG003",
      name: "Peak Trekking Services",
      location: "Lukla",
      rating: 4.9,
      guides: 8,
      speciality: "Everest Region",
      status: "pending",
      bookings: 18
    }
  ]);

  const [guides] = useState([
    {
      id: "GD001",
      name: "Pemba Sherpa",
      experience: "12 years",
      speciality: "High Altitude",
      rating: 4.9,
      languages: "English, Nepali, Hindi",
      status: "available",
      agency: "Himalayan Adventures"
    },
    {
      id: "GD002",
      name: "Tenzin Norbu",
      experience: "8 years",
      speciality: "Cultural Tours",
      rating: 4.7,
      languages: "English, Nepali",
      status: "booked",
      agency: "Mountain Explorer Co."
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "available": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "booked": return "bg-blue-100 text-blue-800";
      case "inactive": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Agencies Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Registered Agencies</h3>
          <Button size="sm">Add Agency</Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agency</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Guides</TableHead>
              <TableHead>Speciality</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Bookings</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agencies.map((agency) => (
              <TableRow key={agency.id}>
                <TableCell className="font-medium">{agency.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {agency.location}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {agency.rating}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {agency.guides}
                  </div>
                </TableCell>
                <TableCell>{agency.speciality}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(agency.status)}>
                    {agency.status}
                  </Badge>
                </TableCell>
                <TableCell>{agency.bookings}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Guides Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Registered Guides</h3>
          <Button size="sm">Add Guide</Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Guide</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Speciality</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Languages</TableHead>
              <TableHead>Agency</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {guides.map((guide) => (
              <TableRow key={guide.id}>
                <TableCell className="font-medium">{guide.name}</TableCell>
                <TableCell>{guide.experience}</TableCell>
                <TableCell>{guide.speciality}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {guide.rating}
                  </div>
                </TableCell>
                <TableCell>{guide.languages}</TableCell>
                <TableCell>{guide.agency}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(guide.status)}>
                    {guide.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
