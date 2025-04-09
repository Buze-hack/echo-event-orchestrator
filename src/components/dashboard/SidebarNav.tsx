
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface SidebarNavProps {
  items: {
    href: string;
    title: string;
    icon?: ReactNode;
  }[];
  className?: string;
}

export function SidebarNav({ items, className }: SidebarNavProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className={cn("flex flex-col gap-2", className)}>
      {items.map((item) => {
        const isActive = currentPath === item.href || 
                         (item.href !== "/" && currentPath.startsWith(item.href));
        
        return (
          <Button
            key={item.href}
            variant={isActive ? "secondary" : "ghost"}
            className={cn(
              "justify-start",
              isActive ? "bg-secondary text-secondary-foreground" : ""
            )}
            asChild
          >
            <Link to={item.href} className="flex items-center gap-2">
              {item.icon}
              {item.title}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}
