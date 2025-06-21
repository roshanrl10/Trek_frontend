
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudSun, Cloud, Sun, CloudRain } from "lucide-react";

export const WeatherDashboard = () => {
  const weatherData = [
    {
      location: "Everest Base Camp",
      temperature: "-5°C",
      condition: "Cloudy",
      icon: Cloud,
      windSpeed: "15 km/h",
      visibility: "Good"
    },
    {
      location: "Annapurna Circuit",
      temperature: "8°C",
      condition: "Sunny",
      icon: Sun,
      windSpeed: "8 km/h",
      visibility: "Excellent"
    },
    {
      location: "Langtang Valley",
      temperature: "2°C",
      condition: "Light Rain",
      icon: CloudRain,
      windSpeed: "12 km/h",
      visibility: "Moderate"
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Weather Conditions</h3>
      
      <div className="space-y-3">
        {weatherData.map((weather, index) => (
          <Card key={index} className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <weather.icon className="w-8 h-8 text-blue-500" />
                  <div>
                    <h4 className="font-medium">{weather.location}</h4>
                    <p className="text-sm text-muted-foreground">{weather.condition}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{weather.temperature}</div>
                  <div className="text-sm text-muted-foreground">
                    Wind: {weather.windSpeed}
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
