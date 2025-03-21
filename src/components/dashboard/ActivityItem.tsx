
import { cn } from "@/lib/utils";
import { ChevronDown, MessageCircle, ShoppingBag } from "lucide-react";

// Star icon (not imported from lucide-react)
const Star = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

interface ActivityItemProps {
  type: "message" | "offer" | "sale" | "review";
  user: string;
  time: string;
  content: string;
}

const ActivityItem = ({ type, user, time, content }: ActivityItemProps) => {
  return (
    <div className="flex items-start gap-4 p-4">
      <div className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
        type === "message" ? "bg-blue-100 text-blue-500" :
        type === "offer" ? "bg-orange-100 text-orange-500" :
        type === "sale" ? "bg-green-100 text-green-500" :
        "bg-purple-100 text-purple-500"
      )}>
        {type === "message" ? <MessageCircle className="h-5 w-5" /> :
          type === "offer" ? <ChevronDown className="h-5 w-5" /> :
          type === "sale" ? <ShoppingBag className="h-5 w-5" /> :
          <Star className="h-5 w-5" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">
          <span className="font-semibold">{user}</span> {content}
        </p>
        <p className="mt-1 text-xs text-foreground/60">{time}</p>
      </div>
      <button className="rounded-md p-2 text-foreground/60 hover:bg-secondary transition-colors">
        <ChevronDown className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ActivityItem;
