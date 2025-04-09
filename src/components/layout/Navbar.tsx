
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarClock, LogIn, Menu, Plus, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // For demo purposes only - in a real app this would come from auth
  const handleLoginToggle = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <CalendarClock className="h-6 w-6 text-echo-purple" />
            <span className="hidden font-bold sm:inline-block">
              Echo Events
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link to="/events" className="text-sm font-medium hover:text-primary">
            Events
          </Link>
          {isLoggedIn && (
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary">
              Dashboard
            </Link>
          )}
          <Link to="/about" className="text-sm font-medium hover:text-primary">
            About
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="hidden md:flex gap-2">
                <Plus className="h-4 w-4" /> Create Event
              </Button>
              <Link to="/dashboard">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          ) : (
            <Button onClick={handleLoginToggle} className="hidden md:flex gap-2">
              <LogIn className="h-4 w-4" /> Sign In
            </Button>
          )}
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                <Link to="/" className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md">
                  Home
                </Link>
                <Link to="/events" className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md">
                  Events
                </Link>
                {isLoggedIn && (
                  <>
                    <Link to="/dashboard" className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md">
                      Dashboard
                    </Link>
                    <Button variant="outline" size="sm" className="gap-2 mt-2">
                      <Plus className="h-4 w-4" /> Create Event
                    </Button>
                  </>
                )}
                <Link to="/about" className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md">
                  About
                </Link>
                {!isLoggedIn && (
                  <Button onClick={handleLoginToggle} className="mt-2 gap-2">
                    <LogIn className="h-4 w-4" /> Sign In
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
