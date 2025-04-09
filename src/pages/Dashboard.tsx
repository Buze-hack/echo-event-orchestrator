
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserSidebar } from "@/components/dashboard/SidebarNav";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { EventCard } from "@/components/events/EventCard";
import { CreateEventModal } from "@/components/events/CreateEventModal";
import { CalendarClock, LineChart, Loader2, Star, Ticket, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock data
const myEvents = [
  {
    id: "5",
    title: "Design Workshop 2025",
    date: "2025-08-15",
    time: "02:00 PM",
    location: "Creative Studios, Austin",
    category: "workshop",
    image: "https://images.unsplash.com/photo-1561489413-985b06da5bee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    status: "pending",
    rating: 0,
    attendees: 0,
  },
  {
    id: "6",
    title: "Community Meetup",
    date: "2025-07-10",
    time: "06:30 PM",
    location: "Central Library, Boston",
    category: "networking",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    status: "approved",
    rating: 4.2,
    attendees: 45,
  },
  {
    id: "7",
    title: "Product Launch Party",
    date: "2025-06-20",
    time: "07:00 PM",
    location: "Tech Hub, Seattle",
    category: "networking",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    status: "approved",
    rating: 4.6,
    attendees: 120,
  },
];

const attendingEvents = [
  {
    id: "1",
    title: "Tech Innovation Summit",
    date: "2025-05-15",
    time: "09:00 AM",
    location: "Downtown Convention Center, San Francisco",
    category: "conference",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    status: "approved",
    rating: 4.5,
    attendees: 350,
  },
  {
    id: "2",
    title: "Summer Music Festival",
    date: "2025-07-20",
    time: "04:00 PM",
    location: "Central Park, New York",
    category: "music",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    status: "approved",
    rating: 4.8,
    attendees: 1200,
  },
];

// Mock data for charts
const monthlyStats = [
  { name: "Jan", events: 2, attendees: 85 },
  { name: "Feb", events: 3, attendees: 140 },
  { name: "Mar", events: 1, attendees: 60 },
  { name: "Apr", events: 4, attendees: 230 },
  { name: "May", events: 2, attendees: 120 },
  { name: "Jun", events: 3, attendees: 180 },
];

export default function Dashboard() {
  const { toast } = useToast();
  const [refreshing, setRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast({
        title: "Dashboard Updated",
        description: "Your dashboard has been refreshed with the latest data.",
      });
    }, 1000);
  };
  
  return (
    <div className="flex flex-col md:flex-row">
      <UserSidebar />
      
      <div className="flex-1 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-heading">User Dashboard</h1>
            <p className="text-muted-foreground">Manage your events and track performance</p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
              {refreshing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Refreshing
                </>
              ) : (
                "Refresh"
              )}
            </Button>
            <CreateEventModal />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Events"
            value="3"
            description="Created by you"
            icon={<CalendarClock className="h-5 w-5" />}
            trend={{ value: 33, isPositive: true }}
          />
          <StatsCard
            title="Total Attendees"
            value="165"
            description="Across all events"
            icon={<Users className="h-5 w-5" />}
            trend={{ value: 22, isPositive: true }}
          />
          <StatsCard
            title="Average Rating"
            value="4.4"
            description="From 87 ratings"
            icon={<Star className="h-5 w-5" />}
            trend={{ value: 5, isPositive: true }}
          />
          <StatsCard
            title="Tickets Sold"
            value="152"
            description="$3,840 revenue"
            icon={<Ticket className="h-5 w-5" />}
            trend={{ value: 18, isPositive: true }}
          />
        </div>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Monthly Performance</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyStats}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#3538CD" />
                  <YAxis yAxisId="right" orientation="right" stroke="#6941C6" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="events" fill="#3538CD" name="Events" />
                  <Bar yAxisId="right" dataKey="attendees" fill="#6941C6" name="Attendees" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="my-events">
          <TabsList className="mb-6">
            <TabsTrigger value="my-events">My Events</TabsTrigger>
            <TabsTrigger value="attending">Attending</TabsTrigger>
          </TabsList>
          
          <TabsContent value="my-events">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myEvents.map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  date={new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  time={event.time}
                  location={event.location}
                  category={event.category}
                  image={event.image}
                  status={event.status}
                  rating={event.rating}
                  attendees={event.attendees}
                />
              ))}
              <Card className="flex flex-col items-center justify-center p-6 border-dashed">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <CalendarClock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Create New Event</h3>
                <p className="text-center text-muted-foreground mb-4">
                  Share your events with the community
                </p>
                <CreateEventModal />
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="attending">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attendingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  date={new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  time={event.time}
                  location={event.location}
                  category={event.category}
                  image={event.image}
                  status={event.status}
                  rating={event.rating}
                  attendees={event.attendees}
                />
              ))}
              <Card className="flex flex-col items-center justify-center p-6 border-dashed">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Find More Events</h3>
                <p className="text-center text-muted-foreground mb-4">
                  Discover and join exciting events
                </p>
                <Button asChild>
                  <Link to="/events">Browse Events</Link>
                </Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
