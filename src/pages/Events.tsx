
import { useState } from "react";
import { EventCard } from "@/components/events/EventCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";

// Mock data for event listings
const events = [
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
  {
    id: "3",
    title: "Entrepreneurship Workshop",
    date: "2025-06-10",
    time: "10:00 AM",
    location: "Business Center, Chicago",
    category: "workshop",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    status: "approved",
    rating: 4.2,
    attendees: 85,
  },
  {
    id: "4",
    title: "Art Gallery Opening",
    date: "2025-05-28",
    time: "07:00 PM",
    location: "Modern Art Museum, Los Angeles",
    category: "art",
    image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2942&q=80",
    status: "approved",
    rating: 4.0,
    attendees: 120,
  },
  {
    id: "5",
    title: "Food & Wine Festival",
    date: "2025-09-05",
    time: "12:00 PM",
    location: "Waterfront Park, Seattle",
    category: "food",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    status: "approved",
    rating: 4.7,
    attendees: 750,
  },
  {
    id: "6",
    title: "Charity Marathon",
    date: "2025-08-12",
    time: "07:00 AM",
    location: "City Park, Denver",
    category: "sports",
    image: "https://images.unsplash.com/photo-1533560696583-6441b688cd3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    status: "approved",
    rating: 4.3,
    attendees: 500,
  },
];

export default function Events() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState([0]);
  
  const filteredEvents = events.filter((event) => {
    // Apply search filter
    const matchesSearch = 
      searchQuery === "" ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply category filter
    const matchesCategory = 
      categoryFilter === "all" || event.category === categoryFilter;
    
    // Apply rating filter
    const matchesRating = event.rating >= ratingFilter[0];
    
    return matchesSearch && matchesCategory && matchesRating;
  });

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-6 gradient-heading">Discover Events</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-10">
        {/* Filter sidebar */}
        <div className="space-y-6 lg:border-r lg:pr-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium">Categories</h3>
            <Select
              value={categoryFilter}
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="conference">Conference</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="art">Art & Culture</SelectItem>
                <SelectItem value="food">Food & Drink</SelectItem>
                <SelectItem value="networking">Networking</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label>Minimum Rating</Label>
              <span className="text-muted-foreground">{ratingFilter[0]}</span>
            </div>
            <Slider
              value={ratingFilter}
              onValueChange={setRatingFilter}
              min={0}
              max={5}
              step={0.5}
            />
          </div>
          
          <Button variant="outline" 
                  onClick={() => {
                    setSearchQuery("");
                    setCategoryFilter("all");
                    setRatingFilter([0]);
                  }}
                  className="w-full">
            Reset Filters
          </Button>
        </div>
        
        {/* Event listing */}
        <div className="lg:col-span-3">
          <div className="mb-6 flex justify-between items-center">
            <p className="text-muted-foreground">Showing {filteredEvents.length} events</p>
            <Select defaultValue="newest">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="attendees">Most Attendees</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12 border rounded-lg">
              <h3 className="text-xl font-medium mb-2">No events found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters to find events.</p>
              <Button variant="outline" 
                      onClick={() => {
                        setSearchQuery("");
                        setCategoryFilter("all");
                        setRatingFilter([0]);
                      }}>
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
