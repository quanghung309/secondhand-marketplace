
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload, X } from "lucide-react";
import { toast } from "sonner";

// Available categories for the dropdown
const CATEGORIES = [
  "Furniture",
  "Electronics",
  "Clothing",
  "Books",
  "Home Goods",
  "Sports Equipment",
  "Collectibles",
  "Vehicles",
  "Toys & Games",
  "Other",
];

// Available conditions for the dropdown
const CONDITIONS = ["New", "Like New", "Good", "Fair", "Used"];

const Sell = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    price: "",
    location: "",
  });
  const [images, setImages] = useState<string[]>([]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 5 - images.length); // Limit to 5 images total
      
      filesArray.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            setImages(prev => [...prev, reader.result as string].slice(0, 5)); // Keep max 5 images
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Remove an image
  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.price || !formData.category || !formData.condition) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (images.length === 0) {
      toast.error("Please add at least one image");
      return;
    }

    // Submit the listing
    setIsSubmitting(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      toast.success("Your listing has been created successfully!");
      setIsSubmitting(false);
      navigate("/dashboard"); // Redirect to dashboard after submission
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Sell an Item</h1>
            <p className="text-muted-foreground">
              Fill out the form below to list your item for sale. Be sure to provide clear photos and an accurate description.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Item Details Card */}
            <Card>
              <CardHeader>
                <CardTitle>Item Details</CardTitle>
                <CardDescription>
                  Provide accurate information about your item to attract buyers.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., 'Vintage Leather Sofa'"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Describe your item in detail, including any features, flaws, or history."
                    rows={4}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Minimum 20 characters recommended for better visibility.
                  </p>
                </div>

                {/* Category & Condition */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">
                      Category <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="category"
                      name="category"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>Select category</option>
                      {CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="condition">
                      Condition <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="condition"
                      name="condition"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10"
                      value={formData.condition}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>Select condition</option>
                      {CONDITIONS.map((condition) => (
                        <option key={condition} value={condition}>
                          {condition}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price & Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">
                      Price ($) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">
                      Location <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="e.g., 'Seattle, WA'"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Photos Card */}
            <Card>
              <CardHeader>
                <CardTitle>Photos</CardTitle>
                <CardDescription>
                  Add up to 5 photos of your item. The first photo will be used as the main image.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Photo preview area */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative aspect-square rounded-md overflow-hidden border border-border">
                          <img 
                            src={image} 
                            alt={`Product ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-background/80 flex items-center justify-center hover:bg-destructive hover:text-white transition-colors"
                            onClick={() => removeImage(index)}
                          >
                            <X size={14} />
                          </button>
                          {index === 0 && (
                            <div className="absolute bottom-0 left-0 right-0 bg-primary/80 text-primary-foreground text-xs py-1 text-center">
                              Main Photo
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Photo upload button */}
                  {images.length < 5 && (
                    <div className="flex justify-center">
                      <div className="relative">
                        <Input
                          id="photos"
                          type="file"
                          accept="image/*"
                          multiple
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={handleImageChange}
                        />
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 cursor-pointer hover:bg-muted/50 transition-colors">
                          <div className="mb-3 bg-muted rounded-full p-3">
                            <Camera className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <div className="text-center space-y-1">
                            <p className="font-medium">Upload Photos</p>
                            <p className="text-sm text-muted-foreground">
                              Drag and drop or click to browse
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {5 - images.length} photos remaining
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Terms & Submission */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="rounded border-input text-primary focus:ring-primary"
                    required
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
                  </Label>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Listing..." : "Create Listing"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Sell;
