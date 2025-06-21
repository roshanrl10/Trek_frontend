
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mountain, Clock } from "lucide-react";

export const MapManagement = () => {
  const [routes] = useState([
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
  ]);

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
        <Button size="sm">Add Route</Button>
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
