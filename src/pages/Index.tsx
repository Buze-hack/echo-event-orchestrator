
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { EventCard } from "@/components/events/EventCard";
import { EventStatus } from "@/types";

export default function Index() {
  // Mock featured events - in a real app, these would come from an API
  const featuredEvents = [
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
  ];
  
  const eventCategories = [
    {
      name: "Conferences",
      icon: "🎤",
      description: "Professional gatherings focused on specific industries or topics",
    },
    {
      name: "Workshops",
      icon: "🛠️",
      description: "Hands-on learning experiences led by experts",
    },
    {
      name: "Networking",
      icon: "🤝",
      description: "Social events designed for professional connection-building",
    },
    {
      name: "Music",
      icon: "🎵",
      description: "Concerts, festivals, and performances",
    },
    {
      name: "Sports",
      icon: "🏆",
      description: "Athletic competitions and recreational activities",
    },
    {
      name: "Arts & Culture",
      icon: "🎨",
      description: "Exhibitions, performances, and cultural celebrations",
    },
  ];
  
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
        <div className="container mx-auto px-6 py-24 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Discover, Join, and Create Amazing Events
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
              Find the perfect events in your area or create your own. Connect with like-minded 
              people and expand your horizons.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="text-lg">
                <Link to="/events">Find Events</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg text-white border-white hover:bg-white/10">
                <Link to="/dashboard">Create Event</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Events Section */}
      <div className="container mx-auto py-16 px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Featured Events</h2>
            <p className="text-muted-foreground mt-2">
              Discover popular and upcoming events you might be interested in.
            </p>
          </div>
          <Button asChild className="mt-4 md:mt-0" variant="outline">
            <Link to="/events">View All Events</Link>
          </Button>
        </div>
        
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {featuredEvents.map((event) => (
            <Link to={`/events/${event.id}`} key={event.id} className="block">
              <EventCard event={event} />
            </Link>
          ))}
        </div>
      </div>
      
      {/* Categories Section */}
      <div className="bg-secondary/50">
        <div className="container mx-auto py-16 px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
          
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {eventCategories.map((category) => (
              <Card key={category.name} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-muted-foreground">{category.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" asChild className="w-full">
                    <Link to={`/events?category=${category.name.toLowerCase()}`}>
                      Browse {category.name}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Create Event CTA */}
      <div className="container mx-auto py-16 px-6">
        <div className="bg-primary rounded-lg p-8 md:p-12 text-primary-foreground text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Host Your Own Event?</h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Create an event on our platform and reach thousands of potential attendees. 
            It's easy, fast, and free to get started.
          </p>
          <Button size="lg" asChild variant="secondary" className="text-lg">
            <Link to="/dashboard">Create Event Now</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
