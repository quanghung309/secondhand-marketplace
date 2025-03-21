
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  count?: number;
  active?: boolean;
  to: string;
}

const SidebarItem = ({ icon, label, count, active, to }: SidebarItemProps) => {
  return (
    <li>
      <Link
        to={to}
        className={cn(
          "flex items-center justify-between rounded-lg py-2 px-3 text-sm font-medium transition-colors",
          active
            ? "bg-primary/10 text-primary"
            : "text-foreground/70 hover:bg-secondary"
        )}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span>{label}</span>
        </div>
        {count && (
          <span className={cn(
            "rounded-full text-xs px-2 py-0.5",
            active
              ? "bg-primary text-white"
              : "bg-secondary text-foreground/70"
          )}>
            {count}
          </span>
        )}
      </Link>
    </li>
  );
};

export default SidebarItem;
