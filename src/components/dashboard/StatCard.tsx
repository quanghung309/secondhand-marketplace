
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  up: boolean;
}

const StatCard = ({ label, value, change, up }: StatCardProps) => {
  return (
    <div className="rounded-xl border border-border bg-card p-5 hover-lift">
      <div className="text-foreground/60 text-sm font-medium">{label}</div>
      <div className="mt-1 flex items-end justify-between">
        <div className="text-2xl font-bold">{value}</div>
        <div className={cn(
          "flex items-center text-xs",
          up ? "text-green-500" : "text-red-500"
        )}>
          {change}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
