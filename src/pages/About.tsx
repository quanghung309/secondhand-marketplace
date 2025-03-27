
import { ChevronRight, Truck, ShieldCheck, HeartHandshake, Star } from "lucide-react";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />
      
      {/* Hero Section */}
      <div className="pt-28 pb-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About U2U</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Connecting people through sustainable commerce since 2023
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                At U2U, we're on a mission to reinvent the way people buy and sell pre-loved items. 
                We believe that every item has a story and deserves a second chance at life.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                By connecting buyers directly with sellers, we're creating a more sustainable, 
                affordable, and community-driven marketplace where quality items find new homes 
                instead of landfills.
              </p>
            </div>
            
            <div className="flex-1">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3882&q=80" 
                alt="Person working on laptop" 
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Values Section */}
      <div className="py-16 px-6 md:px-10 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Trust & Safety</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We prioritize creating a safe environment where users can buy and sell with confidence, 
                backed by our secure payment system and user verification.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <HeartHandshake className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community First</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We're building more than a marketplace - we're cultivating a community where 
                people connect through shared interests and sustainable consumption.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Every transaction on U2U gives items a new life, reducing waste and 
                promoting a circular economy that benefits everyone.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Team Section */}
      <div className="py-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Alex Morgan",
                role: "Founder & CEO",
                image: "https://randomuser.me/api/portraits/women/32.jpg"
              },
              {
                name: "Jordan Lee",
                role: "CTO",
                image: "https://randomuser.me/api/portraits/men/42.jpg"
              },
              {
                name: "Sam Taylor",
                role: "Head of Operations",
                image: "https://randomuser.me/api/portraits/women/39.jpg"
              },
              {
                name: "Riley Patel",
                role: "Community Manager",
                image: "https://randomuser.me/api/portraits/men/35.jpg"
              }
            ].map((member, i) => (
              <div key={i} className="text-center">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="py-16 px-6 md:px-10 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What People Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Jamie Williams",
                text: "U2U helped me declutter my home and make some extra cash. The process was so easy, and I love knowing my items found new homes!",
                role: "Seller"
              },
              {
                name: "Taylor Smith",
                text: "I've found so many unique items on U2U that I couldn't find elsewhere. The direct connection with sellers makes each purchase special.",
                role: "Buyer"
              },
              {
                name: "Casey Johnson",
                text: "As someone who cares about sustainability, U2U aligns perfectly with my values. I've both bought and sold on the platform with great experiences.",
                role: "Community Member"
              }
            ].map((testimonial, i) => (
              <div key={i} className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                  <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                  <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                  <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                  <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                </div>
                <p className="italic text-gray-600 dark:text-gray-300 mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 px-6 md:px-10 bg-primary/10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're looking to buy unique items or sell things you no longer need,
            U2U is the perfect place to start.
          </p>
          <Link 
            to="/signup" 
            className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            Get Started <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
