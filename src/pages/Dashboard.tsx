
import { useState } from "react";
import { cn } from "@/lib/utils";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardContent from "@/components/dashboard/DashboardContent";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  return (
    <div className="min-h-screen bg-background">
      <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      
      <div className="flex">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        
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
          <DashboardContent />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
