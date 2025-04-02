
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/layout/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <DashboardLayout>
                <Index />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <DashboardLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Analytics</h1>
                  <p className="text-gray-500">Coming soon</p>
                </div>
              </DashboardLayout>
            } 
          />
          <Route 
            path="/conversations" 
            element={
              <DashboardLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Conversations</h1>
                  <p className="text-gray-500">Coming soon</p>
                </div>
              </DashboardLayout>
            } 
          />
          <Route 
            path="/team" 
            element={
              <DashboardLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Team</h1>
                  <p className="text-gray-500">Coming soon</p>
                </div>
              </DashboardLayout>
            } 
          />
          <Route 
            path="/reports" 
            element={
              <DashboardLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Reports</h1>
                  <p className="text-gray-500">Coming soon</p>
                </div>
              </DashboardLayout>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <DashboardLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Settings</h1>
                  <p className="text-gray-500">Coming soon</p>
                </div>
              </DashboardLayout>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
