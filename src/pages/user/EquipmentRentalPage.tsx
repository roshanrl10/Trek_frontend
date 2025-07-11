
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Package, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Equipment {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  features: string[];
  available: number;
  size?: string[];
  brand: string;
}

export const EquipmentRentalPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const userEmail = localStorage.getItem("user");
  
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [filteredEquipment, setFilteredEquipment] = useState<Equipment[]>([]);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    minRating: "",
    brand: ""
  });

  const [rentalForm, setRentalForm] = useState({
    equipmentId: "",
    startDate: "",
    endDate: "",
    quantity: 1,
    size: ""
  });

  const [isRentalOpen, setIsRentalOpen] = useState(false);

  const categories = ["All", "Footwear", "Sleeping", "Bags", "Accessories", "Shelter", "Clothing", "Safety"];
  const brands = ["All", "Salomon", "The North Face", "Osprey", "Black Diamond", "MSR", "Patagonia", "Petzl"];

  // Load equipment from localStorage (admin-added) and default equipment
  useEffect(() => {
    const adminEquipment = JSON.parse(localStorage.getItem("adminEquipment") || "[]");
    const defaultEquipment = [
      {
        id: "E001",
        name: "Professional Trekking Boots",
        category: "Footwear",
        price: 15,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?auto=format&fit=crop&w=400&h=300",
        description: "High-quality waterproof trekking boots suitable for all terrain types.",
        features: ["Waterproof", "Breathable", "Ankle Support", "Vibram Sole"],
        available: 10,
        size: ["7", "8", "9", "10", "11", "12"],
        brand: "Salomon"
      },
      {
        id: "E002",
        name: "4-Season Sleeping Bag",
        category: "Sleeping",
        price: 12,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1520637836862-4d197d17c62a?auto=format&fit=crop&w=400&h=300",
        description: "Warm sleeping bag rated for extreme cold weather conditions.",
        features: ["Down Filled", "-20°C Rating", "Compression Sack", "Water Resistant"],
        available: 8,
        brand: "The North Face"
      },
      {
        id: "E003",
        name: "Expedition Backpack 65L",
        category: "Bags",
        price: 18,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&h=300",
        description: "Large capacity backpack perfect for multi-day trekking adventures.",
        features: ["65L Capacity", "Rain Cover", "Multiple Pockets", "Adjustable Straps"],
        available: 12,
        brand: "Osprey"
      },
      {
        id: "E004",
        name: "Trekking Poles (Pair)",
        category: "Accessories",
        price: 8,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1551524164-6ca04ac833fb?auto=format&fit=crop&w=400&h=300",
        description: "Lightweight adjustable trekking poles for stability and support.",
        features: ["Adjustable Height", "Cork Grips", "Carbide Tips", "Collapsible"],
        available: 15,
        brand: "Black Diamond"
      },
      {
        id: "E005",
        name: "Mountain Tent 2-Person",
        category: "Shelter",
        price: 25,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=400&h=300",
        description: "Durable 2-person tent designed for harsh mountain conditions.",
        features: ["4-Season", "Vestibule", "Easy Setup", "Wind Resistant"],
        available: 6,
        brand: "MSR"
      },
      {
        id: "E006",
        name: "Down Jacket",
        category: "Clothing",
        price: 20,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=400&h=300",
        description: "Ultra-light down jacket for high altitude warmth.",
        features: ["800 Fill Down", "Packable", "Water Resistant", "Ultra Light"],
        available: 14,
        size: ["S", "M", "L", "XL"],
        brand: "Patagonia"
      },
      {
        id: "E007",
        name: "Climbing Harness",
        category: "Safety",
        price: 10,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1564024500829-3da6e50c6c70?auto=format&fit=crop&w=400&h=300",
        description: "Professional climbing harness for technical routes.",
        features: ["Adjustable", "Gear Loops", "Comfort Padding", "Belay Loop"],
        available: 9,
        size: ["S", "M", "L"],
        brand: "Petzl"
      },
      {
        id: "E008",
        name: "Headlamp",
        category: "Accessories",
        price: 5,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1478667830055-0be76e0c8b04?auto=format&fit=crop&w=400&h=300",
        description: "High-powered LED headlamp for early morning starts.",
        features: ["300 Lumens", "Rechargeable", "Red Light Mode", "IPX4 Rated"],
        available: 20,
        brand: "Petzl"
      }
    ];

    const allEquipment = [...defaultEquipment, ...adminEquipment];
    setEquipment(allEquipment);
    setFilteredEquipment(allEquipment);
  }, []);

  const applyFilters = () => {
    let filtered = equipment;

    if (filters.category && filters.category !== "All") {
      filtered = filtered.filter(item => item.category === filters.category);
    }

    if (filters.brand && filters.brand !== "All") {
      filtered = filtered.filter(item => item.brand === filters.brand);
    }

    if (filters.minPrice) {
      filtered = filtered.filter(item => item.price >= parseInt(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(item => item.price <= parseInt(filters.maxPrice));
    }

    if (filters.minRating) {
      filtered = filtered.filter(item => item.rating >= parseFloat(filters.minRating));
    }

    setFilteredEquipment(filtered);
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      minPrice: "",
      maxPrice: "",
      minRating: "",
      brand: ""
    });
    setFilteredEquipment(equipment);
  };

  const handleRental = (equipmentId: string) => {
    setRentalForm({ ...rentalForm, equipmentId });
    setIsRentalOpen(true);
  };

  const submitRental = () => {
    const item = equipment.find(e => e.id === rentalForm.equipmentId);
    
    // Save rental to localStorage
    const existingBookings = JSON.parse(localStorage.getItem("userBookings") || "[]");
    const newRental = {
      id: `R${Date.now()}`,
      type: "equipment",
      userEmail: userEmail,
      equipmentId: rentalForm.equipmentId,
      equipmentName: item?.name,
      startDate: rentalForm.startDate,
      endDate: rentalForm.endDate,
      quantity: rentalForm.quantity,
      size: rentalForm.size,
      dailyPrice: item?.price,
      status: "confirmed",
      bookingDate: new Date().toISOString().split('T')[0]
    };
    
    const updatedBookings = [...existingBookings, newRental];
    localStorage.setItem("userBookings", JSON.stringify(updatedBookings));

    toast({
      title: "Rental Confirmed",
      description: `Your rental of ${item?.name} has been confirmed from ${rentalForm.startDate} to ${rentalForm.endDate}`,
    });
    setIsRentalOpen(false);
    setRentalForm({ equipmentId: "", startDate: "", endDate: "", quantity: 1, size: "" });
  };

  const selectedEquipment = equipment.find(e => e.id === rentalForm.equipmentId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="border-b border-border/40 backdrop-blur-sm bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" onClick={() => navigate("/user-dashboard")} className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-xl font-bold">Equipment Rental</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Filters Section */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Equipment</CardTitle>
            <CardDescription>Find the perfect gear for your trekking adventure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category === "All" ? "" : category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="brand">Brand</Label>
                <Select value={filters.brand} onValueChange={(value) => setFilters({ ...filters, brand: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Brands" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand === "All" ? "" : brand}>
                        {brand}
                      </SelectItem>
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
                  placeholder="100"
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
                    <SelectItem value="4">4+ Stars</SelectItem>
                    <SelectItem value="4.5">4.5+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 items-end">
                <Button onClick={applyFilters}>Apply</Button>
                <Button variant="outline" onClick={clearFilters}>Clear</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEquipment.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-muted relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                  ${item.price}/day
                </Badge>
                <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground">
                  {item.category}
                </Badge>
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base font-semibold">{item.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{item.brand}</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Package className="w-3 h-3 mr-1" />
                  {item.available} available
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.features.slice(0, 3).map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {item.features.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{item.features.length - 3} more
                    </Badge>
                  )}
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={() => handleRental(item.id)}
                  disabled={item.available === 0}
                >
                  {item.available > 0 ? "Rent Now" : "Out of Stock"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEquipment.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No equipment found matching your criteria.</p>
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Rental Dialog */}
      <Dialog open={isRentalOpen} onOpenChange={setIsRentalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rent Equipment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={rentalForm.startDate}
                onChange={(e) => setRentalForm({ ...rentalForm, startDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={rentalForm.endDate}
                onChange={(e) => setRentalForm({ ...rentalForm, endDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Select 
                value={rentalForm.quantity.toString()} 
                onValueChange={(value) => setRentalForm({ ...rentalForm, quantity: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedEquipment?.size && (
              <div>
                <Label htmlFor="size">Size</Label>
                <Select 
                  value={rentalForm.size} 
                  onValueChange={(value) => setRentalForm({ ...rentalForm, size: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedEquipment.size.map(size => (
                      <SelectItem key={size} value={size}>Size {size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsRentalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={submitRental}>
                Confirm Rental
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
