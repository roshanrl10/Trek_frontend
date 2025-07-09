
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import { HotelBookingPage } from "./pages/user/HotelBookingPage";
import { EquipmentRentalPage } from "./pages/user/EquipmentRentalPage";
import { WeatherPage } from "./pages/user/WeatherPage";
import { MapsPage } from "./pages/user/MapsPage";
import { UserBookingsPage } from "./pages/user/UserBookingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/user-dashboard/hotels" element={<HotelBookingPage />} />
          <Route path="/user-dashboard/equipment" element={<EquipmentRentalPage />} />
          <Route path="/user-dashboard/weather" element={<WeatherPage />} />
          <Route path="/user-dashboard/maps" element={<MapsPage />} />
          <Route path="/user-dashboard/bookings" element={<UserBookingsPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
