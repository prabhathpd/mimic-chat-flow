
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
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
import { Search, Filter, MessageSquare, Clock, ThumbsUp, ThumbsDown } from "lucide-react";

// Mock data
const conversationData = [
  {
    id: "CON-1234",
    user: "Alice Johnson",
    userEmail: "alice@example.com",
    message: "I'm trying to figure out how to upgrade my account to premium",
    timestamp: "Today, 14:35",
    status: "active",
    duration: "5m 23s",
    sentiment: "positive",
    platform: "Website"
  },
  {
    id: "CON-1235",
    user: "Bob Smith",
    userEmail: "bob@example.com",
    message: "The checkout process isn't working for me",
    timestamp: "Today, 13:12",
    status: "pending",
    duration: "2m 45s",
    sentiment: "negative",
    platform: "Mobile App"
  },
  {
    id: "CON-1236",
    user: "Carlos Rodriguez",
    userEmail: "carlos@example.com",
    message: "Thanks for the quick response to my query",
    timestamp: "Today, 11:50",
    status: "completed",
    duration: "3m 18s",
    sentiment: "positive",
    platform: "Website"
  },
  {
    id: "CON-1237",
    user: "Diana Chen",
    userEmail: "diana@example.com",
    message: "I need to change my delivery address for order #5432",
    timestamp: "Today, 10:27",
    status: "active",
    duration: "8m 12s",
    sentiment: "neutral",
    platform: "Website"
  },
  {
    id: "CON-1238",
    user: "Ethan Brown",
    userEmail: "ethan@example.com",
    message: "Where can I find the warranty information?",
    timestamp: "Yesterday, 16:45",
    status: "completed",
    duration: "1m 55s",
    sentiment: "neutral",
    platform: "Facebook"
  },
  {
    id: "CON-1239",
    user: "Fiona Wallace",
    userEmail: "fiona@example.com",
    message: "My product arrived damaged, I need a replacement",
    timestamp: "Yesterday, 14:22",
    status: "pending",
    duration: "10m 05s",
    sentiment: "negative",
    platform: "Instagram"
  },
  {
    id: "CON-1240",
    user: "George Patel",
    userEmail: "george@example.com",
    message: "Can I get a discount for bulk ordering?",
    timestamp: "Yesterday, 11:15",
    status: "completed",
    duration: "4m 38s",
    sentiment: "positive",
    platform: "Website"
  },
  {
    id: "CON-1241",
    user: "Hannah Kim",
    userEmail: "hannah@example.com",
    message: "When will the new model be available?",
    timestamp: "2 days ago, 15:30",
    status: "completed",
    duration: "2m 20s",
    sentiment: "neutral",
    platform: "Mobile App"
  }
];

const Conversations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const filteredConversations = conversationData.filter(
    convo => 
      convo.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      convo.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      convo.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusColor = (status) => {
    switch(status) {
      case "active": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const getSentimentIcon = (sentiment) => {
    switch(sentiment) {
      case "positive": return <ThumbsUp size={16} className="text-green-500" />;
      case "negative": return <ThumbsDown size={16} className="text-red-500" />;
      default: return null;
    }
  };
  
  const handleViewConversation = (id) => {
    navigate(`/conversation/${id}`);
  };
  
  return (
    <div className="py-6 px-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Conversations</h1>
        <p className="text-gray-500">View and manage all your customer conversations</p>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>All Conversations</CardTitle>
              <CardDescription>A list of all customer conversations across your platforms</CardDescription>
            </div>
            <Tabs defaultValue="all" className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search conversations..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              <span>Filters</span>
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead className="hidden md:table-cell">Message</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Platform</TableHead>
                  <TableHead className="hidden md:table-cell">Duration</TableHead>
                  <TableHead className="hidden md:table-cell">Sentiment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConversations.map((conversation) => (
                  <TableRow key={conversation.id}>
                    <TableCell className="font-medium">{conversation.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{conversation.user}</div>
                        <div className="text-sm text-gray-500">{conversation.userEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell max-w-xs truncate">
                      {conversation.message}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(conversation.status)}`}>
                        {conversation.status.charAt(0).toUpperCase() + conversation.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{conversation.platform}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1 text-gray-500" />
                        {conversation.duration}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center">
                        {getSentimentIcon(conversation.sentiment)}
                        <span className="ml-1">{conversation.sentiment.charAt(0).toUpperCase() + conversation.sentiment.slice(1)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewConversation(conversation.id)}
                      >
                        View
                      </Button>
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

export default Conversations;
