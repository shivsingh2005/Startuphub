import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { FounderLayout } from "@/components/layout/FounderLayout";
import {
  Users,
  Plus,
  Mail,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Target,
  Clock,
  MoreHorizontal,
  Search,
  Filter,
  UserPlus,
  Crown,
  Briefcase,
  Award,
  BarChart3,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock team data
const teamMembers = [
  {
    id: "1",
    name: "Priya Sharma",
    email: "priya@techflow.ai",
    role: "CTO",
    avatar: "PS",
    status: "active",
    joinDate: "2022-03-15",
    tasksCompleted: 45,
    tasksAssigned: 52,
    performanceScore: 92,
    currentTask: "Architecture Review",
    department: "Engineering",
    skills: ["React", "Node.js", "System Design"],
  },
  {
    id: "2",
    name: "Rahul Kumar",
    email: "rahul@techflow.ai",
    role: "Senior Developer",
    avatar: "RK",
    status: "active",
    joinDate: "2022-04-01",
    tasksCompleted: 38,
    tasksAssigned: 42,
    performanceScore: 88,
    currentTask: "API Development",
    department: "Engineering",
    skills: ["Python", "AWS", "Database"],
  },
  {
    id: "3",
    name: "Anjali Rao",
    email: "anjali@techflow.ai",
    role: "Lead Designer",
    avatar: "AR",
    status: "active",
    joinDate: "2022-05-10",
    tasksCompleted: 32,
    tasksAssigned: 35,
    performanceScore: 90,
    currentTask: "UI Component Library",
    department: "Design",
    skills: ["Figma", "UI/UX", "Design Systems"],
  },
  {
    id: "4",
    name: "Vikram Mehta",
    email: "vikram@techflow.ai",
    role: "Backend Developer",
    avatar: "VM",
    status: "away",
    joinDate: "2022-06-20",
    tasksCompleted: 28,
    tasksAssigned: 30,
    performanceScore: 85,
    currentTask: "Database Optimization",
    department: "Engineering",
    skills: ["PostgreSQL", "Redis", "Docker"],
  },
];

const pendingInvites = [
  {
    id: "inv1",
    email: "sneha.patel@email.com",
    role: "Frontend Developer",
    sentAt: "2 days ago",
    status: "pending",
  },
  {
    id: "inv2",
    email: "arjun.nair@email.com",
    role: "DevOps Engineer",
    sentAt: "5 days ago",
    status: "pending",
  },
];

const joinRequests = [
  {
    id: "req1",
    name: "Divya Krishnan",
    email: "divya@email.com",
    role: "Product Manager",
    requestedAt: "1 day ago",
    message: "I'm excited to join TechFlow AI! I have 5 years of PM experience in SaaS.",
  },
];

export default function FounderTeam() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "all" || member.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const stats = {
    totalMembers: teamMembers.length,
    activeMembers: teamMembers.filter(m => m.status === "active").length,
    avgPerformance: Math.round(teamMembers.reduce((acc, m) => acc + m.performanceScore, 0) / teamMembers.length),
    totalTasksCompleted: teamMembers.reduce((acc, m) => acc + m.tasksCompleted, 0),
  };

  const roles = ["all", ...Array.from(new Set(teamMembers.map(m => m.role)))];

  return (
    <FounderLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-2">
              <Users className="w-8 h-8 text-founder" />
              Team Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your team members, invites, and performance
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <UserPlus className="w-4 h-4" />
              Join Requests
              {joinRequests.length > 0 && (
                <Badge variant="destructive" className="ml-1">{joinRequests.length}</Badge>
              )}
            </Button>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Invite Member
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Members</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalMembers}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-founder/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-founder" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Active Now</p>
                  <p className="text-2xl font-bold text-green-600">{stats.activeMembers}</p>
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
                  <p className="text-sm text-muted-foreground">Avg Performance</p>
                  <p className="text-2xl font-bold text-founder">{stats.avgPerformance}%</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-founder/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-founder" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tasks Done</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalTasksCompleted}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Invites & Requests */}
        {(pendingInvites.length > 0 || joinRequests.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingInvites.length > 0 && (
              <Card className="bg-amber-50 border-amber-200">
                <CardHeader>
                  <CardTitle className="font-display text-base flex items-center gap-2 text-amber-800">
                    <Mail className="w-4 h-4" />
                    Pending Invites ({pendingInvites.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {pendingInvites.map((invite) => (
                    <div key={invite.id} className="flex items-center justify-between p-2 bg-white rounded-lg border border-amber-100">
                      <div>
                        <p className="text-sm font-medium text-amber-900">{invite.email}</p>
                        <p className="text-xs text-amber-700">{invite.role} • Sent {invite.sentAt}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 text-amber-700">
                        Resend
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {joinRequests.length > 0 && (
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="font-display text-base flex items-center gap-2 text-blue-800">
                    <UserPlus className="w-4 h-4" />
                    Join Requests ({joinRequests.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {joinRequests.map((request) => (
                    <div key={request.id} className="p-3 bg-white rounded-lg border border-blue-100">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-sm font-medium text-blue-900">{request.name}</p>
                          <p className="text-xs text-blue-700">{request.role} • {request.requestedAt}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="h-7 text-green-600">
                            <CheckCircle2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 text-red-600">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-blue-600 line-clamp-2">{request.message}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="h-10 px-3 rounded-md border border-input bg-background text-sm"
          >
            {roles.map(r => (
              <option key={r} value={r}>
                {r === "all" ? "All Roles" : r}
              </option>
            ))}
          </select>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="bg-card border-border hover:border-founder/30 transition-all">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-founder/20 to-accent/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-founder">{member.avatar}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{member.name}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{member.role}</Badge>
                        {member.role === "CTO" && <Crown className="w-3 h-3 text-amber-500" />}
                      </div>
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    member.status === "active" ? "bg-green-500" : "bg-gray-400"
                  }`} />
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      Tasks
                    </span>
                    <span className="font-medium">{member.tasksCompleted}/{member.tasksAssigned}</span>
                  </div>
                  <Progress value={(member.tasksCompleted / member.tasksAssigned) * 100} className="h-1.5" />
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Performance
                    </span>
                    <span className={`font-medium ${
                      member.performanceScore >= 90 ? "text-green-600" :
                      member.performanceScore >= 80 ? "text-blue-600" : "text-amber-600"
                    }`}>
                      {member.performanceScore}%
                    </span>
                  </div>
                  <Progress value={member.performanceScore} className="h-1.5" />
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground truncate">{member.currentTask}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {member.skills.map((skill, idx) => (
                    <span key={idx} className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => setSelectedMember(member.id)}>
                        <BarChart3 className="w-3 h-3 mr-1" />
                        Analytics
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Award className="w-5 h-5 text-founder" />
                          {member.name} - Performance
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-muted rounded-lg text-center">
                            <p className="text-2xl font-bold text-founder">{member.performanceScore}%</p>
                            <p className="text-xs text-muted-foreground">Performance Score</p>
                          </div>
                          <div className="p-3 bg-muted rounded-lg text-center">
                            <p className="text-2xl font-bold text-foreground">{member.tasksCompleted}</p>
                            <p className="text-xs text-muted-foreground">Tasks Completed</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Recent Activity</p>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm p-2 bg-muted/50 rounded">
                              <span>Completed API integration</span>
                              <span className="text-xs text-muted-foreground">2 days ago</span>
                            </div>
                            <div className="flex items-center justify-between text-sm p-2 bg-muted/50 rounded">
                              <span>Fixed authentication bug</span>
                              <span className="text-xs text-muted-foreground">4 days ago</span>
                            </div>
                            <div className="flex items-center justify-between text-sm p-2 bg-muted/50 rounded">
                              <span>Code review for team</span>
                              <span className="text-xs text-muted-foreground">5 days ago</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="sm" className="px-2">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No team members found</h3>
            <p className="text-muted-foreground">Invite your first team member to get started</p>
          </div>
        )}
      </div>
    </FounderLayout>
  );
}
