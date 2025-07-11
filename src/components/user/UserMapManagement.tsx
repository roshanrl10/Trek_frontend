
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mountain, Clock, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Route {
  id: string;
  name: string;
  difficulty: string;
  duration: string;
  distance: string;
  elevation: string;
  status: string;
  bookings: number;
  isBookmarked: boolean;
  description?: string;
}

export const UserMapManagement = () => {
  const { toast } = useToast();
  
  // Get routes from localStorage (admin created) or use defaults
  const getRoutesFromStorage = () => {
    const adminRoutes = localStorage.getItem("adminRoutes");
    if (adminRoutes) {
      const parsedRoutes = JSON.parse(adminRoutes);
      return parsedRoutes.map((route: any) => ({
        ...route,
        isBookmarked: false
      }));
    }
    
    // Default routes if none exist
    return [
      {
        id: "TR001",
        name: "Everest Base Camp Trek",
        difficulty: "Hard",
        duration: "14 days",
        distance: "130 km",
        elevation: "5,364m",
        status: "active",
        bookings: 23,
        isBookmarked: false
      },
      {
        id: "TR002",
        name: "Annapurna Circuit",
        difficulty: "Moderate",
        duration: "21 days",
        distance: "230 km",
        elevation: "5,416m",
        status: "active",
        bookings: 18,
        isBookmarked: true
      },
      {
        id: "TR003",
        name: "Langtang Valley Trek",
        difficulty: "Easy",
        duration: "7 days",
        distance: "65 km",
        elevation: "3,870m",
        status: "active",
        bookings: 0,
        isBookmarked: false
      }
    ];
  };

  const [routes, setRoutes] = useState<Route[]>(getRoutesFromStorage());

  // Listen for route updates from admin
  useEffect(() => {
    const handleStorageUpdate = () => {
      const updatedRoutes = getRoutesFromStorage();
      setRoutes(updatedRoutes);
    };

    // Listen for localStorage changes
    window.addEventListener('storage', handleStorageUpdate);
    
    // Check for updates periodically (for same-tab updates)
    const interval = setInterval(handleStorageUpdate, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageUpdate);
      clearInterval(interval);
    };
  }, []);

  const handleBookmark = (routeId: string) => {
    setRoutes(prev => prev.map(route => 
      route.id === routeId 
        ? { ...route, isBookmarked: !route.isBookmarked }
        : route
    ));
    
    const route = routes.find(r => r.id === routeId);
    toast({
      title: route?.isBookmarked ? "Bookmark Removed" : "Route Bookmarked",
      description: route?.isBookmarked 
        ? `${route.name} removed from bookmarks`
        : `${route?.name} added to bookmarks`,
    });
  };

  const handleBookRoute = (routeId: string) => {
    const route = routes.find(r => r.id === routeId);
    
    // Create a trekking booking
    const newBooking = {
      id: `TRK${Date.now()}`,
      guest: localStorage.getItem("user") || "Current User",
      hotel: `${route?.name} Trek Booking`,
      checkIn: new Date().toISOString().split('T')[0],
      checkOut: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: "confirmed",
      amount: "$" + (Math.floor(Math.random() * 1000) + 500),
      type: "trekking"
    };

    // Add to user bookings
    const existingBookings = JSON.parse(localStorage.getItem("userBookings") || "[]");
    const updatedBookings = [...existingBookings, newBooking];
    localStorage.setItem("userBookings", JSON.stringify(updatedBookings));

    // Update route bookings count
    const adminRoutes = JSON.parse(localStorage.getItem("adminRoutes") || "[]");
    const updatedAdminRoutes = adminRoutes.map((adminRoute: any) => 
      adminRoute.id === routeId 
        ? { ...adminRoute, bookings: (adminRoute.bookings || 0) + 1 }
        : adminRoute
    );
    localStorage.setItem("adminRoutes", JSON.stringify(updatedAdminRoutes));

    toast({
      title: "Trek Booked Successfully!",
      description: `Your booking for ${route?.name} has been confirmed.`,
    });

    // Update local state
    setRoutes(prev => prev.map(r => 
      r.id === routeId 
        ? { ...r, bookings: r.bookings + 1 }
        : r
    ));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Moderate": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Available Trekking Routes</h3>
        <Button size="sm" variant="outline">
          View Map
        </Button>
      </div>
      
      <div className="grid gap-4">
        {routes.filter(route => route.status === "active").map((route) => (
          <Card key={route.id} className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Mountain className="w-8 h-8 text-blue-500" />
                  <div>
                    <h4 className="font-semibold">{route.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {route.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {route.distance}
                      </span>
                      <span>Max: {route.elevation}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getDifficultyColor(route.difficulty)}>
                    {route.difficulty}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBookmark(route.id)}
                  >
                    <Star 
                      className={`w-3 h-3 ${route.isBookmarked ? 'fill-yellow-400 text-yellow-400' : ''}`} 
                    />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleBookRoute(route.id)}
                  >
                    Book Trek
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
