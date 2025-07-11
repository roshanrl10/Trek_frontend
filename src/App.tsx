import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Page Imports
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import { HotelBookingPage } from "./pages/user/HotelBookingPage";
import { EquipmentRentalPage } from "./pages/user/EquipmentRentalPage";
import { WeatherPage } from "./pages/user/WeatherPage";
import { MapsPage } from "./pages/user/MapsPage";
import { UserBookingsPage } from "./pages/user/UserBookingsPage";
import { AgenciesPage } from "./pages/user/AgenciesPage";

const queryClient = new QueryClient();

// ✅ Role-based redirect logic
const RoleRedirect = () => {
  const user = localStorage.getItem("user");
  if (!user) return <Navigate to="/login" replace />;

  try {
    const parsedUser = JSON.parse(user);
    if (parsedUser.role === "admin") return <Navigate to="/admin" replace />;
    return <Navigate to="/user-dashboard" replace />;
  } catch {
    return <Navigate to="/login" replace />;
  }
};

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

          {/* ✅ Role-based smart redirect */}
          <Route path="/dashboard" element={<RoleRedirect />} />

          {/* Admin and User Dashboards */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />

          {/* User Routes */}
          <Route path="/user-dashboard/hotels" element={<HotelBookingPage />} />
          <Route
            path="/user-dashboard/equipment"
            element={<EquipmentRentalPage />}
          />
          <Route path="/user-dashboard/agencies" element={<AgenciesPage />} />
          <Route path="/user-dashboard/weather" element={<WeatherPage />} />
          <Route path="/user-dashboard/maps" element={<MapsPage />} />
          <Route
            path="/user-dashboard/bookings"
            element={<UserBookingsPage />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
