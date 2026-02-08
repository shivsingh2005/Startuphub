import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { FounderLayout } from "@/components/layout/FounderLayout";
import { supabase } from "../../supabaseClient";
import { useDemoAuth } from "@/lib/demoAuth";

interface Startup {
  id: string;
  name: string;
  tagline?: string;
  description?: string;
  domain?: string;
  stage?: string;
  foundedDate?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  teamSize?: number;
  lookingFor?: string;
  teamId?: string;
  executionScore?: number;
  validationScore?: number;
  founderId?: string;
  createdAt?: string;
  milestonesCompleted?: number;
  totalMilestones?: number;
  tasksCompleted?: number;
  totalTasks?: number;
}
import {
   Rocket, 
   Target, 
   Users,
   Send, 
   TrendingUp, 
   CheckCircle2, 
   Clock, 
   ArrowUpRight, 
   Plus, 
   BarChart3, 
   AlertCircle, 
   MoreHorizontal, 
   Edit2, 
   Play, 
   CheckCircle, 
   UserPlus, 
   Flag, 
   Briefcase,
   Loader2,
   Sparkles,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Hook to get user for demo mode
const useUser = () => {
  const { user } = useDemoAuth();
  return { user };
};

// Demo startup data - full featured for judges
const demoStartupData = {
  id: "demo-startup-001",
  name: "TechFlow AI",
  tagline: "AI-powered workflow automation for startups",
  domain: "SaaS",
  stage: "mvp",
  description: "TechFlow AI is an intelligent workflow automation platform that helps startups streamline their operations using advanced AI. We reduce operational costs by 60% on average.",
  executionScore: 78,
  validationScore: 85,
  teamSize: 5,
  milestonesCompleted: 6,
  totalMilestones: 10,
  tasksCompleted: 45,
  totalTasks: 60,
  location: "Bangalore, India",
  website: "https://techflow.ai",
  foundedDate: "2024-01-15",
};

// Demo team members
const demoTeamMembers = [
  { id: "1", name: "Anant Patel", role: "Founder & CEO", avatar: "AP", email: "anant@techflow.ai", tasksCompleted: 15 },
  { id: "2", name: "Sarah Chen", role: "CTO", avatar: "SC", email: "sarah@techflow.ai", tasksCompleted: 12 },
  { id: "3", name: "Raj Kumar", role: "Lead Developer", avatar: "RK", email: "raj@techflow.ai", tasksCompleted: 10 },
  { id: "4", name: "Priya Sharma", role: "Product Manager", avatar: "PS", email: "priya@techflow.ai", tasksCompleted: 8 },
];

// Demo milestones
const demoMilestones = [
  { id: "1", title: "MVP Launch", status: "completed", progress: 100, tasksCompleted: 8, totalTasks: 8 },
  { id: "2", title: "User Testing Phase", status: "in_progress", progress: 60, tasksCompleted: 3, totalTasks: 5 },
  { id: "3", title: "Beta Release", status: "pending", progress: 0, tasksCompleted: 0, totalTasks: 6 },
  { id: "4", title: "Seed Funding Round", status: "pending", progress: 0, tasksCompleted: 0, totalTasks: 4 },
];

// Demo tasks
const demoTasks = [
  { id: "1", title: "Complete user onboarding flow", status: "in_progress", priority: "high", assignee: "Raj Kumar" },
  { id: "2", title: "Fix payment gateway integration", status: "in_progress", priority: "high", assignee: "Sarah Chen" },
  { id: "3", title: "Design dashboard analytics", status: "todo", priority: "medium", assignee: "Priya Sharma" },
  { id: "4", title: "Write API documentation", status: "todo", priority: "low", assignee: "Anant Patel" },
  { id: "5", title: "Setup CI/CD pipeline", status: "done", priority: "high", assignee: "Sarah Chen" },
  { id: "6", title: "Complete user interviews", status: "done", priority: "high", assignee: "Priya Sharma" },
];

// Demo pitch history
const demoPitchHistory = [
  { id: "1", investorName: "Venture Capital Partners", status: "accepted", date: "2024-02-10", amount: "₹25L" },
  { id: "2", investorName: "Angel Network India", status: "pending", date: "2024-02-15", amount: "-" },
  { id: "3", investorName: "Startup Catalyst Fund", status: "rejected", date: "2024-01-20", amount: "-" },
];

// Today's execution data
const todayStats = {
  overdue: 2,
  dueToday: 4,
  inProgress: 8,
  completedToday: 5,
};

// Empty state data
const emptyStartupData = {
  name: "Your Startup",
  domain: "Not set",
  stage: "idea",
  description: "Create your startup profile to get started",
  executionScore: 0,
  validationScore: 0,
  teamSize: 1,
  milestonesCompleted: 0,
  totalMilestones: 10,
  tasksCompleted: 0,
  totalTasks: 0,
};

// Additional mock data needed by the component
const mockStartupData = demoStartupData;
const teamMembers = demoTeamMembers;
const activeTasks = demoTasks;
const recentMilestones = demoMilestones;
const pitchHistory = demoPitchHistory;

export default function FounderDashboard() {
  const [quickTaskTitle, setQuickTaskTitle] = useState("");
  const [selectedAssignee, setSelectedAssignee] = useState("");
  const [selectedMilestone, setSelectedMilestone] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("medium");
  const [loading, setLoading] = useState(true);
  const [startupData, setStartupData] = useState<any>(null);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Load startup data from Supabase and localStorage
    const loadStartupData = async () => {
      try {
        // First, try to load from Supabase
        if (user) {
          const { data: supabaseData, error } = await supabase
            .from('startups')
            .select('*')
            .eq('founder_id', user.id)
            .single();

          if (supabaseData && !error) {
            // Map Supabase field names to app field names
            const mappedData = {
              id: supabaseData.id,
              name: supabaseData.name,
              tagline: supabaseData.tagline,
              description: supabaseData.description,
              domain: supabaseData.domain,
              stage: supabaseData.stage,
              foundedDate: supabaseData.founded_date,
              location: supabaseData.location,
              website: supabaseData.website,
              linkedin: supabaseData.linkedin,
              teamSize: supabaseData.team_size,
              lookingFor: supabaseData.looking_for,
              teamId: supabaseData.team_id,
              executionScore: supabaseData.execution_score,
              validationScore: supabaseData.validation_score,
              founderId: supabaseData.founder_id,
              createdAt: supabaseData.created_at,
            };
            setStartupData(mappedData);
            setLoading(false);
            return;
          }
        }

        // Fallback to localStorage
        let data = localStorage.getItem(`startups_${user?.id}`);
        
        if (!data) {
          const allStartups = JSON.parse(localStorage.getItem("startups") || "[]");
          data = allStartups.find((s: any) => s.founderId === user?.id);
        }

        if (data) {
          setStartupData(data);
        } else {
          setStartupData(mockStartupData);
        }
      } catch (error) {
        console.error("Error loading startup data:", error);
        setStartupData(mockStartupData);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadStartupData();
    }
  }, [user]);

  const handleQuickAssign = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Assigning task:", { title: quickTaskTitle, assignee: selectedAssignee, milestone: selectedMilestone, priority: selectedPriority });
    setQuickTaskTitle("");
    setSelectedAssignee("");
    setSelectedMilestone("");
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700 border-red-200";
      case "medium": return "bg-amber-100 text-amber-700 border-amber-200";
      case "low": return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const todoTasks = activeTasks.filter(t => t.status === "todo");
  const inProgressTasks = activeTasks.filter(t => t.status === "in_progress");
  const doneTasks = activeTasks.filter(t => t.status === "done");

  if (loading) {
    return (
      <FounderLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      </FounderLayout>
    );
  }

  const hasStartup = startupData?.name && startupData?.name !== "Your Startup";

  return (
    <FounderLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* 🚨 NO STARTUP BANNER */}
        {!hasStartup && (
          <Card className="bg-gradient-to-r from-founder/10 to-accent/10 border-founder/30">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-founder/20 flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-founder" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground">
                      Complete Your Startup Profile
                    </h3>
                    <p className="text-muted-foreground">
                      Set up your startup information to unlock all features
                    </p>
                  </div>
                </div>
                <Button onClick={() => navigate("/founder/onboarding")} size="lg">
                  Create Startup Profile
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="font-display text-3xl font-bold text-foreground">
                {startupData?.name || "Your Startup"}
              </h1>
              {hasStartup && (
                <Badge variant={startupData?.stage as "mvp"} className="capitalize">
                  {startupData?.stage}
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">
              {startupData?.description || "Create your startup profile to get started"}
            </p>
          </div>
        </div>

        {/* 🎯 FOUNDER COMMAND BAR */}
        <div className="flex flex-wrap gap-2">
          {hasStartup ? (
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default" size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Create Task
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleQuickAssign} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Task Title</label>
                      <Input 
                        placeholder="Enter task title..."
                        value={quickTaskTitle}
                        onChange={(e) => setQuickTaskTitle(e.target.value)}
                      />
                    </div>
                    <Button type="submit" className="w-full">Create & Assign Task</Button>
                  </form>
                </DialogContent>
              </Dialog>

              <Link to="/founder/milestones">
                <Button variant="outline" size="sm" className="gap-2">
                  <Target className="w-4 h-4" />
                  Create Milestone
                </Button>
              </Link>

              <Link to="/founder/team">
                <Button variant="outline" size="sm" className="gap-2">
                  <UserPlus className="w-4 h-4" />
                  Manage Team
                </Button>
              </Link>

              <Link to="/founder/pitch">
                <Button variant="founder" size="sm" className="gap-2">
                  <Send className="w-4 h-4" />
                  Send Pitch
                </Button>
              </Link>
              
              <Link to="/founder/pitch">
                <Button variant="outline" size="sm" className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  Pitch Generator
                </Button>
              </Link>
            </>
          ) : (
            <Button onClick={() => navigate("/founder/onboarding")} size="lg">
              <Rocket className="w-4 h-4 mr-2" />
              Create Your Startup
            </Button>
          )}
        </div>

        {/* 📊 TODAY'S EXECUTION PANEL */}
        {hasStartup && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-red-50 border-red-200 hover:border-red-300 transition-all cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-red-600 font-medium">Overdue</p>
                    <p className="text-3xl font-bold text-red-700">{todayStats.overdue}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                </div>
                <p className="text-xs text-red-600 mt-2">Needs immediate attention</p>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 border-amber-200 hover:border-amber-300 transition-all cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-amber-600 font-medium">Due Today</p>
                    <p className="text-3xl font-bold text-amber-700">{todayStats.dueToday}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                </div>
                <p className="text-xs text-amber-600 mt-2">Complete by EOD</p>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200 hover:border-blue-300 transition-all cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 font-medium">In Progress</p>
                    <p className="text-3xl font-bold text-blue-700">{todayStats.inProgress}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Play className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <p className="text-xs text-blue-600 mt-2">Active work</p>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200 hover:border-green-300 transition-all cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 font-medium">Done Today</p>
                    <p className="text-3xl font-bold text-green-700">{todayStats.completedToday}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <p className="text-xs text-green-600 mt-2">Great progress!</p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 👥 TEAM WORKLOAD PANEL */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="font-display text-base flex items-center gap-2">
                  <Users className="w-4 h-4 text-founder" />
                  Team Workload
                </CardTitle>
                {hasStartup && (
                  <Link to="/founder/team">
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      View All
                    </Button>
                  </Link>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                {hasStartup && teamMembers.length > 0 ? (
                  teamMembers.map((member) => (
                    <div key={member.id} className="p-3 rounded-lg border border-border hover:border-founder/30 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-founder/10 flex items-center justify-center">
                            <span className="text-xs font-bold text-founder">{member.avatar}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground mb-4">No team members yet</p>
                    {hasStartup && (
                      <Link to="/founder/team">
                        <Button variant="outline" size="sm">
                          <UserPlus className="w-4 h-4 mr-2" />
                          Invite Team Members
                        </Button>
                      </Link>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 🎯 ACTIVE TASKS BOARD (Mini Kanban) */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="font-display text-base flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-founder" />
                  Active Tasks Board
                </CardTitle>
                {hasStartup && (
                  <Link to="/founder/milestones">
                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                      Full Board
                      <ArrowUpRight className="w-3 h-3" />
                    </Button>
                  </Link>
                )}
              </CardHeader>
              <CardContent>
                {hasStartup && activeTasks.length > 0 ? (
                  <div className="grid grid-cols-3 gap-3">
                    {/* To Do Column */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-muted-foreground">To Do</span>
                        <Badge variant="secondary" className="text-xs">{todoTasks.length}</Badge>
                      </div>
                      {todoTasks.map((task) => (
                        <div key={task.id} className="p-2 bg-muted/50 rounded-lg border border-border">
                          <p className="text-xs font-medium text-foreground mb-1">{task.title}</p>
                        </div>
                      ))}
                    </div>

                    {/* In Progress Column */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-muted-foreground">In Progress</span>
                        <Badge variant="secondary" className="text-xs">{inProgressTasks.length}</Badge>
                      </div>
                      {inProgressTasks.map((task) => (
                        <div key={task.id} className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-xs font-medium text-foreground mb-1">{task.title}</p>
                        </div>
                      ))}
                    </div>

                    {/* Done Column */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-muted-foreground">Done</span>
                        <Badge variant="secondary" className="text-xs">{doneTasks.length}</Badge>
                      </div>
                      {doneTasks.map((task) => (
                        <div key={task.id} className="p-2 bg-green-50 rounded-lg border border-green-200 opacity-75">
                          <p className="text-xs font-medium text-foreground line-through">{task.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground mb-4">
                      {hasStartup ? "No active tasks" : "Create your startup to see tasks"}
                    </p>
                    {hasStartup && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Create First Task
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Create New Task</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleQuickAssign} className="space-y-4 mt-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Task Title</label>
                              <Input 
                                placeholder="Enter task title..."
                                value={quickTaskTitle}
                                onChange={(e) => setQuickTaskTitle(e.target.value)}
                              />
                            </div>
                            <Button type="submit" className="w-full">Create Task</Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Health Indicators - KPI Cards */}
        {hasStartup && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-card border-border hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-founder/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-founder" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-foreground">{startupData?.executionScore || 0}%</p>
                <p className="text-sm text-muted-foreground mt-1">Execution Score</p>
                <Progress value={startupData?.executionScore || 0} className="h-2 mt-3" />
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-foreground">{startupData?.validationScore || 0}%</p>
                <p className="text-sm text-muted-foreground mt-1">Validation Score</p>
                <Progress value={startupData?.validationScore || 0} className="h-2 mt-3" />
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-foreground">
                  {startupData?.milestonesCompleted || 0}/{startupData?.totalMilestones || 10}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Milestones</p>
                <Progress 
                  value={((startupData?.milestonesCompleted || 0) / (startupData?.totalMilestones || 10)) * 100} 
                  className="h-2 mt-3" 
                />
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-team/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-team" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-foreground">{startupData?.teamSize || 1}</p>
                <p className="text-sm text-muted-foreground mt-1">Team Members</p>
                <p className="text-xs text-success mt-3 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  {startupData?.tasksCompleted || 0} tasks completed
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 🎯 MILESTONES WITH ACTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2">
                <Target className="w-5 h-5 text-founder" />
                Milestones
              </CardTitle>
              {hasStartup && (
                <Link to="/founder/milestones">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </Link>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {recentMilestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className={`p-4 rounded-xl border ${
                    milestone.status === "completed"
                      ? "border-success/30 bg-success/5"
                      : "border-border hover:border-founder/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        milestone.status === "completed" ? "bg-success/20" : "bg-muted"
                      }`}>
                        <Target className={`w-4 h-4 ${
                          milestone.status === "completed" ? "text-success" : "text-muted-foreground"
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{milestone.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {milestone.tasksCompleted}/{milestone.totalTasks} tasks
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={milestone.status === "completed" ? "accepted" : "outline"}
                      className="capitalize"
                    >
                      {milestone.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 📨 PITCH HISTORY */}
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display text-base flex items-center gap-2">
                <Send className="w-4 h-4 text-founder" />
                Pitch History
              </CardTitle>
              {hasStartup && (
                <Link to="/founder/pitch">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Plus className="w-4 h-4" />
                    New
                  </Button>
                </Link>
              )}
            </CardHeader>
            <CardContent className="space-y-3">
              {pitchHistory.length > 0 ? (
                pitchHistory.map((pitch) => (
                  <div
                    key={pitch.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border"
                  >
                    <p className="font-medium text-sm text-foreground">{pitch.investorName}</p>
                    <Badge variant={pitch.status as "pending" | "accepted" | "rejected"}>
                      {pitch.status}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Send className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground mb-4">
                    {hasStartup ? "No pitch requests yet" : "Create your startup to send pitches"}
                  </p>
                  {hasStartup && (
                    <Link to="/founder/pitch">
                      <Button size="sm">
                        <Send className="w-4 h-4 mr-2" />
                        Send First Pitch
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </FounderLayout>
  );
}

