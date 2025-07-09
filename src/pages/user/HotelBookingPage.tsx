
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, MapPin, Star, Wifi, Car, Coffee, Dumbbell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Hotel {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  amenities: string[];
  description: string;
  available: boolean;
}

export const HotelBookingPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const userEmail = localStorage.getItem("user");
  
  const [hotels] = useState<Hotel[]>([
    {
      id: "H001",
      name: "Mountain View Lodge",
      location: "Everest Base Camp",
      price: 150,
      rating: 4.5,
      image: "/placeholder.svg",
      amenities: ["WiFi", "Parking", "Restaurant", "Gym"],
      description: "Luxury lodge with stunning mountain views and excellent facilities for trekkers.",
      available: true
    },
    {
      id: "H002",
      name: "Himalayan Resort",
      location: "Annapurna",
      price: 120,
      rating: 4.2,
      image: "/placeholder.svg",
      amenities: ["WiFi", "Restaurant", "Spa"],
      description: "Comfortable resort perfect for relaxation after long trekking days.",
      available: true
    },
    {
      id: "H003",
      name: "Sherpa Inn",
      location: "Langtang Valley",
      price: 80,
      rating: 4.0,
      image: "/placeholder.svg",
      amenities: ["WiFi", "Restaurant"],
      description: "Cozy inn run by local Sherpa family with authentic mountain hospitality.",
      available: true
    },
    {
      id: "H004",
      name: "Alpine Retreat",
      location: "Everest Base Camp",
      price: 200,
      rating: 4.8,
      image: "/placeholder.svg",
      amenities: ["WiFi", "Parking", "Restaurant", "Gym", "Spa"],
      description: "Premium alpine retreat with world-class amenities and service.",
      available: true
    }
  ]);

  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>(hotels);
  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    minRating: ""
  });

  const [bookingForm, setBookingForm] = useState({
    hotelId: "",
    checkIn: "",
    checkOut: "",
    guests: 1
  });

  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const applyFilters = () => {
    let filtered = hotels;

    if (filters.location) {
      filtered = filtered.filter(hotel => 
        hotel.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(hotel => hotel.price >= parseInt(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(hotel => hotel.price <= parseInt(filters.maxPrice));
    }

    if (filters.minRating) {
      filtered = filtered.filter(hotel => hotel.rating >= parseFloat(filters.minRating));
    }

    setFilteredHotels(filtered);
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      minPrice: "",
      maxPrice: "",
      minRating: ""
    });
    setFilteredHotels(hotels);
  };

  const handleBooking = (hotelId: string) => {
    setBookingForm({ ...bookingForm, hotelId });
    setIsBookingOpen(true);
  };

  const submitBooking = () => {
    const hotel = hotels.find(h => h.id === bookingForm.hotelId);
    toast({
      title: "Booking Confirmed",
      description: `Your booking at ${hotel?.name} has been confirmed for ${bookingForm.checkIn} to ${bookingForm.checkOut}`,
    });
    setIsBookingOpen(false);
    setBookingForm({ hotelId: "", checkIn: "", checkOut: "", guests: 1 });
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "WiFi": return <Wifi className="w-4 h-4" />;
      case "Parking": return <Car className="w-4 h-4" />;
      case "Restaurant": return <Coffee className="w-4 h-4" />;
      case "Gym": return <Dumbbell className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
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
            <h1 className="text-xl font-bold">Hotel Booking</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Filters Section */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Hotels</CardTitle>
            <CardDescription>Find the perfect hotel for your trekking adventure</CardDescription>
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
                <Label htmlFor="minPrice">Min Price ($)</Label>
                <Input
                  id="minPrice"
                  type="number"
                  placeholder="0"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="maxPrice">Max Price ($)</Label>
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
                    <SelectItem value="">Any Rating</SelectItem>
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

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <Card key={hotel.id} className="overflow-hidden">
              <div className="aspect-video bg-muted relative">
                <img 
                  src={hotel.image} 
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                  ${hotel.price}/night
                </Badge>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{hotel.name}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {hotel.location}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{hotel.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{hotel.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded">
                      {getAmenityIcon(amenity)}
                      {amenity}
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={() => handleBooking(hotel.id)}
                  disabled={!hotel.available}
                >
                  {hotel.available ? "Book Now" : "Not Available"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No hotels found matching your criteria.</p>
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
            <DialogTitle>Book Hotel</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="checkIn">Check-in Date</Label>
              <Input
                id="checkIn"
                type="date"
                value={bookingForm.checkIn}
                onChange={(e) => setBookingForm({ ...bookingForm, checkIn: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="checkOut">Check-out Date</Label>
              <Input
                id="checkOut"
                type="date"
                value={bookingForm.checkOut}
                onChange={(e) => setBookingForm({ ...bookingForm, checkOut: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="guests">Number of Guests</Label>
              <Select 
                value={bookingForm.guests.toString()} 
                onValueChange={(value) => setBookingForm({ ...bookingForm, guests: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Guest</SelectItem>
                  <SelectItem value="2">2 Guests</SelectItem>
                  <SelectItem value="3">3 Guests</SelectItem>
                  <SelectItem value="4">4 Guests</SelectItem>
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
