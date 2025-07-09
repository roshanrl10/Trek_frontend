
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Mountain, Clock, Star, Navigation } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TrekkingRoute {
  id: string;
  name: string;
  difficulty: string;
  duration: string;
  distance: string;
  elevation: string;
  description: string;
  coordinates: [number, number];
  waypoints: { name: string; coordinates: [number, number] }[];
  isBookmarked: boolean;
}

export const MapsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedRoute, setSelectedRoute] = useState<TrekkingRoute | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [routes] = useState<TrekkingRoute[]>([
    {
      id: "TR001",
      name: "Everest Base Camp Trek",
      difficulty: "Hard",
      duration: "14 days",
      distance: "130 km",
      elevation: "5,364m",
      description: "The classic trek to Everest Base Camp, offering stunning views of the world's highest peak and surrounding mountains.",
      coordinates: [86.8523, 27.9881],
      waypoints: [
        { name: "Lukla", coordinates: [86.7311, 27.6869] },
        { name: "Namche Bazaar", coordinates: [86.7131, 27.8067] },
        { name: "Tengboche", coordinates: [86.7644, 27.8368] },
        { name: "Dingboche", coordinates: [86.8306, 27.8925] },
        { name: "Lobuche", coordinates: [86.8089, 27.9519] },
        { name: "Everest Base Camp", coordinates: [86.8523, 27.9881] }
      ],
      isBookmarked: false
    },
    {
      id: "TR002",
      name: "Annapurna Circuit",
      difficulty: "Moderate",
      duration: "21 days",
      distance: "230 km",
      elevation: "5,416m",
      description: "A complete circuit around the Annapurna massif, showcasing diverse landscapes and cultures.",
      coordinates: [83.9294, 28.5967],
      waypoints: [
        { name: "Besisahar", coordinates: [84.4239, 28.2306] },
        { name: "Manang", coordinates: [84.0169, 28.6667] },
        { name: "Thorong La Pass", coordinates: [83.9294, 28.5967] },
        { name: "Muktinath", coordinates: [83.8697, 28.8117] },
        { name: "Jomsom", coordinates: [83.7231, 28.7806] },
        { name: "Pokhara", coordinates: [83.9856, 28.2096] }
      ],
      isBookmarked: true
    },
    {
      id: "TR003",
      name: "Langtang Valley Trek",
      difficulty: "Easy",
      duration: "7 days",
      distance: "65 km",
      elevation: "3,870m",
      description: "A beautiful valley trek close to Kathmandu, known for its scenic beauty and cultural richness.",
      coordinates: [85.5500, 28.2167],
      waypoints: [
        { name: "Syabrubesi", coordinates: [85.3722, 28.1606] },
        { name: "Langtang Village", coordinates: [85.5333, 28.2167] },
        { name: "Kyanjin Gompa", coordinates: [85.5500, 28.2167] }
      ],
      isBookmarked: false
    },
    {
      id: "TR004",
      name: "Manaslu Circuit Trek",
      difficulty: "Hard",
      duration: "18 days",
      distance: "177 km",
      elevation: "5,106m",
      description: "A remote and challenging trek around the eighth highest mountain in the world.",
      coordinates: [84.5597, 28.5500],
      waypoints: [
        { name: "Soti Khola", coordinates: [84.9667, 28.2333] },
        { name: "Samagaon", coordinates: [84.6167, 28.6500] },
        { name: "Larkya La Pass", coordinates: [84.5597, 28.5500] },
        { name: "Bimthang", coordinates: [84.5167, 28.5167] }
      ],
      isBookmarked: false
    }
  ]);

  const [filteredRoutes, setFilteredRoutes] = useState<TrekkingRoute[]>(routes);

  useEffect(() => {
    // Initialize a simple map visualization
    if (mapRef.current) {
      mapRef.current.innerHTML = `
        <div style="width: 100%; height: 400px; background: linear-gradient(to bottom, #87CEEB, #98FB98); border-radius: 8px; position: relative; overflow: hidden;">
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: #333;">
            <div style="font-size: 24px; margin-bottom: 10px;">🗻</div>
            <div style="font-weight: bold; margin-bottom: 5px;">${selectedRoute ? selectedRoute.name : 'Select a route to view on map'}</div>
            ${selectedRoute ? `<div style="font-size: 14px; color: #666;">${selectedRoute.description}</div>` : ''}
          </div>
          ${selectedRoute ? selectedRoute.waypoints.map((waypoint, index) => `
            <div style="position: absolute; top: ${20 + index * 15}%; left: ${30 + index * 10}%; width: 8px; height: 8px; background: #ff4444; border-radius: 50%; border: 2px solid white;"></div>
          `).join('') : ''}
        </div>
      `;
    }
  }, [selectedRoute]);

  const searchRoutes = () => {
    if (searchTerm.trim() === "") {
      setFilteredRoutes(routes);
    } else {
      const filtered = routes.filter(route => 
        route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.difficulty.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRoutes(filtered);
    }
  };

  const handleRouteSelect = (route: TrekkingRoute) => {
    setSelectedRoute(route);
    toast({
      title: "Route Selected",
      description: `Viewing ${route.name} on the map`,
    });
  };

  const handleBookmark = (routeId: string) => {
    const route = routes.find(r => r.id === routeId);
    toast({
      title: route?.isBookmarked ? "Bookmark Removed" : "Route Bookmarked",
      description: route?.isBookmarked 
        ? `${route.name} removed from bookmarks`
        : `${route?.name} added to bookmarks`,
    });
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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="border-b border-border/40 backdrop-blur-sm bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" onClick={() => navigate("/user-dashboard")} className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-xl font-bold">Trekking Maps & Routes</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Search Section */}
        <Card>
          <CardHeader>
            <CardTitle>Search Trekking Routes</CardTitle>
            <CardDescription>Explore detailed maps and information for trekking routes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Route Name or Difficulty</Label>
                <Input
                  id="search"
                  placeholder="Search by route name or difficulty"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchRoutes()}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={searchRoutes}>
                  <Navigation className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Routes List */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-lg font-semibold">Available Routes</h3>
            {filteredRoutes.map((route) => (
              <Card 
                key={route.id} 
                className={`cursor-pointer transition-all ${selectedRoute?.id === route.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => handleRouteSelect(route)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm">{route.name}</h4>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookmark(route.id);
                      }}
                    >
                      <Star 
                        className={`w-3 h-3 ${route.isBookmarked ? 'fill-yellow-400 text-yellow-400' : ''}`} 
                      />
                    </Button>
                  </div>
                  <Badge className={`${getDifficultyColor(route.difficulty)} mb-2`}>
                    {route.difficulty}
                  </Badge>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {route.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {route.distance}
                    </div>
                    <div className="flex items-center gap-1">
                      <Mountain className="w-3 h-3" />
                      Max: {route.elevation}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Map and Route Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map */}
            <Card>
              <CardHeader>
                <CardTitle>Route Map</CardTitle>
                <CardDescription>
                  {selectedRoute ? `Viewing ${selectedRoute.name}` : 'Select a route to view detailed map'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div ref={mapRef}></div>
              </CardContent>
            </Card>

            {/* Route Details */}
            {selectedRoute && (
              <Card>
                <CardHeader>
                  <CardTitle>{selectedRoute.name}</CardTitle>
                  <CardDescription>Detailed route information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{selectedRoute.duration}</div>
                      <div className="text-sm text-muted-foreground">Duration</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{selectedRoute.distance}</div>
                      <div className="text-sm text-muted-foreground">Distance</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{selectedRoute.elevation}</div>
                      <div className="text-sm text-muted-foreground">Max Elevation</div>
                    </div>
                    <div className="text-center">
                      <Badge className={getDifficultyColor(selectedRoute.difficulty)}>
                        {selectedRoute.difficulty}
                      </Badge>
                      <div className="text-sm text-muted-foreground">Difficulty</div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6">{selectedRoute.description}</p>

                  <div>
                    <h4 className="font-semibold mb-3">Key Waypoints</h4>
                    <div className="space-y-2">
                      {selectedRoute.waypoints.map((waypoint, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 bg-muted/30 rounded">
                          <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                          <span className="font-medium">{waypoint.name}</span>
                          <span className="text-sm text-muted-foreground ml-auto">
                            {waypoint.coordinates[1].toFixed(4)}, {waypoint.coordinates[0].toFixed(4)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex gap-2">
                    <Button className="flex-1">
                      Start Planning Trek
                    </Button>
                    <Button variant="outline">
                      Download GPS Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {filteredRoutes.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No routes found matching your search criteria.</p>
              <Button variant="outline" onClick={() => setFilteredRoutes(routes)} className="mt-4">
                Show All Routes
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
