
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    } else {
      // Redirect to user dashboard
      navigate("/user-dashboard");
    }
  }, [navigate]);

  return (
    <div className="p-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Redirecting to dashboard...</h1>
      </div>
    </div>
  );
};

export default Dashboard;
