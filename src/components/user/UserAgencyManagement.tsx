
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, MapPin, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Agency {
  id: string;
  name: string;
  location: string;
  rating: number;
  guides: number;
  speciality: string;
  status: string;
  bookings: number;
  pricePerDay: string;
}

interface Guide {
  id: string;
  name: string;
  experience: string;
  speciality: string;
  rating: number;
  languages: string;
  status: string;
  agency: string;
  pricePerDay: string;
}

export const UserAgencyManagement = () => {
  const { toast } = useToast();
  const [agencies] = useState<Agency[]>([
    {
      id: "AG001",
      name: "Himalayan Adventures",
      location: "Kathmandu",
      rating: 4.8,
      guides: 15,
      speciality: "High Altitude Treks",
      status: "active",
      bookings: 45,
      pricePerDay: "$120"
    },
    {
      id: "AG002",
      name: "Mountain Explorer Co.",
      location: "Pokhara",
      rating: 4.6,
      guides: 12,
      speciality: "Cultural Treks",
      status: "active",
      bookings: 32,
      pricePerDay: "$100"
    }
  ]);

  const [guides] = useState<Guide[]>([
    {
      id: "GD001",
      name: "Pemba Sherpa",
      experience: "12 years",
      speciality: "High Altitude",
      rating: 4.9,
      languages: "English, Nepali, Hindi",
      status: "available",
      agency: "Himalayan Adventures",
      pricePerDay: "$80"
    },
    {
      id: "GD002",
      name: "Tenzin Norbu",
      experience: "8 years",
      speciality: "Cultural Tours",
      rating: 4.7,
      languages: "English, Nepali",
      status: "available",
      agency: "Mountain Explorer Co.",
      pricePerDay: "$70"
    }
  ]);

  const handleBookAgency = (agencyId: string) => {
    const agency = agencies.find(a => a.id === agencyId);
    toast({
      title: "Agency Booking",
      description: `Booking request sent to ${agency?.name}`,
    });
  };

  const handleBookGuide = (guideId: string) => {
    const guide = guides.find(g => g.id === guideId);
    toast({
      title: "Guide Booking",
      description: `Booking request sent to ${guide?.name}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "available": return "bg-green-100 text-green-800";
      case "busy": return "bg-yellow-100 text-yellow-800";
      case "booked": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Agencies Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Available Agencies</h3>
        
        <div className="grid gap-4">
          {agencies.map((agency) => (
            <Card key={agency.id} className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Users className="w-8 h-8 text-blue-500" />
                    <div>
                      <h4 className="font-semibold">{agency.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {agency.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {agency.rating}
                        </span>
                        <span>{agency.guides} guides</span>
                        <span className="font-medium text-green-600">{agency.pricePerDay}/day</span>
                      </div>
                      <p className="text-sm text-blue-600 mt-1">{agency.speciality}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(agency.status)}>
                      {agency.status}
                    </Badge>
                    <Button
                      size="sm"
                      onClick={() => handleBookAgency(agency.id)}
                    >
                      <Calendar className="w-3 h-3 mr-1" />
                      Book Agency
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Guides Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Available Guides</h3>
        
        <div className="grid gap-4">
          {guides.map((guide) => (
            <Card key={guide.id} className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                      {guide.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{guide.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <span>{guide.experience} experience</span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {guide.rating}
                        </span>
                        <span className="font-medium text-green-600">{guide.pricePerDay}/day</span>
                      </div>
                      <p className="text-sm text-blue-600 mt-1">{guide.speciality}</p>
                      <p className="text-xs text-muted-foreground">{guide.languages}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(guide.status)}>
                      {guide.status}
                    </Badge>
                    <Button
                      size="sm"
                      onClick={() => handleBookGuide(guide.id)}
                      disabled={guide.status === "booked"}
                    >
                      <Calendar className="w-3 h-3 mr-1" />
                      Book Guide
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
