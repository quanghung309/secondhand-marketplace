
import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, ArrowUp, Filter, SlidersHorizontal } from "lucide-react";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";

interface AuctionItem {
  id: number;
  title: string;
  description: string;
  image: string;
  currentBid: number;
  minBidIncrement: number;
  endTime: string;
  bids: number;
  seller: string;
  timeLeft: string;
}

const Auctions = () => {
  const { toast } = useToast();
  const [auctionItems, setAuctionItems] = useState<AuctionItem[]>([
    {
      id: 1,
      title: "Vintage Leather Jacket",
      description: "Rare 1970s leather jacket in excellent condition",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      currentBid: 120,
      minBidIncrement: 10,
      endTime: "2023-12-30T15:30:00",
      bids: 12,
      seller: "vintage_collector",
      timeLeft: "2d 14h"
    },
    {
      id: 2,
      title: "Limited Edition Sneakers",
      description: "One of only 100 pairs ever made, unworn with original box",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      currentBid: 350,
      minBidIncrement: 25,
      endTime: "2023-12-28T20:00:00",
      bids: 24,
      seller: "sneakerhead99",
      timeLeft: "12h 45m"
    },
    {
      id: 3,
      title: "First Edition Book Collection",
      description: "Set of 5 first edition classic novels from the 1950s",
      image: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      currentBid: 780,
      minBidIncrement: 50,
      endTime: "2024-01-05T10:00:00",
      bids: 8,
      seller: "bookworm_collector",
      timeLeft: "8d 5h"
    },
    {
      id: 4,
      title: "Antique Pocket Watch",
      description: "18k gold pocket watch from 1890, fully functional",
      image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      currentBid: 1200,
      minBidIncrement: 100,
      endTime: "2023-12-29T12:15:00",
      bids: 16,
      seller: "antiques_expert",
      timeLeft: "1d 3h"
    },
    {
      id: 5,
      title: "Handcrafted Ceramic Vase",
      description: "Unique handmade vase by renowned artist, signed and numbered",
      image: "https://images.unsplash.com/photo-1612196808214-b7e137b06cb8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", 
      currentBid: 95,
      minBidIncrement: 10,
      endTime: "2024-01-02T18:30:00",
      bids: 7,
      seller: "art_collector22",
      timeLeft: "5d 9h"
    },
    {
      id: 6,
      title: "Vintage Camera",
      description: "Rare 1960s film camera in working condition with original case",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      currentBid: 220,
      minBidIncrement: 20,
      endTime: "2023-12-31T09:45:00",
      bids: 14,
      seller: "camera_enthusiast",
      timeLeft: "3d 1h"
    }
  ]);

  const placeBid = (itemId: number) => {
    setAuctionItems(items => 
      items.map(item => {
        if (item.id === itemId) {
          const newBid = item.currentBid + item.minBidIncrement;
          return {
            ...item,
            currentBid: newBid,
            bids: item.bids + 1
          };
        }
        return item;
      })
    );

    toast({
      title: "Bid placed successfully!",
      description: "You are now the highest bidder",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Rare Item Auctions</h1>
            <p className="text-gray-500 mt-1">Bid on unique, one-of-a-kind items</p>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Auctions</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <h3 className="font-medium mb-2">Price Range</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-sm text-gray-500">Min</label>
                      <input type="number" className="w-full border rounded p-2" placeholder="$0" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Max</label>
                      <input type="number" className="w-full border rounded p-2" placeholder="$1000" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Time Left</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span>Ending soon (24h)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span>1-3 days</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span>3+ days</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Categories</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span>Fashion</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span>Electronics</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span>Collectibles</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span>Art</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span>Jewelry</span>
                    </label>
                  </div>
                </div>
                
                <Button className="mt-6">Apply Filters</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctionItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-12 relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="object-cover w-full h-48"
                />
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {item.timeLeft}
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1 truncate">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{item.description}</p>
                
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Current Bid</p>
                    <p className="font-semibold text-lg">${item.currentBid}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Bids</p>
                    <p className="font-medium">{item.bids}</p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button 
                    onClick={() => placeBid(item.id)}
                    className="w-full justify-between"
                  >
                    <span>Place Bid</span>
                    <span className="flex items-center">
                      ${item.currentBid + item.minBidIncrement}
                      <ArrowUp className="h-3 w-3 ml-1" />
                    </span>
                  </Button>
                  
                  <Link to={`/auction/${item.id}`} className="text-center text-sm text-primary hover:underline">
                    View Details
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Auctions;
