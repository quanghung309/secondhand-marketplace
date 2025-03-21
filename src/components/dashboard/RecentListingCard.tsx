
import { cn } from "@/lib/utils";

interface ListingItem {
  id: number;
  title: string;
  price: number;
  image: string;
  status: string;
  views: number;
}

interface RecentListingCardProps {
  item: ListingItem;
}

const RecentListingCard = ({ item }: RecentListingCardProps) => {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden hover-lift">
      <div className="relative aspect-square bg-secondary">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={cn(
            "inline-block rounded-full px-2 py-1 text-xs font-medium",
            item.status === "Active"
              ? "bg-green-500 text-white"
              : "bg-gray-500 text-white"
          )}>
            {item.status}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-1">{item.title}</h3>
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold">${item.price}</div>
          <div className="text-sm text-foreground/60">{item.views} views</div>
        </div>
      </div>
    </div>
  );
};

export default RecentListingCard;
