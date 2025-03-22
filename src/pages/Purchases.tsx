
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  MessageSquare, 
  Star, 
  ExternalLink, 
  Calendar, 
  Clock, 
  CheckCircle, 
  TruckIcon 
} from "lucide-react";
import RatingModal from "@/components/RatingModal";

type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";

interface PurchaseItem {
  id: number;
  productId: number;
  title: string;
  price: number;
  image: string;
  seller: string;
  purchaseDate: string;
  status: OrderStatus;
  isRated: boolean;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

const statusIcons = {
  pending: <Clock className="h-4 w-4 text-amber-500" />,
  shipped: <TruckIcon className="h-4 w-4 text-blue-500" />,
  delivered: <CheckCircle className="h-4 w-4 text-green-500" />,
  cancelled: <ExternalLink className="h-4 w-4 text-red-500" />
};

const statusLabels = {
  pending: "Payment Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled"
};

const statusClasses = {
  pending: "bg-amber-100 text-amber-600",
  shipped: "bg-blue-100 text-blue-600",
  delivered: "bg-green-100 text-green-600",
  cancelled: "bg-red-100 text-red-600"
};

const Purchases = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [ratingModalOpen, setRatingModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<PurchaseItem | null>(null);

  const mockPurchases: PurchaseItem[] = [
    {
      id: 1,
      productId: 101,
      title: "Vintage Camera",
      price: 120,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=200&h=200&auto=format&fit=crop",
      seller: "RetroTech",
      purchaseDate: "2023-11-15",
      status: "delivered",
      isRated: false,
      estimatedDelivery: "2023-11-20",
      trackingNumber: "TRK123456789"
    },
    {
      id: 2,
      productId: 102,
      title: "Leather Backpack",
      price: 85,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=200&h=200&auto=format&fit=crop",
      seller: "UrbanStyle",
      purchaseDate: "2023-10-28",
      status: "delivered",
      isRated: true,
      estimatedDelivery: "2023-11-02",
      trackingNumber: "TRK987654321"
    },
    {
      id: 3,
      productId: 103,
      title: "Bluetooth Speaker",
      price: 45,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=200&h=200&auto=format&fit=crop",
      seller: "SoundMaster",
      purchaseDate: "2023-12-05",
      status: "shipped",
      isRated: false,
      estimatedDelivery: "2023-12-12",
      trackingNumber: "TRK456789123"
    },
    {
      id: 4,
      productId: 104,
      title: "Vintage Record Player",
      price: 250,
      image: "https://images.unsplash.com/photo-1541667558913-5510f7461cf4?q=80&w=200&h=200&auto=format&fit=crop",
      seller: "ClassicSound",
      purchaseDate: "2023-11-30",
      status: "pending",
      isRated: false,
      estimatedDelivery: "2023-12-07"
    },
    {
      id: 5,
      productId: 105,
      title: "Mechanical Keyboard",
      price: 95,
      image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=200&h=200&auto=format&fit=crop",
      seller: "TechGear",
      purchaseDate: "2023-09-15",
      status: "cancelled",
      isRated: false
    },
  ];

  const filteredPurchases = mockPurchases.filter(purchase => {
    if (activeTab === "all") return true;
    return purchase.status === activeTab;
  });

  const openRatingModal = (item: PurchaseItem) => {
    setSelectedItem(item);
    setRatingModalOpen(true);
  };

  return (
    <div className="container max-w-5xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Your Purchases</h1>
        <p className="text-muted-foreground">Track and manage items you've purchased</p>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredPurchases.length === 0 ? (
            <div className="text-center py-16 border rounded-lg bg-muted/30">
              <h3 className="font-medium text-lg">No purchases found</h3>
              <p className="text-muted-foreground mt-1">You don't have any {activeTab !== "all" ? activeTab : ""} purchases yet.</p>
              <Button asChild variant="outline" className="mt-4">
                <Link to="/browse">Browse Items</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPurchases.map((purchase) => (
                <Card key={purchase.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-48 h-48 sm:h-auto">
                        <img 
                          src={purchase.image} 
                          alt={purchase.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col flex-1 p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{purchase.title}</h3>
                          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${statusClasses[purchase.status]}`}>
                            {statusIcons[purchase.status]}
                            <span>{statusLabels[purchase.status]}</span>
                          </div>
                        </div>
                        
                        <div className="text-xl font-bold mb-2">${purchase.price.toFixed(2)}</div>
                        
                        <div className="text-sm text-muted-foreground mb-1">
                          Seller: {purchase.seller}
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Purchased: {purchase.purchaseDate}</span>
                          </div>
                          
                          {purchase.estimatedDelivery && purchase.status !== 'cancelled' && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>
                                {purchase.status === 'delivered' 
                                  ? 'Delivered on: ' 
                                  : 'Est. delivery: '}
                                {purchase.estimatedDelivery}
                              </span>
                            </div>
                          )}
                          
                          {purchase.trackingNumber && purchase.status !== 'pending' && purchase.status !== 'cancelled' && (
                            <div className="flex items-center gap-1 sm:col-span-2">
                              <Package className="h-4 w-4" />
                              <span>Tracking: {purchase.trackingNumber}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-auto flex flex-wrap gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/product/${purchase.productId}`}>
                              <ExternalLink className="h-4 w-4 mr-1" />
                              View Item
                            </Link>
                          </Button>
                          
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Contact Seller
                          </Button>
                          
                          {purchase.status === 'delivered' && !purchase.isRated && (
                            <Button 
                              size="sm"
                              onClick={() => openRatingModal(purchase)}
                            >
                              <Star className="h-4 w-4 mr-1" />
                              Rate Purchase
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {selectedItem && (
        <RatingModal
          isOpen={ratingModalOpen}
          onClose={() => setRatingModalOpen(false)}
          productId={selectedItem.productId}
          productTitle={selectedItem.title}
          productImage={selectedItem.image}
        />
      )}
    </div>
  );
};

export default Purchases;
