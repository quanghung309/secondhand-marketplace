import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  SlidersHorizontal, 
  Grid2X2, 
  List, 
  Heart,
  ShoppingCart,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

// Mock data for product listings
const MOCK_PRODUCTS = [
  {
    id: 1,
    title: "Vintage Leather Sofa",
    price: 350,
    condition: "Good",
    location: "Seattle, WA",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-1.2.1",
    seller: {
      name: "Alex G.",
      rating: 4.8,
    }
  },
  {
    id: 2,
    title: "MacBook Pro 2019",
    price: 899,
    condition: "Like New",
    location: "Portland, OR",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1",
    seller: {
      name: "Jamie T.",
      rating: 4.9,
    }
  },
  {
    id: 3,
    title: "Mid-Century Coffee Table",
    price: 120,
    condition: "Used",
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1",
    seller: {
      name: "Pat L.",
      rating: 4.7,
    }
  },
  {
    id: 4,
    title: "Professional Camera Kit",
    price: 650,
    condition: "Good",
    location: "Seattle, WA",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1",
    seller: {
      name: "Sam K.",
      rating: 4.6,
    }
  },
  {
    id: 5,
    title: "Wireless Noise-Cancelling Headphones",
    price: 85,
    condition: "Like New",
    location: "Vancouver, BC",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1",
    seller: {
      name: "Robin M.",
      rating: 4.9,
    }
  },
  {
    id: 6,
    title: "Ergonomic Desk Chair",
    price: 175,
    condition: "Used",
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1",
    seller: {
      name: "Taylor W.",
      rating: 4.8,
    }
  },
];

// Available category filters
const CATEGORIES = [
  "All Categories",
  "Furniture",
  "Electronics",
  "Clothing",
  "Books",
  "Home Goods",
  "Sports Equipment",
  "Collectibles",
  "Vehicles",
  "Toys & Games",
];

// Available condition filters
const CONDITIONS = ["Any Condition", "New", "Like New", "Good", "Fair", "Used"];

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedCondition, setSelectedCondition] = useState("Any Condition");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [showFilters, setShowFilters] = useState(false);

  // Filter products based on search query, category, condition, and price range
  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || product.title.includes(selectedCategory);
    const matchesCondition = selectedCondition === "Any Condition" || product.condition === selectedCondition;
    const matchesMinPrice = !priceRange.min || product.price >= parseInt(priceRange.min);
    const matchesMaxPrice = !priceRange.max || product.price <= parseInt(priceRange.max);
    
    return matchesSearch && matchesCategory && matchesCondition && matchesMinPrice && matchesMaxPrice;
  });

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <h1 className="text-3xl font-bold">Browse Items</h1>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                type="text"
                placeholder="Search items..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-col-reverse md:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className={cn(
              "md:w-64 shrink-0 space-y-6 md:block",
              showFilters ? "block" : "hidden"
            )}>
              {/* Categories */}
              <div>
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                        selectedCategory === category
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground/70 hover:bg-muted"
                      )}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Condition */}
              <div>
                <h3 className="font-medium mb-3">Condition</h3>
                <div className="space-y-2">
                  {CONDITIONS.map((condition) => (
                    <button
                      key={condition}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                        selectedCondition === condition
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground/70 hover:bg-muted"
                      )}
                      onClick={() => setSelectedCondition(condition)}
                    >
                      {condition}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="flex gap-2 items-center">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    className="text-sm"
                  />
                  <span>-</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    className="text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Products Display */}
            <div className="flex-1">
              {/* Filters and View Toggle */}
              <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <Button 
                  variant="outline" 
                  className="md:hidden w-full sm:w-auto"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="mr-2" size={16} />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </Button>
                
                <div className="hidden md:block font-medium">
                  {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"} found
                </div>

                <div className="flex items-center gap-2 ml-auto">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={viewMode === "grid" ? "bg-muted" : ""}
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid view"
                  >
                    <Grid2X2 size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={viewMode === "list" ? "bg-muted" : ""}
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                  >
                    <List size={16} />
                  </Button>
                </div>
              </div>

              {/* Products Grid/List */}
              {filteredProducts.length > 0 ? (
                <div 
                  className={cn(
                    viewMode === "grid" 
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" 
                      : "space-y-4"
                  )}
                >
                  {filteredProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/50 rounded-lg">
                  <AlertCircle className="mb-3 text-muted-foreground" size={32} />
                  <h3 className="text-lg font-medium mb-1">No Items Found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    We couldn't find any items matching your search criteria. Try adjusting your filters or search query.
                  </p>
                  <Button onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All Categories");
                    setSelectedCondition("Any Condition");
                    setPriceRange({ min: "", max: "" });
                  }}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Product Card Component 
const ProductCard = ({ 
  product, 
  viewMode 
}: { 
  product: typeof MOCK_PRODUCTS[0]; 
  viewMode: "grid" | "list";
}) => {
  const { id, title, price, condition, location, image, seller } = product;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id,
      title,
      price,
      seller: seller.name,
      image,
      quantity: 1
    });
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all hover:shadow-md",
      viewMode === "list" ? "flex" : ""
    )}>
      <div className={cn(
        "relative",
        viewMode === "list" ? "w-36 h-36 shrink-0" : "aspect-square"
      )}>
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors">
          <Heart size={16} className="text-foreground/70 hover:text-red-500 transition-colors" />
        </button>
      </div>
      
      <CardContent className={cn(
        "flex flex-col",
        viewMode === "list" ? "p-4" : "p-5"
      )}>
        <div className="flex-1">
          <div className="flex justify-between items-start gap-2 mb-1">
            <Link 
              to={`/product/${id}`}
              className="font-medium hover:text-primary transition-colors line-clamp-2"
            >
              {title}
            </Link>
            <div className="text-lg font-semibold whitespace-nowrap">${price}</div>
          </div>
          
          <div className="text-sm text-muted-foreground mb-1">{condition}</div>
          <div className="text-sm text-muted-foreground mb-3">{location}</div>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span className="font-medium">Seller:</span> {seller.name} ({seller.rating})
          </div>
        </div>
        
        <div className="mt-4 flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleAddToCart} 
            className="flex-1"
          >
            <ShoppingCart size={16} className="mr-1" /> Add to Cart
          </Button>
          <Link to={`/product/${id}`} className="flex-1">
            <Button size="sm" variant="default" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default Browse;
