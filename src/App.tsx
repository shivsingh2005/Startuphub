import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Marketplace from "./pages/Marketplace";
import { useDemoAuth } from "./lib/demoAuth";

// Investor pages
import InvestorDashboard from "./pages/investor/InvestorDashboard";
import InvestorInbox from "./pages/investor/InvestorInbox";
import InvestorInvestments from "./pages/investor/InvestorInvestments";
import PortfolioAnalytics from "./pages/investor/PortfolioAnalytics";

// Founder pages
import FounderDashboard from "./pages/founder/FounderDashboard";
import PitchRequest from "./pages/founder/PitchRequest";
import FounderStartup from "./pages/founder/FounderStartup";
import FounderOnboarding from "./pages/founder/FounderOnboarding";
import FounderMilestones from "./pages/founder/FounderMilestones";
import FounderTeam from "./pages/founder/FounderTeam";
import FounderAnalytics from "./pages/founder/FounderAnalytics";

// Team pages
import TeamDashboard from "./pages/team/TeamDashboard";
import TeamTasks from "./pages/team/TeamTasks";
import TeamPerformance from "./pages/team/TeamPerformance";
import TeamOverview from "./pages/team/TeamOverview";
import TeamNotifications from "./pages/team/TeamNotifications";

const queryClient = new QueryClient();

// Demo Protected Route
const DemoProtectedRoute = () => {
  const { user, isLoading } = useDemoAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return user ? <Outlet /> : null;
};

interface AppProps {
  demoMode?: boolean;
}

const App = ({ demoMode = true }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/marketplace" element={<Marketplace />} />

            {/* Investor Routes */}
            <Route path="/investor/dashboard" element={<InvestorDashboard />} />
            <Route path="/investor/inbox" element={<InvestorInbox />} />
            <Route path="/investor/investments" element={<InvestorInvestments />} />
            <Route path="/investor/analytics" element={<PortfolioAnalytics />} />

            {/* Founder Routes */}
            <Route path="/founder/dashboard" element={<FounderDashboard />} />
            <Route path="/founder/onboarding" element={<FounderOnboarding />} />
            <Route path="/founder/pitch" element={<PitchRequest />} />
            <Route path="/founder/startup" element={<FounderStartup />} />
            <Route path="/founder/milestones" element={<FounderMilestones />} />
            <Route path="/founder/team" element={<FounderTeam />} />
            <Route path="/founder/analytics" element={<FounderAnalytics />} />

            {/* Team Routes */}
            <Route path="/team/dashboard" element={<TeamDashboard />} />
            <Route path="/team/tasks" element={<TeamTasks />} />
            <Route path="/team/overview" element={<TeamOverview />} />
            <Route path="/team/performance" element={<TeamPerformance />} />
            <Route path="/team/notifications" element={<TeamNotifications />} />
            <Route path="/team/profile" element={<TeamDashboard />} />

            {/* Demo Quick Access Routes */}
            <Route path="/demo/founder" element={<FounderDashboard />} />
            <Route path="/demo/investor" element={<InvestorDashboard />} />
            <Route path="/demo/team" element={<TeamDashboard />} />

            {/* Test Routes */}
            <Route path="/login" element={<Auth />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

