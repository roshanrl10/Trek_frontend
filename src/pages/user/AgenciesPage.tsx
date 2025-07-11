
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, MapPin, Star, Users, Award, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Agency {
  id: string;
  name: string;
  location: string;
  pricePerDay: number;
  rating: number;
  image: string;
  languages: string[];
  specialties: string[];
  description: string;
  available: boolean;
  experience: number; // years
  groupSize: string;
}

export const AgenciesPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const userEmail = localStorage.getItem("user");
  
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [filteredAgencies, setFilteredAgencies] = useState<Agency[]>([]);
  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    minRating: "any",
    specialty: "any"
  });

  const [bookingForm, setBookingForm] = useState({
    agencyId: "",
    startDate: "",
    endDate: "",
    groupSize: 1,
    specialRequests: ""
  });

  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Load agencies from localStorage (admin-added) and default agencies
  useEffect(() => {
    const adminAgencies = JSON.parse(localStorage.getItem("adminAgencies") || "[]");
    const defaultAgencies = [
      {
        id: "A001",
        name: "Himalayan Adventure Guides",
        location: "Everest Base Camp",
        pricePerDay: 150,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1464822759844-d150ad6d1a0e?auto=format&fit=crop&w=400&h=300",
        languages: ["English", "Nepali", "Hindi"],
        specialties: ["High Altitude Trekking", "Mountaineering", "Cultural Tours"],
        description: "Expert guides with over 15 years of experience in Himalayan expeditions. Certified by Nepal Mountaineering Association.",
        available: true,
        experience: 15,
        groupSize: "1-12 people"
      },
      {
        id: "A002",
        name: "Sherpa Expedition Services",
        location: "Annapurna",
        pricePerDay: 120,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&h=300",
        languages: ["English", "Nepali"],
        specialties: ["Trekking", "Photography Tours", "Wildlife Viewing"],
        description: "Local Sherpa guides offering authentic mountain experiences with focus on safety and cultural immersion.",
        available: true,
        experience: 12,
        groupSize: "1-8 people"
      },
      {
        id: "A003",
        name: "Peak Adventure Company",
        location: "Langtang Valley",
        pricePerDay: 100,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=400&h=300",
        languages: ["English", "Nepali", "German"],
        specialties: ["Eco-Tourism", "Family Trekking", "Photography"],
        description: "Eco-friendly trekking agency specializing in sustainable tourism and family-friendly adventures.",
        available: true,
        experience: 8,
        groupSize: "1-15 people"
      },
      {
        id: "A004",
        name: "Alpine Masters Guides",
        location: "Everest Base Camp",
        pricePerDay: 200,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&w=400&h=300",
        languages: ["English", "French", "German", "Nepali"],
        specialties: ["Technical Climbing", "High Altitude Training", "Rescue Operations"],
        description: "Elite mountain guides certified in technical climbing and high-altitude rescue operations.",
        available: true,
        experience: 20,
        groupSize: "1-6 people"
      }
    ];

    const allAgencies = [...defaultAgencies, ...adminAgencies];
    setAgencies(allAgencies);
    setFilteredAgencies(allAgencies);
  }, []);

  const applyFilters = () => {
    let filtered = agencies;

    if (filters.location) {
      filtered = filtered.filter(agency => 
        agency.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(agency => agency.pricePerDay >= parseInt(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(agency => agency.pricePerDay <= parseInt(filters.maxPrice));
    }

    if (filters.minRating && filters.minRating !== "any") {
      filtered = filtered.filter(agency => agency.rating >= parseFloat(filters.minRating));
    }

    if (filters.specialty && filters.specialty !== "any") {
      filtered = filtered.filter(agency => 
        agency.specialties.some(specialty => 
          specialty.toLowerCase().includes(filters.specialty.toLowerCase())
        )
      );
    }

    setFilteredAgencies(filtered);
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      minPrice: "",
      maxPrice: "",
      minRating: "any",
      specialty: "any"
    });
    setFilteredAgencies(agencies);
  };

  const handleBooking = (agencyId: string) => {
    setBookingForm({ ...bookingForm, agencyId });
    setIsBookingOpen(true);
  };

  const submitBooking = () => {
    const agency = agencies.find(a => a.id === bookingForm.agencyId);
    
    // Calculate duration and total price
    const startDate = new Date(bookingForm.startDate);
    const endDate = new Date(bookingForm.endDate);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = agency ? agency.pricePerDay * days : 0;
    
    // Save booking to localStorage
    const existingBookings = JSON.parse(localStorage.getItem("userBookings") || "[]");
    const newBooking = {
      id: `AG${Date.now()}`,
      type: "agency",
      userEmail: userEmail,
      agencyId: bookingForm.agencyId,
      agencyName: agency?.name,
      startDate: bookingForm.startDate,
      endDate: bookingForm.endDate,
      groupSize: bookingForm.groupSize,
      specialRequests: bookingForm.specialRequests,
      dailyPrice: agency?.pricePerDay,
      totalPrice: totalPrice,
      status: "confirmed",
      bookingDate: new Date().toISOString().split('T')[0]
    };
    
    const updatedBookings = [...existingBookings, newBooking];
    localStorage.setItem("userBookings", JSON.stringify(updatedBookings));

    toast({
      title: "Booking Confirmed",
      description: `Your booking with ${agency?.name} has been confirmed for ${days} days`,
    });
    setIsBookingOpen(false);
    setBookingForm({ agencyId: "", startDate: "", endDate: "", groupSize: 1, specialRequests: "" });
  };

  // Get unique specialties for filter options
  const uniqueSpecialties = [...new Set(agencies.flatMap(agency => agency.specialties))];

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
            <CardTitle>Find Your Perfect Guide</CardTitle>
            <CardDescription>Connect with certified trekking agencies and professional guides</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
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
                <Label htmlFor="specialty">Specialty</Label>
                <Select value={filters.specialty} onValueChange={(value) => setFilters({ ...filters, specialty: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Specialty</SelectItem>
                    {uniqueSpecialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  placeholder="500"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="minRating">Min Rating</Label>
                <Select value={filters.minRating} onValueChange={(value) => setFilters({ ...filters, minRating: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Rating</SelectItem>
                    <SelectItem value="3">3+ Stars</SelectItem>
                    <SelectItem value="4">4+ Stars</SelectItem>
                    <SelectItem value="4.5">4.5+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 items-end">
                <Button onClick={applyFilters}>Apply Filters</Button>
                <Button variant="outline" onClick={clearFilters}>Clear</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Agencies Grid */}
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
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">{agency.experience} years experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{agency.groupSize}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">{agency.languages.join(", ")}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {agency.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={() => handleBooking(agency.id)}
                  disabled={!agency.available}
                >
                  {agency.available ? "Book Now" : "Not Available"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAgencies.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No agencies found matching your criteria.</p>
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
            <DialogTitle>Book Agency/Guide</DialogTitle>
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
                  <SelectItem value="1">1 Person</SelectItem>
                  <SelectItem value="2">2 People</SelectItem>
                  <SelectItem value="3">3 People</SelectItem>
                  <SelectItem value="4">4 People</SelectItem>
                  <SelectItem value="5">5 People</SelectItem>
                  <SelectItem value="6">6 People</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="specialRequests">Special Requests</Label>
              <Input
                id="specialRequests"
                placeholder="Any special requirements..."
                value={bookingForm.specialRequests}
                onChange={(e) => setBookingForm({ ...bookingForm, specialRequests: e.target.value })}
              />
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
