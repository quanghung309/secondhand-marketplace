
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Trash2, ShoppingCart, AlertCircle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

// Mock cart data
const INITIAL_CART_ITEMS = [
  {
    id: 1,
    title: "Vintage Leather Sofa",
    price: 350,
    seller: "Alex G.",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-1.2.1",
    quantity: 1,
  },
  {
    id: 2,
    title: "MacBook Pro 2019",
    price: 899,
    seller: "Jamie T.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1",
    quantity: 1,
  },
];

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  
  // Service fee (5% of subtotal)
  const serviceFee = subtotal * 0.05;
  
  // Calculate total
  const total = subtotal + serviceFee;

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };

  // Update item quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Handle checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsCheckingOut(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      toast.success("Order placed successfully!");
      setCartItems([]);
      setIsCheckingOut(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Your Cart</h1>
            <Button 
              variant="ghost" 
              className="gap-2"
              onClick={() => navigate("/browse")}
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </Button>
          </div>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-32 sm:h-32 aspect-square shrink-0">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 p-4 flex flex-col">
                            <div className="flex justify-between items-start gap-2 mb-1">
                              <Link 
                                to={`/product/${item.id}`}
                                className="font-medium hover:text-primary transition-colors"
                              >
                                {item.title}
                              </Link>
                              <div className="text-lg font-semibold whitespace-nowrap">
                                ${item.price.toFixed(2)}
                              </div>
                            </div>
                            
                            <div className="text-sm text-muted-foreground mb-2">
                              Seller: {item.seller}
                            </div>
                            
                            <div className="mt-auto flex justify-between items-center gap-4">
                              <div className="flex items-center">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 rounded-r-none"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </Button>
                                <div className="h-8 px-4 flex items-center justify-center border-y border-input">
                                  {item.quantity}
                                </div>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 rounded-l-none"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  +
                                </Button>
                              </div>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-destructive"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 size={16} className="mr-1" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Service Fee (5%)</span>
                        <span>${serviceFee.toFixed(2)}</span>
                      </div>
                      <div className="h-px bg-border my-2"></div>
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full gap-2"
                      size="lg"
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                    >
                      {isCheckingOut ? (
                        "Processing..."
                      ) : (
                        <>
                          Proceed to Checkout
                          <ArrowRight size={16} />
                        </>
                      )}
                    </Button>
                    
                    <div className="mt-4 text-xs text-center text-muted-foreground">
                      By checking out, you agree to our{" "}
                      <Link to="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                      .
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground max-w-md mb-8">
                Looks like you haven't added any items to your cart yet.
                Browse our listings to find something you'll love!
              </p>
              <Button 
                size="lg" 
                className="gap-2"
                onClick={() => navigate("/browse")}
              >
                Browse Items
                <ArrowRight size={16} />
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Cart;
