import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Rocket,
  LayoutDashboard,
  Briefcase,
  TrendingUp,
  Users,
  Store,
  Bell,
  Settings,
  User,
  LogOut,
  CheckSquare,
} from "lucide-react";

interface MarketplaceLayoutProps {
  children: ReactNode;
  userRole?: "founder" | "investor" | "team";
}

export function MarketplaceLayout({ children, userRole = "founder" }: MarketplaceLayoutProps) {
  const location = useLocation();
  
  const getDashboardLink = () => {
    switch (userRole) {
      case "investor":
        return "/investor/dashboard";
      case "team":
        return "/team/dashboard";
      default:
        return "/founder/dashboard";
    }
  };

  const getDashboardLabel = () => {
    switch (userRole) {
      case "investor":
        return "Investor Dashboard";
      case "team":
        return "Team Dashboard";
      default:
        return "Founder Dashboard";
    }
  };

  const getDashboardIcon = () => {
    switch (userRole) {
      case "investor":
        return TrendingUp;
      case "team":
        return CheckSquare;
      default:
        return Rocket;
    }
  };

  const DashboardIcon = getDashboardIcon();

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/marketplace" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
              <Store className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground hidden sm:block">
              StartupHub
            </span>
          </Link>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link to={`/marketplace?role=${userRole}`}>
              <Button 
                variant={location.pathname === "/marketplace" ? "secondary" : "ghost"} 
                size="sm"
                className="gap-2"
              >
                <Store className="w-4 h-4" />
                Marketplace
              </Button>
            </Link>
            
            <Link to={getDashboardLink()}>
              <Button 
                variant={location.pathname.includes("dashboard") ? "secondary" : "ghost"} 
                size="sm"
                className="gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                {getDashboardLabel()}
              </Button>
            </Link>

            {userRole === "founder" && (
              <Link to="/founder/pitch">
                <Button 
                  variant={location.pathname === "/founder/pitch" ? "secondary" : "ghost"} 
                  size="sm"
                  className="gap-2"
                >
                  <Briefcase className="w-4 h-4" />
                  Pitch
                </Button>
              </Link>
            )}

            {userRole === "investor" && (
              <Link to="/investor/inbox">
                <Button 
                  variant={location.pathname === "/investor/inbox" ? "secondary" : "ghost"} 
                  size="sm"
                  className="gap-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  Inbox
                  <Badge variant="secondary" className="ml-1 text-xs">3</Badge>
                </Button>
              </Link>
            )}

            {userRole === "team" && (
              <Link to="/team/tasks">
                <Button 
                  variant={location.pathname === "/team/tasks" ? "secondary" : "ghost"} 
                  size="sm"
                  className="gap-2"
                >
                  <CheckSquare className="w-4 h-4" />
                  My Tasks
                  <Badge variant="secondary" className="ml-1 text-xs">3</Badge>
                </Button>
              </Link>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
            
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>

            <div className="h-6 w-px bg-border mx-1" />

            <Button variant="ghost" size="sm" className="gap-2 hidden sm:flex">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">My Account</span>
            </Button>

            <Link to="/auth">
              <Button variant="ghost" size="icon">
                <LogOut className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-border">
          <div className="container mx-auto px-4 py-2 flex items-center justify-between overflow-x-auto">
            <Link to={`/marketplace?role=${userRole}`}>
              <Button 
                variant={location.pathname === "/marketplace" ? "secondary" : "ghost"} 
                size="sm"
                className="gap-1 whitespace-nowrap"
              >
                <Store className="w-4 h-4" />
                Marketplace
              </Button>
            </Link>
            
            <Link to={getDashboardLink()}>
              <Button 
                variant={location.pathname.includes("dashboard") ? "secondary" : "ghost"} 
                size="sm"
                className="gap-1 whitespace-nowrap"
              >
                <DashboardIcon className="w-4 h-4" />
                Dashboard
              </Button>
            </Link>

            {userRole === "founder" && (
              <Link to="/founder/pitch">
                <Button 
                  variant={location.pathname === "/founder/pitch" ? "secondary" : "ghost"} 
                  size="sm"
                  className="gap-1 whitespace-nowrap"
                >
                  <Briefcase className="w-4 h-4" />
                  Pitch
                </Button>
              </Link>
            )}

            {userRole === "investor" && (
              <Link to="/investor/inbox">
                <Button 
                  variant={location.pathname === "/investor/inbox" ? "secondary" : "ghost"} 
                  size="sm"
                  className="gap-1 whitespace-nowrap"
                >
                  <TrendingUp className="w-4 h-4" />
                  Inbox
                </Button>
              </Link>
            )}

            {userRole === "team" && (
              <Link to="/team/tasks">
                <Button 
                  variant={location.pathname === "/team/tasks" ? "secondary" : "ghost"} 
                  size="sm"
                  className="gap-1 whitespace-nowrap"
                >
                  <CheckSquare className="w-4 h-4" />
                  Tasks
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
