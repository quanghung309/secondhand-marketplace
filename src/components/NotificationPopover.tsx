
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import { useNotifications } from "@/hooks/useNotifications";
import { useAuth } from "@/context/AuthContext";
import { format, formatDistanceToNow } from "date-fns";

const NotificationPopover = () => {
  const { user } = useAuth();
  const { 
    notifications, 
    unreadCount, 
    markAllAsRead, 
    markAsRead,
    loading
  } = useNotifications();
  
  if (!user) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-80" align="end">
          <div className="flex items-center justify-between py-3 px-4 border-b">
            <h3 className="font-medium text-sm">Notifications</h3>
          </div>
          <div className="p-4 text-center text-muted-foreground">
            Sign in to view notifications
          </div>
          <div className="p-2 border-t">
            <Button variant="outline" className="w-full text-xs h-8">
              <Link to="/signin" className="w-full">Sign In</Link>
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  const formatNotificationTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isYesterday = new Date(now.setDate(now.getDate() - 1)).toDateString() === date.toDateString();
    
    if (isToday) {
      return formatDistanceToNow(date, { addSuffix: true });
    } else if (isYesterday) {
      return 'Yesterday';
    } else {
      return format(date, 'MMM d');
    }
  };

  const getNotificationLink = (notification: any) => {
    switch (notification.type) {
      case "New Message":
        return "/messages";
      case "Order Update":
        return "/purchases";
      case "Listing Update":
        return "/my-listings";
      case "Auction Update":
        return "/auctions";
      case "Payment Received":
      case "Sale Completed":
        return "/dashboard";
      default:
        return "#";
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-80" align="end">
        <div className="flex items-center justify-between py-3 px-4 border-b">
          <h3 className="font-medium text-sm">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-8"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        <ScrollArea className="h-80">
          {loading ? (
            <div className="flex justify-center items-center h-20">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : notifications.length > 0 ? (
            <div className="divide-y">
              {notifications.map(notification => (
                <Link
                  key={notification.id}
                  to={getNotificationLink(notification)}
                  className="block"
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className={`p-4 hover:bg-muted/50 ${!notification.read ? 'bg-muted/20' : ''}`}>
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="text-sm font-medium mb-1">{notification.type}</h4>
                        <p className="text-xs text-muted-foreground">{notification.message}</p>
                      </div>
                      {!notification.read && (
                        <span className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {formatNotificationTime(notification.created_at)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              No notifications
            </div>
          )}
        </ScrollArea>
        <div className="p-2 border-t">
          <Button variant="outline" className="w-full text-xs h-8">
            <Link to="/messages" className="w-full">View all notifications</Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopover;
