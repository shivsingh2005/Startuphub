import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { FounderLayout } from "@/components/layout/FounderLayout";
import {
  Target,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  Users,
  TrendingUp,
  MoreHorizontal,
  Edit2,
  Trash2,
  ChevronRight,
  Filter,
  Search,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock milestones data
const initialMilestones = [
  {
    id: "1",
    title: "MVP Launch",
    description: "Launch minimum viable product with core features",
    status: "completed",
    progress: 100,
    startDate: "2023-10-01",
    dueDate: "2023-12-01",
    completedDate: "2023-11-28",
    tasksTotal: 8,
    tasksCompleted: 8,
    assignees: ["Priya Sharma", "Rahul Kumar", "Anjali Rao"],
    priority: "high",
  },
  {
    id: "2",
    title: "User Testing Phase",
    description: "Conduct user testing with 50 beta users and gather feedback",
    status: "in_progress",
    progress: 60,
    startDate: "2023-12-15",
    dueDate: "2024-01-15",
    completedDate: null,
    tasksTotal: 5,
    tasksCompleted: 3,
    assignees: ["Rahul Kumar", "Vikram Mehta"],
    priority: "high",
  },
  {
    id: "3",
    title: "Beta Release",
    description: "Public beta release with advanced features and improvements",
    status: "in_progress",
    progress: 30,
    startDate: "2024-01-20",
    dueDate: "2024-02-15",
    completedDate: null,
    tasksTotal: 6,
    tasksCompleted: 2,
    assignees: ["Priya Sharma", "Anjali Rao", "Sneha Patel"],
    priority: "medium",
  },
  {
    id: "4",
    title: "Mobile App Development",
    description: "Develop iOS and Android applications",
    status: "pending",
    progress: 0,
    startDate: "2024-02-20",
    dueDate: "2024-04-30",
    completedDate: null,
    tasksTotal: 12,
    tasksCompleted: 0,
    assignees: ["Sneha Patel", "Vikram Mehta"],
    priority: "medium",
  },
  {
    id: "5",
    title: "Enterprise Features",
    description: "Add SSO, audit logs, admin controls for enterprise clients",
    status: "pending",
    progress: 0,
    startDate: "2024-03-01",
    dueDate: "2024-05-15",
    completedDate: null,
    tasksTotal: 8,
    tasksCompleted: 0,
    assignees: ["Rahul Kumar"],
    priority: "low",
  },
];

const tasksByMilestone = {
  "1": [
    { id: "t1", title: "Setup project repository", status: "completed", assignee: "Rahul Kumar" },
    { id: "t2", title: "Design database schema", status: "completed", assignee: "Rahul Kumar" },
    { id: "t3", title: "Implement authentication", status: "completed", assignee: "Vikram Mehta" },
    { id: "t4", title: "Create landing page", status: "completed", assignee: "Anjali Rao" },
    { id: "t5", title: "Build dashboard UI", status: "completed", assignee: "Sneha Patel" },
    { id: "t6", title: "Integrate payment gateway", status: "completed", assignee: "Rahul Kumar" },
    { id: "t7", title: "Write documentation", status: "completed", assignee: "Priya Sharma" },
    { id: "t8", title: "Deploy to production", status: "completed", assignee: "Rahul Kumar" },
  ],
  "2": [
    { id: "t9", title: "Recruit beta users", status: "completed", assignee: "Priya Sharma" },
    { id: "t10", title: "Create feedback form", status: "completed", assignee: "Anjali Rao" },
    { id: "t11", title: "Conduct user interviews", status: "in_progress", assignee: "Rahul Kumar" },
    { id: "t12", title: "Analyze feedback data", status: "pending", assignee: "Vikram Mehta" },
    { id: "t13", title: "Prepare improvement report", status: "pending", assignee: "Priya Sharma" },
  ],
};

export default function FounderMilestones() {
  const [milestones, setMilestones] = useState(initialMilestones);
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMilestones = milestones.filter(m => {
    const matchesStatus = filterStatus === "all" || m.status === filterStatus;
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         m.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: milestones.length,
    completed: milestones.filter(m => m.status === "completed").length,
    inProgress: milestones.filter(m => m.status === "in_progress").length,
    pending: milestones.filter(m => m.status === "pending").length,
    overallProgress: Math.round(milestones.reduce((acc, m) => acc + m.progress, 0) / milestones.length),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-700 border-green-200";
      case "in_progress": return "bg-blue-100 text-blue-700 border-blue-200";
      case "pending": return "bg-gray-100 text-gray-700 border-gray-200";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "in_progress": return <Clock className="w-5 h-5 text-blue-500" />;
      case "pending": return <AlertCircle className="w-5 h-5 text-gray-400" />;
      default: return null;
    }
  };

  return (
    <FounderLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-2">
              <Target className="w-8 h-8 text-founder" />
              Milestones
            </h1>
            <p className="text-muted-foreground mt-1">
              Track your startup's roadmap and execution progress
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Milestone
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Target className="w-5 h-5 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600">In Progress</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overall Progress</p>
                  <p className="text-2xl font-bold text-founder">{stats.overallProgress}%</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-founder/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-founder" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search milestones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="h-10 px-3 rounded-md border border-input bg-background text-sm"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="in_progress">In Progress</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Milestones List */}
        <div className="space-y-4">
          {filteredMilestones.map((milestone) => (
            <Card key={milestone.id} className="bg-card border-border hover:border-founder/30 transition-all">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Left: Icon & Status */}
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      milestone.status === "completed" ? "bg-green-100" :
                      milestone.status === "in_progress" ? "bg-blue-100" : "bg-gray-100"
                    }`}>
                      {getStatusIcon(milestone.status)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-lg text-foreground">{milestone.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(milestone.status)} capitalize`}>
                          {milestone.status.replace("_", " ")}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${
                          milestone.priority === "high" ? "bg-red-100 text-red-700" :
                          milestone.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
                          "bg-gray-100 text-gray-700"
                        }`}>
                          {milestone.priority}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                      
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Due {milestone.dueDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {milestone.tasksCompleted}/{milestone.tasksTotal} tasks
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {milestone.assignees.length} assignees
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Progress & Actions */}
                  <div className="lg:ml-auto flex flex-col items-end gap-3 min-w-[200px]">
                    <div className="w-full">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{milestone.progress}%</span>
                      </div>
                      <Progress value={milestone.progress} className="h-2" />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedMilestone(milestone.id)}>
                            View Tasks
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Target className="w-5 h-5 text-founder" />
                              {milestone.title} - Tasks
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-3 mt-4">
                            {tasksByMilestone[milestone.id as keyof typeof tasksByMilestone]?.map((task) => (
                              <div key={task.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                                <div className="flex items-center gap-3">
                                  <div className={`w-2 h-2 rounded-full ${
                                    task.status === "completed" ? "bg-green-500" :
                                    task.status === "in_progress" ? "bg-blue-500" : "bg-gray-300"
                                  }`} />
                                  <span className="text-sm font-medium">{task.title}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs capitalize">
                                    {task.status.replace("_", " ")}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">{task.assignee}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMilestones.length === 0 && (
          <div className="text-center py-12">
            <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No milestones found</h3>
            <p className="text-muted-foreground">Create your first milestone to start tracking progress</p>
          </div>
        )}
      </div>
    </FounderLayout>
  );
}
