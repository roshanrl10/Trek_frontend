
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hotel, Backpack, Users, Calendar, TrendingUp, MapPin } from "lucide-react";

export const AdminStats = () => {
  const stats = [
    {
      title: "Total Bookings",
      value: "1,234",
      change: "+12%",
      icon: Hotel,
      color: "text-blue-500"
    },
    {
      title: "Equipment Rented",
      value: "456",
      change: "+8%",
      icon: Backpack,
      color: "text-green-500"
    },
    {
      title: "Active Guides",
      value: "89",
      change: "+5%",
      icon: Users,
      color: "text-purple-500"
    },
    {
      title: "Routes Available",
      value: "67",
      change: "+3%",
      icon: MapPin,
      color: "text-orange-500"
    },
    {
      title: "This Month Revenue",
      value: "$45,678",
      change: "+15%",
      icon: TrendingUp,
      color: "text-emerald-500"
    },
    {
      title: "Upcoming Treks",
      value: "23",
      change: "+7%",
      icon: Calendar,
      color: "text-red-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{stat.change}</span> from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
