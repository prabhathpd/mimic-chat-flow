
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Bell, 
  User, 
  Lock, 
  MessageSquare, 
  Users, 
  Globe, 
  Shield, 
  CreditCard,
  Save,
  AlertCircle,
  Database,
  Webhook
} from "lucide-react";

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [autoAssign, setAutoAssign] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <div className="py-6 px-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-500">Manage your account and application preferences</p>
      </div>
      
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
          <Card>
            <CardContent className="p-0">
              <nav className="flex flex-col space-y-1 p-2">
                <Button variant="ghost" className="justify-start gap-3">
                  <User size={16} />
                  <span>Profile</span>
                </Button>
                <Button variant="ghost" className="justify-start gap-3">
                  <Lock size={16} />
                  <span>Security</span>
                </Button>
                <Button variant="ghost" className="justify-start gap-3">
                  <Bell size={16} />
                  <span>Notifications</span>
                </Button>
                <Button variant="ghost" className="justify-start gap-3 bg-gray-100">
                  <MessageSquare size={16} />
                  <span>Chat Settings</span>
                </Button>
                <Button variant="ghost" className="justify-start gap-3">
                  <Users size={16} />
                  <span>Team</span>
                </Button>
                <Button variant="ghost" className="justify-start gap-3">
                  <Globe size={16} />
                  <span>Integrations</span>
                </Button>
                <Button variant="ghost" className="justify-start gap-3">
                  <Database size={16} />
                  <span>Data Management</span>
                </Button>
                <Button variant="ghost" className="justify-start gap-3">
                  <Webhook size={16} />
                  <span>API & Webhooks</span>
                </Button>
                <Button variant="ghost" className="justify-start gap-3">
                  <CreditCard size={16} />
                  <span>Billing</span>
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-span-12 md:col-span-9 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Chat Settings</CardTitle>
              <CardDescription>Configure how your chat system works and appears to customers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Appearance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="chatName" className="text-sm font-medium">Chat Window Title</label>
                    <Input id="chatName" defaultValue="Customer Support" />
                    <p className="text-xs text-gray-500">This appears at the top of your chat widget</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="primaryColor" className="text-sm font-medium">Primary Color</label>
                    <div className="flex gap-2">
                      <Input id="primaryColor" defaultValue="#1E40AF" />
                      <div className="h-10 w-10 rounded bg-dashboard-blue"></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Dark Mode</h4>
                    <p className="text-sm text-gray-500">Enable dark mode for the chat widget</p>
                  </div>
                  <Switch 
                    checked={darkMode} 
                    onCheckedChange={setDarkMode} 
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Behavior</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto-assign Conversations</h4>
                    <p className="text-sm text-gray-500">Automatically assign new conversations to available agents</p>
                  </div>
                  <Switch 
                    checked={autoAssign} 
                    onCheckedChange={setAutoAssign} 
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="welcomeMessage" className="text-sm font-medium">Welcome Message</label>
                  <Input id="welcomeMessage" defaultValue="Hello! How can we help you today?" />
                  <p className="text-xs text-gray-500">First message shown to users when they open the chat</p>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="offlineMessage" className="text-sm font-medium">Offline Message</label>
                  <Input id="offlineMessage" defaultValue="We're currently away. Please leave a message and we'll get back to you soon." />
                  <p className="text-xs text-gray-500">Message shown when no agents are available</p>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="responseTime" className="text-sm font-medium">Response Time Expectation</label>
                  <select id="responseTime" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                    <option value="1">Typically replies in a few minutes</option>
                    <option value="2">Typically replies in under an hour</option>
                    <option value="3">Typically replies in a few hours</option>
                    <option value="4">Typically replies within a day</option>
                  </select>
                  <p className="text-xs text-gray-500">Sets expectations for your customers</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notifications</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-gray-500">Get email notifications for new messages</p>
                  </div>
                  <Switch 
                    checked={emailNotifications} 
                    onCheckedChange={setEmailNotifications} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS Notifications</h4>
                    <p className="text-sm text-gray-500">Get SMS notifications for new messages</p>
                  </div>
                  <Switch 
                    checked={smsNotifications} 
                    onCheckedChange={setSmsNotifications} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-sm text-gray-500">Get browser push notifications for new messages</p>
                  </div>
                  <Switch 
                    checked={pushNotifications} 
                    onCheckedChange={setPushNotifications} 
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button className="flex items-center gap-2">
                  <Save size={16} />
                  <span>Save Changes</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="bg-amber-50 text-amber-800 border-b border-amber-100">
              <div className="flex items-start gap-2">
                <AlertCircle className="mt-0.5" size={18} />
                <div>
                  <CardTitle className="text-amber-800">Data Privacy & Compliance</CardTitle>
                  <CardDescription className="text-amber-700">
                    Review important information about data handling and privacy
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              <div className="flex gap-2">
                <Shield className="mt-0.5 flex-shrink-0 text-dashboard-blue" size={18} />
                <div>
                  <h4 className="font-medium">Data Retention</h4>
                  <p className="text-sm text-gray-500">Conversation data is currently stored for 12 months. You can adjust this in Data Management settings.</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Shield className="mt-0.5 flex-shrink-0 text-dashboard-blue" size={18} />
                <div>
                  <h4 className="font-medium">Encryption</h4>
                  <p className="text-sm text-gray-500">All conversations are encrypted in transit and at rest for your security.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
