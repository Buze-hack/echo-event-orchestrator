
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserSidebar } from "@/components/dashboard/SidebarNav";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { EventCard } from "@/components/events/EventCard";
import { CheckCircle, Filter, Loader2, Search, ShieldAlert, Star, Users, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Mock data for pending events
const pendingEvents = [
  {
    id: "10",
    title: "AI Ethics Conference",
    date: "2025-09-15",
    time: "09:00 AM",
    location: "Tech University, Boston",
    category: "conference",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    status: "pending",
    organizer: "tech_enthusiast",
    submittedDate: "2025-05-01",
  },
  {
    id: "11",
    title: "Startup Networking Night",
    date: "2025-08-20",
    time: "07:00 PM",
    location: "Innovation Hub, New York",
    category: "networking",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    status: "pending",
    organizer: "startup_founder",
    submittedDate: "2025-05-02",
  },
  {
    id: "12",
    title: "Digital Art Exhibition",
    date: "2025-07-28",
    time: "11:00 AM",
    location: "Modern Gallery, Los Angeles",
    category: "art",
    image: "https://images.unsplash.com/photo-1594732832278-abd644401426?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    status: "pending",
    organizer: "digital_artist",
    submittedDate: "2025-05-04",
  },
];

// Mock data for users
const users = [
  {
    id: "u1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "user",
    eventsCreated: 8,
    registeredDate: "2025-01-15",
    lastActive: "2025-05-05",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "u2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "user",
    eventsCreated: 12,
    registeredDate: "2025-01-20",
    lastActive: "2025-05-04",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "u3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "admin",
    eventsCreated: 5,
    registeredDate: "2025-02-10",
    lastActive: "2025-05-05",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    id: "u4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "user",
    eventsCreated: 3,
    registeredDate: "2025-03-05",
    lastActive: "2025-05-01",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
  },
  {
    id: "u5",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    role: "user",
    eventsCreated: 0,
    registeredDate: "2025-04-20",
    lastActive: "2025-04-25",
    avatar: "https://randomuser.me/api/portraits/men/79.jpg",
  },
];

// Mock data for charts
const activityData = [
  { name: "Week 1", events: 12, users: 45, ratings: 28 },
  { name: "Week 2", events: 19, users: 53, ratings: 41 },
  { name: "Week 3", events: 16, users: 48, ratings: 37 },
  { name: "Week 4", events: 23, users: 60, ratings: 52 },
  { name: "Week 5", events: 18, users: 56, ratings: 43 },
  { name: "Week 6", events: 25, users: 67, ratings: 58 },
];

export default function AdminDashboard() {
  const { toast } = useToast();
  const [refreshing, setRefreshing] = useState(false);
  const [searchUsers, setSearchUsers] = useState("");
  
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast({
        title: "Dashboard Updated",
        description: "Admin dashboard has been refreshed with the latest data.",
      });
    }, 1000);
  };
  
  const handleApproveEvent = (id: string) => {
    toast({
      title: "Event Approved",
      description: "The event has been approved and is now live.",
    });
  };
  
  const handleRejectEvent = (id: string) => {
    toast({
      title: "Event Rejected",
      description: "The event has been rejected. The organizer will be notified.",
    });
  };
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchUsers.toLowerCase()) ||
    user.email.toLowerCase().includes(searchUsers.toLowerCase())
  );
  
  return (
    <div className="flex flex-col md:flex-row">
      <UserSidebar isAdmin />
      
      <div className="flex-1 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-heading">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage events, users, and monitor platform activity</p>
          </div>
          
          <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
            {refreshing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Refreshing
              </>
            ) : (
              "Refresh"
            )}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Users"
            value="346"
            description="28 new this month"
            icon={<Users className="h-5 w-5" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Events Created"
            value="158"
            description="this month"
            icon={<CheckCircle className="h-5 w-5" />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Pending Approval"
            value={pendingEvents.length.toString()}
            description="need review"
            icon={<ShieldAlert className="h-5 w-5" />}
          />
          <StatsCard
            title="Average Rating"
            value="4.6"
            description="across all events"
            icon={<Star className="h-5 w-5" />}
            trend={{ value: 0.2, isPositive: true }}
          />
        </div>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Platform Activity</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="events" stroke="#3538CD" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="users" stroke="#6941C6" />
                  <Line type="monotone" dataKey="ratings" stroke="#53B1FD" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="pending-events">
          <TabsList className="mb-6">
            <TabsTrigger value="pending-events">Pending Events</TabsTrigger>
            <TabsTrigger value="user-management">User Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending-events">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Events Requiring Approval</h2>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" /> Filter
                </Button>
              </div>
              
              {pendingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className="md:col-span-1">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="h-full w-full object-cover md:h-48"
                      />
                    </div>
                    <div className="p-6 md:col-span-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="bg-primary/10 text-primary">
                              {event.category}
                            </Badge>
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                              Pending
                            </Badge>
                          </div>
                          <h3 className="text-xl font-semibold">{event.title}</h3>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Submitted: {new Date(event.submittedDate).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span className="font-medium text-foreground">Date:</span> {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span className="font-medium text-foreground">Time:</span> {event.time}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span className="font-medium text-foreground">Organizer:</span> {event.organizer}
                        </div>
                      </div>
                      
                      <div className="mb-4 text-muted-foreground">
                        <span className="font-medium text-foreground">Location:</span> {event.location}
                      </div>
                      
                      <div className="flex gap-3">
                        <Button 
                          onClick={() => handleApproveEvent(event.id)} 
                          className="gap-2"
                        >
                          <CheckCircle className="h-4 w-4" /> Approve
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleRejectEvent(event.id)} 
                          className="gap-2 border-destructive text-destructive hover:bg-destructive/10"
                        >
                          <XCircle className="h-4 w-4" /> Reject
                        </Button>
                        <Button asChild variant="ghost">
                          <a href={`/events/${event.id}`} target="_blank" rel="noopener noreferrer">View Details</a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="user-management">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchUsers}
                    onChange={(e) => setSearchUsers(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" /> Filter
                </Button>
              </div>
              
              <div className="rounded-lg border">
                <div className="grid grid-cols-12 gap-2 p-4 border-b font-medium">
                  <div className="col-span-4">User</div>
                  <div className="col-span-2 text-center">Role</div>
                  <div className="col-span-2 text-center">Events</div>
                  <div className="col-span-2 text-center">Joined</div>
                  <div className="col-span-2 text-center">Actions</div>
                </div>
                
                {filteredUsers.map((user) => (
                  <div key={user.id} className="grid grid-cols-12 gap-2 p-4 items-center border-b last:border-0">
                    <div className="col-span-4 flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                    
                    <div className="col-span-2 text-center">
                      <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                        {user.role}
                      </Badge>
                    </div>
                    
                    <div className="col-span-2 text-center">{user.eventsCreated}</div>
                    
                    <div className="col-span-2 text-center text-sm text-muted-foreground">
                      {new Date(user.registeredDate).toLocaleDateString()}
                    </div>
                    
                    <div className="col-span-2 text-center">
                      <div className="flex justify-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Users className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          {user.role === "admin" ? (
                            <ShieldAlert className="h-4 w-4 text-destructive" />
                          ) : (
                            <ShieldAlert className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
