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
  CheckSquare,
  Users,
  TrendingUp,
  Bell,
  User,
  ChevronLeft,
  ChevronRight,
  Store,
} from "lucide-react";

const teamMenuItems = [
  {
    title: "Marketplace",
    url: "/marketplace?role=team",
    icon: Store,
  },
  {
    title: "Dashboard",
    url: "/team/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Tasks",
    url: "/team/tasks",
    icon: CheckSquare,
    badge: 3,
  },
  {
    title: "Team Overview",
    url: "/team/overview",
    icon: Users,
  },
  {
    title: "My Performance",
    url: "/team/performance",
    icon: TrendingUp,
  },
  {
    title: "Notifications",
    url: "/team/notifications",
    icon: Bell,
    badge: 2,
  },
];

export function TeamSidebar() {
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
        <Link to="/team/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-team flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-team-foreground" />
          </div>
          {!collapsed && (
            <div>
              <span className="font-display text-lg font-bold text-sidebar-foreground">
FoundersPath
              </span>
              <Badge variant="team" className="ml-2 text-xs">Team</Badge>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            My Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {teamMenuItems.map((item) => (
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
                          ? "bg-team/10 text-team font-medium"
                          : "text-sidebar-foreground hover:bg-sidebar-accent"
                      }`}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1">{item.title}</span>
                          {item.badge && (
                            <span className="w-5 h-5 rounded-full bg-team text-team-foreground text-xs flex items-center justify-center">
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
          
          <Link to="/team/profile">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-3 text-sidebar-foreground"
            >
              <User className="w-4 h-4" />
              {!collapsed && <span>Profile</span>}
            </Button>
          </Link>
          
          {/* User Profile Section */}
          {user && (
            <div className={`flex items-center gap-3 px-3 py-2 ${collapsed ? "justify-center" : ""}`}>
              <div className="w-8 h-8 rounded-full bg-team flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-team-foreground">
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

