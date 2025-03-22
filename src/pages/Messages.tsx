
import { useState } from "react";
import { Search, Send, ChevronLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/components/NavBar";

interface Message {
  id: number;
  text: string;
  time: string;
  isOwn: boolean;
}

interface Conversation {
  id: number;
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  lastMessage: string;
  time: string;
  unread: boolean;
  messages: Message[];
}

const Messages = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      user: {
        name: "Jane Smith",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        initials: "JS",
      },
      lastMessage: "How soon can you ship this?",
      time: "2 min ago",
      unread: true,
      messages: [
        { id: 1, text: "Hello, I'm interested in the vintage camera you listed.", time: "Yesterday 3:45 PM", isOwn: false },
        { id: 2, text: "Great! It's still available. Do you have any questions about it?", time: "Yesterday 4:10 PM", isOwn: true },
        { id: 3, text: "What's the condition of the lens?", time: "Yesterday 4:15 PM", isOwn: false },
        { id: 4, text: "The lens is in excellent condition. No scratches or fungus.", time: "Yesterday 4:25 PM", isOwn: true },
        { id: 5, text: "How soon can you ship this?", time: "Today 10:30 AM", isOwn: false },
      ]
    },
    {
      id: 2,
      user: {
        name: "Robert Johnson",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        initials: "RJ",
      },
      lastMessage: "Thanks for the quick delivery!",
      time: "Yesterday",
      unread: false,
      messages: [
        { id: 1, text: "Hi, I received the vintage record player today.", time: "Yesterday 1:20 PM", isOwn: false },
        { id: 2, text: "Everything looks good?", time: "Yesterday 1:45 PM", isOwn: true },
        { id: 3, text: "Yes, works perfectly! Thanks for the quick delivery!", time: "Yesterday 2:05 PM", isOwn: false },
      ]
    },
    {
      id: 3,
      user: {
        name: "Sarah Williams",
        avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        initials: "SW",
      },
      lastMessage: "Is the price negotiable?",
      time: "2 days ago",
      unread: false,
      messages: [
        { id: 1, text: "Hello, I'm interested in the antique desk lamp.", time: "2 days ago 11:30 AM", isOwn: false },
        { id: 2, text: "Is the price negotiable?", time: "2 days ago 11:32 AM", isOwn: false },
        { id: 3, text: "Hi Sarah! I could consider reasonable offers. What did you have in mind?", time: "2 days ago 12:15 PM", isOwn: true },
      ]
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !selectedConversation) return;

    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        const updatedMessages = [...conv.messages, {
          id: conv.messages.length + 1,
          text: newMessage,
          time: "Just now",
          isOwn: true
        }];

        return {
          ...conv,
          messages: updatedMessages,
          lastMessage: newMessage,
          time: "Just now"
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setNewMessage("");
    
    // Update the selected conversation
    const updatedSelectedConv = updatedConversations.find(
      conv => conv.id === selectedConversation.id
    );
    if (updatedSelectedConv) {
      setSelectedConversation(updatedSelectedConv);
    }
  };

  const markAsRead = (conversationId: number) => {
    setConversations(
      conversations.map(conv => 
        conv.id === conversationId ? { ...conv, unread: false } : conv
      )
    );
  };

  const selectConversation = (conversation: Conversation) => {
    markAsRead(conversation.id);
    setSelectedConversation(conversation);
    setIsMobileView(true);
  };

  const backToList = () => {
    setIsMobileView(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="container max-w-7xl py-10 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">Messages</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[70vh] bg-card rounded-lg border overflow-hidden">
          {/* Conversation List */}
          <div className={`lg:col-span-4 border-r ${isMobileView ? 'hidden lg:block' : 'block'}`}>
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search messages..." 
                  className="pl-9"
                />
              </div>
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <div className="px-4 pt-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                  <TabsTrigger value="archived">Archived</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="m-0">
                <ScrollArea className="h-[calc(70vh-8rem)]">
                  <div className="divide-y">
                    {conversations.map(conversation => (
                      <div 
                        key={conversation.id}
                        className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${selectedConversation?.id === conversation.id ? 'bg-muted' : ''}`}
                        onClick={() => selectConversation(conversation)}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                            <AvatarFallback>{conversation.user.initials}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-1">
                              <h4 className="text-sm font-medium">{conversation.user.name}</h4>
                              <span className="text-xs text-muted-foreground">{conversation.time}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                              {conversation.unread && (
                                <Badge variant="default" className="ml-2 h-2 w-2 rounded-full p-0" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="unread" className="m-0">
                <ScrollArea className="h-[calc(70vh-8rem)]">
                  <div className="divide-y">
                    {conversations.filter(c => c.unread).map(conversation => (
                      <div 
                        key={conversation.id}
                        className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${selectedConversation?.id === conversation.id ? 'bg-muted' : ''}`}
                        onClick={() => selectConversation(conversation)}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                            <AvatarFallback>{conversation.user.initials}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-1">
                              <h4 className="text-sm font-medium">{conversation.user.name}</h4>
                              <span className="text-xs text-muted-foreground">{conversation.time}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                              <Badge variant="default" className="ml-2 h-2 w-2 rounded-full p-0" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="archived" className="h-[calc(70vh-8rem)] flex items-center justify-center text-muted-foreground">
                No archived messages
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Chat Area */}
          <div className={`lg:col-span-8 flex flex-col ${isMobileView ? 'block' : 'hidden lg:flex'}`}>
            {selectedConversation ? (
              <>
                <div className="p-4 border-b flex items-center gap-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="lg:hidden" 
                    onClick={backToList}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Avatar>
                    <AvatarImage src={selectedConversation.user.avatar} alt={selectedConversation.user.name} />
                    <AvatarFallback>{selectedConversation.user.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{selectedConversation.user.name}</h4>
                    <p className="text-xs text-muted-foreground">Active now</p>
                  </div>
                </div>
                
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {selectedConversation.messages.map(message => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.isOwn 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className={`text-xs mt-1 ${message.isOwn ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                            {message.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="p-4 border-t">
                  <div className="flex items-center gap-2">
                    <Input 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage} size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Send className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-2">Your Messages</h3>
                <p className="text-muted-foreground max-w-md">
                  Select a conversation to view messages or start a new conversation when viewing product listings.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
