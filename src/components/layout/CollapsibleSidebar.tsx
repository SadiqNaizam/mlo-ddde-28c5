import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarClock,
  Warehouse,
  ClipboardList,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ChefHat,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/recipe-management", icon: BookOpen, label: "Recipes" },
  { to: "/inventory-tracking", icon: Warehouse, label: "Inventory" },
  { to: "/baking-schedule", icon: CalendarClock, label: "Schedule" },
  { to: "/order-fulfillment", icon: ClipboardList, label: "Orders" },
];

const CollapsibleSidebar: React.FC = () => {
  console.log('CollapsibleSidebar loaded');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={cn(
        "relative hidden h-screen border-r bg-background transition-all duration-300 ease-in-out md:flex flex-col",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-16 items-center border-b px-4 justify-center">
        <NavLink to="/" className="flex items-center gap-2 font-semibold">
          <ChefHat className="h-7 w-7 text-primary" />
          <span
            className={cn(
              "transition-opacity duration-200",
              isCollapsed ? "opacity-0 w-0" : "opacity-100"
            )}
          >
            Artisan
          </span>
        </NavLink>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navItems.map((item) => (
          <Tooltip key={item.to} delayDuration={0}>
            <TooltipTrigger asChild>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted",
                    isActive && "bg-muted text-primary",
                    isCollapsed && "justify-center"
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                <span className={cn("whitespace-nowrap", isCollapsed && "hidden")}>
                  {item.label}
                </span>
              </NavLink>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">
                <p>{item.label}</p>
              </TooltipContent>
            )}
          </Tooltip>
        ))}
      </nav>
      
      <div className="mt-auto border-t p-4">
         <Button variant="outline" size="icon" onClick={toggleSidebar} className="w-full">
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>

    </aside>
  );
};

export default CollapsibleSidebar;