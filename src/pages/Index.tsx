
import { 
  MessageSquare, 
  Users, 
  BarChart3, 
  Clock 
} from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import ActivityChart from "@/components/dashboard/ActivityChart";
import ConversationsList from "@/components/dashboard/ConversationsList";

const Index = () => {
  return (
    <div className="py-6 px-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome back, here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Conversations" 
          value="2,584"
          icon={<MessageSquare size={22} />}
          trend="up"
          trendValue="12% from last month"
          color="blue"
        />
        <StatCard 
          title="Active Users" 
          value="1,429"
          icon={<Users size={22} />}
          trend="up"
          trendValue="8% from last month"
          color="green"
        />
        <StatCard 
          title="Conversion Rate" 
          value="28.6%"
          icon={<BarChart3 size={22} />}
          trend="down"
          trendValue="3% from last month"
          color="yellow"
        />
        <StatCard 
          title="Avg. Response Time" 
          value="2m 42s"
          icon={<Clock size={22} />}
          trend="up"
          trendValue="10% from last month"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityChart 
            title="Conversation Activity" 
            subtitle="Total conversations over the last 7 days"
          />
        </div>
        <div>
          <ConversationsList title="Recent Conversations" />
        </div>
      </div>
    </div>
  );
};

export default Index;
