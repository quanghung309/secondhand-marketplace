
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, ChevronDown, Home, Menu, MessageCircle, Package, Plus, Search, Settings, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const sidebarItems = [
    { icon: <Home size={20} />, label: "Dashboard", active: true },
    { icon: <Package size={20} />, label: "My Listings", count: 12 },
    { icon: <ShoppingBag size={20} />, label: "Purchases", count: 3 },
    { icon: <MessageCircle size={20} />, label: "Messages", count: 5 },
    { icon: <User size={20} />, label: "Profile" },
    { icon: <Settings size={20} />, label: "Settings" },
  ];
  
  const recentItems = [
    {
      id: 1,
      title: "Vintage Camera",
      price: 120,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=200&h=200&auto=format&fit=crop",
      status: "Active",
      views: 24,
    },
    {
      id: 2,
      title: "Leather Backpack",
      price: 85,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=200&h=200&auto=format&fit=crop",
      status: "Active",
      views: 18,
    },
    {
      id: 3,
      title: "Bluetooth Speaker",
      price: 45,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=200&h=200&auto=format&fit=crop",
      status: "Sold",
      views: 32,
    },
  ];
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-border">
        <div className="flex h-16 items-center px-4 md:px-6">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mr-2 rounded-md p-2 text-foreground/60 hover:bg-secondary transition-colors md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <span>ReMarket</span>
          </Link>
          
          <div className="ml-auto flex items-center gap-4">
            <form className="hidden md:flex relative max-w-sm items-center">
              <Search className="absolute left-2.5 h-4 w-4 text-foreground/60" />
              <input
                type="search"
                placeholder="Search listings..."
                className="rounded-full bg-secondary h-9 w-[280px] pl-8 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
            </form>
            
            <button className="rounded-full w-9 h-9 inline-flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-secondary transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary rounded-full"></span>
            </button>
            
            <button className="flex items-center gap-2 rounded-full p-1.5 text-sm font-medium hover:bg-secondary transition-colors">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Avatar"
                  className="rounded-full h-7 w-7 object-cover"
                />
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white"></span>
              </div>
              <span className="hidden md:inline">Alex Johnson</span>
              <ChevronDown className="h-4 w-4 text-foreground/60" />
            </button>
          </div>
        </div>
      </header>
      
      <div className="flex">
        {/* Sidebar */}
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
                  <li key={item.label}>
                    <Link
                      to="#"
                      className={cn(
                        "flex items-center justify-between rounded-lg py-2 px-3 text-sm font-medium transition-colors",
                        item.active
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/70 hover:bg-secondary"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      {item.count && (
                        <span className={cn(
                          "rounded-full text-xs px-2 py-0.5",
                          item.active
                            ? "bg-primary text-white"
                            : "bg-secondary text-foreground/70"
                        )}>
                          {item.count}
                        </span>
                      )}
                    </Link>
                  </li>
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
        
        {/* Backdrop (mobile) */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-10 bg-black/20 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        {/* Main content */}
        <main className={cn(
          "flex-1 transition-all",
          isSidebarOpen ? "md:ml-64" : "ml-0"
        )}>
          <div className="container max-w-5xl py-6 px-4 md:px-6 lg:py-8">
            {/* Page header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
              <p className="text-foreground/60">Welcome back, Alex. Here's what's happening with your account.</p>
            </div>
            
            {/* Stats */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {[
                { label: "Active Listings", value: "12", change: "+2", up: true },
                { label: "Total Sales", value: "$1,240", change: "+12%", up: true },
                { label: "Messages", value: "5", change: "-1", up: false },
                { label: "Profile Views", value: "142", change: "+24%", up: true },
              ].map((stat, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-5 hover-lift">
                  <div className="text-foreground/60 text-sm font-medium">{stat.label}</div>
                  <div className="mt-1 flex items-end justify-between">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className={cn(
                      "flex items-center text-xs",
                      stat.up ? "text-green-500" : "text-red-500"
                    )}>
                      {stat.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Recent listings */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Recent Listings</h2>
                <Link to="/my-listings" className="text-sm text-primary hover:underline">
                  View all
                </Link>
              </div>
              
              <div className="grid gap-6 md:grid-cols-3">
                {recentItems.map((item) => (
                  <div key={item.id} className="rounded-xl border border-border bg-card overflow-hidden hover-lift">
                    <div className="relative aspect-square bg-secondary">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <span className={cn(
                          "inline-block rounded-full px-2 py-1 text-xs font-medium",
                          item.status === "Active"
                            ? "bg-green-500 text-white"
                            : "bg-gray-500 text-white"
                        )}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold">${item.price}</div>
                        <div className="text-sm text-foreground/60">{item.views} views</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Recent activity */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Recent Activity</h2>
                <button className="text-sm text-primary hover:underline">
                  View all
                </button>
              </div>
              
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="divide-y divide-border">
                  {[
                    { type: "message", user: "Jane Cooper", time: "2 hours ago", content: "Sent you a message about the vintage camera" },
                    { type: "offer", user: "Robert Fox", time: "5 hours ago", content: "Made an offer of $110 on your leather backpack" },
                    { type: "sale", user: "Wade Warren", time: "1 day ago", content: "Purchased your bluetooth speaker for $45" },
                    { type: "review", user: "Esther Howard", time: "2 days ago", content: "Left a 5-star review on your profile" },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-start gap-4 p-4">
                      <div className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                        activity.type === "message" ? "bg-blue-100 text-blue-500" :
                        activity.type === "offer" ? "bg-orange-100 text-orange-500" :
                        activity.type === "sale" ? "bg-green-100 text-green-500" :
                        "bg-purple-100 text-purple-500"
                      )}>
                        {activity.type === "message" ? <MessageCircle className="h-5 w-5" /> :
                         activity.type === "offer" ? <ChevronDown className="h-5 w-5" /> :
                         activity.type === "sale" ? <ShoppingBag className="h-5 w-5" /> :
                         <Star className="h-5 w-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">
                          <span className="font-semibold">{activity.user}</span> {activity.content}
                        </p>
                        <p className="mt-1 text-xs text-foreground/60">{activity.time}</p>
                      </div>
                      <button className="rounded-md p-2 text-foreground/60 hover:bg-secondary transition-colors">
                        <ChevronDown className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Star icon (not imported from lucide-react)
const Star = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default Dashboard;
