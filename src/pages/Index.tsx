
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, User } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      {/* Navigation Header */}
      <nav className="border-b border-border/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-foreground">Your App</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" size="sm" className="gap-2">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Button>
              </Link>
              <Button size="sm" className="gap-2">
                <User className="w-4 h-4" />
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Welcome to Your App
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start building your amazing project here! This is your blank canvas ready to be transformed into something incredible.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="border-border/50 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LogIn className="w-5 h-5 text-primary" />
                  Secure Login
                </CardTitle>
                <CardDescription>
                  Beautiful and secure authentication system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/login">
                  <Button className="w-full">
                    Try Login Page
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  User Management
                </CardTitle>
                <CardDescription>
                  Comprehensive user profile and settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Coming Soon
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-primary rounded"></div>
                  More Features
                </CardTitle>
                <CardDescription>
                  Endless possibilities await your creativity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Explore
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="mt-12 space-y-4">
            <p className="text-muted-foreground">
              Ready to get started?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="gap-2">
                  <LogIn className="w-4 h-4" />
                  Sign In Now
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="gap-2">
                <User className="w-4 h-4" />
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
