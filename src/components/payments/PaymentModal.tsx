
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreditCard, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentModalProps {
  eventId: string;
  eventTitle: string;
  price: number;
}

export function PaymentModal({ eventId, eventTitle, price }: PaymentModalProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      // In a real app, you would call your Supabase edge function here
      // const { data, error } = await supabase.functions.invoke('create-checkout', {
      //   body: { eventId, price },
      // });
      
      // if (error) throw error;
      
      // Simulate a successful payment for now
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to Stripe checkout page
      // window.location.href = data.url;
      
      toast({
        title: "Payment Processed",
        description: "You have successfully registered for this event.",
      });
      
      setOpen(false);
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <CreditCard className="mr-2 h-4 w-4" /> Pay & Register (${(price / 100).toFixed(2)})
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
          <DialogDescription>
            You're about to register for "{eventTitle}" for ${(price / 100).toFixed(2)}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            You will be redirected to our secure payment processor to complete this transaction.
          </p>
          <div className="rounded-md bg-secondary p-4">
            <div className="flex justify-between mb-2">
              <span>Event Registration</span>
              <span>${(price / 100).toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 mt-2 font-semibold flex justify-between">
              <span>Total</span>
              <span>${(price / 100).toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handlePayment} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Proceed to Payment"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
