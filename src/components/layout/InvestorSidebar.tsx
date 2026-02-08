import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDemoAuth } from "@/lib/demoAuth";
import {
  LayoutDashboard,
  Briefcase,
  Inbox,
  PieChart,
  Settings,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Store,
} from "lucide-react";

const investorMenuItems = [
  {
    title: "Marketplace",
    url: "/marketplace",
    icon: Store,
  },
  {
    title: "Dashboard",
    url: "/investor/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Investments",
    url: "/investor/investments",
    icon: Briefcase,
  },
  {
    title: "Pitch Inbox",
    url: "/investor/inbox",
    icon: Inbox,
    badge: 3,
  },
  {
    title: "Portfolio Analytics",
    url: "/investor/analytics",
    icon: PieChart,
  },
];

export function InvestorSidebar() {
  const location = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  const { user } = useDemoAuth();

  const isActive = (path: string) => location.pathname === path;

  // Get user initials for avatar
  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <Link to="/investor/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-investor flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-5 h-5 text-investor-foreground" />
          </div>
          {!collapsed && (
            <div>
              <span className="font-display text-lg font-bold text-sidebar-foreground">
FoundersPath
              </span>
              <Badge variant="investor" className="ml-2 text-xs">Investor</Badge>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {investorMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={collapsed ? item.title : undefined}
                  >
                    <Link
                      to={item.url}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                        isActive(item.url)
                          ? "bg-investor/10 text-investor font-medium"
                          : "text-sidebar-foreground hover:bg-sidebar-accent"
                      }`}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1">{item.title}</span>
                          {item.badge && (
                            <span className="w-5 h-5 rounded-full bg-investor text-investor-foreground text-xs flex items-center justify-center">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2 border-t border-sidebar-border">
        <div className="flex flex-col gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="w-full justify-start gap-3 text-sidebar-foreground"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span>Collapse</span>
              </>
            )}
          </Button>
          
          <Link to="/investor/settings">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-3 text-sidebar-foreground"
            >
              <Settings className="w-4 h-4" />
              {!collapsed && <span>Settings</span>}
            </Button>
          </Link>
          
          {/* User Profile Section */}
          {user && (
            <div className={`flex items-center gap-3 px-3 py-2 ${collapsed ? "justify-center" : ""}`}>
              <div className="w-8 h-8 rounded-full bg-investor flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-investor-foreground">
                  {getUserInitials(user.name)}
                </span>
              </div>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-sidebar-foreground/60 truncate">
                    {user.email}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

