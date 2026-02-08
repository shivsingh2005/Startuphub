import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { TeamLayout } from "@/components/layout/TeamLayout";
import {
  CheckSquare,
  Search,
  Filter,
  Plus,
  Play,
  CheckCircle2,
  AlertCircle,
  Clock,
  MoreHorizontal,
  Calendar,
  User,
  Target,
  ArrowUpDown,
  Kanban,
  List,
  Grid3X3,
} from "lucide-react";

// Mock data for all tasks
const allTasks = [
  {
    id: "1",
    title: "Implement user authentication API",
    priority: "high",
    status: "in_progress",
    milestone: "MVP Launch",
    dueDate: "2024-01-15",
    assignedBy: "Priya Sharma",
    assigneeRole: "Founder",
    progress: 60,
    description: "Create JWT-based auth system with login/signup endpoints",
    tags: ["backend", "api", "auth"],
    estimatedHours: 16,
    loggedHours: 10,
    createdAt: "2024-01-10",
  },
  {
    id: "2",
    title: "Design dashboard UI mockups",
    priority: "medium",
    status: "todo",
    milestone: "MVP Launch",
    dueDate: "2024-01-16",
    assignedBy: "Rahul Kumar",
    assigneeRole: "CTO",
    progress: 0,
    description: "Create Figma mockups for the main dashboard interface",
    tags: ["design", "ui", "figma"],
    estimatedHours: 12,
    loggedHours: 0,
    createdAt: "2024-01-11",
  },
  {
    id: "3",
    title: "Write API documentation",
    priority: "low",
    status: "todo",
    milestone: "Beta Release",
    dueDate: "2024-01-20",
    assignedBy: "Priya Sharma",
    assigneeRole: "Founder",
    progress: 0,
    description: "Document all REST API endpoints with examples",
    tags: ["documentation", "api"],
    estimatedHours: 8,
    loggedHours: 0,
    createdAt: "2024-01-12",
  },
  {
    id: "4",
    title: "Fix navigation bug on mobile",
    priority: "high",
    status: "overdue",
    milestone: "MVP Launch",
    dueDate: "2024-01-12",
    assignedBy: "Anjali Rao",
    assigneeRole: "Designer",
    progress: 30,
    description: "Responsive menu not closing on mobile devices",
    tags: ["bug", "mobile", "ui"],
    estimatedHours: 4,
    loggedHours: 2,
    createdAt: "2024-01-09",
  },
  {
    id: "5",
    title: "Setup CI/CD pipeline",
    priority: "medium",
    status: "completed",
    milestone: "Infrastructure",
    dueDate: "2024-01-14",
    assignedBy: "Rahul Kumar",
    assigneeRole: "CTO",
    progress: 100,
    description: "Configure GitHub Actions for automated testing and deployment",
    tags: ["devops", "ci/cd", "automation"],
    estimatedHours: 10,
    loggedHours: 10,
    createdAt: "2024-01-08",
    completedAt: "2024-01-14",
  },
  {
    id: "6",
    title: "Implement payment gateway integration",
    priority: "high",
    status: "in_progress",
    milestone: "Beta Release",
    dueDate: "2024-01-18",
    assignedBy: "Priya Sharma",
    assigneeRole: "Founder",
    progress: 40,
    description: "Integrate Razorpay for payment processing",
    tags: ["backend", "payment", "integration"],
    estimatedHours: 20,
    loggedHours: 8,
    createdAt: "2024-01-11",
  },
  {
    id: "7",
    title: "Create onboarding tutorial",
    priority: "low",
    status: "todo",
    milestone: "User Experience",
    dueDate: "2024-01-22",
    assignedBy: "Anjali Rao",
    assigneeRole: "Designer",
    progress: 0,
    description: "Design interactive onboarding flow for new users",
    tags: ["ux", "design", "onboarding"],
    estimatedHours: 14,
    loggedHours: 0,
    createdAt: "2024-01-13",
  },
  {
    id: "8",
    title: "Optimize database queries",
    priority: "medium",
    status: "completed",
    milestone: "Performance",
    dueDate: "2024-01-13",
    assignedBy: "Rahul Kumar",
    assigneeRole: "CTO",
    progress: 100,
    description: "Add indexes and optimize slow queries",
    tags: ["backend", "database", "performance"],
    estimatedHours: 8,
    loggedHours: 8,
    createdAt: "2024-01-10",
    completedAt: "2024-01-13",
  },
];

const milestones = ["All", "MVP Launch", "Beta Release", "Infrastructure", "User Experience", "Performance"];
const priorities = ["All", "high", "medium", "low"];
const statuses = ["All", "todo", "in_progress", "completed", "overdue"];

export default function TeamTasks() {
  const [viewMode, setViewMode] = useState<"list" | "board">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMilestone, setFilterMilestone] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState<"dueDate" | "priority" | "status">("dueDate");

  // Filter and sort tasks
  const filteredTasks = allTasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesMilestone = filterMilestone === "All" || task.milestone === filterMilestone;
    const matchesPriority = filterPriority === "All" || task.priority === filterPriority;
    const matchesStatus = filterStatus === "All" || task.status === filterStatus;
    return matchesSearch && matchesMilestone && matchesPriority && matchesStatus;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "dueDate") return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    if (sortBy === "priority") {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
    }
    if (sortBy === "status") {
      const statusOrder = { overdue: 0, in_progress: 1, todo: 2, completed: 3 };
      return statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder];
    }
    return 0;
  });

  // Stats
  const stats = {
    total: allTasks.length,
    todo: allTasks.filter(t => t.status === "todo").length,
    inProgress: allTasks.filter(t => t.status === "in_progress").length,
    completed: allTasks.filter(t => t.status === "completed").length,
    overdue: allTasks.filter(t => t.status === "overdue").length,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low": return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "in_progress": return <Play className="w-4 h-4 text-blue-500" />;
      case "overdue": return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed": return <Badge className="bg-green-100 text-green-700">Completed</Badge>;
      case "in_progress": return <Badge className="bg-blue-100 text-blue-700">In Progress</Badge>;
      case "overdue": return <Badge className="bg-red-100 text-red-700">Overdue</Badge>;
      default: return <Badge variant="secondary">To Do</Badge>;
    }
  };

  return (
    <TeamLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-2">
              <CheckSquare className="w-8 h-8 text-team" />
              My Tasks
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage all your assigned tasks and track progress
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Plus className="w-4 h-4" />
              Create Task
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Tasks</p>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">To Do</p>
              <p className="text-2xl font-bold text-gray-600">{stats.todo}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border border-red-200">
            <CardContent className="p-4">
              <p className="text-sm text-red-600">Overdue</p>
              <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters & Search */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks by title, description, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                <select
                  value={filterMilestone}
                  onChange={(e) => setFilterMilestone(e.target.value)}
                  className="h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  {milestones.map(m => <option key={m} value={m}>{m}</option>)}
                </select>

                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  {priorities.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  {statuses.map(s => <option key={s} value={s}>{s === "todo" ? "To Do" : s.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}</option>)}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  <option value="dueDate">Sort by Due Date</option>
                  <option value="priority">Sort by Priority</option>
                  <option value="status">Sort by Status</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex gap-1">
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "board" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("board")}
                >
                  <Kanban className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task List */}
        <div className="space-y-3">
          {sortedTasks.map((task) => (
            <Card key={task.id} className={`bg-card border-border hover:border-team/30 transition-all ${
              task.status === "overdue" ? "border-red-200 bg-red-50/50" : ""
            }`}>
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  {/* Left: Status & Title */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      {getStatusIcon(task.status)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className={`font-semibold text-foreground ${
                            task.status === "completed" ? "line-through text-muted-foreground" : ""
                          }`}>
                            {task.title}
                          </h3>
                          {getStatusBadge(task.status)}
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${getPriorityColor(task.priority)} capitalize`}>
                            {task.priority}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                        
                        {/* Tags */}
                        <div className="flex gap-1 mt-2">
                          {task.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Meta Info */}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground lg:w-1/3">
                    <div className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      {task.milestone}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {task.assignedBy}
                    </div>
                    <div className={`flex items-center gap-1 ${
                      task.status === "overdue" ? "text-red-600 font-medium" : ""
                    }`}>
                      <Calendar className="w-4 h-4" />
                      Due: {task.dueDate}
                    </div>
                  </div>

                  {/* Right: Progress & Actions */}
                  <div className="lg:w-48 space-y-2">
                    {task.status !== "completed" && (
                      <>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{task.loggedHours}h logged</span>
                          <span>{task.estimatedHours}h est.</span>
                        </div>
                      </>
                    )}
                    
                    {task.status === "completed" && (
                      <div className="text-sm text-green-600 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Completed on {task.completedAt}
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      {task.status === "todo" && (
                        <Button size="sm" className="flex-1 gap-1">
                          <Play className="w-3 h-3" />
                          Start
                        </Button>
                      )}
                      {task.status === "in_progress" && (
                        <>
                          <Button size="sm" variant="outline" className="flex-1 gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Complete
                          </Button>
                          <Button size="sm" variant="ghost">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      {task.status === "overdue" && (
                        <Button size="sm" variant="destructive" className="flex-1 gap-1">
                          <Play className="w-3 h-3" />
                          Start Now
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {sortedTasks.length === 0 && (
            <div className="text-center py-12">
              <CheckSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No tasks found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </div>
    </TeamLayout>
  );
}
