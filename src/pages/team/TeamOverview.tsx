import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TeamLayout } from "@/components/layout/TeamLayout";
import {
  Users,
  Target,
  TrendingUp,
  Calendar,
  Mail,
  Briefcase,
  Award,
  Clock,
  CheckCircle2,
  MoreHorizontal,
  MessageSquare,
  Filter,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Team data
const teamInfo = {
  name: "TechFlow AI",
  description: "AI-powered workflow automation for modern teams",
  founded: "2022",
  stage: "MVP",
  domain: "SaaS",
  totalMembers: 8,
  activeMilestones: 3,
  completedMilestones: 6,
  overallProgress: 68,
};

const teamMembers = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Founder & CEO",
    email: "priya@techflow.ai",
    avatar: "PS",
    status: "active",
    currentTask: "Investor Pitch Deck",
    tasksCompleted: 45,
    performanceScore: 95,
    joinDate: "2022-01-15",
    department: "Leadership",
  },
  {
    id: 2,
    name: "Rahul Kumar",
    role: "CTO",
    email: "rahul@techflow.ai",
    avatar: "RK",
    status: "active",
    currentTask: "Architecture Review",
    tasksCompleted: 52,
    performanceScore: 92,
    joinDate: "2022-02-01",
    department: "Engineering",
  },
  {
    id: 3,
    name: "Anjali Rao",
    role: "Lead Designer",
    email: "anjali@techflow.ai",
    avatar: "AR",
    status: "busy",
    currentTask: "UI Component Library",
    tasksCompleted: 38,
    performanceScore: 88,
    joinDate: "2022-03-10",
    department: "Design",
  },
  {
    id: 4,
    name: "Vikram Mehta",
    role: "Backend Developer",
    email: "vikram@techflow.ai",
    avatar: "VM",
    status: "active",
    currentTask: "API Optimization",
    tasksCompleted: 41,
    performanceScore: 85,
    joinDate: "2022-04-20",
    department: "Engineering",
  },
  {
    id: 5,
    name: "Sneha Patel",
    role: "Frontend Developer",
    email: "sneha@techflow.ai",
    avatar: "SP",
    status: "away",
    currentTask: "Dashboard UI",
    tasksCompleted: 35,
    performanceScore: 87,
    joinDate: "2022-05-15",
    department: "Engineering",
  },
  {
    id: 6,
    name: "Arjun Nair",
    role: "DevOps Engineer",
    email: "arjun@techflow.ai",
    avatar: "AN",
    status: "active",
    currentTask: "CI/CD Pipeline",
    tasksCompleted: 29,
    performanceScore: 90,
    joinDate: "2022-06-01",
    department: "Engineering",
  },
  {
    id: 7,
    name: "Divya Krishnan",
    role: "Product Manager",
    email: "divya@techflow.ai",
    avatar: "DK",
    status: "busy",
    currentTask: "User Research",
    tasksCompleted: 33,
    performanceScore: 89,
    joinDate: "2022-07-10",
    department: "Product",
  },
  {
    id: 8,
    name: "Karthik Iyer",
    role: "QA Engineer",
    email: "karthik@techflow.ai",
    avatar: "KI",
    status: "active",
    currentTask: "Test Automation",
    tasksCompleted: 27,
    performanceScore: 86,
    joinDate: "2022-08-05",
    department: "Engineering",
  },
];

const milestones = [
  {
    id: 1,
    name: "MVP Launch",
    description: "Initial product launch with core features",
    progress: 100,
    status: "completed",
    dueDate: "2023-12-01",
    completedDate: "2023-11-28",
    contributors: 8,
    tasksTotal: 45,
    tasksCompleted: 45,
  },
  {
    id: 2,
    name: "Beta Release",
    description: "Public beta with advanced features",
    progress: 75,
    status: "in_progress",
    dueDate: "2024-02-15",
    completedDate: null,
    contributors: 8,
    tasksTotal: 80,
    tasksCompleted: 60,
  },
  {
    id: 3,
    name: "Mobile App",
    description: "iOS and Android applications",
    progress: 30,
    status: "in_progress",
    dueDate: "2024-04-30",
    completedDate: null,
    contributors: 5,
    tasksTotal: 50,
    tasksCompleted: 15,
  },
  {
    id: 4,
    name: "Enterprise Features",
    description: "SSO, audit logs, admin controls",
    progress: 10,
    status: "pending",
    dueDate: "2024-06-15",
    completedDate: null,
    contributors: 4,
    tasksTotal: 35,
    tasksCompleted: 4,
  },
];

const recentActivity = [
  { id: 1, user: "Priya Sharma", action: "completed", target: "Investor Presentation", time: "2 hours ago" },
  { id: 2, user: "Rahul Kumar", action: "started", target: "Database Migration", time: "3 hours ago" },
  { id: 3, user: "Anjali Rao", action: "completed", target: "Design System v2", time: "5 hours ago" },
  { id: 4, user: "Vikram Mehta", action: "commented on", target: "API Documentation", time: "6 hours ago" },
];

export default function TeamOverview() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("All");

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = filterDepartment === "All" || member.department === filterDepartment;
    return matchesSearch && matchesDept;
  });

  const departments = ["All", ...Array.from(new Set(teamMembers.map(m => m.department)))];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700 border-green-200";
      case "busy": return "bg-amber-100 text-amber-700 border-amber-200";
      case "away": return "bg-gray-100 text-gray-700 border-gray-200";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <TeamLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-2">
              <Users className="w-8 h-8 text-team" />
              Team Overview
            </h1>
            <p className="text-muted-foreground mt-1">
              Meet your teammates and track collective progress
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Mail className="w-4 h-4" />
              Contact Team
            </Button>
          </div>
        </div>

        {/* Team Info Card */}
        <Card className="bg-gradient-to-r from-team/5 to-accent/5 border-team/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-team/20 flex items-center justify-center">
                  <Briefcase className="w-10 h-10 text-team" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground">{teamInfo.name}</h2>
                  <p className="text-muted-foreground">{teamInfo.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">{teamInfo.stage}</Badge>
                    <Badge variant="outline">{teamInfo.domain}</Badge>
                    <span className="text-sm text-muted-foreground">Founded {teamInfo.founded}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-6 text-center">
                <div>
                  <p className="text-3xl font-bold text-foreground">{teamInfo.totalMembers}</p>
                  <p className="text-xs text-muted-foreground">Team Members</p>
                </div>
                <div className="w-px bg-border" />
                <div>
                  <p className="text-3xl font-bold text-foreground">{teamInfo.activeMilestones}</p>
                  <p className="text-xs text-muted-foreground">Active Milestones</p>
                </div>
                <div className="w-px bg-border" />
                <div>
                  <p className="text-3xl font-bold text-team">{teamInfo.overallProgress}%</p>
                  <p className="text-xs text-muted-foreground">Overall Progress</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Members Section */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-team" />
              Team Members
            </h2>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="h-10 px-3 rounded-md border border-input bg-background text-sm"
              >
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredMembers.map((member) => (
              <Card key={member.id} className="bg-card border-border hover:border-team/30 transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-team/20 to-accent/20 flex items-center justify-center">
                        <span className="text-sm font-bold text-team">{member.avatar}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{member.name}</h4>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(member.status)} capitalize`}>
                      {member.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Target className="w-3 h-3" />
                      <span className="truncate">{member.currentTask}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{member.tasksCompleted} tasks completed</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <TrendingUp className="w-3 h-3" />
                      <span>Score: {member.performanceScore}%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-xs text-muted-foreground">{member.department}</span>
                    <Button variant="ghost" size="sm" className="h-7 px-2">
                      <MessageSquare className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Milestones Section */}
        <div className="space-y-4">
          <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
            <Target className="w-5 h-5 text-team" />
            Active Milestones
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {milestones.map((milestone) => (
              <Card key={milestone.id} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-foreground">{milestone.name}</h4>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                    <Badge 
                      variant={milestone.status === "completed" ? "success" : milestone.status === "in_progress" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {milestone.status.replace("_", " ")}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{milestone.progress}%</span>
                    </div>
                    <Progress value={milestone.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {milestone.contributors} contributors
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {milestone.tasksCompleted}/{milestone.tasksTotal} tasks
                      </span>
                    </div>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Due {milestone.dueDate}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-team" />
              Recent Team Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                  <div className="w-8 h-8 rounded-full bg-team/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-team">
                      {activity.user.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{activity.user}</span>
                      {" "}{activity.action}{" "}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-foreground">312</p>
              <p className="text-xs text-muted-foreground">Total Tasks Completed</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-success">89%</p>
              <p className="text-xs text-muted-foreground">Avg On-Time Rate</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-accent">6</p>
              <p className="text-xs text-muted-foreground">Milestones Completed</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-team">88%</p>
              <p className="text-xs text-muted-foreground">Avg Performance Score</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </TeamLayout>
  );
}
