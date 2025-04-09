
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { EventCard } from "@/components/events/EventCard";
import { ArrowRight, Calendar, Search, Star, Users } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data for featured events
const featuredEvents = [
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
];

export default function Index() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-echo-purple to-echo-blue text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container relative z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Discover & Create Amazing Events
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mb-8 animate-fade-in opacity-90">
            Echo Events helps you find local events, organize your own gatherings, and connect with like-minded people.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            <Button asChild size="lg" className="bg-white text-echo-purple hover:bg-white/90">
              <Link to="/events">Browse Events</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/dashboard">Create Event</Link>
            </Button>
          </div>
          
          <div className="relative max-w-3xl w-full mt-12">
            <div className="absolute inset-0 bg-white rounded-lg blur-lg opacity-20"></div>
            <div className="relative flex items-center bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-1.5">
              <Input 
                placeholder="Search for events..." 
                className="flex-1 border-0 bg-transparent text-white placeholder:text-white/60 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button size="sm" className="bg-white text-echo-purple hover:bg-white/90">
                <Search className="h-4 w-4 mr-2" /> Search
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold gradient-heading mb-4">Why Choose Echo Events?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform makes event management simple and efficient for everyone.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Event Creation</h3>
              <p className="text-muted-foreground">
                Create and manage your events with our simple and intuitive interface.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Engagement</h3>
              <p className="text-muted-foreground">
                Connect with attendees, receive feedback, and build a community around your events.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Control</h3>
              <p className="text-muted-foreground">
                All events are reviewed by our team to ensure high quality and relevance.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Events Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold gradient-heading">Featured Events</h2>
            <Button asChild variant="ghost" className="gap-2">
              <Link to="/events">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
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
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-echo-purple to-echo-blue text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your Own Event?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Join thousands of event organizers who are using Echo Events to create memorable experiences.
          </p>
          <Button asChild size="lg" className="bg-white text-echo-purple hover:bg-white/90">
            <Link to="/dashboard">Get Started</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
