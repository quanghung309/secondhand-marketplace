
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share,
  ShoppingCart,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Mock data for product details
const MOCK_PRODUCTS = [
  {
    id: 1,
    title: "Vintage Leather Sofa",
    price: 350,
    condition: "Good",
    location: "Seattle, WA",
    description: "Beautiful vintage leather sofa in excellent condition. Slight wear on the armrests, but otherwise perfectly maintained. The rich brown color matches with most interior designs. Dimensions: 82\" W x 36\" D x 34\" H. No pets, non-smoking household.",
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-1.2.1",
      "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?ixlib=rb-1.2.1",
      "https://images.unsplash.com/photo-1611967164521-abae8fba4668?ixlib=rb-1.2.1",
    ],
    seller: {
      name: "Alex G.",
      rating: 4.8,
      memberSince: "May 2021",
      responseRate: "98%",
      responseTime: "Within 2 hours",
    },
    category: "Furniture",
    postedDate: "3 days ago",
    views: 127,
    saved: 24,
  },
  {
    id: 2,
    title: "MacBook Pro 2019",
    price: 899,
    condition: "Like New",
    location: "Portland, OR",
    description: "MacBook Pro 2019 model in excellent condition. 13-inch Retina display, 8GB RAM, 256GB SSD storage. Battery cycle count under 100 with 95% health. Includes original charger and box. Perfect for work, school, or personal use.",
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-1.2.1",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1",
    ],
    seller: {
      name: "Jamie T.",
      rating: 4.9,
      memberSince: "January 2020",
      responseRate: "100%",
      responseTime: "Within 1 hour",
    },
    category: "Electronics",
    postedDate: "1 week ago",
    views: 243,
    saved: 46,
  },
  {
    id: 3,
    title: "Mid-Century Coffee Table",
    price: 120,
    condition: "Used",
    location: "San Francisco, CA",
    description: "Mid-century modern coffee table with walnut finish. Some scratches on the surface but still in good condition. The table has tapered legs and a classic retro look. Measures 48\" L x 24\" W x 18\" H. Local pickup only.",
    images: [
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1",
      "https://images.unsplash.com/photo-1581285697537-35d176559164?ixlib=rb-1.2.1",
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-1.2.1",
    ],
    seller: {
      name: "Pat L.",
      rating: 4.7,
      memberSince: "August 2022",
      responseRate: "95%",
      responseTime: "Within 5 hours",
    },
    category: "Furniture",
    postedDate: "2 days ago",
    views: 86,
    saved: 12,
  },
  {
    id: 4,
    title: "Professional Camera Kit",
    price: 650,
    condition: "Good",
    location: "Seattle, WA",
    description: "Complete professional camera kit including DSLR camera body, 3 lenses (18-55mm, 50mm prime, 70-300mm zoom), camera bag, tripod, and additional accessories. Everything works perfectly. Selling because I'm upgrading my equipment.",
    images: [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-1.2.1",
      "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?ixlib=rb-1.2.1",
    ],
    seller: {
      name: "Sam K.",
      rating: 4.6,
      memberSince: "March 2021",
      responseRate: "90%",
      responseTime: "Within 1 day",
    },
    category: "Electronics",
    postedDate: "5 days ago",
    views: 158,
    saved: 32,
  },
  {
    id: 5,
    title: "Wireless Noise-Cancelling Headphones",
    price: 85,
    condition: "Like New",
    location: "Vancouver, BC",
    description: "High-quality wireless noise-cancelling headphones. Only used a handful of times. Comes with original packaging, charging cable, and carrying case. Battery life is excellent (around 30 hours). Deep bass and crystal clear sound.",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1",
      "https://images.unsplash.com/photo-1524678714210-9917a6c619c2?ixlib=rb-1.2.1",
    ],
    seller: {
      name: "Robin M.",
      rating: 4.9,
      memberSince: "October 2022",
      responseRate: "100%",
      responseTime: "Within 3 hours",
    },
    category: "Electronics",
    postedDate: "1 day ago",
    views: 72,
    saved: 18,
  },
  {
    id: 6,
    title: "Ergonomic Desk Chair",
    price: 175,
    condition: "Used",
    location: "Los Angeles, CA",
    description: "Ergonomic office chair with lumbar support, adjustable height, and armrests. Black mesh back for breathability. Some minor wear on the seat cushion but fully functional and comfortable. Perfect for home office or study.",
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1",
      "https://images.unsplash.com/photo-1572721546336-c0166a2d5764?ixlib=rb-1.2.1",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-1.2.1",
    ],
    seller: {
      name: "Taylor W.",
      rating: 4.8,
      memberSince: "February 2023",
      responseRate: "97%",
      responseTime: "Within 4 hours",
    },
    category: "Furniture",
    postedDate: "1 week ago",
    views: 110,
    saved: 27,
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Find the product with the matching ID
  const product = MOCK_PRODUCTS.find(p => p.id === Number(id));
  
  // If no product found, show error
  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <NavBar />
        <div className="max-w-7xl mx-auto px-4 pt-24 pb-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/browse')}>
            <ArrowLeft className="mr-2" size={16} />
            Back to Browse
          </Button>
        </div>
      </div>
    );
  }
  
  const { title, price, condition, location, description, images, seller, category, postedDate, views, saved } = product;
  
  // Function to handle adding product to cart
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      seller: product.seller.name,
      image: product.images[0],
      quantity: 1
    });
  };
  
  // Function to show next image
  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  // Function to show previous image
  const showPrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  
  // Function to contact seller (placeholder)
  const handleContactSeller = () => {
    toast.info("Messaging feature coming soon!");
  };
  
  // Function to save/favorite product (placeholder)
  const handleSaveProduct = () => {
    toast.success("Product saved to favorites!");
  };
  
  // Function to share product (placeholder)
  const handleShareProduct = () => {
    toast.info("Sharing feature coming soon!");
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        {/* Back button */}
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate('/browse')}
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Browse
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Product Images - Left Column (3/5 width on large screens) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-muted/30 rounded-lg overflow-hidden">
              <img 
                src={images[currentImageIndex]} 
                alt={title}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation Buttons */}
              {images.length > 1 && (
                <>
                  <button 
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
                    onClick={showPrevImage}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
                    onClick={showNextImage}
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button 
                    key={index}
                    className={`relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 ${currentImageIndex === index ? 'border-primary' : 'border-transparent'}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${title} - image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Details - Right Column (2/5 width on large screens) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
              <div className="flex items-center gap-2 text-xl font-semibold">
                ${price.toFixed(2)}
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3 text-sm text-muted-foreground">
                <span>Condition: {condition}</span>
                <span>Location: {location}</span>
                <span>Category: {category}</span>
                <span>Posted: {postedDate}</span>
              </div>
            </div>
            
            <Separator />
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <Button onClick={handleAddToCart} size="lg">
                <ShoppingCart size={18} className="mr-2" />
                Add to Cart
              </Button>
              
              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" onClick={handleContactSeller}>
                  <MessageCircle size={18} className="mr-2" />
                  Contact
                </Button>
                <Button variant="outline" onClick={handleSaveProduct}>
                  <Heart size={18} className="mr-2" />
                  Save
                </Button>
                <Button variant="outline" onClick={handleShareProduct}>
                  <Share size={18} className="mr-2" />
                  Share
                </Button>
              </div>
            </div>
            
            <Separator />
            
            {/* Seller Info */}
            <div>
              <h2 className="text-lg font-medium mb-3">Seller Information</h2>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-lg font-medium">
                  {seller.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{seller.name}</div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span>{seller.rating} rating</span>
                  </div>
                </div>
              </div>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member since:</span>
                  <span>{seller.memberSince}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Response rate:</span>
                  <span>{seller.responseRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Typical response:</span>
                  <span>{seller.responseTime}</span>
                </div>
              </div>
            </div>
            
            {/* Item Stats */}
            <div className="flex gap-4 text-sm text-muted-foreground">
              <div>{views} views</div>
              <div>{saved} saved</div>
            </div>
          </div>
        </div>
        
        {/* Product Description */}
        <div className="mt-10">
          <h2 className="text-xl font-medium mb-4">Item Description</h2>
          <div className="prose prose-sm max-w-none">
            <p>{description}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
