
import { Bell } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  link?: string;
}

const NotificationPopover = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "New Message",
      message: "Jane Smith sent you a message about the vintage camera",
      time: "2 min ago",
      isRead: false,
      link: "/messages"
    },
    {
      id: 2,
      title: "Order Update",
      message: "Your purchase of Bluetooth headphones has been shipped",
      time: "1 hour ago",
      isRead: false,
      link: "/purchases"
    },
    {
      id: 3,
      title: "Listing Update",
      message: "Your vintage record player listing has received 5 new views",
      time: "3 hours ago",
      isRead: false,
      link: "/my-listings"
    },
    {
      id: 4,
      title: "Payment Received",
      message: "You've received payment for the antique desk lamp",
      time: "Yesterday",
      isRead: true,
      link: "/dashboard"
    },
    {
      id: 5,
      title: "Sale Completed",
      message: "Your sale of vintage typewriter has been completed",
      time: "2 days ago",
      isRead: true,
      link: "/dashboard"
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
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
          {notifications.length > 0 ? (
            <div className="divide-y">
              {notifications.map(notification => (
                <Link
                  key={notification.id}
                  to={notification.link || "#"}
                  className="block"
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className={`p-4 hover:bg-muted/50 ${!notification.isRead ? 'bg-muted/20' : ''}`}>
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="text-sm font-medium mb-1">{notification.title}</h4>
                        <p className="text-xs text-muted-foreground">{notification.message}</p>
                      </div>
                      {!notification.isRead && (
                        <span className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
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
