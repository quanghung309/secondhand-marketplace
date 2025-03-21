
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsLoading(false);
      // Here you would typically redirect to dashboard
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left: Image/Branding */}
        <div className="hidden md:block md:w-1/2 lg:w-3/5 bg-primary/5 p-12">
          <div className="h-full flex flex-col justify-between">
            <div className="flex justify-start">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white shadow-sm">
                <span className="text-primary font-semibold">RM</span>
              </div>
            </div>
            
            <div className="text-center max-w-lg mx-auto">
              <div className="mb-8">
                <svg
                  className="mx-auto h-48 w-48 text-primary/20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={0.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              
              <blockquote className="mt-6 text-xl font-medium text-foreground">
                "I found the perfect vintage camera on ReMarket for half the retail price. The transaction was smooth and secure!"
              </blockquote>
              <div className="mt-4">
                <p className="font-medium">Michael Chen</p>
                <p className="text-foreground/60 text-sm">ReMarket User</p>
              </div>
            </div>
            
            <div className="flex justify-center space-x-1 mt-12">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full",
                    i === 3 ? "w-6 bg-primary" : "w-2 bg-primary/30"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Right: Auth Form */}
        <div className="w-full md:w-1/2 lg:w-2/5 p-6 md:p-12 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <Link to="/" className="inline-flex items-center text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to home
              </Link>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Welcome back</h1>
              <p className="text-foreground/60">
                Sign in to your ReMarket account
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-foreground/60 hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20"
                />
                <label htmlFor="remember-me" className="text-sm text-foreground/80">
                  Remember me for 30 days
                </label>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "w-full flex items-center justify-center bg-primary text-white rounded-lg p-3 font-medium transition-all",
                  isLoading ? "opacity-90" : "hover-lift active:scale-95"
                )}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
            
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-background text-sm text-foreground/60">
                  Or continue with
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                className="flex items-center justify-center gap-2 bg-secondary border border-border rounded-lg p-3 text-sm font-medium hover-lift"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Google
              </button>
              <button 
                type="button"
                className="flex items-center justify-center gap-2 bg-[#1DA1F2] text-white rounded-lg p-3 text-sm font-medium hover-lift"
              >
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
                </svg>
                Twitter
              </button>
            </div>
            
            <p className="mt-8 text-center text-sm text-foreground/60">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
