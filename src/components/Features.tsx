
import { MessageCircle, ShieldCheck, Tag, Truck } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Tag className="w-10 h-10 text-primary" />,
      title: "Easy Listing",
      description: "Create detailed listings in minutes with our intuitive interface. Add photos, set prices, and reach thousands of potential buyers.",
    },
    {
      icon: <MessageCircle className="w-10 h-10 text-primary" />,
      title: "Secure Messaging",
      description: "Communicate safely with buyers and sellers through our in-app messaging system without sharing personal contact information.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-primary" />,
      title: "Safe Transactions",
      description: "Our secure payment system protects both buyers and sellers, releasing funds only when both parties are satisfied.",
    },
    {
      icon: <Truck className="w-10 h-10 text-primary" />,
      title: "Local Pickup",
      description: "Save on shipping costs with convenient local pickup options, or use our integrated shipping services for distant buyers.",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            ReMarket makes buying and selling pre-loved items simple, secure, and sustainable.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="bg-card p-6 rounded-2xl border border-border hover-lift"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-foreground/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
