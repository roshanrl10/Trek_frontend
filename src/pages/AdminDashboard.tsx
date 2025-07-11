
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Hotel, 
  Backpack, 
  CloudSun, 
  Map, 
  Users, 
  Calendar,
  TrendingUp,
  MapPin,
  Star,
  Plus
} from "lucide-react";
import { AdminStats } from "@/components/admin/AdminStats";
import { BookingManagement } from "@/components/admin/BookingManagement";
import { RentalManagement } from "@/components/admin/RentalManagement";
import { WeatherDashboard } from "@/components/admin/WeatherDashboard";
import { MapManagement } from "@/components/admin/MapManagement";
import { AgencyManagement } from "@/components/admin/AgencyManagement";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const userEmail = localStorage.getItem("user");

  // Hotel management state
  const [isAddHotelOpen, setIsAddHotelOpen] = useState(false);
  const [hotelForm, setHotelForm] = useState({
    name: "",
    location: "",
    price: "",
    rating: "",
    image: "",
    amenities: "",
    description: ""
  });

  // Equipment management state
  const [isAddEquipmentOpen, setIsAddEquipmentOpen] = useState(false);
  const [equipmentForm, setEquipmentForm] = useState({
    name: "",
    category: "",
    price: "",
    brand: "",
    image: "",
    description: "",
    features: "",
    available: "",
    size: ""
  });

  const handleAddHotel = () => {
    // Get existing hotels from localStorage
    const existingHotels = JSON.parse(localStorage.getItem("adminHotels") || "[]");
    
    const newHotel = {
      id: `H${Date.now()}`,
      name: hotelForm.name,
      location: hotelForm.location,
      price: parseInt(hotelForm.price),
      rating: parseFloat(hotelForm.rating),
      image: hotelForm.image,
      amenities: hotelForm.amenities.split(",").map(a => a.trim()),
      description: hotelForm.description,
      available: true
    };

    const updatedHotels = [...existingHotels, newHotel];
    localStorage.setItem("adminHotels", JSON.stringify(updatedHotels));

    toast({
      title: "Hotel Added",
      description: `${hotelForm.name} has been added successfully.`,
    });

    setIsAddHotelOpen(false);
    setHotelForm({
      name: "",
      location: "",
      price: "",
      rating: "",
      image: "",
      amenities: "",
      description: ""
    });
  };

  const handleAddEquipment = () => {
    // Get existing equipment from localStorage
    const existingEquipment = JSON.parse(localStorage.getItem("adminEquipment") || "[]");
    
    const newEquipment = {
      id: `E${Date.now()}`,
      name: equipmentForm.name,
      category: equipmentForm.category,
      price: parseInt(equipmentForm.price),
      brand: equipmentForm.brand,
      image: equipmentForm.image,
      description: equipmentForm.description,
      features: equipmentForm.features.split(",").map(f => f.trim()),
      available: parseInt(equipmentForm.available),
      size: equipmentForm.size ? equipmentForm.size.split(",").map(s => s.trim()) : undefined,
      rating: 4.5 // Default rating
    };

    const updatedEquipment = [...existingEquipment, newEquipment];
    localStorage.setItem("adminEquipment", JSON.stringify(updatedEquipment));

    toast({
      title: "Equipment Added",
      description: `${equipmentForm.name} has been added successfully.`,
    });

    setIsAddEquipmentOpen(false);
    setEquipmentForm({
      name: "",
      category: "",
      price: "",
      brand: "",
      image: "",
      description: "",
      features: "",
      available: "",
      size: ""
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      {/* Header */}
      <div className="border-b border-border/40 backdrop-blur-sm bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-foreground">T-rek Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Welcome, {userEmail}</span>
              <Button onClick={handleLogout} variant="outline">Logout</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Stats Overview */}
        <AdminStats />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hotel Bookings */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hotel className="w-5 h-5 text-blue-500" />
                Hotel Management
              </CardTitle>
              <CardDescription>Manage hotel reservations and add new hotels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Dialog open={isAddHotelOpen} onOpenChange={setIsAddHotelOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full mb-4">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Hotel
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Hotel</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="hotelName">Hotel Name</Label>
                        <Input
                          id="hotelName"
                          value={hotelForm.name}
                          onChange={(e) => setHotelForm({ ...hotelForm, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="hotelLocation">Location</Label>
                        <Input
                          id="hotelLocation"
                          value={hotelForm.location}
                          onChange={(e) => setHotelForm({ ...hotelForm, location: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="hotelPrice">Price per Night ($)</Label>
                        <Input
                          id="hotelPrice"
                          type="number"
                          value={hotelForm.price}
                          onChange={(e) => setHotelForm({ ...hotelForm, price: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="hotelRating">Rating (1-5)</Label>
                        <Input
                          id="hotelRating"
                          type="number"
                          step="0.1"
                          min="1"
                          max="5"
                          value={hotelForm.rating}
                          onChange={(e) => setHotelForm({ ...hotelForm, rating: e.target.value })}
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="hotelImage">Image URL</Label>
                        <Input
                          id="hotelImage"
                          value={hotelForm.image}
                          onChange={(e) => setHotelForm({ ...hotelForm, image: e.target.value })}
                          placeholder="https://example.com/hotel-image.jpg"
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="hotelAmenities">Amenities (comma-separated)</Label>
                        <Input
                          id="hotelAmenities"
                          value={hotelForm.amenities}
                          onChange={(e) => setHotelForm({ ...hotelForm, amenities: e.target.value })}
                          placeholder="WiFi, Parking, Restaurant, Gym"
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="hotelDescription">Description</Label>
                        <Textarea
                          id="hotelDescription"
                          value={hotelForm.description}
                          onChange={(e) => setHotelForm({ ...hotelForm, description: e.target.value })}
                        />
                      </div>
                      <div className="col-span-2 flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsAddHotelOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddHotel}>
                          Add Hotel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <BookingManagement />
              </div>
            </CardContent>
          </Card>

          {/* Equipment Rental */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Backpack className="w-5 h-5 text-green-500" />
                Equipment Management
              </CardTitle>
              <CardDescription>Track equipment rentals and add new equipment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Dialog open={isAddEquipmentOpen} onOpenChange={setIsAddEquipmentOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full mb-4">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Equipment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Equipment</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="equipmentName">Equipment Name</Label>
                        <Input
                          id="equipmentName"
                          value={equipmentForm.name}
                          onChange={(e) => setEquipmentForm({ ...equipmentForm, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="equipmentCategory">Category</Label>
                        <Select
                          value={equipmentForm.category}
                          onValueChange={(value) => setEquipmentForm({ ...equipmentForm, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Footwear">Footwear</SelectItem>
                            <SelectItem value="Sleeping">Sleeping</SelectItem>
                            <SelectItem value="Bags">Bags</SelectItem>
                            <SelectItem value="Accessories">Accessories</SelectItem>
                            <SelectItem value="Shelter">Shelter</SelectItem>
                            <SelectItem value="Clothing">Clothing</SelectItem>
                            <SelectItem value="Safety">Safety</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="equipmentPrice">Price per Day ($)</Label>
                        <Input
                          id="equipmentPrice"
                          type="number"
                          value={equipmentForm.price}
                          onChange={(e) => setEquipmentForm({ ...equipmentForm, price: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="equipmentBrand">Brand</Label>
                        <Input
                          id="equipmentBrand"
                          value={equipmentForm.brand}
                          onChange={(e) => setEquipmentForm({ ...equipmentForm, brand: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="equipmentAvailable">Available Quantity</Label>
                        <Input
                          id="equipmentAvailable"
                          type="number"
                          value={equipmentForm.available}
                          onChange={(e) => setEquipmentForm({ ...equipmentForm, available: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="equipmentSize">Sizes (comma-separated, optional)</Label>
                        <Input
                          id="equipmentSize"
                          value={equipmentForm.size}
                          onChange={(e) => setEquipmentForm({ ...equipmentForm, size: e.target.value })}
                          placeholder="S, M, L, XL"
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="equipmentImage">Image URL</Label>
                        <Input
                          id="equipmentImage"
                          value={equipmentForm.image}
                          onChange={(e) => setEquipmentForm({ ...equipmentForm, image: e.target.value })}
                          placeholder="https://example.com/equipment-image.jpg"
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="equipmentFeatures">Features (comma-separated)</Label>
                        <Input
                          id="equipmentFeatures"
                          value={equipmentForm.features}
                          onChange={(e) => setEquipmentForm({ ...equipmentForm, features: e.target.value })}
                          placeholder="Waterproof, Lightweight, Durable"
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="equipmentDescription">Description</Label>
                        <Textarea
                          id="equipmentDescription"
                          value={equipmentForm.description}
                          onChange={(e) => setEquipmentForm({ ...equipmentForm, description: e.target.value })}
                        />
                      </div>
                      <div className="col-span-2 flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsAddEquipmentOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddEquipment}>
                          Add Equipment
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <RentalManagement />
              </div>
            </CardContent>
          </Card>

          {/* Weather Dashboard */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CloudSun className="w-5 h-5 text-orange-500" />
                Weather Monitoring
              </CardTitle>
              <CardDescription>Track weather conditions for trekking routes</CardDescription>
            </CardHeader>
            <CardContent>
              <WeatherDashboard />
            </CardContent>
          </Card>

          {/* Map Management */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="w-5 h-5 text-purple-500" />
                Trekking Maps
              </CardTitle>
              <CardDescription>Manage trekking routes and maps</CardDescription>
            </CardHeader>
            <CardContent>
              <MapManagement />
            </CardContent>
          </Card>
        </div>

        {/* Agency Management - Full Width */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-red-500" />
              Agency & Guide Management
            </CardTitle>
            <CardDescription>Manage trekking agencies and guides</CardDescription>
          </CardHeader>
          <CardContent>
            <AgencyManagement />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
