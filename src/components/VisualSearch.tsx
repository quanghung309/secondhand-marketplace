
import { useState } from "react";
import { Upload, Search, ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const VisualSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Image too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = () => {
    if (!selectedImage) return;
    
    setIsSearching(true);
    // In a real implementation, this would send the image to a backend service
    // that would perform image recognition/similarity search
    
    setTimeout(() => {
      setIsSearching(false);
      setIsOpen(false);
      // Navigate to search results
      window.location.href = "/browse?visual=true";
      
      toast({
        title: "Visual search completed",
        description: "Showing results based on your image",
      });
    }, 2000);
  };

  const clearImage = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-2" 
        onClick={() => setIsOpen(true)}
      >
        <ImageIcon className="h-4 w-4" />
        <span className="hidden sm:inline">Search by Image</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Visual Search</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex flex-col items-center gap-4">
              {!selectedImage ? (
                <div className="flex flex-col items-center">
                  <div className="relative w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleImageUpload}
                    />
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        Drop an image here or click to browse
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        JPG, PNG, GIF up to 5MB
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full">
                  <img
                    src={selectedImage}
                    alt="Upload preview"
                    className="w-full h-48 object-contain rounded-lg"
                  />
                  <button
                    onClick={clearImage}
                    className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              <Button
                onClick={handleSearch}
                disabled={!selectedImage || isSearching}
                className="w-full"
              >
                {isSearching ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Find Similar Items
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VisualSearch;
