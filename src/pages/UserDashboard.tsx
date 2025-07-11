import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Hotel,
  Backpack,
  CloudSun,
  Map,
  ArrowRight,
  Users,
  User,
} from "lucide-react";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    } else {
      try {
        const parsedUser = JSON.parse(user);
        setUsername(parsedUser.username);
      } catch (err) {
        console.error("Invalid user data:", err);
        navigate("/login");
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      {/* Header */}
      <div className="border-b border-border/40 backdrop-blur-sm bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-foreground">
              T-rek Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {username}
              </span>
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Quick Access */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card
            className="border-border/50 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate("/user-dashboard/bookings")}
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="w-5 h-5 text-purple-500" />
                My Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                View all your bookings and reservations
              </p>
              <Button variant="ghost" size="sm" className="mt-2 p-0">
                View Details <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardCard
            title="Hotel Booking"
            icon={<Hotel className="w-5 h-5 text-blue-500" />}
            description="Browse and book hotels for your trekking adventure"
            features={[
              "Filter by location and price",
              "View detailed hotel information",
              "Instant booking confirmation",
            ]}
            buttonText="Browse Hotels"
            onClick={() => navigate("/user-dashboard/hotels")}
          />

          <DashboardCard
            title="Equipment Rental"
            icon={<Backpack className="w-5 h-5 text-green-500" />}
            description="Rent professional trekking equipment"
            features={[
              "Professional grade equipment",
              "Filter by category and price",
              "Flexible rental periods",
            ]}
            buttonText="Browse Equipment"
            onClick={() => navigate("/user-dashboard/equipment")}
          />

          <DashboardCard
            title="Agencies & Guides"
            icon={<Users className="w-5 h-5 text-indigo-500" />}
            description="Book professional trekking agencies and guides"
            features={[
              "Experienced local guides",
              "Certified trekking agencies",
              "Multiple language support",
            ]}
            buttonText="Browse Agencies"
            onClick={() => navigate("/user-dashboard/agencies")}
          />

          <DashboardCard
            title="Weather Forecast"
            icon={<CloudSun className="w-5 h-5 text-orange-500" />}
            description="Check detailed weather for trekking routes"
            features={[
              "5-day detailed forecasts",
              "Trekking recommendations",
              "Multiple locations",
            ]}
            buttonText="Check Weather"
            onClick={() => navigate("/user-dashboard/weather")}
          />

          <DashboardCard
            title="Trekking Routes & Maps"
            icon={<Map className="w-5 h-5 text-purple-500" />}
            description="Explore detailed trekking routes and maps"
            features={[
              "Interactive route maps",
              "Detailed waypoint information",
              "GPS data download",
            ]}
            buttonText="Explore Maps"
            onClick={() => navigate("/user-dashboard/maps")}
          />
        </div>
      </div>
    </div>
  );
};

// Reusable Card Component
const DashboardCard = ({
  title,
  icon,
  description,
  features,
  buttonText,
  onClick,
}: any) => (
  <Card
    className="border-border/50 hover:shadow-lg transition-shadow cursor-pointer"
    onClick={onClick}
  >
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        {icon} {title}
      </CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        {features.map((feature: string, idx: number) => (
          <p key={idx} className="text-sm text-muted-foreground">
            • {feature}
          </p>
        ))}
      </div>
      <Button className="w-full mt-4">
        {buttonText} <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </CardContent>
  </Card>
);

export default UserDashboard;
