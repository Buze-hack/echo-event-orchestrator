
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
import { Phone, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MpesaPaymentRequest } from "@/types";
import { initiateMpesaPayment } from "@/lib/supabase";
import { useContext } from "react";
import { AuthContext } from "@/App";

interface MpesaPaymentModalProps {
  eventId: string;
  eventTitle: string;
  price: number;
}

export function MpesaPaymentModal({ eventId, eventTitle, price }: MpesaPaymentModalProps) {
  const { toast } = useToast();
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePayment = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to make a payment",
        variant: "destructive",
      });
      return;
    }

    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const paymentRequest: MpesaPaymentRequest = {
        phoneNumber,
        amount: price,
        eventId,
        userId: user.id
      };
      
      const response = await initiateMpesaPayment(paymentRequest);
      
      if (response.success) {
        toast({
          title: "Payment Initiated",
          description: "Please check your phone to complete the M-Pesa payment.",
        });
        
        setOpen(false);
      } else {
        toast({
          title: "Payment Failed",
          description: response.message || "There was an error processing your payment. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Payment Failed",
        description: error.message || "There was an error processing your payment. Please try again.",
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
          <Phone className="mr-2 h-4 w-4" /> Pay with M-Pesa (${(price / 100).toFixed(2)})
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>M-Pesa Payment</DialogTitle>
          <DialogDescription>
            Pay for "{eventTitle}" (${(price / 100).toFixed(2)}) using M-Pesa.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                placeholder="Enter your M-Pesa phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Enter your phone number in international format (e.g., 254XXXXXXXXX)
              </p>
            </div>
            
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
              "Pay Now"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
