
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        toast({
          title: "Authentication error",
          description: error.message,
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      if (data?.session) {
        // Check if the user has a profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.session.user.id);
        
        // If no profile exists, create one
        if (!profileData?.length && !profileError) {
          const userDetails = data.session.user.user_metadata || {};
          
          await supabase.from('profiles').insert([{
            id: data.session.user.id,
            name: userDetails.name || userDetails.full_name || 'User',
            avatar_url: userDetails.avatar_url || '',
            role: 'user' // Default role
          }]);
        }

        // Check if user is admin and redirect accordingly
        if (profileData && profileData.length > 0 && profileData[0].role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
        
        toast({
          title: "Authentication successful",
          description: "You are now logged in",
        });
      } else {
        navigate("/login");
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Authenticating...</h2>
        <p className="text-muted-foreground">Please wait while we log you in.</p>
      </div>
    </div>
  );
}
