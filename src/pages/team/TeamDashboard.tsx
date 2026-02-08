import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TeamLayout } from "@/components/layout/TeamLayout";
import {
  CheckSquare,
  Clock,
  AlertCircle,
  Play,
  CheckCircle2,
  TrendingUp,
  Calendar,
  Target,
  User,
  ArrowRight,
  MoreHorizontal,
  PieChart,
  BarChart3,
  Users,
  Award,
  Briefcase,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

// Mock data for team member dashboard
const myTasksToday = {
  dueToday: 3,
  overdue: 1,
  inProgress: 2,
  completedToday: 2,
};

// Monthly progress data for charts
const monthlyProgressData = [
  { month: "Jan", completed: 12, assigned: 15 },
  { month: "Feb", completed: 18, assigned: 20 },
  { month: "Mar", completed: 15, assigned: 18 },
  { month: "Apr", completed: 22, assigned: 25 },
  { month: "May", completed: 20, assigned: 22 },
  { month: "Jun", completed: 25, assigned: 28 },
];

// Task distribution for pie chart
const taskDistributionData = [
  { name: "Completed", value: 45, color: "#22c55e" },
  { name: "In Progress", value: 12, color: "#3b82f6" },
  { name: "To Do", value: 8, color: "#6b7280" },
  { name: "Overdue", value: 3, color: "#ef4444" },
];

// Performance trend data
const performanceTrendData = [
  { week: "Week 1", score: 72 },
  { week: "Week 2", score: 78 },
  { week: "Week 3", score: 82 },
  { week: "Week 4", score: 85 },
  { week: "Week 5", score: 83 },
  { week: "Week 6", score: 88 },
];

// Team info
const myTeam = {
  name: "TechFlow AI",
  role: "Full Stack Developer",
  joinedDate: "2023-06-15",
  department: "Engineering",
  reportingTo: "Rahul Kumar (CTO)",
  teamSize: 8,
};

const myTickets = [
  {
    id: "1",
    title: "Implement user authentication API",
    priority: "high",
    status: "in_progress",
    milestone: "MVP Launch",
    dueDate: "Today",
    assignedBy: "Priya Sharma (Founder)",
    progress: 60,
    description: "Create JWT-based auth system with login/signup endpoints",
  },
  {
    id: "2",
    title: "Design dashboard UI mockups",
    priority: "medium",
    status: "todo",
    milestone: "MVP Launch",
    dueDate: "Tomorrow",
    assignedBy: "Rahul Kumar (CTO)",
    progress: 0,
    description: "Create Figma mockups for the main dashboard interface",
  },
  {
    id: "3",
    title: "Write API documentation",
    priority: "low",
    status: "todo",
    milestone: "Beta Release",
    dueDate: "3 days",
    assignedBy: "Priya Sharma (Founder)",
    progress: 0,
    description: "Document all REST API endpoints with examples",
  },
  {
    id: "4",
    title: "Fix navigation bug on mobile",
    priority: "high",
    status: "overdue",
    milestone: "MVP Launch",
    dueDate: "Yesterday",
    assignedBy: "Anjali Rao (Designer)",
    progress: 30,
    description: "Responsive menu not closing on mobile devices",
  },
  {
    id: "5",
    title: "Setup CI/CD pipeline",
    priority: "medium",
    status: "completed",
    milestone: "Infrastructure",
    dueDate: "Completed",
    assignedBy: "Rahul Kumar (CTO)",
    progress: 100,
    completedAt: "2 hours ago",
    description: "Configure GitHub Actions for automated testing and deployment",
  },
];

const performanceStats = {
  tasksCompletedThisWeek: 12,
  onTimeTasks: 10,
  lateTasks: 2,
  inProgressTasks: 3,
  performanceScore: 83,
  weeklyGrowth: 15,
};

const teamOverview = [
  { name: "Priya Sharma", role: "Founder", currentTask: "Investor Pitch", status: "busy", avatar: "PS" },
  { name: "Rahul Kumar", role: "CTO", currentTask: "Architecture Review", status: "available", avatar: "RK" },
  { name: "Anjali Rao", role: "Designer", currentTask: "UI Components", status: "busy", avatar: "AR" },
  { name: "Vikram Mehta", role: "Backend Dev", currentTask: "API Optimization", status: "busy", avatar: "VM" },
  { name: "Sneha Patel", role: "Frontend Dev", currentTask: "Dashboard UI", status: "available", avatar: "SP" },
];

export default function TeamDashboard() {
  const [updatingTask, setUpdatingTask] = useState<string | null>(null);

  const handleStartTask = (taskId: string) => {
    setUpdatingTask(taskId);
    setTimeout(() => setUpdatingTask(null), 1000);
    console.log("Starting task:", taskId);
  };

  const handleCompleteTask = (taskId: string) => {
    setUpdatingTask(taskId);
    setTimeout(() => setUpdatingTask(null), 1000);
    console.log("Completing task:", taskId);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "in_progress":
        return <Play className="w-4 h-4 text-accent" />;
      case "overdue":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <TeamLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-2">
              <BarChart3 className="w-8 h-8 text-team" />
              My Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Track your performance, progress, and team activity
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Performance Score</p>
              <p className="text-2xl font-bold text-team">{performanceStats.performanceScore}%</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-team/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-team" />
            </div>
          </div>
        </div>

        {/* Team Info Card */}
        <Card className="bg-gradient-to-r from-team/5 to-accent/5 border-team/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-team/20 flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-team" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground">{myTeam.name}</h2>
                  <p className="text-muted-foreground">{myTeam.role} • {myTeam.department}</p>
                  <p className="text-sm text-muted-foreground">Joined {new Date(myTeam.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
              <div className="flex gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-foreground">{myTeam.teamSize}</p>
                  <p className="text-xs text-muted-foreground">Team Members</p>
                </div>
                <div className="w-px bg-border" />
                <div>
                  <p className="text-2xl font-bold text-foreground">68</p>
                  <p className="text-xs text-muted-foreground">Tasks Done</p>
                </div>
                <div className="w-px bg-border" />
                <div>
                  <p className="text-2xl font-bold text-foreground">94%</p>
                  <p className="text-xs text-muted-foreground">On-Time Rate</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* My Work Today - Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border hover:border-team/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Due Today</p>
                  <p className="text-2xl font-bold text-foreground">{myTasksToday.dueToday}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-destructive/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overdue</p>
                  <p className="text-2xl font-bold text-destructive">{myTasksToday.overdue}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-accent/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-accent">{myTasksToday.inProgress}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Play className="w-5 h-5 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-success/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed Today</p>
                  <p className="text-2xl font-bold text-success">{myTasksToday.completedToday}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Progress Chart */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-team" />
                Monthly Progress
              </CardTitle>
              <p className="text-sm text-muted-foreground">Tasks completed vs assigned over 6 months</p>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyProgressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                      labelStyle={{ color: '#111827', fontWeight: 600 }}
                    />
                    <Bar dataKey="assigned" fill="#e5e7eb" radius={[4, 4, 0, 0]} name="Assigned" />
                    <Bar dataKey="completed" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Completed" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Task Distribution Pie Chart */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <PieChart className="w-5 h-5 text-team" />
                Task Distribution
              </CardTitle>
              <p className="text-sm text-muted-foreground">Current task status breakdown</p>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={taskDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {taskDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
                <div className="absolute flex flex-col gap-2 text-sm bg-white/80 p-2 rounded-lg">
                  {taskDistributionData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-muted-foreground">{item.name}: {item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Trend & Quick Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Performance Trend */}
          <Card className="bg-card border-border lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-team" />
                Performance Trend
              </CardTitle>
              <p className="text-sm text-muted-foreground">Weekly performance score over time</p>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="week" stroke="#6b7280" fontSize={12} />
                    <YAxis domain={[0, 100]} stroke="#6b7280" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                      labelStyle={{ color: '#111827', fontWeight: 600 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#8b5cf6" 
                      strokeWidth={3}
                      dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Quick Tasks */}
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-team" />
                  Quick Tasks
                </CardTitle>
                <p className="text-sm text-muted-foreground">Priority items for today</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {myTickets.slice(0, 3).map((ticket) => (
                <div
                  key={ticket.id}
                  className={`p-3 rounded-lg border ${
                    ticket.status === "overdue"
                      ? "border-destructive/30 bg-destructive/5"
                      : "border-border"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {getStatusIcon(ticket.status)}
                    <span className="font-medium text-sm text-foreground line-clamp-1">{ticket.title}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{ticket.milestone}</span>
                    <span className={ticket.status === "overdue" ? "text-destructive" : ""}>{ticket.dueDate}</span>
                  </div>
                </div>
              ))}
              <Link to="/team/tasks">
                <Button variant="outline" className="w-full" size="sm">
                  View All Tasks
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Team Members Section */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-team" />
              Team Members
            </CardTitle>
            <p className="text-sm text-muted-foreground">People you work with in {myTeam.name}</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {teamOverview.map((member, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-border hover:border-team/30 hover:bg-muted/30 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-team/20 to-accent/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-team">{member.avatar}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Target className="w-3 h-3" />
                      <span className="truncate">{member.currentTask}</span>
                    </div>
                    <Badge 
                      variant={member.status === "available" ? "success" : "secondary"} 
                      className="text-xs"
                    >
                      {member.status === "available" ? "Available" : "Busy"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements Section */}
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2 text-amber-800">
              <Award className="w-5 h-5 text-amber-600" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-amber-100">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-amber-900">Speed Demon</p>
                  <p className="text-xs text-amber-700">Completed 5 tasks in one day</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-amber-100">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-amber-900">On-Time Pro</p>
                  <p className="text-xs text-amber-700">10 tasks completed before deadline</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-amber-100">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-amber-900">Rising Star</p>
                  <p className="text-xs text-amber-700">Performance score above 85%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TeamLayout>
  );
}
