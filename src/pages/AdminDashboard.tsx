
import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { UserSidebar } from "@/components/dashboard/UserSidebar";
import { 
  CalendarDays, 
  ChevronRight, 
  Clock, 
  LayoutDashboard,
  Star, 
  ThumbsUp, 
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "@/App";
import { UserProfile } from "@/types";

const pendingEvents = [
  {
    id: "1",
    title: "Web Development Workshop",
    date: "2025-06-10",
    user_id: "user1",
    category: "workshop",
    location: "Online",
    status: "pending",
    organizer: {
      name: "John Smith",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  },
  {
    id: "2",
    title: "Data Science Conference",
    date: "2025-07-15",
    user_id: "user2",
    category: "conference",
    location: "Convention Center",
    status: "pending",
    organizer: {
      name: "Emily Chen",
      image: "https://randomuser.me/api/portraits/women/26.jpg"
    }
  },
  {
    id: "3",
    title: "Startup Networking Mixer",
    date: "2025-05-22",
    user_id: "user3",
    category: "networking",
    location: "Tech Hub Downtown",
    status: "pending",
    organizer: {
      name: "Michael Rodriguez",
      image: ""
    }
  },
];

const recentUsers = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar_url: "https://randomuser.me/api/portraits/women/44.jpg",
    created_at: "2025-04-01",
    role: "user"
  },
  {
    id: "2",
    name: "David Kim",
    email: "david@example.com",
    avatar_url: "https://randomuser.me/api/portraits/men/22.jpg",
    created_at: "2025-03-28",
    role: "user"
  },
  {
    id: "3",
    name: "Lisa Chen",
    email: "lisa@example.com",
    avatar_url: "",
    created_at: "2025-03-25",
    role: "user"
  },
];

export default function AdminDashboard() {
  const { toast } = useToast();
  const { user, isAdmin } = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState("overview");
  
  // If user is not admin, this page shouldn't be accessible anyway due to
  // the protected route in App.tsx, but adding an extra check just in case
  if (!isAdmin) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-semibold">Access Denied</h1>
        <p className="text-muted-foreground mt-2">
          You do not have permission to access this page.
        </p>
      </div>
    );
  }
  
  const handleApprove = (eventId: string) => {
    toast({
      title: "Event Approved",
      description: "The event has been approved and is now public.",
    });
  };
  
  const handleReject = (eventId: string) => {
    toast({
      title: "Event Rejected",
      description: "The event has been rejected.",
    });
  };
  
  const handleMakeAdmin = (userId: string) => {
    toast({
      title: "Role Updated",
      description: "User has been given admin privileges.",
    });
  };
  
  return (
    <div className="flex flex-col md:flex-row">
      <UserSidebar isAdmin items={[]} />
      
      <div className="flex-1 p-6 md:p-8 pt-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage events, users, and site settings.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Badge variant="default" className="text-sm">
                Admin User
              </Badge>
            </div>
          </div>
          
          <div className="mb-8">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-8">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <StatsCard 
                    title="Total Events"
                    value="26"
                    description="All time events"
                    icon={CalendarDays}
                  />
                  <StatsCard 
                    title="Pending Review"
                    value="3"
                    description="Events needing approval"
                    icon={Clock}
                    iconColor="text-amber-500"
                  />
                  <StatsCard 
                    title="Total Users"
                    value="247"
                    description="Registered users"
                    icon={Users}
                  />
                  <StatsCard 
                    title="Avg. Rating"
                    value="4.8"
                    description="Across all events"
                    icon={Star}
                    iconColor="text-yellow-500"
                  />
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Pending Approvals</CardTitle>
                      <CardDescription>
                        Recently submitted events requiring review
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {pendingEvents.slice(0, 3).map((event) => (
                          <div key={event.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarImage src={event.organizer.image} />
                                <AvatarFallback>
                                  {event.organizer.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{event.title}</div>
                                <div className="text-sm text-muted-foreground">
                                  {new Date(event.date).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setSelectedTab("events")}
                      >
                        View All
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Users</CardTitle>
                      <CardDescription>
                        Newly registered platform users
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentUsers.map((user) => (
                          <div key={user.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarImage src={user.avatar_url} />
                                <AvatarFallback>
                                  {user.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {new Date(user.created_at).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            <Badge variant={user.role === "admin" ? "default" : "outline"}>
                              {user.role}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setSelectedTab("users")}
                      >
                        View All Users
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="events">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Approval Queue</CardTitle>
                    <CardDescription>
                      Review and approve or reject submitted events.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Event Name</TableHead>
                          <TableHead>Organizer</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingEvents.map((event) => (
                          <TableRow key={event.id}>
                            <TableCell className="font-medium">{event.title}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={event.organizer.image} />
                                  <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{event.organizer.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="capitalize">
                                {event.category}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(event.date).toLocaleDateString()}
                            </TableCell>
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
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  size="sm"
                                  variant="default"
                                  onClick={() => handleApprove(event.id)}
                                >
                                  <ThumbsUp className="mr-1 h-4 w-4" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleReject(event.id)}
                                >
                                  Reject
                                </Button>
                              </div>
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
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>
                      Manage user accounts and permissions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Joined</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentUsers.map((userProfile: UserProfile & {email: string}) => (
                          <TableRow key={userProfile.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={userProfile.avatar_url} />
                                  <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{userProfile.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>{userProfile.email}</TableCell>
                            <TableCell>
                              <Badge
                                variant={userProfile.role === "admin" ? "default" : "outline"}
                              >
                                {userProfile.role}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(userProfile.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    Actions
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleMakeAdmin(userProfile.id)}>
                                    Make Admin
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    Delete Account
                                  </DropdownMenuItem>
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
