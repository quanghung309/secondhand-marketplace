import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { User, Settings, Shield, Bell, LogOut } from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    bio: "I'm a collector of vintage items and tech gadgets. Always looking for unique finds!",
  });
  const [formData, setFormData] = useState({ ...profileData });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    setProfileData(formData);
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
  };

  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and account settings</p>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_3fr]">
        {/* Sidebar */}
        <div className="space-y-4">
          <div className="flex flex-col items-center p-4 text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Profile picture" />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">{profileData.name}</h2>
            <p className="text-sm text-muted-foreground">{profileData.email}</p>
            <p className="text-sm text-muted-foreground">Member since Jan 2023</p>
          </div>

          <div className="rounded-lg border bg-card">
            <div className="flex flex-col space-y-1 p-1">
              {[
                { icon: <User className="h-4 w-4" />, label: "Profile", active: true },
                { icon: <Settings className="h-4 w-4" />, label: "Account Settings" },
                { icon: <Shield className="h-4 w-4" />, label: "Privacy & Security" },
                { icon: <Bell className="h-4 w-4" />, label: "Notifications" },
              ].map((item, index) => (
                <Button
                  key={index}
                  variant={item.active ? "secondary" : "ghost"}
                  className="justify-start"
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </Button>
              ))}
              <Button variant="ghost" className="justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
                <LogOut className="h-4 w-4" />
                <span className="ml-2">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-6">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Update your personal details here
                      </CardDescription>
                    </div>
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)}>Edit</Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={handleCancel}>
                          Cancel
                        </Button>
                        <Button onClick={handleSave}>Save</Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Manage your preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Preferences settings will be implemented in a future update.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>Manage your payment methods and billing history</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Billing settings will be implemented in a future update.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
