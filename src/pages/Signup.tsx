
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { Mail, KeyRound, User, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setConnectionError(null);
    
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password should be at least 6 characters",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Create the user in Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      
      if (error) {
        if (error.message.includes("fetch failed") || error.message.includes("network")) {
          setConnectionError("Failed to connect to authentication service. Please check your Supabase credentials.");
          console.error("Supabase connection error:", error);
        } else {
          toast({
            title: "Signup failed",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }

      // Create a profile entry for the new user
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: data.user.id, 
              name, 
              avatar_url: '', 
              role: 'user' as const
            }
          ]);
        
        if (profileError) {
          if (profileError.message.includes("fetch failed") || profileError.message.includes("network")) {
            setConnectionError("Failed to connect to database service. Please check your Supabase credentials.");
            console.error("Supabase connection error:", profileError);
          } else {
            toast({
              title: "Profile creation failed",
              description: profileError.message,
              variant: "destructive",
            });
          }
          return;
        }
      }
      
      toast({
        title: "Account created",
        description: "Please check your email to verify your account",
      });
      
      navigate('/login');
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "An error occurred during signup",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setIsLoading(true);
      setConnectionError(null);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) {
        if (error.message.includes("fetch failed") || error.message.includes("network")) {
          setConnectionError("Failed to connect to authentication service. Please check your Supabase credentials.");
          console.error("Supabase connection error:", error);
        } else {
          toast({
            title: "Google signup failed",
            description: error.message,
            variant: "destructive",
          });
        }
      }
      
    } catch (error: any) {
      toast({
        title: "Google signup failed",
        description: error.message || "An error occurred during Google signup",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-12rem)] px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {connectionError && (
            <div className="p-3 border border-destructive/50 rounded-md bg-destructive/10 text-destructive flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">{connectionError}</p>
                <p className="text-xs mt-1">
                  Make sure your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables are correctly set.
                </p>
              </div>
            </div>
          )}
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleGoogleSignup}
            disabled={isLoading}
          >
            <FcGoogle className="mr-2 h-5 w-5" /> Continue with Google
          </Button>
          
          <div className="flex items-center space-x-2">
            <Separator className="flex-grow" />
            <span className="text-xs text-muted-foreground">OR</span>
            <Separator className="flex-grow" />
          </div>
          
          <form onSubmit={handleEmailSignup} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  id="name"
                  placeholder="Full name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  id="email"
                  placeholder="Email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
                <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  id="confirm-password"
                  placeholder="Confirm password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
                <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
