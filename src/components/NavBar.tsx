
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, ShoppingBag, ShoppingCart, Package, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();

  // Detect scroll to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  const navLinks = [
    {
      name: "Home",
      path: "/"
    }, 
    {
      name: "Browse",
      path: "/browse"
    }, 
    {
      name: "Sell",
      path: "/sell"
    }, 
    {
      name: "About",
      path: "/about"
    }
  ];
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all-300 px-6 md:px-10 py-4", 
      isScrolled ? "bg-white/80 backdrop-blur-lg shadow-sm dark:bg-gray-900/80" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-semibold text-lg md:text-xl transition-opacity-300 hover:opacity-80">
          <ShoppingBag className="w-6 h-6 text-primary" />
          <span>U2U</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={cn(
                "text-sm font-medium transition-opacity-300 hover:opacity-80", 
                location.pathname === link.path ? "text-primary" : "text-foreground/80"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Auth Actions and Cart */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            to="/cart" 
            className="relative p-2 text-foreground/80 hover:text-foreground transition-colors" 
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </Link>
          
          {/* Account dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 text-sm font-medium text-foreground/80 transition-opacity-300 hover:opacity-80">
              <User className="h-5 w-5" />
              <span className="hidden lg:inline">Account</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/dashboard" className="cursor-pointer">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/my-listings" className="cursor-pointer">
                  <Package className="mr-2 h-4 w-4" />
                  My Listings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/purchases" className="cursor-pointer">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Purchases
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/signin" className="cursor-pointer">Sign In</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/signup" className="cursor-pointer">Sign Up</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <Link 
            to="/cart" 
            className="relative p-2 text-foreground/80 hover:text-foreground transition-colors" 
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </Link>
          
          <button 
            className="text-foreground/80 hover:text-foreground transition-colors" 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden absolute left-0 right-0 top-full px-6 py-4 glass-effect transition-all duration-300 ease-in-out",
        isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      )}>
        <nav className="flex flex-col gap-4">
          {navLinks.map(link => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={cn(
                "text-sm font-medium py-2 transition-colors", 
                location.pathname === link.path ? "text-primary" : "text-foreground/80"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="h-px w-full bg-border my-2" />
          
          <Link to="/dashboard" className="text-sm font-medium py-2 flex items-center gap-2 text-foreground/80">
            <ShoppingBag className="h-4 w-4" />
            Dashboard
          </Link>
          
          <Link to="/profile" className="text-sm font-medium py-2 flex items-center gap-2 text-foreground/80">
            <User className="h-4 w-4" />
            Profile
          </Link>
          
          <Link to="/my-listings" className="text-sm font-medium py-2 flex items-center gap-2 text-foreground/80">
            <Package className="h-4 w-4" />
            My Listings
          </Link>
          
          <Link to="/purchases" className="text-sm font-medium py-2 flex items-center gap-2 text-foreground/80">
            <ShoppingCart className="h-4 w-4" />
            Purchases
          </Link>
          
          <div className="h-px w-full bg-border my-2" />
          
          <Link to="/signin" className="text-sm font-medium py-2 text-foreground/80 transition-colors">
            Sign In
          </Link>
          
          <Link to="/signup" className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-full transition-all hover:bg-primary/90 hover:shadow-md active:scale-95 flex items-center justify-center">
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
