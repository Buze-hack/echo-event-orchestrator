
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Authentication error:", error);
          setError(error.message);
          toast({
            title: "Authentication error",
            description: error.message,
            variant: "destructive",
          });
          return;
        }

        if (!data?.session) {
          setError("No session found. Please try logging in again.");
          navigate("/login");
          return;
        }

        // Check if the user has a profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.session.user.id)
          .single();
        
        // If no profile exists, create one
        let userProfile = profileData;
        if (profileError && profileError.code === 'PGRST116') {
          const userDetails = data.session.user.user_metadata || {};
          
          const { error: insertError } = await supabase.from('profiles').insert([{
            id: data.session.user.id,
            name: userDetails.name || userDetails.full_name || userDetails.email?.split('@')[0] || 'User',
            avatar_url: userDetails.avatar_url || '',
            role: 'user' // Default role
          }]);
          
          if (insertError) {
            console.error("Profile creation error:", insertError);
            setError("Error creating user profile");
            return;
          }
          
          // Fetch the profile after creation
          const { data: newProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.session.user.id)
            .single();
            
          userProfile = newProfile;
        }

        // Redirect to homepage regardless of user role
        navigate('/');
        
        toast({
          title: "Authentication successful",
          description: "You are now logged in",
        });
      } catch (err) {
        console.error("Unexpected error during authentication:", err);
        setError("An unexpected error occurred. Please try again.");
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center max-w-md mx-auto p-6 bg-card border rounded-lg shadow-sm">
        {error ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center text-destructive mb-4">
              <AlertCircle className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Authentication Failed</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <p className="text-sm text-muted-foreground mb-6">
              This may be due to missing or incorrect Supabase credentials. Please check your environment variables.
            </p>
            <div className="space-y-2">
              <Button onClick={() => navigate('/login')} className="w-full">
                Return to Login
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-2">Authenticating...</h2>
            <p className="text-muted-foreground">Please wait while we log you in.</p>
          </div>
        )}
      </div>
    </div>
  );
}
