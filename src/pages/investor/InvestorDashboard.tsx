import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { InvestorLayout } from "@/components/layout/InvestorLayout";
import {
  Briefcase,
  TrendingUp,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  CheckCircle2,
  Clock,
  Inbox,
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for investor dashboard
const portfolioStats = {
  totalStartups: 8,
  totalInvested: "₹45L",
  avgExecutionScore: 78,
  avgValidationScore: 72,
  pitchRequestsPending: 3,
};

const recentInvestments = [
  {
    id: "1",
    name: "TechFlow AI",
    domain: "SaaS",
    stage: "mvp",
    status: "invested",
    amount: "₹10L",
    executionScore: 85,
    validationScore: 78,
    milestonesCompleted: 6,
    totalMilestones: 8,
  },
  {
    id: "2",
    name: "EduSpark",
    domain: "Edtech",
    stage: "growth",
    status: "invested",
    amount: "₹15L",
    executionScore: 92,
    validationScore: 88,
    milestonesCompleted: 12,
    totalMilestones: 12,
  },
  {
    id: "3",
    name: "HealthBridge",
    domain: "Health",
    stage: "mvp",
    status: "watching",
    amount: "-",
    executionScore: 72,
    validationScore: 68,
    milestonesCompleted: 4,
    totalMilestones: 10,
  },
  {
    id: "4",
    name: "AgriTech Pro",
    domain: "Agriculture",
    stage: "idea",
    status: "watching",
    amount: "-",
    executionScore: 65,
    validationScore: 70,
    milestonesCompleted: 2,
    totalMilestones: 6,
  },
];

const pendingPitches = [
  {
    id: "1",
    startupName: "FinanceHub",
    domain: "Fintech",
    stage: "idea",
    pitchSummary: "AI-powered personal finance assistant for millennials",
    receivedAt: "2 hours ago",
  },
  {
    id: "2",
    startupName: "GreenLogistics",
    domain: "Logistics",
    stage: "mvp",
    pitchSummary: "Sustainable last-mile delivery platform",
    receivedAt: "1 day ago",
  },
  {
    id: "3",
    startupName: "EduVerse",
    domain: "Edtech",
    stage: "mvp",
    pitchSummary: "VR-based immersive learning experiences",
    receivedAt: "2 days ago",
  },
];

export default function InvestorDashboard() {
  return (
    <InvestorLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Investor Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Track your portfolio and discover new opportunities
            </p>
          </div>
          <Link to="/investor/inbox">
            <Button variant="investor" className="gap-2">
              <Inbox className="w-4 h-4" />
              View Pitch Inbox
              {portfolioStats.pitchRequestsPending > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {portfolioStats.pitchRequestsPending}
                </Badge>
              )}
            </Button>
          </Link>
        </div>

        {/* 📊 KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 🧳 Startups Tracked */}
          <Card className="bg-card border-border hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-investor/10 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-investor" />
                </div>
                <Badge variant="invested" className="text-xs">Portfolio</Badge>
              </div>
              <p className="text-3xl font-bold text-foreground">{portfolioStats.totalStartups}</p>
              <p className="text-sm text-muted-foreground mt-1">Startups Tracked</p>
            </CardContent>
          </Card>

          {/* 💰 Total Invested (Mock) */}
          <Card className="bg-card border-border hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-success" />
                </div>
                <div className="flex items-center gap-1 text-success text-sm">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Mock</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground">{portfolioStats.totalInvested}</p>
              <p className="text-sm text-muted-foreground mt-1">Total Invested</p>
            </CardContent>
          </Card>

          {/* 📈 Avg Execution Score */}
          <Card className="bg-card border-border hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-founder/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-founder" />
                </div>
                <Badge variant="mvp" className="text-xs">Avg</Badge>
              </div>
              <p className="text-3xl font-bold text-foreground">{portfolioStats.avgExecutionScore}%</p>
              <p className="text-sm text-muted-foreground mt-1">Avg Execution Score</p>
              <Progress value={portfolioStats.avgExecutionScore} className="h-2 mt-3" />
            </CardContent>
          </Card>

          {/* 🧪 Avg Validation Score */}
          <Card className="bg-card border-border hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-accent" />
                </div>
                <Badge variant="mvp" className="text-xs">Avg</Badge>
              </div>
              <p className="text-3xl font-bold text-foreground">{portfolioStats.avgValidationScore}%</p>
              <p className="text-sm text-muted-foreground mt-1">Avg Validation Score</p>
              <Progress value={portfolioStats.avgValidationScore} className="h-2 mt-3" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 🗂️ MY INVESTMENTS SECTION */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-investor" />
                  My Investments
                </CardTitle>
                <Link to="/investor/investments">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentInvestments.map((startup) => (
                  <div
                    key={startup.id}
                    className="p-4 rounded-xl border border-border hover:border-investor/30 hover:bg-muted/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">{startup.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{startup.domain}</Badge>
                          <Badge variant={startup.stage as "idea" | "mvp" | "growth"} className="text-xs capitalize">
                            {startup.stage}
                          </Badge>
                          <Badge variant={startup.status as "watching" | "invested"} className="text-xs capitalize">
                            {startup.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        {startup.amount !== "-" && (
                          <>
                            <p className="text-xs text-muted-foreground">Invested</p>
                            <p className="text-sm font-bold text-success">{startup.amount}</p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Progress Indicators */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                          <span>Execution</span>
                          <span className="font-medium text-foreground">{startup.executionScore}%</span>
                        </div>
                        <Progress value={startup.executionScore} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                          <span>Validation</span>
                          <span className="font-medium text-foreground">{startup.validationScore}%</span>
                        </div>
                        <Progress value={startup.validationScore} className="h-2" />
                      </div>
                    </div>
                    
                    {/* Milestones */}
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Milestones: {startup.milestonesCompleted}/{startup.totalMilestones}
                        </span>
                        <Progress 
                          value={(startup.milestonesCompleted / startup.totalMilestones) * 100} 
                          className="h-1.5 w-24" 
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* 📨 PITCH REQUESTS PANEL */}
          <div>
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display flex items-center gap-2">
                  <Inbox className="w-5 h-5 text-investor" />
                  Pitch Requests
                  <Badge variant="investor">{pendingPitches.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {pendingPitches.map((pitch) => (
                  <div
                    key={pitch.id}
                    className="p-4 rounded-xl border border-border hover:border-accent/30 hover:bg-muted/30 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{pitch.startupName}</h4>
                      <Badge variant={pitch.stage as "idea" | "mvp"} className="text-xs capitalize">
                        {pitch.stage}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">{pitch.domain}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {pitch.pitchSummary}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {pitch.receivedAt}
                      </span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="h-7 px-2">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="success" className="h-7 px-3">
                          Accept
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                <Link to="/investor/inbox" className="block">
                  <Button variant="outline" className="w-full mt-2">
                    View All Requests
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* 📈 Portfolio Health Summary */}
            <Card className="bg-card border-border mt-6">
              <CardHeader className="pb-2">
                <CardTitle className="font-display text-base flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-success" />
                  Portfolio Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Top Performer</span>
                    <span className="text-sm font-medium text-success">EduSpark (92%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Needs Attention</span>
                    <span className="text-sm font-medium text-amber-600">AgriTech Pro (65%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Watch Count</span>
                    <span className="text-sm font-medium text-foreground">2 startups</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Invested Count</span>
                    <span className="text-sm font-medium text-foreground">2 startups</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </InvestorLayout>
  );
}

