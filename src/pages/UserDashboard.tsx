
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
  Star
} from "lucide-react";
import { UserBookingManagement } from "@/components/user/UserBookingManagement";
import { UserRentalManagement } from "@/components/user/UserRentalManagement";
import { UserWeatherDashboard } from "@/components/user/UserWeatherDashboard";
import { UserMapManagement } from "@/components/user/UserMapManagement";
import { UserAgencyManagement } from "@/components/user/UserAgencyManagement";

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
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hotel Bookings */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hotel className="w-5 h-5 text-blue-500" />
                My Hotel Bookings
              </CardTitle>
              <CardDescription>Manage your hotel reservations</CardDescription>
            </CardHeader>
            <CardContent>
              <UserBookingManagement />
            </CardContent>
          </Card>

          {/* Equipment Rental */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Backpack className="w-5 h-5 text-green-500" />
                Equipment Rentals
              </CardTitle>
              <CardDescription>Rent trekking equipment</CardDescription>
            </CardHeader>
            <CardContent>
              <UserRentalManagement />
            </CardContent>
          </Card>

          {/* Weather Dashboard */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CloudSun className="w-5 h-5 text-orange-500" />
                Weather Conditions
              </CardTitle>
              <CardDescription>Check weather for trekking routes</CardDescription>
            </CardHeader>
            <CardContent>
              <UserWeatherDashboard />
            </CardContent>
          </Card>

          {/* Map Management */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="w-5 h-5 text-purple-500" />
                Trekking Routes
              </CardTitle>
              <CardDescription>Explore trekking routes and maps</CardDescription>
            </CardHeader>
            <CardContent>
              <UserMapManagement />
            </CardContent>
          </Card>
        </div>

        {/* Agency Management - Full Width */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-red-500" />
              Book Guides & Agencies
            </CardTitle>
            <CardDescription>Find and book trekking guides and agencies</CardDescription>
          </CardHeader>
          <CardContent>
            <UserAgencyManagement />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
