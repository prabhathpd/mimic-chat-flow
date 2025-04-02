
import { MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data
const conversations = [
  {
    id: 1,
    user: "Jane Cooper",
    message: "Thanks for your help with my account issue",
    time: "10m ago",
    status: "completed",
    avatar: "JC"
  },
  {
    id: 2,
    user: "Alex Johnson",
    message: "I'm having trouble with the checkout process",
    time: "25m ago",
    status: "active",
    avatar: "AJ"
  },
  {
    id: 3,
    user: "Michael Scott",
    message: "Do you offer discounts for yearly plans?",
    time: "1h ago",
    status: "pending",
    avatar: "MS"
  },
  {
    id: 4,
    user: "Sarah Williams",
    message: "My order hasn't arrived yet, can you help?",
    time: "2h ago",
    status: "completed",
    avatar: "SW"
  },
  {
    id: 5,
    user: "David Kim",
    message: "Just wanted to say your support team is awesome!",
    time: "3h ago",
    status: "completed",
    avatar: "DK"
  }
];

const StatusBadge = ({ status }: { status: string }) => {
  const statusClasses = {
    active: "bg-green-100 text-dashboard-green",
    pending: "bg-yellow-100 text-dashboard-yellow",
    completed: "bg-gray-100 text-dashboard-gray"
  };
  
  const statusText = {
    active: "Active",
    pending: "Pending",
    completed: "Completed"
  };

  return (
    <span className={cn(
      "px-2 py-1 rounded-full text-xs font-medium",
      statusClasses[status as keyof typeof statusClasses]
    )}>
      {statusText[status as keyof typeof statusText]}
    </span>
  );
};

interface ConversationsListProps {
  title: string;
}

const ConversationsList = ({ title }: ConversationsListProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center">
            <MessageSquare size={18} className="mr-2 text-dashboard-blue" />
            {title}
          </h3>
          <a href="/conversations" className="text-sm text-dashboard-blue hover:underline">
            View all
          </a>
        </div>
      </div>
      <div>
        {conversations.map((conversation) => (
          <div 
            key={conversation.id} 
            className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-dashboard-blue text-white flex items-center justify-center mr-3 flex-shrink-0">
                <span>{conversation.avatar}</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium truncate">{conversation.user}</h4>
                  <StatusBadge status={conversation.status} />
                </div>
                <p className="text-sm text-gray-500 truncate">{conversation.message}</p>
                <span className="text-xs text-gray-400">{conversation.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationsList;
