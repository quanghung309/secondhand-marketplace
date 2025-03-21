
import { Link } from "react-router-dom";
import { Bell, ChevronDown, Menu, Search, ShoppingBag } from "lucide-react";

interface HeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Header = ({ isSidebarOpen, setIsSidebarOpen }: HeaderProps) => {
  return (
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
  );
};

export default Header;
