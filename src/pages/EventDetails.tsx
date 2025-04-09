
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Heart, MapPin, Share, Star, Users } from "lucide-react";
import { EventRating } from "@/components/events/EventRating";
import { EventComments } from "@/components/events/EventComments";
import { useToast } from "@/hooks/use-toast";
import { PaymentModal } from "@/components/payments/PaymentModal";
import { MpesaPaymentModal } from "@/components/payments/MpesaPaymentModal";

// Mock event data - in a real app this would come from an API
const event = {
  id: "1",
  title: "Tech Innovation Summit",
  description: "Join us for the biggest tech event of the year. Connect with industry leaders, explore cutting-edge innovations, and participate in hands-on workshops. The Tech Innovation Summit brings together the brightest minds in technology to discuss the future of AI, blockchain, IoT, and more.",
  date: "2025-05-15",
  time: "09:00 AM - 06:00 PM",
  location: "Downtown Convention Center, San Francisco",
  category: "conference",
  image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  status: "approved",
  rating: 4.5,
  isPaid: true,
  price: 2999, // $29.99
  organizer: {
    name: "Tech Innovation Group",
    image: undefined,
  },
  attendees: 350,
  paymentMethods: ["stripe", "mpesa"]
};

// Mock comments
const mockComments = [
  {
    id: "c1",
    user: {
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    content: "This was an amazing event! I learned so much and made great connections. Would definitely attend again next year.",
    createdAt: new Date(2025, 4, 16), // May 16, 2025
  },
  {
    id: "c2",
    user: {
      name: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    content: "The speakers were incredibly knowledgeable and the workshops were hands-on and practical. Great organization overall.",
    createdAt: new Date(2025, 4, 15), // May 15, 2025
  },
];

export default function EventDetails() {
  const { id } = useParams();
  const { toast } = useToast();
  
  // In a real app, we would fetch the event by ID from an API
  // const { data: event, isLoading, error } = useQuery({ queryKey: ['event', id], queryFn: () => fetchEventById(id) });
  
  const handleAttend = () => {
    toast({
      title: "Registration Successful",
      description: "You have registered for this event. Check your email for details.",
    });
  };
  
  const handleShare = () => {
    // In a real app, this would open a share dialog or copy a link
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Event link copied to clipboard!",
    });
  };
  
  const handleSave = () => {
    toast({
      title: "Event Saved",
      description: "This event has been added to your saved events.",
    });
  };
  
  if (!event) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-semibold">Event not found</h1>
      </div>
    );
  }
  
  return (
    <>
      <div className="relative h-80 md:h-96 bg-gradient-to-r from-echo-blue to-echo-purple overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover mix-blend-overlay opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
      </div>
      
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  {event.category}
                </Badge>
                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  Approved
                </Badge>
                {event.isPaid && (
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
                    Paid Event
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{event.rating.toFixed(1)}</span>
                </div>
                <div className="text-muted-foreground">
                  {event.attendees} attendees
                </div>
                {event.isPaid && (
                  <div className="font-medium text-primary">
                    ${(event.price / 100).toFixed(2)}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Date</div>
                    <div className="text-muted-foreground">
                      {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Time</div>
                    <div className="text-muted-foreground">{event.time}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 md:col-span-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-muted-foreground">{event.location}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <Avatar>
                  <AvatarImage src={event.organizer.image} />
                  <AvatarFallback>
                    {event.organizer.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm text-muted-foreground">Organized by</div>
                  <div className="font-medium">{event.organizer.name}</div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">About This Event</h2>
              <p className="text-muted-foreground whitespace-pre-line">
                {event.description}
              </p>
            </div>

            <div className="pt-4 border-t">
              <h2 className="text-xl font-semibold mb-4">Comments & Ratings</h2>
              <div className="space-y-8">
                <div className="flex flex-col items-center py-6 border-y">
                  <h3 className="text-xl font-semibold mb-4">Rate This Event</h3>
                  <EventRating eventId={event.id} />
                </div>
                
                <EventComments eventId={event.id} comments={mockComments} />
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="font-semibold text-xl mb-4">Join this Event</h3>
              <div className="space-y-4">
                {event.isPaid ? (
                  <div className="space-y-4">
                    <PaymentModal 
                      eventId={event.id} 
                      eventTitle={event.title}
                      price={event.price}
                    />
                    <MpesaPaymentModal 
                      eventId={event.id} 
                      eventTitle={event.title}
                      price={event.price}
                    />
                  </div>
                ) : (
                  <Button onClick={handleAttend} className="w-full">
                    <Users className="mr-2 h-4 w-4" /> Attend Event
                  </Button>
                )}
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handleSave} className="flex-1">
                    <Heart className="mr-2 h-4 w-4" /> Save
                  </Button>
                  <Button variant="outline" onClick={handleShare} className="flex-1">
                    <Share className="mr-2 h-4 w-4" /> Share
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="font-semibold text-xl mb-4">Event Ratings</h3>
              <EventRating
                readonly
                showAverage
                eventId={event.id}
                averageRating={event.rating}
                totalRatings={42} 
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
