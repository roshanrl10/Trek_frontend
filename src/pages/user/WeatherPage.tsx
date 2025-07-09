
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CloudSun, Cloud, Sun, CloudRain, Wind, Eye, Thermometer } from "lucide-react";

interface WeatherData {
  id: string;
  location: string;
  temperature: string;
  condition: string;
  icon: any;
  windSpeed: string;
  visibility: string;
  humidity: string;
  uvIndex: string;
  sunrise: string;
  sunset: string;
  recommendation: string;
  forecast: {
    day: string;
    high: string;
    low: string;
    condition: string;
    icon: any;
  }[];
}

export const WeatherPage = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState("");
  
  const [weatherData] = useState<WeatherData[]>([
    {
      id: "W001",
      location: "Everest Base Camp",
      temperature: "-5°C",
      condition: "Cloudy",
      icon: Cloud,
      windSpeed: "15 km/h",
      visibility: "Good (8km)",
      humidity: "65%",
      uvIndex: "3",
      sunrise: "06:45",
      sunset: "18:30",
      recommendation: "Good for trekking with proper gear",
      forecast: [
        { day: "Today", high: "-2°C", low: "-8°C", condition: "Cloudy", icon: Cloud },
        { day: "Tomorrow", high: "1°C", low: "-5°C", condition: "Partly Cloudy", icon: CloudSun },
        { day: "Day 3", high: "-1°C", low: "-7°C", condition: "Snow", icon: CloudRain },
        { day: "Day 4", high: "3°C", low: "-3°C", condition: "Sunny", icon: Sun },
        { day: "Day 5", high: "2°C", low: "-4°C", condition: "Cloudy", icon: Cloud }
      ]
    },
    {
      id: "W002",
      location: "Annapurna Circuit",
      temperature: "8°C",
      condition: "Sunny",
      icon: Sun,
      windSpeed: "8 km/h",
      visibility: "Excellent (15km)",
      humidity: "45%",
      uvIndex: "6",
      sunrise: "06:20",
      sunset: "18:45",
      recommendation: "Perfect conditions for trekking",
      forecast: [
        { day: "Today", high: "12°C", low: "4°C", condition: "Sunny", icon: Sun },
        { day: "Tomorrow", high: "14°C", low: "6°C", condition: "Sunny", icon: Sun },
        { day: "Day 3", high: "10°C", low: "3°C", condition: "Partly Cloudy", icon: CloudSun },
        { day: "Day 4", high: "8°C", low: "1°C", condition: "Cloudy", icon: Cloud },
        { day: "Day 5", high: "11°C", low: "5°C", condition: "Sunny", icon: Sun }
      ]
    },
    {
      id: "W003",
      location: "Langtang Valley",
      temperature: "2°C",
      condition: "Light Rain",
      icon: CloudRain,
      windSpeed: "12 km/h",
      visibility: "Moderate (5km)",
      humidity: "85%",
      uvIndex: "2",
      sunrise: "06:35",
      sunset: "18:25",
      recommendation: "Consider postponing trek",
      forecast: [
        { day: "Today", high: "5°C", low: "-1°C", condition: "Rain", icon: CloudRain },
        { day: "Tomorrow", high: "3°C", low: "-2°C", condition: "Rain", icon: CloudRain },
        { day: "Day 3", high: "7°C", low: "1°C", condition: "Cloudy", icon: Cloud },
        { day: "Day 4", high: "9°C", low: "3°C", condition: "Partly Cloudy", icon: CloudSun },
        { day: "Day 5", high: "11°C", low: "5°C", condition: "Sunny", icon: Sun }
      ]
    },
    {
      id: "W004",
      location: "Manaslu Circuit",
      temperature: "6°C",
      condition: "Partly Cloudy",
      icon: CloudSun,
      windSpeed: "10 km/h",
      visibility: "Good (10km)",
      humidity: "55%",
      uvIndex: "4",
      sunrise: "06:25",
      sunset: "18:35",
      recommendation: "Good conditions for experienced trekkers",
      forecast: [
        { day: "Today", high: "9°C", low: "2°C", condition: "Partly Cloudy", icon: CloudSun },
        { day: "Tomorrow", high: "7°C", low: "1°C", condition: "Cloudy", icon: Cloud },
        { day: "Day 3", high: "11°C", low: "4°C", condition: "Sunny", icon: Sun },
        { day: "Day 4", high: "8°C", low: "2°C", condition: "Partly Cloudy", icon: CloudSun },
        { day: "Day 5", high: "6°C", low: "0°C", condition: "Cloudy", icon: Cloud }
      ]
    }
  ]);

  const [filteredWeather, setFilteredWeather] = useState<WeatherData[]>(weatherData);

  const searchWeather = () => {
    if (searchLocation.trim() === "") {
      setFilteredWeather(weatherData);
    } else {
      const filtered = weatherData.filter(weather => 
        weather.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
      setFilteredWeather(filtered);
    }
  };

  const getRecommendationColor = (condition: string) => {
    if (condition.includes("Perfect")) return "text-green-600";
    if (condition.includes("Good")) return "text-blue-600";
    return "text-orange-600";
  };

  const getRecommendationBg = (condition: string) => {
    if (condition.includes("Perfect")) return "bg-green-100";
    if (condition.includes("Good")) return "bg-blue-100";
    return "bg-orange-100";
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
            <h1 className="text-xl font-bold">Weather Forecast</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Search Section */}
        <Card>
          <CardHeader>
            <CardTitle>Search Weather</CardTitle>
            <CardDescription>Check weather conditions for your trekking destination</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Location</Label>
                <Input
                  id="search"
                  placeholder="Search by location (e.g., Everest, Annapurna)"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchWeather()}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={searchWeather}>Search</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weather Cards */}
        <div className="space-y-6">
          {filteredWeather.map((weather) => (
            <Card key={weather.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{weather.location}</CardTitle>
                    <CardDescription>Current weather conditions</CardDescription>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRecommendationBg(weather.recommendation)} ${getRecommendationColor(weather.recommendation)}`}>
                    {weather.recommendation}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Current Weather */}
                  <div className="lg:col-span-1">
                    <div className="text-center space-y-4">
                      <weather.icon className="w-16 h-16 mx-auto text-blue-500" />
                      <div>
                        <div className="text-4xl font-bold">{weather.temperature}</div>
                        <div className="text-lg text-muted-foreground">{weather.condition}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="flex items-center gap-2">
                        <Wind className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm text-muted-foreground">Wind</div>
                          <div className="font-medium">{weather.windSpeed}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm text-muted-foreground">Visibility</div>
                          <div className="font-medium">{weather.visibility}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm text-muted-foreground">Humidity</div>
                          <div className="font-medium">{weather.humidity}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sun className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm text-muted-foreground">UV Index</div>
                          <div className="font-medium">{weather.uvIndex}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 5-Day Forecast */}
                  <div className="lg:col-span-2">
                    <h3 className="text-lg font-semibold mb-4">5-Day Forecast</h3>
                    <div className="space-y-3">
                      {weather.forecast.map((day, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <day.icon className="w-6 h-6 text-blue-500" />
                            <div>
                              <div className="font-medium">{day.day}</div>
                              <div className="text-sm text-muted-foreground">{day.condition}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{day.high}</div>
                            <div className="text-sm text-muted-foreground">{day.low}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sun Times */}
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">Sunrise: {weather.sunrise}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-orange-600" />
                      <span className="text-sm">Sunset: {weather.sunset}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredWeather.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No weather data found for this location.</p>
              <Button variant="outline" onClick={() => setFilteredWeather(weatherData)} className="mt-4">
                Show All Locations
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
