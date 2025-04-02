
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Mail, Phone, MessageSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Customer Support Lead",
    avatar: "JD",
    status: "online",
    activeConversations: 3,
    resolvedToday: 12,
    department: "Support",
    availableForAssignment: true
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Senior Support Agent",
    avatar: "SJ",
    status: "offline",
    activeConversations: 0,
    resolvedToday: 8,
    department: "Support",
    availableForAssignment: false
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael@example.com",
    role: "Support Agent",
    avatar: "MC",
    status: "online",
    activeConversations: 2,
    resolvedToday: 9,
    department: "Support",
    availableForAssignment: true
  },
  {
    id: 4,
    name: "Lisa Rodriguez",
    email: "lisa@example.com",
    role: "Support Agent",
    avatar: "LR",
    status: "busy",
    activeConversations: 4,
    resolvedToday: 5,
    department: "Support",
    availableForAssignment: false
  },
  {
    id: 5,
    name: "David Kim",
    email: "david@example.com",
    role: "Sales Support Specialist",
    avatar: "DK",
    status: "online",
    activeConversations: 1,
    resolvedToday: 7,
    department: "Sales",
    availableForAssignment: true
  },
  {
    id: 6,
    name: "Amanda Taylor",
    email: "amanda@example.com",
    role: "Technical Support",
    avatar: "AT",
    status: "away",
    activeConversations: 0,
    resolvedToday: 3,
    department: "Technical",
    availableForAssignment: false
  }
];

const teamPerformance = [
  { metric: "Average Response Time", value: "1m 45s", change: "+12%", trend: "down" },
  { metric: "Customer Satisfaction", value: "94%", change: "+3%", trend: "up" },
  { metric: "Resolution Rate", value: "88%", change: "+5%", trend: "up" },
  { metric: "First Contact Resolution", value: "72%", change: "-2%", trend: "down" }
];

const Team = () => {
  const getStatusColor = (status) => {
    switch(status) {
      case "online": return "bg-green-500";
      case "busy": return "bg-dashboard-red";
      case "away": return "bg-yellow-500";
      case "offline": return "bg-gray-400";
      default: return "bg-gray-400";
    }
  };
  
  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };
  
  const getDepartmentBadge = (department) => {
    switch(department) {
      case "Support": return <Badge className="bg-dashboard-blue">Support</Badge>;
      case "Sales": return <Badge className="bg-dashboard-green">Sales</Badge>;
      case "Technical": return <Badge className="bg-dashboard-purple">Technical</Badge>;
      default: return <Badge>Other</Badge>;
    }
  };
  
  return (
    <div className="py-6 px-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Team</h1>
        <p className="text-gray-500">Manage your support team and monitor performance</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamPerformance.map((item) => (
          <Card key={item.metric}>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">{item.metric}</p>
                <h3 className="text-2xl font-bold">{item.value}</h3>
                <div className="flex items-center text-sm">
                  {item.trend === "up" ? (
                    <span className="text-green-500 font-medium">{item.change} ↑</span>
                  ) : (
                    <span className="text-red-500 font-medium">{item.change} ↓</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage your support team and assign conversations</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Plus size={16} />
                <span>Add Team Member</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input placeholder="Search team members..." className="pl-10" />
            </div>
            <Tabs defaultValue="all" className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="online">Online</TabsTrigger>
                <TabsTrigger value="offline">Offline</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead className="hidden md:table-cell">Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Active Conversations</TableHead>
                  <TableHead className="hidden md:table-cell">Resolved Today</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-dashboard-blue text-white flex items-center justify-center">
                          {member.avatar}
                        </div>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.role}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {getDepartmentBadge(member.department)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${getStatusColor(member.status)}`}></div>
                        <span>{getStatusText(member.status)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center">
                        <MessageSquare size={16} className="mr-2 text-dashboard-blue" />
                        {member.activeConversations}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{member.resolvedToday}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Mail size={16} />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Phone size={16} />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MessageSquare size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Team;
