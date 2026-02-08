import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FounderLayout } from "@/components/layout/FounderLayout";
import {
  BarChart3,
  TrendingUp,
  Target,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  Calendar,
  Filter,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock analytics data
const taskCompletionData = [
  { month: "Jan", completed: 12, assigned: 15, overdue: 2 },
  { month: "Feb", completed: 18, assigned: 20, overdue: 1 },
  { month: "Mar", completed: 15, assigned: 18, overdue: 3 },
  { month: "Apr", completed: 22, assigned: 25, overdue: 2 },
  { month: "May", completed: 20, assigned: 22, overdue: 1 },
  { month: "Jun", completed: 25, assigned: 28, overdue: 2 },
];

const milestoneProgressData = [
  { name: "MVP Launch", progress: 100, status: "completed" },
  { name: "User Testing", progress: 60, status: "in_progress" },
  { name: "Beta Release", progress: 30, status: "in_progress" },
  { name: "Mobile App", progress: 0, status: "pending" },
  { name: "Enterprise", progress: 0, status: "pending" },
];

const teamPerformanceData = [
  { name: "Priya Sharma", score: 92, tasks: 45 },
  { name: "Rahul Kumar", score: 88, tasks: 38 },
  { name: "Anjali Rao", score: 90, tasks: 32 },
  { name: "Vikram Mehta", score: 85, tasks: 28 },
];

const executionTrendData = [
  { week: "Week 1", execution: 72, validation: 68 },
  { week: "Week 2", execution: 75, validation: 70 },
  { week: "Week 3", execution: 78, validation: 72 },
  { week: "Week 4", execution: 76, validation: 71 },
  { week: "Week 5", execution: 80, validation: 74 },
  { week: "Week 6", execution: 78, validation: 72 },
  { week: "Week 7", execution: 82, validation: 76 },
  { week: "Week 8", execution: 85, validation: 78 },
];

const taskDistributionData = [
  { name: "Completed", value: 112, color: "#22c55e" },
  { name: "In Progress", value: 18, color: "#3b82f6" },
  { name: "Overdue", value: 8, color: "#ef4444" },
  { name: "Pending", value: 12, color: "#6b7280" },
];

export default function FounderAnalytics() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "quarter">("month");

  const stats = {
    totalTasks: 150,
    completionRate: 75,
    avgTaskTime: "2.3 days",
    teamProductivity: 82,
    milestoneVelocity: 68,
    executionScore: 78,
    validationScore: 72,
  };

  return (
    <FounderLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-2">
              <BarChart3 className="w-8 h-8 text-founder" />
              Analytics
            </h1>
            <p className="text-muted-foreground mt-1">
              Track your startup's performance, productivity, and growth
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as "week" | "month" | "quarter")}
              className="h-10 px-3 rounded-md border border-input bg-background text-sm"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-founder/10 to-founder/5 border-founder/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Execution Score</p>
                  <p className="text-3xl font-bold text-founder">{stats.executionScore}%</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-founder/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-founder" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-success">
                <TrendingUp className="w-3 h-3" />
                +5% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Validation Score</p>
                  <p className="text-3xl font-bold text-foreground">{stats.validationScore}%</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-success">
                <TrendingUp className="w-3 h-3" />
                +3% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Task Completion</p>
                  <p className="text-3xl font-bold text-foreground">{stats.completionRate}%</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-accent" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {stats.totalTasks} total tasks
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Team Productivity</p>
                  <p className="text-3xl font-bold text-foreground">{stats.teamProductivity}%</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-team/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-team" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Avg {stats.avgTaskTime} per task
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Task Completion Trend */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-founder" />
                Task Completion Trend
              </CardTitle>
              <p className="text-sm text-muted-foreground">Tasks assigned vs completed over time</p>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={taskCompletionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                    />
                    <Bar dataKey="assigned" fill="#e5e7eb" radius={[4, 4, 0, 0]} name="Assigned" />
                    <Bar dataKey="completed" fill="#22c55e" radius={[4, 4, 0, 0]} name="Completed" />
                    <Bar dataKey="overdue" fill="#ef4444" radius={[4, 4, 0, 0]} name="Overdue" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Execution vs Validation */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-founder" />
                Execution vs Validation
              </CardTitle>
              <p className="text-sm text-muted-foreground">Weekly score comparison</p>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={executionTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="week" stroke="#6b7280" fontSize={12} />
                    <YAxis domain={[0, 100]} stroke="#6b7280" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="execution" 
                      stroke="#8b5cf6" 
                      strokeWidth={3}
                      dot={{ fill: '#8b5cf6', r: 4 }}
                      name="Execution"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="validation" 
                      stroke="#22c55e" 
                      strokeWidth={3}
                      dot={{ fill: '#22c55e', r: 4 }}
                      name="Validation"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Milestone Progress */}
          <Card className="bg-card border-border lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-founder" />
                Milestone Progress
              </CardTitle>
              <p className="text-sm text-muted-foreground">Current status of all milestones</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {milestoneProgressData.map((milestone) => (
                  <div key={milestone.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{milestone.name}</span>
                        <Badge 
                          variant={milestone.status === "completed" ? "success" : milestone.status === "in_progress" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {milestone.status.replace("_", " ")}
                        </Badge>
                      </div>
                      <span className="text-sm font-medium">{milestone.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          milestone.status === "completed" ? "bg-green-500" :
                          milestone.status === "in_progress" ? "bg-founder" : "bg-gray-300"
                        }`}
                        style={{ width: `${milestone.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Task Distribution */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-founder" />
                Task Distribution
              </CardTitle>
              <p className="text-sm text-muted-foreground">Current task status breakdown</p>
            </CardHeader>
            <CardContent>
              <div className="h-48 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taskDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {taskDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">150</p>
                    <p className="text-xs text-muted-foreground">Total Tasks</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {taskDistributionData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Performance */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-founder" />
              Team Performance Comparison
            </CardTitle>
            <p className="text-sm text-muted-foreground">Individual performance scores and task completion</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamPerformanceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} stroke="#6b7280" fontSize={12} />
                  <YAxis dataKey="name" type="category" stroke="#6b7280" fontSize={12} width={100} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                  />
                  <Bar dataKey="score" fill="#8b5cf6" radius={[0, 4, 4, 0]} name="Performance Score" />
                  <Bar dataKey="tasks" fill="#22c55e" radius={[0, 4, 4, 0]} name="Tasks Completed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Insights */}
        <Card className="bg-gradient-to-r from-founder/5 to-accent/5 border-founder/20">
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-founder" />
              Key Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg border border-founder/20">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <h4 className="font-medium text-foreground">Strong Execution</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your team is completing 75% of assigned tasks on time. Keep up the momentum!
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <h4 className="font-medium text-foreground">Validation Gap</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Validation score (72%) is 6 points behind execution. Focus on user feedback collection.
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium text-foreground">Milestone Velocity</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Current velocity suggests Beta Release will be delayed by 2 weeks. Consider adding resources.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </FounderLayout>
  );
}
