
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Facebook, Github, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agreeToTerms: false,
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
      // Here you would typically redirect to dashboard or verify email
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left: Auth Form */}
        <div className="w-full md:w-1/2 lg:w-2/5 p-6 md:p-12 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <Link to="/" className="inline-flex items-center text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to home
              </Link>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Create your account</h1>
              <p className="text-foreground/60">
                Start buying and selling pre-loved items today
              </p>
            </div>
            
            <div className="mt-8 grid gap-4">
              <button 
                type="button"
                className="flex items-center justify-center gap-2 bg-secondary border border-border rounded-lg p-3 text-sm font-medium hover-lift"
              >
                <Github className="h-5 w-5" />
                Continue with GitHub
              </button>
              <button 
                type="button"
                className="flex items-center justify-center gap-2 bg-[#1877F2] text-white rounded-lg p-3 text-sm font-medium hover-lift"
              >
                <Facebook className="h-5 w-5" />
                Continue with Facebook
              </button>
            </div>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-background text-sm text-foreground/60">
                  Or continue with
                </span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="John Doe"
                />
              </div>
              
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
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="••••••••"
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-foreground/60 hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-foreground/60">
                  Must be at least 8 characters
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  id="terms"
                  name="agreeToTerms"
                  type="checkbox"
                  required
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20"
                />
                <label htmlFor="terms" className="text-sm text-foreground/80">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
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
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
            
            <p className="mt-6 text-center text-sm text-foreground/60">
              Already have an account?{" "}
              <Link to="/signin" className="text-primary font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
        
        {/* Right: Image/Branding */}
        <div className="hidden md:block md:w-1/2 lg:w-3/5 bg-primary/5 p-12">
          <div className="h-full flex flex-col justify-between">
            <div className="flex justify-end">
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
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  />
                </svg>
              </div>
              
              <blockquote className="mt-6 text-xl font-medium text-foreground">
                "ReMarket made selling my unused items so easy. I've decluttered my home and made extra cash!"
              </blockquote>
              <div className="mt-4">
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-foreground/60 text-sm">ReMarket User</p>
              </div>
            </div>
            
            <div className="flex justify-center space-x-1 mt-12">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full",
                    i === 1 ? "w-6 bg-primary" : "w-2 bg-primary/30"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
