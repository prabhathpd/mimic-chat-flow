import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
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
  Webhook,
  Phone,
  Settings as SettingsIcon,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { toast } from "sonner";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const Settings = () => {
  const navigate = useNavigate();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [autoAssign, setAutoAssign] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("chat");
  const [vapiApiKey, setVapiApiKey] = useState("");
  const [isTestingApi, setIsTestingApi] = useState(false);
  const [apiTestStatus, setApiTestStatus] = useState(null); // null, "success", "error"
  const [isOpenIntegrations, setIsOpenIntegrations] = useState(false);
  
  const handleSaveChanges = () => {
    toast.success("Settings saved successfully!");
  };
  
  const handleTestVapiApi = () => {
    if (!vapiApiKey) {
      toast.error("Please enter your Vapi API key");
      return;
    }
    
    setIsTestingApi(true);
    // Simulate API test
    setTimeout(() => {
      // For demo purposes, we'll just check if the key is non-empty
      if (vapiApiKey.length > 10) {
        setApiTestStatus("success");
        toast.success("Vapi API connection successful!");
      } else {
        setApiTestStatus("error");
        toast.error("Invalid Vapi API key. Please check and try again.");
      }
      setIsTestingApi(false);
    }, 1500);
  };
  
  const handleNavigateToCallLogs = () => {
    navigate("/call-logs");
  };
  
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
                <Button 
                  variant="ghost" 
                  className={`justify-start gap-3 ${activeSection === "profile" ? "bg-gray-100" : ""}`}
                  onClick={() => setActiveSection("profile")}
                >
                  <User size={16} />
                  <span>Profile</span>
                </Button>
                <Button 
                  variant="ghost" 
                  className={`justify-start gap-3 ${activeSection === "security" ? "bg-gray-100" : ""}`}
                  onClick={() => setActiveSection("security")}
                >
                  <Lock size={16} />
                  <span>Security</span>
                </Button>
                <Button 
                  variant="ghost" 
                  className={`justify-start gap-3 ${activeSection === "notifications" ? "bg-gray-100" : ""}`}
                  onClick={() => setActiveSection("notifications")}
                >
                  <Bell size={16} />
                  <span>Notifications</span>
                </Button>
                <Button 
                  variant="ghost" 
                  className={`justify-start gap-3 ${activeSection === "chat" ? "bg-gray-100" : ""}`}
                  onClick={() => setActiveSection("chat")}
                >
                  <MessageSquare size={16} />
                  <span>Chat Settings</span>
                </Button>
                <Button 
                  variant="ghost" 
                  className={`justify-start gap-3 ${activeSection === "team" ? "bg-gray-100" : ""}`}
                  onClick={() => setActiveSection("team")}
                >
                  <Users size={16} />
                  <span>Team</span>
                </Button>
                <Button 
                  variant="ghost" 
                  className={`justify-start gap-3 ${activeSection === "integrations" ? "bg-gray-100" : ""}`}
                  onClick={() => setActiveSection("integrations")}
                >
                  <Globe size={16} />
                  <span>Integrations</span>
                </Button>
                <Button 
                  variant="ghost" 
                  className={`justify-start gap-3 ${activeSection === "data" ? "bg-gray-100" : ""}`}
                  onClick={() => setActiveSection("data")}
                >
                  <Database size={16} />
                  <span>Data Management</span>
                </Button>
                <Button 
                  variant="ghost" 
                  className={`justify-start gap-3 ${activeSection === "api" ? "bg-gray-100" : ""}`}
                  onClick={() => setActiveSection("api")}
                >
                  <Webhook size={16} />
                  <span>API & Webhooks</span>
                </Button>
                <Button 
                  variant="ghost" 
                  className={`justify-start gap-3 ${activeSection === "billing" ? "bg-gray-100" : ""}`}
                  onClick={() => setActiveSection("billing")}
                >
                  <CreditCard size={16} />
                  <span>Billing</span>
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-span-12 md:col-span-9 space-y-6">
          {activeSection === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your personal information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-sm font-medium">Full Name</label>
                      <Input id="fullName" defaultValue="Alex Smith" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                      <Input id="email" defaultValue="alex@example.com" type="email" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                      <Input id="phone" defaultValue="+1 (555) 123-4567" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="jobTitle" className="text-sm font-medium">Job Title</label>
                      <Input id="jobTitle" defaultValue="Sales Manager" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Profile Picture</h3>
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                      <User size={32} />
                    </div>
                    <div>
                      <Button variant="outline">Upload New Picture</Button>
                      <p className="text-xs text-gray-500 mt-1">JPG, GIF or PNG. Max size of 800K</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button className="flex items-center gap-2" onClick={handleSaveChanges}>
                    <Save size={16} />
                    <span>Save Changes</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {activeSection === "chat" && (
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
                  <Button className="flex items-center gap-2" onClick={handleSaveChanges}>
                    <Save size={16} />
                    <span>Save Changes</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {activeSection === "integrations" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Integrations</CardTitle>
                  <CardDescription>Connect with third-party services to enhance your system</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Collapsible 
                    open={isOpenIntegrations} 
                    onOpenChange={setIsOpenIntegrations}
                    className="border rounded-md"
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center text-blue-700">
                          <Phone size={20} />
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium">Vapi</h3>
                          <p className="text-sm text-gray-500">AI voice calling platform for automated outreach</p>
                        </div>
                      </div>
                      {apiTestStatus === "success" ? (
                        <Badge className="bg-green-100 text-green-800">Connected</Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-800">Not Connected</Badge>
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 border-t">
                      <div className="space-y-4">
                        <p>
                          Vapi is a powerful voice API platform that enables AI-powered phone calls with transcription 
                          and analytics. Connect your Vapi account to make and manage calls directly from this dashboard.
                        </p>
                        
                        <div className="space-y-2">
                          <label htmlFor="vapiApiKey" className="text-sm font-medium">Vapi API Key</label>
                          <div className="flex gap-2">
                            <Input 
                              id="vapiApiKey"
                              type="password"
                              placeholder="Enter your Vapi API key" 
                              value={vapiApiKey}
                              onChange={(e) => setVapiApiKey(e.target.value)}
                            />
                            <Button 
                              onClick={handleTestVapiApi}
                              disabled={isTestingApi}
                            >
                              {isTestingApi ? "Testing..." : "Test Connection"}
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500">
                            You can find your API key in your Vapi dashboard under Settings → API Keys
                          </p>
                        </div>
                        
                        {apiTestStatus === "success" && (
                          <div className="bg-green-50 text-green-800 p-3 rounded-md flex items-start gap-2">
                            <CheckCircle size={18} className="mt-0.5" />
                            <div>
                              <p className="font-medium">Connection successful!</p>
                              <p className="text-sm">Your Vapi integration is now active. You can now view call logs and manage calls.</p>
                            </div>
                          </div>
                        )}
                        
                        {apiTestStatus === "error" && (
                          <div className="bg-red-50 text-red-800 p-3 rounded-md flex items-start gap-2">
                            <AlertTriangle size={18} className="mt-0.5" />
                            <div>
                              <p className="font-medium">Connection failed</p>
                              <p className="text-sm">Please check your API key and try again. Make sure you have the correct permissions.</p>
                            </div>
                          </div>
                        )}
                        
                        {apiTestStatus === "success" && (
                          <div className="flex justify-between items-center mt-4">
                            <div>
                              <h4 className="font-medium">Call Logs</h4>
                              <p className="text-sm text-gray-500">View all your Vapi call recordings and transcripts</p>
                            </div>
                            <Button onClick={handleNavigateToCallLogs}>View Call Logs</Button>
                          </div>
                        )}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  
                  <div className="border rounded-md p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-indigo-100 rounded-md flex items-center justify-center text-indigo-700">
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium">Stripe</h3>
                        <p className="text-sm text-gray-500">Payment processing platform</p>
                      </div>
                    </div>
                    <Badge className="bg-gray-100 text-gray-800">Not Connected</Badge>
                  </div>
                  
                  <div className="border rounded-md p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-green-100 rounded-md flex items-center justify-center text-green-700">
                        <MessageSquare size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium">Slack</h3>
                        <p className="text-sm text-gray-500">Team communication platform</p>
                      </div>
                    </div>
                    <Badge className="bg-gray-100 text-gray-800">Not Connected</Badge>
                  </div>
                  
                  <div className="border rounded-md p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center text-blue-700">
                        <Globe size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium">Zapier</h3>
                        <p className="text-sm text-gray-500">Workflow automation platform</p>
                      </div>
                    </div>
                    <Badge className="bg-gray-100 text-gray-800">Not Connected</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="bg-amber-50 text-amber-800 border-b border-amber-100">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5" size={18} />
                    <div>
                      <CardTitle className="text-amber-800">Integration Security</CardTitle>
                      <CardDescription className="text-amber-700">
                        Important information about connecting third-party services
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  <div className="flex gap-2">
                    <Shield className="mt-0.5 flex-shrink-0 text-dashboard-blue" size={18} />
                    <div>
                      <h4 className="font-medium">Secure API Keys</h4>
                      <p className="text-sm text-gray-500">All API keys are encrypted and stored securely. We never share your credentials with third parties.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Shield className="mt-0.5 flex-shrink-0 text-dashboard-blue" size={18} />
                    <div>
                      <h4 className="font-medium">Limited Access</h4>
                      <p className="text-sm text-gray-500">Integrations only request the permissions they need to function. You can review and revoke access at any time.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {!["profile", "chat", "integrations"].includes(activeSection) && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
