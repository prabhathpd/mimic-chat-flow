
import { BarChart3, ArrowUpRight, ArrowDownRight, Users } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

// Mock data
const monthlyData = [
  { name: 'Jan', conversations: 420, users: 350 },
  { name: 'Feb', conversations: 380, users: 290 },
  { name: 'Mar', conversations: 520, users: 410 },
  { name: 'Apr', conversations: 580, users: 490 },
  { name: 'May', conversations: 620, users: 530 },
  { name: 'Jun', conversations: 750, users: 580 },
  { name: 'Jul', conversations: 820, users: 710 },
  { name: 'Aug', conversations: 980, users: 840 },
  { name: 'Sep', conversations: 1050, users: 890 },
  { name: 'Oct', conversations: 1280, users: 1020 },
  { name: 'Nov', conversations: 1480, users: 1220 },
  { name: 'Dec', conversations: 1620, users: 1350 },
];

const weeklyData = [
  { name: 'Mon', conversations: 240, users: 180 },
  { name: 'Tue', conversations: 300, users: 250 },
  { name: 'Wed', conversations: 320, users: 270 },
  { name: 'Thu', conversations: 280, users: 240 },
  { name: 'Fri', conversations: 250, users: 210 },
  { name: 'Sat', conversations: 180, users: 140 },
  { name: 'Sun', conversations: 150, users: 120 },
];

const channelData = [
  { name: 'Website', value: 40 },
  { name: 'Mobile App', value: 30 },
  { name: 'Facebook', value: 15 },
  { name: 'Instagram', value: 10 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#1E40AF', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'];

const Analytics = () => {
  return (
    <div className="py-6 px-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-gray-500">Monitor your conversation metrics and trends</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Conversations</p>
                <h3 className="text-2xl font-bold mt-1">8,642</h3>
                <div className="flex items-center mt-1 text-sm">
                  <ArrowUpRight className="text-green-500 mr-1" size={16} />
                  <span className="text-green-500 font-medium">18.2%</span>
                  <span className="text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-full text-dashboard-blue">
                <BarChart3 size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Users</p>
                <h3 className="text-2xl font-bold mt-1">4,827</h3>
                <div className="flex items-center mt-1 text-sm">
                  <ArrowUpRight className="text-green-500 mr-1" size={16} />
                  <span className="text-green-500 font-medium">12.5%</span>
                  <span className="text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-full text-dashboard-green">
                <Users size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Completion Rate</p>
                <h3 className="text-2xl font-bold mt-1">87.3%</h3>
                <div className="flex items-center mt-1 text-sm">
                  <ArrowUpRight className="text-green-500 mr-1" size={16} />
                  <span className="text-green-500 font-medium">3.8%</span>
                  <span className="text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-full text-dashboard-purple">
                <BarChart3 size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Bounce Rate</p>
                <h3 className="text-2xl font-bold mt-1">12.8%</h3>
                <div className="flex items-center mt-1 text-sm">
                  <ArrowDownRight className="text-red-500 mr-1" size={16} />
                  <span className="text-red-500 font-medium">2.1%</span>
                  <span className="text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full text-dashboard-yellow">
                <BarChart3 size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Conversation Trends</CardTitle>
              <CardDescription>Analyze user engagement over time</CardDescription>
              <Tabs defaultValue="monthly" className="mt-2">
                <TabsList>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
                <TabsContent value="weekly" className="mt-4">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={weeklyData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorConversations" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#1E40AF" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#4ADE80" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="conversations" 
                          stroke="#1E40AF" 
                          fillOpacity={1} 
                          fill="url(#colorConversations)" 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="users" 
                          stroke="#4ADE80" 
                          fillOpacity={1} 
                          fill="url(#colorUsers)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                <TabsContent value="monthly" className="mt-4">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={monthlyData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorConversations" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#1E40AF" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#4ADE80" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="conversations" 
                          stroke="#1E40AF" 
                          fillOpacity={1} 
                          fill="url(#colorConversations)" 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="users" 
                          stroke="#4ADE80" 
                          fillOpacity={1} 
                          fill="url(#colorUsers)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Conversation Channels</CardTitle>
              <CardDescription>Distribution by platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={channelData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {channelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Conversation Performance</CardTitle>
            <CardDescription>Top metrics by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="conversations" name="Conversations" fill="#1E40AF" />
                  <Bar dataKey="users" name="Active Users" fill="#4ADE80" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
