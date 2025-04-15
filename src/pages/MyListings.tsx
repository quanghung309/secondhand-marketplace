
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
  Check, 
  X, 
  AlertTriangle, 
  Clock,
  FileText
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
import { useListings, useDeleteListing, type ProductStatus } from "@/hooks/useListings";
import { formatDistanceToNow } from "date-fns";

const statusIcons = {
  active: <Check className="h-4 w-4 text-green-500" />,
  sold: <Check className="h-4 w-4 text-blue-500" />,
  expired: <Clock className="h-4 w-4 text-red-500" />,
  draft: <FileText className="h-4 w-4 text-amber-500" />
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
  const [activeTab, setActiveTab] = useState<ProductStatus | "all">("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [selectedListing, setSelectedListing] = useState<string | null>(null);

  const { data: listings, isLoading } = useListings(activeTab === "all" ? undefined : activeTab);
  const { deleteListing } = useDeleteListing();

  const handleOpenDeleteDialog = (id: string) => {
    setSelectedListing(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteListing = async () => {
    if (!selectedListing) return;
    
    try {
      await deleteListing(selectedListing);
      toast.success("Listing deleted successfully");
      setDeleteDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to delete listing");
    }
  };

  if (isLoading) {
    return (
      <div className="container max-w-5xl py-10">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

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

      <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as ProductStatus | "all")}>
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="sold">Sold</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {!listings?.length ? (
            <div className="text-center py-16 border rounded-lg bg-muted/30">
              <h3 className="font-medium text-lg">No listings found</h3>
              <p className="text-muted-foreground mt-1">
                You don't have any {activeTab !== "all" ? activeTab : ""} listings yet.
              </p>
              {activeTab !== "draft" && (
                <Button asChild variant="outline" className="mt-4">
                  <Link to="/sell">Create a listing</Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {listings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-48 h-48 sm:h-auto">
                        <img 
                          src={listing.images[0]} 
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
                            <span>Listed: </span>
                            <span>{formatDistanceToNow(new Date(listing.created_at))} ago</span>
                          </div>
                          {listing.expires_at && (
                            <div>
                              <span>Expires: </span>
                              <span>{formatDistanceToNow(new Date(listing.expires_at))} left</span>
                            </div>
                          )}
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
