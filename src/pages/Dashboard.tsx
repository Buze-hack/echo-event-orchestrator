
import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { SidebarNav } from "@/components/dashboard/SidebarNav";
import { UserSidebar } from "@/components/dashboard/UserSidebar";
import { 
  CalendarDays, 
  ChevronRight, 
  Clock, 
  LineChart as LineChartIcon, 
  Plus, 
  Star, 
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CreateEventModal } from "@/components/events/CreateEventModal";
import { AuthContext } from "@/App";
import { EventStatus } from "@/types";

// Mock data - this will be visible to all users
const userEvents = [
  {
    id: "1",
    title: "JavaScript Fundamentals Workshop",
    date: "2025-05-15",
    time: "2:00 PM - 4:00 PM",
    attendees: 28,
    rating: 4.7,
    status: "approved" as EventStatus,
  },
  {
    id: "2",
    title: "React State Management Deep Dive",
    date: "2025-06-10",
    time: "10:00 AM - 12:00 PM",
    attendees: 42,
    rating: 4.9,
    status: "approved" as EventStatus,
  },
  {
    id: "3",
    title: "Building Responsive Layouts with Tailwind",
    date: "2025-07-05",
    time: "1:00 PM - 3:30 PM",
    attendees: 0,
    rating: 0,
    status: "pending" as EventStatus,
  },
  {
    id: "4",
    title: "Advanced TypeScript Patterns",
    date: "2025-08-12",
    time: "9:00 AM - 11:30 AM",
    attendees: 15,
    rating: 4.2,
    status: "approved" as EventStatus,
  },
  {
    id: "5",
    title: "Introduction to GraphQL",
    date: "2025-09-03",
    time: "3:00 PM - 5:00 PM",
    attendees: 35,
    rating: 4.5,
    status: "approved" as EventStatus,
  },
];

const userRegistrations = [
  {
    id: "1",
    eventName: "Tech Innovation Summit",
    date: "2025-05-20",
    time: "9:00 AM - 6:00 PM",
    organizer: "Tech Innovation Group",
    ticket: "Regular",
    price: 2999, // cents
  },
  {
    id: "2",
    eventName: "AI Conference 2025",
    date: "2025-06-15",
    time: "10:00 AM - 4:00 PM",
    organizer: "AI Research Institute",
    ticket: "Early Bird",
    price: 4999, // cents
  },
  {
    id: "3",
    eventName: "Web Development Conference",
    date: "2025-07-22",
    time: "9:00 AM - 5:00 PM",
    organizer: "WebDev Community",
    ticket: "VIP",
    price: 7999, // cents
  },
  {
    id: "4",
    eventName: "Product Management Masterclass",
    date: "2025-08-14",
    time: "10:00 AM - 2:00 PM",
    organizer: "Product School",
    ticket: "Regular",
    price: 3999, // cents
  },
];

const analyticsData = {
  eventViews: [120, 150, 180, 220, 250, 280, 350],
  registrations: [10, 15, 20, 25, 30, 35, 42],
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user, isAdmin } = useContext(AuthContext);
  
  return (
    <div className="flex flex-col md:flex-row">
      <UserSidebar isAdmin={false} />
      
      <div className="flex-1 p-6 md:p-8 pt-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage your events, registrations, and profile.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <CreateEventModal />
            </div>
          </div>
          
          <div className="mb-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="myEvents">My Events</TabsTrigger>
                <TabsTrigger value="registered">Registered Events</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-8">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <StatsCard 
                    title="My Events"
                    value={userEvents.length.toString()}
                    description="Events you've created"
                    icon={CalendarDays}
                  />
                  <StatsCard 
                    title="Registered"
                    value={userRegistrations.length.toString()}
                    description="Events you're attending"
                    icon={Clock}
                  />
                  <StatsCard 
                    title="Total Attendees"
                    value="120"
                    description="Across all your events"
                    icon={Users}
                  />
                  <StatsCard 
                    title="Avg. Rating"
                    value="4.6"
                    description="For your events"
                    icon={Star}
                    iconColor="text-yellow-500"
                  />
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Events</CardTitle>
                      <CardDescription>
                        Events you have created or are managing.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {userEvents.slice(0, 3).map((event) => (
                          <div key={event.id} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{event.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {new Date(event.date).toLocaleDateString()} • {event.time}
                              </div>
                            </div>
                            <Badge
                              className={cn({
                                "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100": event.status === "pending",
                                "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100": event.status === "approved",
                                "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100": event.status === "rejected",
                              })}
                            >
                              {event.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setActiveTab("myEvents")}
                      >
                        View All Events
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Event Analytics</CardTitle>
                      <CardDescription>
                        Views and registrations for your events.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[250px] flex items-center justify-center">
                      <LineChartIcon className="h-16 w-16 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="myEvents">
                <Card>
                  <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <CardTitle>My Events</CardTitle>
                      <CardDescription>
                        All events you have created or are managing.
                      </CardDescription>
                    </div>
                    <Button className="mt-4 sm:mt-0 flex items-center gap-2">
                      <Plus className="h-4 w-4" /> Create Event
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Event Name</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Attendees</TableHead>
                          <TableHead>Rating</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {userEvents.map((event) => (
                          <TableRow key={event.id}>
                            <TableCell className="font-medium">{event.title}</TableCell>
                            <TableCell>
                              {new Date(event.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{event.time}</TableCell>
                            <TableCell>
                              <Badge
                                className={cn({
                                  "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100": event.status === "pending",
                                  "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100": event.status === "approved",
                                  "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100": event.status === "rejected",
                                })}
                              >
                                {event.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{event.attendees}</TableCell>
                            <TableCell>
                              {event.rating > 0 ? (
                                <div className="flex items-center">
                                  {event.rating}
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-1" />
                                </div>
                              ) : (
                                "No ratings"
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="registered">
                <Card>
                  <CardHeader>
                    <CardTitle>Registered Events</CardTitle>
                    <CardDescription>
                      Events you are attending or have registered for.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Event Name</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Organizer</TableHead>
                          <TableHead>Ticket</TableHead>
                          <TableHead>Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {userRegistrations.map((reg) => (
                          <TableRow key={reg.id}>
                            <TableCell className="font-medium">{reg.eventName}</TableCell>
                            <TableCell>
                              {new Date(reg.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{reg.time}</TableCell>
                            <TableCell>{reg.organizer}</TableCell>
                            <TableCell>{reg.ticket}</TableCell>
                            <TableCell>
                              ${(reg.price / 100).toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
