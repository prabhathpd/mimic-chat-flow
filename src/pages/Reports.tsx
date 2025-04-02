
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Share2, BarChart3, PieChart, TrendingUp, Clock } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts";

// Mock data
const performanceData = [
  { name: 'Mon', conversations: 40, resolutionTime: 3.2, satisfaction: 90 },
  { name: 'Tue', conversations: 45, resolutionTime: 2.9, satisfaction: 92 },
  { name: 'Wed', conversations: 39, resolutionTime: 3.5, satisfaction: 87 },
  { name: 'Thu', conversations: 52, resolutionTime: 2.7, satisfaction: 93 },
  { name: 'Fri', conversations: 48, resolutionTime: 3.1, satisfaction: 91 },
  { name: 'Sat', conversations: 25, resolutionTime: 2.8, satisfaction: 94 },
  { name: 'Sun', conversations: 20, resolutionTime: 2.5, satisfaction: 95 },
];

const monthlyTrendData = [
  { name: 'Jan', conversations: 420, resolutionTime: 4.2, satisfaction: 82 },
  { name: 'Feb', conversations: 440, resolutionTime: 4.0, satisfaction: 83 },
  { name: 'Mar', conversations: 455, resolutionTime: 3.8, satisfaction: 85 },
  { name: 'Apr', conversations: 480, resolutionTime: 3.6, satisfaction: 86 },
  { name: 'May', conversations: 520, resolutionTime: 3.4, satisfaction: 87 },
  { name: 'Jun', conversations: 550, resolutionTime: 3.2, satisfaction: 88 },
  { name: 'Jul', conversations: 580, resolutionTime: 3.0, satisfaction: 90 },
  { name: 'Aug', conversations: 620, resolutionTime: 2.9, satisfaction: 91 },
  { name: 'Sep', conversations: 650, resolutionTime: 2.8, satisfaction: 92 },
  { name: 'Oct', conversations: 680, resolutionTime: 2.7, satisfaction: 92 },
  { name: 'Nov', conversations: 720, resolutionTime: 2.6, satisfaction: 93 },
  { name: 'Dec', conversations: 750, resolutionTime: 2.5, satisfaction: 94 },
];

const topIssuesData = [
  { name: 'Technical Support', value: 35 },
  { name: 'Billing Inquiries', value: 25 },
  { name: 'Product Information', value: 20 },
  { name: 'Order Status', value: 15 },
  { name: 'Returns & Refunds', value: 5 },
];

const Reports = () => {
  return (
    <div className="py-6 px-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-gray-500">Analyze your conversation metrics and performance</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar size={16} />
            <span>Date Range</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            <span>Export</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 size={16} />
            <span>Share</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Total Conversations</p>
                <h3 className="text-2xl font-bold">8,642</h3>
                <p className="text-sm text-green-600">↑ 12.5% from last month</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full text-dashboard-blue">
                <BarChart3 size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Customer Satisfaction</p>
                <h3 className="text-2xl font-bold">94.2%</h3>
                <p className="text-sm text-green-600">↑ 3.1% from last month</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full text-dashboard-green">
                <TrendingUp size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Avg. Resolution Time</p>
                <h3 className="text-2xl font-bold">2.8h</h3>
                <p className="text-sm text-green-600">↓ 15% from last month</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full text-dashboard-purple">
                <Clock size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Issue Categories</p>
                <h3 className="text-2xl font-bold">12</h3>
                <p className="text-sm text-gray-500">No change from last month</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full text-dashboard-yellow">
                <PieChart size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>Track key metrics over time</CardDescription>
          <Tabs defaultValue="weekly" className="mt-2">
            <TabsList>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyTrendData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#1E40AF" />
                <YAxis yAxisId="right" orientation="right" stroke="#4ADE80" />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="conversations" 
                  name="Conversations" 
                  stroke="#1E40AF" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="satisfaction" 
                  name="Satisfaction (%)" 
                  stroke="#4ADE80" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Resolution Time Trend</CardTitle>
            <CardDescription>Average time to resolve customer issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlyTrendData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorResolution" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="resolutionTime" 
                    name="Resolution Time (hours)" 
                    stroke="#8884d8" 
                    fillOpacity={1} 
                    fill="url(#colorResolution)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Customer Issues</CardTitle>
            <CardDescription>Distribution of conversation topics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topIssuesData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Percentage (%)" fill="#1E40AF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
