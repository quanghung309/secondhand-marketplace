
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  ChevronDown, 
  Check, 
  X, 
  AlertTriangle, 
  Clock
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { toast } from "sonner";

type ListingStatus = "active" | "sold" | "expired" | "draft";

interface Listing {
  id: number;
  title: string;
  price: number;
  image: string;
  status: ListingStatus;
  createdAt: string;
  views: number;
  likes: number;
}

const statusIcons = {
  active: <Check className="h-4 w-4 text-green-500" />,
  sold: <Check className="h-4 w-4 text-blue-500" />,
  expired: <Clock className="h-4 w-4 text-red-500" />,
  draft: <AlertTriangle className="h-4 w-4 text-amber-500" />
};

const statusLabels = {
  active: "Active",
  sold: "Sold",
  expired: "Expired",
  draft: "Draft"
};

const statusClasses = {
  active: "bg-green-100 text-green-600",
  sold: "bg-blue-100 text-blue-600",
  expired: "bg-red-100 text-red-600",
  draft: "bg-amber-100 text-amber-600"
};

const MyListings = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [selectedListing, setSelectedListing] = useState<number | null>(null);

  const mockListings: Listing[] = [
    {
      id: 1,
      title: "Vintage Camera",
      price: 120,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=200&h=200&auto=format&fit=crop",
      status: "active",
      createdAt: "2023-10-12",
      views: 24,
      likes: 5
    },
    {
      id: 2,
      title: "Leather Backpack",
      price: 85,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=200&h=200&auto=format&fit=crop",
      status: "active",
      createdAt: "2023-09-28",
      views: 18,
      likes: 3
    },
    {
      id: 3,
      title: "Bluetooth Speaker",
      price: 45,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=200&h=200&auto=format&fit=crop",
      status: "sold",
      createdAt: "2023-08-15",
      views: 32,
      likes: 7
    },
    {
      id: 4,
      title: "Vintage Record Player",
      price: 250,
      image: "https://images.unsplash.com/photo-1541667558913-5510f7461cf4?q=80&w=200&h=200&auto=format&fit=crop",
      status: "expired",
      createdAt: "2023-06-10",
      views: 15,
      likes: 2
    },
    {
      id: 5,
      title: "Mechanical Keyboard",
      price: 95,
      image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=200&h=200&auto=format&fit=crop",
      status: "draft",
      createdAt: "2023-11-02",
      views: 0,
      likes: 0
    },
  ];

  const filteredListings = mockListings.filter(listing => {
    if (activeTab === "all") return true;
    return listing.status === activeTab;
  });

  const handleOpenDeleteDialog = (id: number) => {
    setSelectedListing(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteListing = () => {
    // This would be an API call in a real application
    toast.success("Listing deleted successfully");
    setDeleteDialogOpen(false);
  };

  return (
    <div className="container max-w-5xl py-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Listings</h1>
          <p className="text-muted-foreground">Manage all your marketplace listings</p>
        </div>
        <Button asChild className="flex gap-1">
          <Link to="/sell">
            <Plus className="h-4 w-4" />
            Create New Listing
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="sold">Sold</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredListings.length === 0 ? (
            <div className="text-center py-16 border rounded-lg bg-muted/30">
              <h3 className="font-medium text-lg">No listings found</h3>
              <p className="text-muted-foreground mt-1">You don't have any {activeTab !== "all" ? activeTab : ""} listings yet.</p>
              {activeTab !== "draft" && (
                <Button asChild variant="outline" className="mt-4">
                  <Link to="/sell">Create a listing</Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-48 h-48 sm:h-auto">
                        <img 
                          src={listing.image} 
                          alt={listing.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col flex-1 p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{listing.title}</h3>
                          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${statusClasses[listing.status]}`}>
                            {statusIcons[listing.status]}
                            <span>{statusLabels[listing.status]}</span>
                          </div>
                        </div>
                        <div className="text-xl font-bold mb-4">${listing.price.toFixed(2)}</div>
                        
                        <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-muted-foreground">
                          <div>
                            <span>Date listed: </span>
                            <span>{listing.createdAt}</span>
                          </div>
                          <div>
                            <span>Views: </span>
                            <span>{listing.views}</span>
                          </div>
                        </div>
                        
                        <div className="mt-auto flex flex-wrap gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/product/${listing.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Link>
                          </Button>
                          
                          {listing.status !== 'sold' && (
                            <>
                              <Button variant="outline" size="sm" asChild>
                                <Link to={`/edit-listing/${listing.id}`}>
                                  <Edit2 className="h-4 w-4 mr-1" />
                                  Edit
                                </Link>
                              </Button>
                              
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleOpenDeleteDialog(listing.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
                            </>
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

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Listing</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this listing? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteListing}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyListings;
