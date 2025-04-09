
import { useContext, useState, useEffect } from "react";
import { SidebarNav } from "@/components/dashboard/SidebarNav";
import { UserSidebar } from "@/components/dashboard/UserSidebar";
import { EventCard } from "@/components/events/EventCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarClock, Users, FileText, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/App";
import { fetchPendingEvents, fetchAllUsers, approveEvent, rejectEvent } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Event, EventStatus } from "@/types";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const { toast } = useToast();
  const [pendingEvents, setPendingEvents] = useState<Event[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const events = await fetchPendingEvents();
        setPendingEvents(events as Event[]);
        
        const usersData = await fetchAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [toast]);

  const handleApproveEvent = async (eventId: string) => {
    try {
      await approveEvent(eventId);
      setPendingEvents(pendingEvents.filter(event => event.id !== eventId));
      toast({
        title: "Event approved",
        description: "The event has been published successfully",
      });
    } catch (error) {
      console.error("Error approving event:", error);
      toast({
        title: "Error",
        description: "Failed to approve event",
        variant: "destructive",
      });
    }
  };

  const handleRejectEvent = async (eventId: string) => {
    try {
      await rejectEvent(eventId);
      setPendingEvents(pendingEvents.filter(event => event.id !== eventId));
      toast({
        title: "Event rejected",
        description: "The event has been rejected",
      });
    } catch (error) {
      console.error("Error rejecting event:", error);
      toast({
        title: "Error",
        description: "Failed to reject event",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <UserSidebar isAdmin={true} />
      <div className="flex-1 p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <Tabs defaultValue="pending-events" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending-events" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Pending Events</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Reports</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending-events" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Events Pending Approval</CardTitle>
                <CardDescription>
                  Review and manage events submitted by users
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-10">
                    <p>Loading events...</p>
                  </div>
                ) : pendingEvents.length > 0 ? (
                  <div className="space-y-6">
                    {pendingEvents.map((event) => (
                      <div key={event.id} className="border rounded-lg p-4">
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="md:col-span-2">
                            <h3 className="text-lg font-medium">{event.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              By {event.organizer.name} • Submitted on {new Date(event.date).toLocaleDateString()}
                            </p>
                            <p className="text-sm mb-4">{event.description}</p>
                            <div className="flex items-center gap-4">
                              <p className="text-sm flex items-center gap-1">
                                <CalendarClock className="h-4 w-4" />
                                {event.date} at {event.time}
                              </p>
                              {event.isPaid && (
                                <p className="text-sm font-medium">
                                  Price: ${(event.price || 0) / 100}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col justify-center gap-2">
                            <Button 
                              onClick={() => handleApproveEvent(event.id)}
                              className="w-full"
                            >
                              Approve
                            </Button>
                            <Button 
                              onClick={() => handleRejectEvent(event.id)}
                              variant="destructive"
                              className="w-full"
                            >
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p>No pending events to review.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  View and manage user accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-10">
                    <p>Loading users...</p>
                  </div>
                ) : users.length > 0 ? (
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-border">
                      <thead className="bg-muted">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Role
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Joined
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-card divide-y divide-border">
                        {users.map((user) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  {user.avatar_url ? (
                                    <img className="h-10 w-10 rounded-full" src={user.avatar_url} alt="" />
                                  ) : (
                                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                      <User className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                  )}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium">{user.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                              {new Date(user.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p>No users found.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reports & Analytics</CardTitle>
                <CardDescription>
                  View system statistics and reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Users
                      </CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{users.length}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Pending Events
                      </CardTitle>
                      <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{pendingEvents.length}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Admin Users
                      </CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {users.filter(u => u.role === 'admin').length}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
