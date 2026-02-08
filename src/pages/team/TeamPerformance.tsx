import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TeamLayout } from "@/components/layout/TeamLayout";
import {
  TrendingUp,
  Target,
  Calendar,
  Award,
  Star,
  Zap,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

// Performance data
const performanceHistory = [
  { month: "Jan", score: 72, tasks: 12, onTime: 10 },
  { month: "Feb", score: 78, tasks: 15, onTime: 14 },
  { month: "Mar", score: 82, tasks: 18, onTime: 16 },
  { month: "Apr", score: 85, tasks: 20, onTime: 19 },
  { month: "May", score: 83, tasks: 22, onTime: 20 },
  { month: "Jun", score: 88, tasks: 25, onTime: 24 },
];

const skillRadarData = [
  { subject: "Code Quality", A: 90, fullMark: 100 },
  { subject: "Speed", A: 85, fullMark: 100 },
  { subject: "Communication", A: 88, fullMark: 100 },
  { subject: "Problem Solving", A: 92, fullMark: 100 },
  { subject: "Teamwork", A: 95, fullMark: 100 },
  { subject: "Documentation", A: 78, fullMark: 100 },
];

const weeklyBreakdown = [
  { week: "Week 1", completed: 5, assigned: 6, score: 83 },
  { week: "Week 2", completed: 6, assigned: 6, score: 100 },
  { week: "Week 3", completed: 4, assigned: 5, score: 80 },
  { week: "Week 4", completed: 7, assigned: 7, score: 100 },
];

const achievements = [
  {
    id: 1,
    title: "Speed Demon",
    description: "Completed 5 tasks in one day",
    icon: Zap,
    color: "amber",
    unlockedAt: "2024-01-15",
    rarity: "rare",
  },
  {
    id: 2,
    title: "On-Time Pro",
    description: "10 tasks completed before deadline",
    icon: Clock,
    color: "green",
    unlockedAt: "2024-01-10",
    rarity: "common",
  },
  {
    id: 3,
    title: "Rising Star",
    description: "Performance score above 85%",
    icon: Star,
    color: "blue",
    unlockedAt: "2024-01-08",
    rarity: "epic",
  },
  {
    id: 4,
    title: "Bug Hunter",
    description: "Fixed 10 critical bugs",
    icon: Target,
    color: "red",
    unlockedAt: "2024-01-05",
    rarity: "rare",
  },
  {
    id: 5,
    title: "Team Player",
    description: "Helped 5 teammates with their tasks",
    icon: Award,
    color: "purple",
    unlockedAt: "2024-01-03",
    rarity: "legendary",
  },
];

const milestones = [
  { id: 1, name: "MVP Launch", contribution: 45, total: 100, status: "completed" },
  { id: 2, name: "Beta Release", contribution: 32, total: 80, status: "in_progress" },
  { id: 3, name: "User Onboarding", contribution: 18, total: 40, status: "in_progress" },
  { id: 4, name: "API Documentation", contribution: 12, total: 25, status: "pending" },
];

export default function TeamPerformance() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "quarter">("month");

  const currentStats = {
    overallScore: 88,
    rank: 3,
    totalMembers: 8,
    improvement: 12,
    tasksCompleted: 112,
    onTimeRate: 94,
    avgCompletionTime: "2.3 days",
    streak: 15,
  };

  return (
    <TeamLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-team" />
              My Performance
            </h1>
            <p className="text-muted-foreground mt-1">
              Track your progress, achievements, and growth over time
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
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

        {/* Score Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-team/10 to-team/5 border-team/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overall Score</p>
                  <p className="text-3xl font-bold text-team">{currentStats.overallScore}%</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-team/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-team" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-success">
                <ArrowUpRight className="w-3 h-3" />
                +{currentStats.improvement}% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Team Rank</p>
                  <p className="text-3xl font-bold text-foreground">#{currentStats.rank}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-accent" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                of {currentStats.totalMembers} team members
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tasks Completed</p>
                  <p className="text-3xl font-bold text-foreground">{currentStats.tasksCompleted}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-success">
                <ArrowUpRight className="w-3 h-3" />
                +8 this month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">On-Time Rate</p>
                  <p className="text-3xl font-bold text-foreground">{currentStats.onTimeRate}%</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Avg completion: {currentStats.avgCompletionTime}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Trend */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-team" />
                Performance History
              </CardTitle>
              <p className="text-sm text-muted-foreground">Score trend over the last 6 months</p>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
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

          {/* Skills Radar */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-team" />
                Skills Assessment
              </CardTitle>
              <p className="text-sm text-muted-foreground">Your competency across key areas</p>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillRadarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                    <Radar
                      name="Skills"
                      dataKey="A"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.3}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Breakdown & Milestones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Breakdown */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-team" />
                Weekly Breakdown
              </CardTitle>
              <p className="text-sm text-muted-foreground">Task completion and scores by week</p>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="week" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                    />
                    <Bar dataKey="completed" fill="#22c55e" radius={[4, 4, 0, 0]} name="Completed" />
                    <Bar dataKey="assigned" fill="#e5e7eb" radius={[4, 4, 0, 0]} name="Assigned" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Milestone Contributions */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-team" />
                Milestone Contributions
              </CardTitle>
              <p className="text-sm text-muted-foreground">Your contribution to team milestones</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {milestones.map((milestone) => (
                <div key={milestone.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{milestone.name}</span>
                      <Badge 
                        variant={milestone.status === "completed" ? "success" : "secondary"}
                        className="text-xs"
                      >
                        {milestone.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {milestone.contribution}/{milestone.total} tasks
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-team rounded-full transition-all"
                      style={{ width: `${(milestone.contribution / milestone.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Achievements Gallery */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-team" />
              Achievements Gallery
            </CardTitle>
            <p className="text-sm text-muted-foreground">Badges and rewards you've earned</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                const colorClasses = {
                  amber: "bg-amber-100 text-amber-700 border-amber-200",
                  green: "bg-green-100 text-green-700 border-green-200",
                  blue: "bg-blue-100 text-blue-700 border-blue-200",
                  red: "bg-red-100 text-red-700 border-red-200",
                  purple: "bg-purple-100 text-purple-700 border-purple-200",
                }[achievement.color];

                const rarityColors = {
                  common: "text-gray-500",
                  rare: "text-blue-500",
                  epic: "text-purple-500",
                  legendary: "text-amber-500",
                };

                return (
                  <div 
                    key={achievement.id} 
                    className={`p-4 rounded-xl border-2 ${colorClasses} relative overflow-hidden`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-white/50 flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{achievement.title}</h4>
                          <span className={`text-xs font-bold uppercase ${rarityColors[achievement.rarity as keyof typeof rarityColors]}`}>
                            {achievement.rarity}
                          </span>
                        </div>
                        <p className="text-sm opacity-80 mt-1">{achievement.description}</p>
                        <p className="text-xs opacity-60 mt-2">
                          Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Performance Insights */}
        <Card className="bg-gradient-to-r from-team/5 to-accent/5 border-team/20">
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-team" />
              Performance Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg border border-team/20">
                <h4 className="font-medium text-foreground mb-2">💪 Strengths</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Consistent on-time delivery</li>
                  <li>• High code quality scores</li>
                  <li>• Excellent teamwork</li>
                </ul>
              </div>
              <div className="p-4 bg-white rounded-lg border border-amber-200">
                <h4 className="font-medium text-foreground mb-2">📈 Improvements</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Documentation could be better</li>
                  <li>• Speed on complex tasks</li>
                  <li>• Communication during blockers</li>
                </ul>
              </div>
              <div className="p-4 bg-white rounded-lg border border-success/20">
                <h4 className="font-medium text-foreground mb-2">🎯 Goals</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Reach 90% performance score</li>
                  <li>• Complete 20 tasks this month</li>
                  <li>• Zero overdue tasks</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TeamLayout>
  );
}
