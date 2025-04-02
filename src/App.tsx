
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Analytics from "./pages/Analytics";
import Conversations from "./pages/Conversations";
import Team from "./pages/Team";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
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
                <Analytics />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/conversations" 
            element={
              <DashboardLayout>
                <Conversations />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/team" 
            element={
              <DashboardLayout>
                <Team />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/reports" 
            element={
              <DashboardLayout>
                <Reports />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <DashboardLayout>
                <Settings />
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
