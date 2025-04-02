
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  color?: "blue" | "indigo" | "purple" | "cyan" | "green" | "yellow" | "red";
}

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend = "neutral", 
  trendValue, 
  color = "blue" 
}: StatCardProps) => {
  const trendColors = {
    up: "text-dashboard-green",
    down: "text-dashboard-red",
    neutral: "text-dashboard-gray"
  };
  
  const iconColors = {
    blue: "bg-blue-100 text-dashboard-blue",
    indigo: "bg-indigo-100 text-dashboard-indigo",
    purple: "bg-purple-100 text-dashboard-purple",
    cyan: "bg-cyan-100 text-dashboard-cyan",
    green: "bg-green-100 text-dashboard-green",
    yellow: "bg-yellow-100 text-dashboard-yellow",
    red: "bg-red-100 text-dashboard-red"
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          {trendValue && (
            <p className={cn("text-xs font-medium flex items-center", trendColors[trend])}>
              {trend === "up" && "↑"}
              {trend === "down" && "↓"}
              {trendValue}
            </p>
          )}
        </div>
        <div className={cn("p-3 rounded-full", iconColors[color])}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
