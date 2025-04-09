
import { SidebarNav } from "./SidebarNav";
import { CalendarClock, Home, LayoutDashboard, LineChart, Settings, Users } from "lucide-react";

const userNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: "My Events",
    href: "/dashboard/events",
    icon: <CalendarClock className="h-4 w-4" />,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: <LineChart className="h-4 w-4" />,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-4 w-4" />,
  },
];

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: "Event Approval",
    href: "/admin/events",
    icon: <CalendarClock className="h-4 w-4" />,
  },
  {
    title: "User Management",
    href: "/admin/users",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: <LineChart className="h-4 w-4" />,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: <Settings className="h-4 w-4" />,
  },
];

interface UserSidebarProps {
  isAdmin?: boolean;
}

export function UserSidebar({ isAdmin = false }: UserSidebarProps) {
  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <div className="w-full md:w-64 md:border-r md:h-[calc(100vh-64px)] md:sticky md:top-16 flex-shrink-0">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-6 pl-2">
          {isAdmin ? "Admin Panel" : "User Dashboard"}
        </h2>
        <SidebarNav items={navItems} />
      </div>
    </div>
  );
}
