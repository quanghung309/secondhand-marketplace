
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>
      
      {/* Hero content */}
      <div className="max-w-3xl mx-auto animate-slide-in-bottom" style={{animationDelay: "0.2s"}}>
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-secondary text-sm font-medium text-foreground/80 animate-fade-in" style={{animationDelay: "0.4s"}}>
          Buy and sell with confidence
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          The modern marketplace for pre-loved items
        </h1>
        <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
          Find unique treasures or give your belongings a second life. Join our community of conscious consumers today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/browse"
            className="px-6 py-3 rounded-full bg-primary text-white font-medium hover-lift active:scale-95 inline-flex items-center justify-center gap-2 transition-all-300"
          >
            Start Browsing
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/sell"
            className="px-6 py-3 rounded-full bg-secondary text-foreground font-medium hover-lift active:scale-95"
          >
            Sell an Item
          </Link>
        </div>
      </div>
      
      {/* Stats */}
      <div className="absolute bottom-12 left-0 right-0">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
          {[
            { value: "10K+", label: "Active Users" },
            { value: "50K+", label: "Items Sold" },
            { value: "100+", label: "Categories" },
            { value: "4.8/5", label: "User Rating" }
          ].map((stat, index) => (
            <div 
              key={stat.label} 
              className="text-center animate-fade-in" 
              style={{animationDelay: `${0.6 + index * 0.1}s`}}
            >
              <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
              <div className="text-sm text-foreground/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
