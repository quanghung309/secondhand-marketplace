
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { ArrowRight, ShoppingBag, Heart, Banknote, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <Features />
      
      {/* Categories Section */}
      <section className="py-20 px-6 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse Categories</h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              Discover thousands of unique items across popular categories
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              "Electronics", "Furniture", "Clothing", 
              "Books", "Collectibles", "Home Decor"
            ].map((category) => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase()}`}
                className="aspect-square flex flex-col items-center justify-center p-6 rounded-2xl bg-card border border-border text-center hover-lift group"
              >
                <span className="text-lg font-medium group-hover:text-primary transition-colors">
                  {category}
                </span>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              to="/categories"
              className="inline-flex items-center text-primary font-medium hover:underline"
            >
              View all categories
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Buy and Sell in Three Simple Steps</h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              Our streamlined process makes transactions quick and easy
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShoppingBag className="w-12 h-12 text-primary" />,
                title: "Create an Account",
                description: "Sign up in seconds with your email or social media accounts to start buying and selling."
              },
              {
                icon: <Heart className="w-12 h-12 text-primary" />,
                title: "List or Browse Items",
                description: "Create detailed listings with photos or browse thousands of items from trusted sellers."
              },
              {
                icon: <Banknote className="w-12 h-12 text-primary" />,
                title: "Complete the Transaction",
                description: "Communicate, negotiate, and finalize your purchase with our secure payment system."
              }
            ].map((step, index) => (
              <div key={step.title} className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div className="absolute top-0 right-0 -mr-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-foreground/80">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Trust & Safety Section */}
      <section className="py-20 px-6 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 text-sm font-medium text-primary">
                Safe & Secure
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Safety is Our Priority</h2>
              <p className="text-lg text-foreground/80 mb-6">
                Shop with confidence knowing that we take extensive measures to protect your personal information, verify user accounts, and secure all transactions.
              </p>
              <div className="space-y-4">
                {[
                  "Secure payment processing",
                  "User verification systems",
                  "In-app messaging for privacy",
                  "Purchase protection policies"
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-1 rounded-full bg-primary/10 p-1">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="aspect-[4/3] bg-card rounded-2xl overflow-hidden shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShieldCheck className="w-20 h-20 text-primary/30" />
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">Secure & Encrypted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Community Today</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Start buying and selling pre-loved items with thousands of users in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-6 py-3 rounded-full bg-white text-primary font-medium hover-lift active:scale-95"
            >
              Create Account
            </Link>
            <Link
              to="/browse"
              className="px-6 py-3 rounded-full bg-primary-foreground/10 border border-white/20 text-white font-medium hover-lift active:scale-95"
            >
              Browse Listings
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-16 px-6 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-2 lg:col-span-2">
              <Link to="/" className="flex items-center gap-2 font-semibold text-lg mb-4">
                <ShoppingBag className="w-6 h-6 text-primary" />
                <span>ReMarket</span>
              </Link>
              <p className="text-foreground/80 mb-4">
                The modern marketplace for pre-loved items. Buy and sell with confidence.
              </p>
            </div>
            
            {[
              {
                title: "Marketplace",
                links: ["Browse", "Categories", "Trending", "New Arrivals"]
              },
              {
                title: "Company",
                links: ["About", "Careers", "Press", "Contact"]
              },
              {
                title: "Resources",
                links: ["Help Center", "Safety Tips", "Shipping", "Blog"]
              }
            ].map((column) => (
              <div key={column.title}>
                <h3 className="font-semibold mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link}>
                      <Link 
                        to={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-foreground/80 hover:text-primary transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-foreground/60">
              © {new Date().getFullYear()} ReMarket. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <Link to="/terms" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/cookies" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
