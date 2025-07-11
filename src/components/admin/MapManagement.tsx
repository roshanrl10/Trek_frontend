
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Mountain, Clock, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const MapManagement = () => {
  const { toast } = useToast();
  const [isAddRouteOpen, setIsAddRouteOpen] = useState(false);
  const [routeForm, setRouteForm] = useState({
    name: "",
    difficulty: "",
    duration: "",
    distance: "",
    elevation: "",
    description: ""
  });

  // Get routes from localStorage or use default routes
  const getRoutes = () => {
    const savedRoutes = localStorage.getItem("adminRoutes");
    if (savedRoutes) {
      return JSON.parse(savedRoutes);
    }
    
    const defaultRoutes = [
      {
        id: "TR001",
        name: "Everest Base Camp Trek",
        difficulty: "Hard",
        duration: "14 days",
        distance: "130 km",
        elevation: "5,364m",
        status: "active",
        bookings: 23
      },
      {
        id: "TR002",
        name: "Annapurna Circuit",
        difficulty: "Moderate",
        duration: "21 days",
        distance: "230 km",
        elevation: "5,416m",
        status: "active",
        bookings: 18
      },
      {
        id: "TR003",
        name: "Langtang Valley Trek",
        difficulty: "Easy",
        duration: "7 days",
        distance: "65 km",
        elevation: "3,870m",
        status: "maintenance",
        bookings: 0
      }
    ];
    
    localStorage.setItem("adminRoutes", JSON.stringify(defaultRoutes));
    return defaultRoutes;
  };

  const [routes, setRoutes] = useState(getRoutes());

  const handleAddRoute = () => {
    const newRoute = {
      id: `TR${String(routes.length + 1).padStart(3, '0')}`,
      name: routeForm.name,
      difficulty: routeForm.difficulty,
      duration: routeForm.duration,
      distance: routeForm.distance,
      elevation: routeForm.elevation,
      status: "active",
      bookings: 0,
      description: routeForm.description
    };

    const updatedRoutes = [...routes, newRoute];
    setRoutes(updatedRoutes);
    localStorage.setItem("adminRoutes", JSON.stringify(updatedRoutes));

    toast({
      title: "Route Added",
      description: `${routeForm.name} has been added successfully.`,
    });

    setIsAddRouteOpen(false);
    setRouteForm({
      name: "",
      difficulty: "",
      duration: "",
      distance: "",
      elevation: "",
      description: ""
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "maintenance": return "bg-orange-100 text-orange-800";
      case "closed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Trekking Routes</h3>
        <Dialog open={isAddRouteOpen} onOpenChange={setIsAddRouteOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Route
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Trekking Route</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="routeName">Route Name</Label>
                <Input
                  id="routeName"
                  value={routeForm.name}
                  onChange={(e) => setRouteForm({ ...routeForm, name: e.target.value })}
                  placeholder="e.g., Everest Base Camp Trek"
                />
              </div>
              <div>
                <Label htmlFor="routeDifficulty">Difficulty</Label>
                <Select
                  value={routeForm.difficulty}
                  onValueChange={(value) => setRouteForm({ ...routeForm, difficulty: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="routeDuration">Duration</Label>
                  <Input
                    id="routeDuration"
                    value={routeForm.duration}
                    onChange={(e) => setRouteForm({ ...routeForm, duration: e.target.value })}
                    placeholder="e.g., 14 days"
                  />
                </div>
                <div>
                  <Label htmlFor="routeDistance">Distance</Label>
                  <Input
                    id="routeDistance"
                    value={routeForm.distance}
                    onChange={(e) => setRouteForm({ ...routeForm, distance: e.target.value })}
                    placeholder="e.g., 130 km"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="routeElevation">Max Elevation</Label>
                <Input
                  id="routeElevation"
                  value={routeForm.elevation}
                  onChange={(e) => setRouteForm({ ...routeForm, elevation: e.target.value })}
                  placeholder="e.g., 5,364m"
                />
              </div>
              <div>
                <Label htmlFor="routeDescription">Description</Label>
                <Textarea
                  id="routeDescription"
                  value={routeForm.description}
                  onChange={(e) => setRouteForm({ ...routeForm, description: e.target.value })}
                  placeholder="Brief description of the trekking route"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddRouteOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddRoute}>
                  Add Route
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid gap-4">
        {routes.map((route) => (
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
                  <Badge className={getStatusColor(route.status)}>
                    {route.status}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    {route.bookings} bookings
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
