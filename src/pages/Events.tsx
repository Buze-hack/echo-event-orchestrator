
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { EventCard } from "@/components/events/EventCard";
import { EventStatus } from "@/types";

// Mock event data - in a real app this would come from an API
const mockEvents = [
  {
    id: "1",
    title: "Tech Innovation Summit",
    description: "Join us for the biggest tech event of the year. Connect with industry leaders, explore cutting-edge innovations, and participate in hands-on workshops.",
    date: "2025-05-15",
    time: "09:00 AM - 06:00 PM",
    location: "Downtown Convention Center, San Francisco",
    category: "conference",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    status: "approved" as EventStatus,
    rating: 4.5,
    isPaid: true,
    price: 2999, // $29.99
    organizer: {
      name: "Tech Innovation Group",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    attendees: 350,
  },
  {
    id: "2",
    title: "Web Development Workshop",
    description: "Learn the latest web development techniques and tools in this hands-on workshop led by industry professionals.",
    date: "2025-06-10",
    time: "10:00 AM - 04:00 PM",
    location: "TechHub Co-working Space, New York",
    category: "workshop",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2084&q=80",
    status: "approved" as EventStatus,
    rating: 4.8,
    isPaid: false,
    price: 0,
    organizer: {
      name: "CodeCraft Academy",
      image: "",
    },
    attendees: 45,
  },
  {
    id: "3",
    title: "Startup Networking Mixer",
    description: "Connect with founders, investors, and startup enthusiasts in this casual networking event.",
    date: "2025-04-25",
    time: "06:00 PM - 09:00 PM",
    location: "Skyline Lounge, Chicago",
    category: "networking",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    status: "approved" as EventStatus,
    rating: 4.2,
    isPaid: true,
    price: 1500, // $15.00
    organizer: {
      name: "Founder's Network",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    attendees: 120,
  },
  {
    id: "4",
    title: "UX/UI Design Symposium",
    description: "Explore the latest trends in user experience and interface design with leading designers and researchers.",
    date: "2025-07-20",
    time: "09:30 AM - 05:30 PM",
    location: "Design Center, Austin",
    category: "conference",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    status: "approved" as EventStatus,
    rating: 4.7,
    isPaid: true,
    price: 3500, // $35.00
    organizer: {
      name: "Design Alliance",
      image: "",
    },
    attendees: 200,
  },
  {
    id: "5",
    title: "Data Science Bootcamp",
    description: "An intensive 2-day bootcamp covering data analysis, machine learning, and visualization techniques.",
    date: "2025-06-05",
    time: "09:00 AM - 05:00 PM",
    location: "Innovation Campus, Boston",
    category: "workshop",
    image: "https://images.unsplash.com/photo-1573164574511-73c773193279?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    status: "approved" as EventStatus,
    rating: 4.9,
    isPaid: true,
    price: 7999, // $79.99
    organizer: {
      name: "Data Science Institute",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    attendees: 80,
  },
  {
    id: "6",
    title: "Artificial Intelligence Meetup",
    description: "Monthly gathering of AI enthusiasts, researchers, and developers to discuss the latest in artificial intelligence.",
    date: "2025-05-30",
    time: "07:00 PM - 09:00 PM",
    location: "Tech Incubator, Seattle",
    category: "networking",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
    status: "approved" as EventStatus,
    rating: 4.4,
    isPaid: false,
    price: 0,
    organizer: {
      name: "AI Collective",
      image: "",
    },
    attendees: 95,
  },
];

export default function Events() {
  const [events, setEvents] = useState(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  
  // In a real app, this would be a useQuery call to fetch events from an API
  useEffect(() => {
    // This simulates filtering on the server or client side
    let filtered = events;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (event) => 
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(event => event.category === categoryFilter);
    }
    
    // Apply price filter
    if (priceFilter === "free") {
      filtered = filtered.filter(event => !event.isPaid || event.price === 0);
    } else if (priceFilter === "paid") {
      filtered = filtered.filter(event => event.isPaid && event.price > 0);
    }
    
    setFilteredEvents(filtered);
  }, [events, searchQuery, categoryFilter, priceFilter]);
  
  return (
    <>
      {/* Header Banner */}
      <div className="relative bg-primary text-primary-foreground py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Events</h1>
          <p className="text-lg md:w-2/3 text-primary-foreground/90">
            Find and join exciting events in your area. From tech conferences to networking mixers, 
            there's something for everyone.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto max-w-6xl py-8 px-6">
        {/* Filters */}
        <div className="mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Find Your Next Event</CardTitle>
              <CardDescription>
                Use the filters below to find the perfect event for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <Input
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="conference">Conferences</SelectItem>
                    <SelectItem value="workshop">Workshops</SelectItem>
                    <SelectItem value="networking">Networking</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="art">Art & Culture</SelectItem>
                    <SelectItem value="food">Food & Drink</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={priceFilter}
                  onValueChange={setPriceFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Events List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Link to={`/events/${event.id}`} key={event.id} className="block">
                <EventCard event={event} />
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-medium mb-2">No events found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search criteria.
              </p>
              <Button onClick={() => {
                setSearchQuery("");
                setCategoryFilter("all");
                setPriceFilter("all");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
