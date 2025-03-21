
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  productTitle: string;
  productImage: string;
}

const RatingModal = ({ isOpen, onClose, productId, productTitle, productImage }: RatingModalProps) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Please select a rating before submitting");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // This would be a real API call in production
      console.log({
        productId,
        rating,
        comment,
      });

      toast.success("Thank you for your review!");
      setIsSubmitting(false);
      resetForm();
      onClose();
    }, 1000);
  };

  const resetForm = () => {
    setRating(0);
    setComment("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rate Your Purchase</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <img 
              src={productImage} 
              alt={productTitle} 
              className="h-16 w-16 rounded-md object-cover"
            />
            <div>
              <h3 className="font-medium">{productTitle}</h3>
              <p className="text-sm text-muted-foreground">How was your experience?</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Your Rating</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleRatingChange(value)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 ${
                      value <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="comment" className="text-sm font-medium">
              Your Review (Optional)
            </label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about your experience with this product..."
              className="min-h-[100px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RatingModal;
