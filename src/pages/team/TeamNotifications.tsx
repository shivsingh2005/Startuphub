import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TeamLayout } from "@/components/layout/TeamLayout";
import {
  Bell,
  CheckCircle2,
  Clock,
  AlertCircle,
  MessageSquare,
  Target,
  User,
  Trash2,
  Settings,
  Filter,
  CheckCheck,
  MoreHorizontal,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const notifications = [
  {
    id: 1,
    type: "task_assigned",
    title: "New Task Assigned",
    message: "Priya Sharma assigned you 'Implement user authentication API'",
    timestamp: "2 hours ago",
    read: false,
    priority: "high",
    action: "View Task",
    actionLink: "/team/tasks",
  },
  {
    id: 2,
    type: "deadline_reminder",
    title: "Deadline Reminder",
    message: "Task 'Fix navigation bug on mobile' is due tomorrow",
    timestamp: "4 hours ago",
    read: false,
    priority: "high",
    action: "View Task",
    actionLink: "/team/tasks",
  },
  {
    id: 3,
    type: "task_completed",
    title: "Task Completed",
    message: "You completed 'Setup CI/CD pipeline'. Great job!",
    timestamp: "5 hours ago",
    read: true,
    priority: "normal",
    action: "View Details",
    actionLink: "/team/tasks",
  },
  {
    id: 4,
    type: "milestone_update",
    title: "Milestone Update",
    message: "MVP Launch milestone is now 90% complete",
    timestamp: "1 day ago",
    read: true,
    priority: "normal",
    action: "View Milestone",
    actionLink: "/team/overview",
  },
  {
    id: 5,
    type: "comment",
    title: "New Comment",
    message: "Rahul Kumar commented on 'Design dashboard UI mockups'",
    timestamp: "1 day ago",
    read: false,
    priority: "normal",
    action: "View Comment",
    actionLink: "/team/tasks",
  },
  {
    id: 6,
    type: "achievement",
    title: "Achievement Unlocked!",
    message: "You earned the 'Speed Demon' badge for completing 5 tasks in one day",
    timestamp: "2 days ago",
    read: true,
    priority: "low",
    action: "View Badge",
    actionLink: "/team/performance",
  },
  {
    id: 7,
    type: "deadline_changed",
    title: "Deadline Changed",
    message: "Deadline for 'Write API documentation' extended to Jan 25",
    timestamp: "2 days ago",
    read: true,
    priority: "normal",
    action: "View Task",
    actionLink: "/team/tasks",
  },
  {
    id: 8,
    type: "team_update",
    title: "Team Update",
    message: "Sneha Patel joined the team as Frontend Developer",
    timestamp: "3 days ago",
    read: true,
    priority: "low",
    action: "View Profile",
    actionLink: "/team/overview",
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "task_assigned":
      return <User className="w-5 h-5 text-blue-500" />;
    case "deadline_reminder":
      return <Clock className="w-5 h-5 text-amber-500" />;
    case "task_completed":
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case "milestone_update":
      return <Target className="w-5 h-5 text-purple-500" />;
    case "comment":
      return <MessageSquare className="w-5 h-5 text-indigo-500" />;
    case "achievement":
      return <CheckCircle2 className="w-5 h-5 text-amber-500" />;
    case "deadline_changed":
      return <AlertCircle className="w-5 h-5 text-orange-500" />;
    case "team_update":
      return <User className="w-5 h-5 text-teal-500" />;
    default:
      return <Bell className="w-5 h-5 text-gray-500" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-700 border-red-200";
    case "normal":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "low":
      return "bg-gray-100 text-gray-700 border-gray-200";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function TeamNotifications() {
  const [activeTab, setActiveTab] = useState("all");
  const [notificationList, setNotificationList] = useState(notifications);

  const unreadCount = notificationList.filter(n => !n.read).length;
  const highPriorityCount = notificationList.filter(n => n.priority === "high" && !n.read).length;

  const filteredNotifications = notificationList.filter((notification) => {
    if (activeTab === "unread") return !notification.read;
    if (activeTab === "high") return notification.priority === "high";
    return true;
  });

  const markAsRead = (id: number) => {
    setNotificationList(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotificationList(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotificationList(prev => prev.filter(n => n.id !== id));
  };

  return (
    <TeamLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-2">
              <Bell className="w-8 h-8 text-team" />
              Notifications
            </h1>
            <p className="text-muted-foreground mt-1">
              Stay updated on your tasks, team activity, and milestones
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1" onClick={markAllAsRead}>
              <CheckCheck className="w-4 h-4" />
              Mark All Read
            </Button>
            <Button variant="ghost" size="sm" className="gap-1">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold text-foreground">{notificationList.length}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600">Unread</p>
                  <p className="text-2xl font-bold text-blue-600">{unreadCount}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600">High Priority</p>
                  <p className="text-2xl font-bold text-red-600">{highPriorityCount}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications List */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all" className="gap-1">
                  All
                  <Badge variant="secondary" className="ml-1">{notificationList.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="unread" className="gap-1">
                  Unread
                  <Badge variant="secondary" className="ml-1">{unreadCount}</Badge>
                </TabsTrigger>
                <TabsTrigger value="high" className="gap-1">
                  High Priority
                  <Badge variant="secondary" className="ml-1">{highPriorityCount}</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No notifications</h3>
                  <p className="text-muted-foreground">You're all caught up!</p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-xl border transition-all ${
                      notification.read
                        ? "border-border bg-card"
                        : "border-team/30 bg-team/5"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className={`font-semibold text-foreground ${
                                !notification.read ? "text-team" : ""
                              }`}>
                                {notification.title}
                              </h4>
                              <span className={`text-xs px-2 py-0.5 rounded-full border ${getPriorityColor(notification.priority)} capitalize`}>
                                {notification.priority}
                              </span>
                              {!notification.read && (
                                <span className="w-2 h-2 rounded-full bg-team" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {notification.timestamp}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-destructive hover:text-destructive"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="mt-3">
                          <Button variant="outline" size="sm" className="text-xs">
                            {notification.action}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <Settings className="w-5 h-5 text-team" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Task Assignments</p>
                    <p className="text-sm text-muted-foreground">When someone assigns you a task</p>
                  </div>
                </div>
                <Badge variant="default">Enabled</Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Deadline Reminders</p>
                    <p className="text-sm text-muted-foreground">24 hours before task deadline</p>
                  </div>
                </div>
                <Badge variant="default">Enabled</Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Target className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Milestone Updates</p>
                    <p className="text-sm text-muted-foreground">When milestones are completed</p>
                  </div>
                </div>
                <Badge variant="secondary">Disabled</Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Comments & Mentions</p>
                    <p className="text-sm text-muted-foreground">When someone comments on your tasks</p>
                  </div>
                </div>
                <Badge variant="default">Enabled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TeamLayout>
  );
}
