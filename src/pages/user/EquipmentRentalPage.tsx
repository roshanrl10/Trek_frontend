
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Star, Shield, Zap, Mountain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Equipment {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  available: boolean;
  specifications?: string[];
}

export const EquipmentRentalPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const userEmail = localStorage.getItem("user");
  
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [filteredEquipment, setFilteredEquipment] = useState<Equipment[]>([]);
  const [filters, setFilters] = useState({
    category: "any",
    brand: "any",
    minPrice: "",
    maxPrice: "",
    minRating: "any"
  });

  const [rentalForm, setRentalForm] = useState({
    equipmentId: "",
    startDate: "",
    endDate: "",
    quantity: 1
  });

  const [isRentalOpen, setIsRentalOpen] = useState(false);

  // Load equipment from localStorage (admin-added) and default equipment
  useEffect(() => {
    const loadEquipment = () => {
      const adminEquipment = JSON.parse(localStorage.getItem("adminEquipment") || "[]");
      const defaultEquipment = [
      {
        id: "E001",
        name: "Professional Trekking Backpack",
        category: "Backpacks",
        brand: "The North Face",
        price: 25,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&h=300",
        description: "65L capacity professional trekking backpack with weather protection.",
        available: true,
        specifications: ["65L capacity", "Weather resistant", "Multiple compartments", "Adjustable straps"]
      },
      {
        id: "E002",
        name: "4-Season Hiking Boots",
        category: "Footwear",
        brand: "Salomon",
        price: 20,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?auto=format&fit=crop&w=400&h=300",
        description: "Waterproof hiking boots suitable for all weather conditions.",
        available: true,
        specifications: ["Waterproof", "Ankle support", "Vibram sole", "Breathable membrane"]
      },
      {
        id: "E003",
        name: "Mountaineering Tent",
        category: "Shelter",
        brand: "MSR",
        price: 35,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=400&h=300",
        description: "2-person 4-season mountaineering tent built for extreme conditions.",
        available: true,
        specifications: ["2-person capacity", "4-season rated", "Aluminum poles", "Footprint included"]
      },
      {
        id: "E004",
        name: "Sleeping Bag (-10°C)",
        category: "Sleep System",
        brand: "Marmot",
        price: 18,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=400&h=300",
        description: "Down sleeping bag rated for -10°C with compression sack.",
        available: true,
        specifications: ["Down insulation", "-10°C rating", "Compression sack", "Water-resistant"]
      },
      {
        id: "E005",
        name: "Trekking Poles (Pair)",
        category: "Accessories",
        brand: "Black Diamond",
        price: 12,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=400&h=300",
        description: "Lightweight carbon fiber trekking poles with shock absorption.",
        available: true,
        specifications: ["Carbon fiber", "Shock absorption", "Adjustable length", "Tungsten tips"]
      },
      {
        id: "E006",
        name: "Climbing Harness",
        category: "Climbing",
        brand: "Petzl",
        price: 15,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1522163723043-478ef79a5bb4?auto=format&fit=crop&w=400&h=300",
        description: "Adjustable climbing harness with gear loops and belay loop.",
        available: true,
        specifications: ["Adjustable fit", "4 gear loops", "Belay loop", "Auto-locking buckles"]
      }
    ];

      const allEquipment = [...defaultEquipment, ...adminEquipment];
      setEquipment(allEquipment);
      setFilteredEquipment(allEquipment);
    };

    loadEquipment();

    // Listen for storage changes to update equipment in real-time
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "adminEquipment") {
        loadEquipment();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const applyFilters = () => {
    let filtered = equipment;

    if (filters.category && filters.category !== "any") {
      filtered = filtered.filter(item => 
        item.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.brand && filters.brand !== "any") {
      filtered = filtered.filter(item => 
        item.brand.toLowerCase() === filters.brand.toLowerCase()
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(item => item.price >= parseInt(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(item => item.price <= parseInt(filters.maxPrice));
    }

    if (filters.minRating && filters.minRating !== "any") {
      filtered = filtered.filter(item => item.rating >= parseFloat(filters.minRating));
    }

    setFilteredEquipment(filtered);
  };

  const clearFilters = () => {
    setFilters({
      category: "any",
      brand: "any",
      minPrice: "",
      maxPrice: "",
      minRating: "any"
    });
    setFilteredEquipment(equipment);
  };

  const handleRental = (equipmentId: string) => {
    setRentalForm({ ...rentalForm, equipmentId });
    setIsRentalOpen(true);
  };

  const submitRental = () => {
    const equipmentItem = equipment.find(e => e.id === rentalForm.equipmentId);
    
    // Calculate rental duration and total price
    const startDate = new Date(rentalForm.startDate);
    const endDate = new Date(rentalForm.endDate);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = equipmentItem ? equipmentItem.price * days * rentalForm.quantity : 0;
    
    // Save rental to localStorage
    const existingBookings = JSON.parse(localStorage.getItem("userBookings") || "[]");
    const newRental = {
      id: `R${Date.now()}`,
      type: "equipment",
      userEmail: userEmail,
      equipmentId: rentalForm.equipmentId,
      equipmentName: equipmentItem?.name,
      startDate: rentalForm.startDate,
      endDate: rentalForm.endDate,
      quantity: rentalForm.quantity,
      dailyPrice: equipmentItem?.price,
      totalPrice: totalPrice,
      status: "confirmed",
      bookingDate: new Date().toISOString().split('T')[0]
    };
    
    const updatedBookings = [...existingBookings, newRental];
    localStorage.setItem("userBookings", JSON.stringify(updatedBookings));

    toast({
      title: "Rental Confirmed",
      description: `Your rental of ${equipmentItem?.name} has been confirmed for ${days} days`,
    });
    setIsRentalOpen(false);
    setRentalForm({ equipmentId: "", startDate: "", endDate: "", quantity: 1 });
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "safety": return <Shield className="w-4 h-4" />;
      case "climbing": return <Mountain className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  // Get unique categories and brands for filter options
  const uniqueCategories = [...new Set(equipment.map(item => item.category))];
  const uniqueBrands = [...new Set(equipment.map(item => item.brand))];

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
            <CardDescription>Find the perfect equipment for your trekking adventure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Category</SelectItem>
                    {uniqueCategories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="brand">Brand</Label>
                <Select value={filters.brand} onValueChange={(value) => setFilters({ ...filters, brand: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Brand</SelectItem>
                    {uniqueBrands.map((brand) => (
                      <SelectItem key={brand} value={brand}>{brand}</SelectItem>
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

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-video bg-muted relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                  ${item.price}/day
                </Badge>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      {getCategoryIcon(item.category)}
                      <span className="ml-1">{item.category}</span>
                      <span className="mx-2">•</span>
                      <span>{item.brand}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                
                {item.specifications && (
                  <div className="space-y-1 mb-4">
                    <h4 className="text-sm font-medium">Specifications:</h4>
                    <ul className="text-xs text-muted-foreground">
                      {item.specifications.map((spec, index) => (
                        <li key={index}>• {spec}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <Button 
                  className="w-full" 
                  onClick={() => handleRental(item.id)}
                  disabled={!item.available}
                >
                  {item.available ? "Rent Now" : "Not Available"}
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
                  <SelectItem value="1">1 Item</SelectItem>
                  <SelectItem value="2">2 Items</SelectItem>
                  <SelectItem value="3">3 Items</SelectItem>
                  <SelectItem value="4">4 Items</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
