
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Hotel, 
  Backpack, 
  CloudSun, 
  Map, 
  Calendar,
  Star,
  ArrowRight,
  User,
  Users
} from "lucide-react";

const UserDashboard = () => {
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      {/* Header */}
      <div className="border-b border-border/40 backdrop-blur-sm bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-foreground">T-rek Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Welcome, {userEmail}</span>
              <Button onClick={handleLogout} variant="outline">Logout</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Quick Access Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="border-border/50 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/user-dashboard/bookings")}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="w-5 h-5 text-purple-500" />
                My Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">View all your bookings and reservations</p>
              <Button variant="ghost" size="sm" className="mt-2 p-0">
                View Details <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hotel Bookings */}
          <Card className="border-border/50 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/user-dashboard/hotels")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hotel className="w-5 h-5 text-blue-500" />
                Hotel Booking
              </CardTitle>
              <CardDescription>Browse and book hotels for your trekking adventure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">• Filter by location and price</p>
                <p className="text-sm text-muted-foreground">• View detailed hotel information</p>
                <p className="text-sm text-muted-foreground">• Instant booking confirmation</p>
              </div>
              <Button className="w-full mt-4">
                Browse Hotels <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Equipment Rental */}
          <Card className="border-border/50 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/user-dashboard/equipment")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Backpack className="w-5 h-5 text-green-500" />
                Equipment Rental
              </CardTitle>
              <CardDescription>Rent professional trekking equipment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">• Professional grade equipment</p>
                <p className="text-sm text-muted-foreground">• Filter by category and price</p>
                <p className="text-sm text-muted-foreground">• Flexible rental periods</p>
              </div>
              <Button className="w-full mt-4">
                Browse Equipment <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Agencies & Guides */}
          <Card className="border-border/50 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/user-dashboard/agencies")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-500" />
                Agencies & Guides
              </CardTitle>
              <CardDescription>Book professional trekking agencies and guides</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">• Experienced local guides</p>
                <p className="text-sm text-muted-foreground">• Certified trekking agencies</p>
                <p className="text-sm text-muted-foreground">• Multiple language support</p>
              </div>
              <Button className="w-full mt-4">
                Browse Agencies <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Weather Dashboard */}
          <Card className="border-border/50 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/user-dashboard/weather")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CloudSun className="w-5 h-5 text-orange-500" />
                Weather Forecast
              </CardTitle>
              <CardDescription>Check detailed weather for trekking routes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">• 5-day detailed forecasts</p>
                <p className="text-sm text-muted-foreground">• Trekking recommendations</p>
                <p className="text-sm text-muted-foreground">• Multiple locations</p>
              </div>
              <Button className="w-full mt-4">
                Check Weather <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Map Management */}
          <Card className="border-border/50 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/user-dashboard/maps")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="w-5 h-5 text-purple-500" />
                Trekking Routes & Maps
              </CardTitle>
              <CardDescription>Explore detailed trekking routes and maps</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">• Interactive route maps</p>
                <p className="text-sm text-muted-foreground">• Detailed waypoint information</p>
                <p className="text-sm text-muted-foreground">• GPS data download</p>
              </div>
              <Button className="w-full mt-4">
                Explore Maps <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
