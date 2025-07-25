import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.role === "admin") {
      navigate("/admin");
    } else if (user?.role === "normal") {
      navigate("/user-dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome back
          </h1>
          <p className="text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-border/50 shadow-xl backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-primary hover:underline transition-colors"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
