
import { Link } from "react-router-dom";
import StatCard from "./StatCard";
import RecentListingCard from "./RecentListingCard";
import ActivityItem from "./ActivityItem";
import { cn } from "@/lib/utils";

const DashboardContent = () => {
  const stats = [
    { label: "Active Listings", value: "12", change: "+2", up: true },
    { label: "Total Sales", value: "$1,240", change: "+12%", up: true },
    { label: "Messages", value: "5", change: "-1", up: false },
    { label: "Profile Views", value: "142", change: "+24%", up: true },
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

  const activityItems = [
    { type: "message" as const, user: "Jane Cooper", time: "2 hours ago", content: "Sent you a message about the vintage camera" },
    { type: "offer" as const, user: "Robert Fox", time: "5 hours ago", content: "Made an offer of $110 on your leather backpack" },
    { type: "sale" as const, user: "Wade Warren", time: "1 day ago", content: "Purchased your bluetooth speaker for $45" },
    { type: "review" as const, user: "Esther Howard", time: "2 days ago", content: "Left a 5-star review on your profile" },
  ];

  return (
    <div className="container max-w-5xl py-6 px-4 md:px-6 lg:py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-foreground/60">Welcome back, Alex. Here's what's happening with your account.</p>
      </div>
      
      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
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
            <RecentListingCard key={item.id} item={item} />
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
            {activityItems.map((activity, i) => (
              <ActivityItem key={i} {...activity} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
