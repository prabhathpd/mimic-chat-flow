
import { Bell, Search, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="h-16 border-b border-gray-200 px-6 flex items-center justify-between bg-white">
      <div className="flex items-center w-1/3">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search..." 
            className="pl-10 bg-gray-50 border-gray-200 w-full"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" aria-label="Help">
          <HelpCircle size={20} className="text-gray-600" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute -top-0.5 -right-0.5 bg-dashboard-red rounded-full w-4 h-4 flex items-center justify-center text-[10px] text-white">3</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
