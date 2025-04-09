
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarClock, LogIn, LogOut, Menu, Plus, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useContext } from "react";
import { AuthContext } from "@/App";
import { signOut } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreateEventModal } from "@/components/events/CreateEventModal";

export function Navbar() {
  const { user, isAdmin } = useContext(AuthContext);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    const { error } = await signOut();
    
    if (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <CalendarClock className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              EventHub
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
          {user && (
            <Link to={isAdmin ? "/admin" : "/dashboard"} className="text-sm font-medium hover:text-primary">
              {isAdmin ? "Admin" : "Dashboard"}
            </Link>
          )}
        </nav>
        
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              {!isAdmin && (
                <CreateEventModal />
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {user.profile?.name && <p className="font-medium">{user.profile.name}</p>}
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={isAdmin ? "/admin" : "/dashboard"}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button asChild className="hidden md:flex gap-2">
              <Link to="/login">
                <LogIn className="h-4 w-4" /> Sign In
              </Link>
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
                {user ? (
                  <>
                    <Link to={isAdmin ? "/admin" : "/dashboard"} className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md">
                      {isAdmin ? "Admin" : "Dashboard"}
                    </Link>
                    {!isAdmin && (
                      <CreateEventModal />
                    )}
                    <Button onClick={handleLogout} variant="destructive" className="mt-2 gap-2">
                      <LogOut className="h-4 w-4" /> Log Out
                    </Button>
                  </>
                ) : (
                  <Button asChild className="mt-2 gap-2">
                    <Link to="/login">
                      <LogIn className="h-4 w-4" /> Sign In
                    </Link>
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
