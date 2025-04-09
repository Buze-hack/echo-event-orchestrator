
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Oops! We couldn't find that page.</p>
        <Button asChild size="lg" className="gap-2">
          <Link to="/">
            <Home className="h-4 w-4" /> Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
