
import { ChevronDown, Home, MessageCircle, Package, Settings, ShoppingBag, User, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import SidebarItem from "./SidebarItem";

interface SidebarProps {
  isSidebarOpen: boolean;
}

const Sidebar = ({ isSidebarOpen }: SidebarProps) => {
  const sidebarItems = [
    { icon: <Home size={20} />, label: "Dashboard", active: true, to: "/dashboard" },
    { icon: <Package size={20} />, label: "My Listings", count: 12, to: "/my-listings" },
    { icon: <ShoppingBag size={20} />, label: "Purchases", count: 3, to: "/purchases" },
    { icon: <MessageCircle size={20} />, label: "Messages", count: 5, to: "#" },
    { icon: <User size={20} />, label: "Profile", to: "/profile" },
    { icon: <Settings size={20} />, label: "Settings", to: "#" },
  ];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 mt-16 w-64 transform border-r border-border bg-card transition-transform md:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-4">
          <button className="w-full bg-primary text-white rounded-lg p-3 font-medium inline-flex items-center justify-center gap-2 hover-lift active:scale-95">
            <Plus className="h-4 w-4" />
            Create Listing
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto px-3 py-3">
          <ul className="space-y-1">
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                count={item.count}
                active={item.active}
                to={item.to}
              />
            ))}
          </ul>
        </nav>
        
        <div className="p-4 mt-auto border-t border-border">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Avatar"
              className="rounded-full h-9 w-9 object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Alex Johnson</p>
              <p className="text-xs text-foreground/60 truncate">alex@example.com</p>
            </div>
            <button className="p-1 rounded-md hover:bg-secondary transition-colors">
              <ChevronDown className="h-4 w-4 text-foreground/60" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
