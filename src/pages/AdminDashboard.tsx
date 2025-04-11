import { useState } from "react";
import { UserSidebar } from "@/components/dashboard/UserSidebar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Clock,
  CalendarDays,
  Users as UsersIcon,
  Star,
  Search,
  Filter,
  Check,
  X,
  MoreHorizontal,
  Calendar,
  User as UserIcon
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserProfile, EventStatus } from "@/types";

// Mock data - in a real app, this would come from an API
const pendingEvents = [
  {
    id: "1",
    title: "AI Workshop for Beginners",
    date: "2025-06-15",
    time: "10:00 AM",
    organizer: "TechLearn Inc.",
    location: "Online",
    category: "workshop",
    status: "pending" as EventStatus,
  },
  {
    id: "2",
    title: "Data Science Bootcamp",
    date: "2025-07-10",
    time: "9:00 AM",
    organizer: "DataGeeks",
    location: "New York Convention Center",
    category: "workshop",
    status: "pending" as EventStatus,
  },
  {
    id: "3",
    title: "Digital Marketing Trends 2025",
    date: "2025-08-05",
    time: "2:00 PM",
    organizer: "Marketing Pros",
    location: "Online",
    category: "conference",
    status: "pending" as EventStatus,
  },
  {
    id: "4",
    title: "UX/UI Design Basics",
    date: "2025-08-25",
    time: "11:00 AM",
    organizer: "Design Academy",
    location: "San Francisco Tech Hub",
    category: "workshop",
    status: "pending" as EventStatus,
  }
];

const recentEvents = [
  {
    id: "100",
    title: "Tech Innovation Summit",
    date: "2025-05-01",
    organizer: "Tech Innovation Group",
    status: "approved" as EventStatus,
    attendees: 350,
  },
  {
    id: "101",
    title: "Startup Funding Workshop",
    date: "2025-05-05",
    organizer: "Venture Capital Association",
    status: "approved" as EventStatus,
    attendees: 120,
  },
  {
    id: "102",
    title: "Blockchain Technology Conference",
    date: "2025-05-08",
    organizer: "Blockchain Foundation",
    status: "approved" as EventStatus,
    attendees: 250,
  },
  {
    id: "103",
    title: "Sustainable Tech Meetup",
    date: "2025-05-12",
    organizer: "Green Tech Initiative",
    status: "approved" as EventStatus,
    attendees: 85,
  },
  {
    id: "104",
    title: "App Development Hackathon",
    date: "2025-05-15",
    organizer: "Dev Community",
    status: "rejected" as EventStatus,
    attendees: 0,
  },
];

const recentUsers: UserProfile[] = [
  {
    id: "u1",
    name: "Alex Johnson",
    avatar_url: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "user",
    created_at: "2025-04-01T10:23:45Z",
    email: "alex.johnson@example.com",
  },
  {
    id: "u2",
    name: "Sophia Williams",
    avatar_url: "https://randomuser.me/api/portraits/women/44.jpg",
    role: "user",
    created_at: "2025-04-03T15:12:33Z",
    email: "sophia.w@example.com",
  },
  {
    id: "u3",
    name: "Marcus Lee",
    avatar_url: "https://randomuser.me/api/portraits/men/55.jpg",
    role: "admin",
    created_at: "2025-04-05T08:44:21Z",
    email: "marcus.admin@example.com",
  },
  {
    id: "u4",
    name: "Emma Thompson",
    avatar_url: "https://randomuser.me/api/portraits/women/22.jpg",
    role: "user",
    created_at: "2025-04-08T12:34:56Z",
    email: "emma.t@example.com",
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="flex flex-col md:flex-row">
      <UserSidebar isAdmin={true} />
      
      <div className="flex-1 p-6 md:p-8 pt-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage events, users, and platform settings.
              </p>
            </div>
          </div>
          
          <div className="mb-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-8">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <StatsCard 
                    title="Total Events"
                    value="256"
                    description="Across all categories"
                    icon={CalendarDays}
                  />
                  <StatsCard 
                    title="Pending Review"
                    value={pendingEvents.length.toString()}
                    description="Events awaiting approval"
                    icon={Clock}
                  />
                  <StatsCard 
                    title="Total Users"
                    value="1,244"
                    description="Registered accounts"
                    icon={UsersIcon}
                  />
                  <StatsCard 
                    title="Avg. Rating"
                    value="4.5"
                    description="Across all events"
                    icon={Star}
                    iconColor="text-yellow-500"
                  />
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Pending Event Approvals</CardTitle>
                      <CardDescription>
                        Events awaiting your review and approval.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {pendingEvents.map((event) => (
                          <div key={event.id} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{event.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {event.date} • {event.time}
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Check className="mr-2 h-4 w-4" /> Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <X className="mr-2 h-4 w-4" /> Reject
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View All Pending Events
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>
                        Overview of recent events and user activity.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-none space-y-4">
                        {recentEvents.map((event) => (
                          <li key={event.id} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{event.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {event.date} • {event.organizer}
                              </div>
                            </div>
                            <Badge variant="secondary">{event.status}</Badge>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="events">
                <Card>
                  <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <CardTitle>Manage Events</CardTitle>
                      <CardDescription>
                        View, edit, and manage all events on the platform.
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Search events..."
                          className="pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Event Name</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Organizer</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Attendees</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentEvents.map((event) => (
                          <TableRow key={event.id}>
                            <TableCell className="font-medium">{event.title}</TableCell>
                            <TableCell>{event.date}</TableCell>
                            <TableCell>{event.organizer}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{event.status}</Badge>
                            </TableCell>
                            <TableCell>{event.attendees}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Edit</DropdownMenuItem>
                                  <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="users">
                <Card>
                  <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <CardTitle>Manage Users</CardTitle>
                      <CardDescription>
                        View, edit, and manage all registered users.
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Search users..."
                          className="pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Joined Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Avatar>
                                  <AvatarImage src={user.avatar_url} alt={user.name} />
                                  <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <span>{user.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{user.role}</Badge>
                            </TableCell>
                            <TableCell>
                              <Calendar className="mr-2 inline-block h-4 w-4 align-middle" />
                              {new Date(user.created_at || '').toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Edit</DropdownMenuItem>
                                  <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
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
