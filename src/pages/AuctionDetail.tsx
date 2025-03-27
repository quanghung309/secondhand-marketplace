
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Clock, ArrowUpRight, User, Shield, ChevronLeft, Heart } from "lucide-react";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const AuctionDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [bidAmount, setBidAmount] = useState("");
  const [isWatching, setIsWatching] = useState(false);
  
  // Mock auction data - in a real app this would be fetched based on the ID
  const auction = {
    id: parseInt(id || "1"),
    title: "Vintage Leather Jacket",
    description: "Rare 1970s leather jacket in excellent condition with original zipper and buttons. This jacket shows minimal wear with beautiful patina that can only come with age. The leather is soft and supple with no cracks or damage. Size Medium, fits true to size. Perfect for collectors or anyone who appreciates vintage fashion.",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    currentBid: 120,
    minBidIncrement: 10,
    startingPrice: 50,
    endTime: "2023-12-30T15:30:00",
    bids: 12,
    seller: "vintage_collector",
    sellerRating: 4.9,
    timeLeft: "2d 14h",
    bidHistory: [
      { bidder: "fashion_hunter", amount: 120, time: "2 hours ago" },
      { bidder: "retro_enthusiast", amount: 110, time: "5 hours ago" },
      { bidder: "style_seeker", amount: 100, time: "1 day ago" },
      { bidder: "collector456", amount: 90, time: "1 day ago" },
      { bidder: "vintage_lover", amount: 80, time: "2 days ago" },
      { bidder: "bargain_finder", amount: 70, time: "2 days ago" },
      { bidder: "fashion_fan", amount: 60, time: "3 days ago" },
      { bidder: "first_bidder", amount: 50, time: "3 days ago" }
    ],
    condition: "Excellent",
    category: "Clothing & Accessories",
    authenticity: "Verified Authentic"
  };

  const [selectedImage, setSelectedImage] = useState(auction.images[0]);
  const [currentBid, setCurrentBid] = useState(auction.currentBid);
  const [bidCount, setBidCount] = useState(auction.bids);
  const [bidHistory, setBidHistory] = useState(auction.bidHistory);

  const handlePlaceBid = () => {
    const amount = parseInt(bidAmount);
    
    if (isNaN(amount) || amount < currentBid + auction.minBidIncrement) {
      toast({
        variant: "destructive",
        title: "Invalid bid amount",
        description: `Bid must be at least $${currentBid + auction.minBidIncrement}`
      });
      return;
    }
    
    // Update state
    setCurrentBid(amount);
    setBidCount(bidCount + 1);
    setBidHistory([
      { bidder: "you", amount, time: "Just now" },
      ...bidHistory
    ]);
    
    // Success message
    toast({
      title: "Bid placed successfully!",
      description: "You are now the highest bidder",
    });
    
    // Reset input
    setBidAmount("");
  };

  const toggleWatchlist = () => {
    setIsWatching(!isWatching);
    toast({
      title: isWatching ? "Removed from watchlist" : "Added to watchlist",
      description: isWatching 
        ? "This item has been removed from your watchlist" 
        : "You'll receive notifications about this auction"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12">
        <Link to="/auctions" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Auctions
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden bg-white">
              <img 
                src={selectedImage} 
                alt={auction.title} 
                className="w-full h-80 object-contain"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2">
              {auction.images.map((image, index) => (
                <div 
                  key={index}
                  className={`border rounded cursor-pointer flex-shrink-0 ${selectedImage === image ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`${auction.title} - view ${index + 1}`} 
                    className="w-20 h-20 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Auction Details */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-start">
                <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{auction.title}</h1>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={toggleWatchlist}
                >
                  <Heart className={`h-4 w-4 ${isWatching ? 'fill-red-500 text-red-500' : ''}`} />
                  {isWatching ? 'Watching' : 'Watch'}
                </Button>
              </div>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  Seller: {auction.seller}
                </span>
                <span className="mx-2">•</span>
                <span>Rating: {auction.sellerRating}/5 ⭐</span>
              </div>
            </div>
            
            <div className="bg-primary/5 p-4 rounded-lg border">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500">Current Bid</p>
                  <p className="text-3xl font-bold">${currentBid}</p>
                </div>
                <div className="bg-primary/10 px-3 py-2 rounded-lg flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  <span className="font-medium text-primary">{auction.timeLeft} left</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex">
                  <Input
                    type="number"
                    placeholder={`$${currentBid + auction.minBidIncrement} or more`}
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="rounded-r-none"
                  />
                  <Button 
                    onClick={handlePlaceBid}
                    className="rounded-l-none"
                  >
                    Place Bid
                  </Button>
                </div>
                
                <p className="text-xs text-gray-500">
                  Enter ${currentBid + auction.minBidIncrement} or more
                </p>
                
                <div className="flex justify-between text-sm">
                  <span>Total Bids: {bidCount}</span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="link" className="h-auto p-0">
                        View Bid History
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Bid History</DialogTitle>
                      </DialogHeader>
                      <div className="max-h-80 overflow-y-auto">
                        <table className="w-full">
                          <thead className="text-xs text-gray-700 border-b">
                            <tr>
                              <th className="py-2 text-left">Bidder</th>
                              <th className="py-2 text-right">Amount</th>
                              <th className="py-2 text-right">Time</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {bidHistory.map((bid, index) => (
                              <tr key={index} className={bid.bidder === "you" ? "bg-primary/5" : ""}>
                                <td className="py-3 text-left">{bid.bidder}</td>
                                <td className="py-3 text-right font-medium">${bid.amount}</td>
                                <td className="py-3 text-right text-gray-500">{bid.time}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Item Details</h2>
              <p className="text-gray-600">{auction.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Condition</p>
                  <p className="font-medium">{auction.condition}</p>
                </div>
                <div>
                  <p className="text-gray-500">Category</p>
                  <p className="font-medium">{auction.category}</p>
                </div>
                <div>
                  <p className="text-gray-500">Starting Price</p>
                  <p className="font-medium">${auction.startingPrice}</p>
                </div>
                <div>
                  <p className="text-gray-500">Authenticity</p>
                  <p className="font-medium flex items-center">
                    <Shield className="h-4 w-4 mr-1 text-green-500" />
                    {auction.authenticity}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Auctions */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold mb-6">Similar Auctions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-w-1 aspect-h-1 relative">
                  <img 
                    src={`https://images.unsplash.com/photo-${1550000000000 + item * 1000}-${100000000 + item * 10000}?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60`}
                    alt="Related auction" 
                    className="object-cover w-full h-40"
                  />
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    1d 5h
                  </div>
                </div>
                
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm mb-1 truncate">Similar Vintage Item #{item}</h3>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">${80 + item * 20}</p>
                    <Link to={`/auction/${item + 10}`} className="text-primary text-sm flex items-center hover:underline">
                      View
                      <ArrowUpRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;
