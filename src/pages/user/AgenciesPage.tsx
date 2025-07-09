
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Users, Star, MapPin, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Agency {
  id: string;
  name: string;
  location: string;
  rating: number;
  guides: number;
  speciality: string;
  status: string;
  pricePerDay: number;
  image: string;
  description: string;
  languages: string[];
}

interface Guide {
  id: string;
  name: string;
  agency: string;
  experience: string;
  speciality: string;
  rating: number;
  languages: string;
  status: string;
  pricePerDay: number;
  image: string;
  description: string;
}

export const AgenciesPage = () => {
  const navigate = useNavigate();
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
      pricePerDay: 120,
      image: "/placeholder.svg",
      description: "Leading trekking agency with 20+ years of experience in high altitude expeditions.",
      languages: ["English", "Nepali", "Hindi", "Chinese"]
    },
    {
      id: "AG002",
      name: "Mountain Explorer Co.",
      location: "Pokhara",
      rating: 4.6,
      guides: 12,
      speciality: "Cultural Treks",
      status: "active",
      pricePerDay: 100,
      image: "/placeholder.svg",
      description: "Specialized in cultural trekking experiences and local community interaction.",
      languages: ["English", "Nepali", "German"]
    }
  ]);

  const [guides] = useState<Guide[]>([
    {
      id: "GD001",
      name: "Pemba Sherpa",
      agency: "Himalayan Adventures",
      experience: "12 years",
      speciality: "High Altitude",
      rating: 4.9,
      languages: "English, Nepali, Hindi",
      status: "available",
      pricePerDay: 80,
      image: "/placeholder.svg",
      description: "Experienced high altitude guide with multiple Everest summits."
    },
    {
      id: "GD002",
      name: "Tenzin Norbu",
      agency: "Mountain Explorer Co.",
      experience: "8 years",
      speciality: "Cultural Tours",
      rating: 4.7,
      languages: "English, Nepali",
      status: "available",
      pricePerDay: 70,
      image: "/placeholder.svg",
      description: "Cultural trek specialist with deep knowledge of local traditions."
    }
  ]);

  const [filteredAgencies, setFilteredAgencies] = useState<Agency[]>(agencies);
  const [filteredGuides, setFilteredGuides] = useState<Guide[]>(guides);
  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    speciality: ""
  });

  const [bookingForm, setBookingForm] = useState({
    type: "",
    id: "",
    startDate: "",
    endDate: "",
    groupSize: 1
  });

  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const applyFilters = () => {
    let filteredAg = agencies;
    let filteredGd = guides;

    if (filters.location) {
      filteredAg = filteredAg.filter(agency => 
        agency.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.minPrice) {
      filteredAg = filteredAg.filter(agency => agency.pricePerDay >= parseInt(filters.minPrice));
      filteredGd = filteredGd.filter(guide => guide.pricePerDay >= parseInt(filters.minPrice));
    }

    if (filters.maxPrice) {
      filteredAg = filteredAg.filter(agency => agency.pricePerDay <= parseInt(filters.maxPrice));
      filteredGd = filteredGd.filter(guide => guide.pricePerDay <= parseInt(filters.maxPrice));
    }

    if (filters.speciality) {
      filteredAg = filteredAg.filter(agency => 
        agency.speciality.toLowerCase().includes(filters.speciality.toLowerCase())
      );
      filteredGd = filteredGd.filter(guide => 
        guide.speciality.toLowerCase().includes(filters.speciality.toLowerCase())
      );
    }

    setFilteredAgencies(filteredAg);
    setFilteredGuides(filteredGd);
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      minPrice: "",
      maxPrice: "",
      speciality: ""
    });
    setFilteredAgencies(agencies);
    setFilteredGuides(guides);
  };

  const handleBooking = (type: string, id: string) => {
    setBookingForm({ ...bookingForm, type, id });
    setIsBookingOpen(true);
  };

  const submitBooking = () => {
    const item = bookingForm.type === "agency" 
      ? agencies.find(a => a.id === bookingForm.id)
      : guides.find(g => g.id === bookingForm.id);
    
    toast({
      title: "Booking Confirmed",
      description: `Your ${bookingForm.type} booking for ${item?.name} has been confirmed from ${bookingForm.startDate} to ${bookingForm.endDate}`,
    });
    setIsBookingOpen(false);
    setBookingForm({ type: "", id: "", startDate: "", endDate: "", groupSize: 1 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="border-b border-border/40 backdrop-blur-sm bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" onClick={() => navigate("/user-dashboard")} className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-xl font-bold">Agencies & Guides</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Filters Section */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Agencies & Guides</CardTitle>
            <CardDescription>Find the perfect agency or guide for your trekking adventure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Search by location"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="speciality">Speciality</Label>
                <Input
                  id="speciality"
                  placeholder="High Altitude, Cultural, etc."
                  value={filters.speciality}
                  onChange={(e) => setFilters({ ...filters, speciality: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="minPrice">Min Price ($/day)</Label>
                <Input
                  id="minPrice"
                  type="number"
                  placeholder="0"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="maxPrice">Max Price ($/day)</Label>
                <Input
                  id="maxPrice"
                  type="number"
                  placeholder="200"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                />
              </div>
              <div className="flex gap-2 items-end">
                <Button onClick={applyFilters}>Apply Filters</Button>
                <Button variant="outline" onClick={clearFilters}>Clear</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Agencies Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Trekking Agencies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgencies.map((agency) => (
              <Card key={agency.id} className="overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  <img 
                    src={agency.image} 
                    alt={agency.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                    ${agency.pricePerDay}/day
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{agency.name}</CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {agency.location}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{agency.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{agency.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Guides:</span>
                      <span className="font-medium">{agency.guides}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Speciality:</span>
                      <span className="font-medium text-blue-600">{agency.speciality}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {agency.languages.map((lang) => (
                        <Badge key={lang} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={() => handleBooking("agency", agency.id)}
                  >
                    Book Agency
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Guides Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Individual Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide) => (
              <Card key={guide.id} className="overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  <img 
                    src={guide.image} 
                    alt={guide.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                    ${guide.pricePerDay}/day
                  </Badge>
                  <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground">
                    {guide.status}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{guide.name}</CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Users className="w-3 h-3 mr-1" />
                        {guide.agency}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{guide.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{guide.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Experience:</span>
                      <span className="font-medium">{guide.experience}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Speciality:</span>
                      <span className="font-medium text-blue-600">{guide.speciality}</span>
                    </div>
                    <div className="text-sm">
                      <span>Languages: </span>
                      <span className="font-medium">{guide.languages}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={() => handleBooking("guide", guide.id)}
                    disabled={guide.status === "booked"}
                  >
                    {guide.status === "available" ? "Book Guide" : "Not Available"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {(filteredAgencies.length === 0 && filteredGuides.length === 0) && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No agencies or guides found matching your criteria.</p>
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book {bookingForm.type === "agency" ? "Agency" : "Guide"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={bookingForm.startDate}
                onChange={(e) => setBookingForm({ ...bookingForm, startDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={bookingForm.endDate}
                onChange={(e) => setBookingForm({ ...bookingForm, endDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="groupSize">Group Size</Label>
              <Select 
                value={bookingForm.groupSize.toString()} 
                onValueChange={(value) => setBookingForm({ ...bookingForm, groupSize: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num} people</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsBookingOpen(false)}>
                Cancel
              </Button>
              <Button onClick={submitBooking}>
                Confirm Booking
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
