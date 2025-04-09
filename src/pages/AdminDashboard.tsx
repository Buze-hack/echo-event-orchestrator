
import { SidebarNav } from "@/components/dashboard/SidebarNav";
import { UserSidebar } from "@/components/dashboard/UserSidebar";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col md:flex-row">
      <UserSidebar isAdmin={true} />
      <div className="flex-1 p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        {/* Admin dashboard content will go here */}
      </div>
    </div>
  );
}
