import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { InvestorLayout } from "@/components/layout/InvestorLayout";
import {
  Briefcase,
  Search,
  Filter,
  Eye,
  ArrowUpRight,
  DollarSign,
  TrendingUp,
  Clock,
  Star,
  Grid,
  List,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data
const allInvestments = [
  {
    id: "1",
    name: "TechFlow AI",
    domain: "SaaS",
    stage: "mvp",
    status: "invested",
    amount: "₹10L",
    investedAt: "3 months ago",
    executionScore: 85,
    validationScore: 78,
    milestonesCompleted: 6,
    totalMilestones: 8,
    lastActivity: "Updated task: Fix authentication bug",
  },
  {
    id: "2",
    name: "EduSpark",
    domain: "Edtech",
    stage: "growth",
    status: "invested",
    amount: "₹15L",
    investedAt: "2 months ago",
    executionScore: 92,
    validationScore: 88,
    milestonesCompleted: 12,
    totalMilestones: 12,
    lastActivity: "Completed milestone: Scale to 10K users",
  },
  {
    id: "3",
    name: "HealthBridge",
    domain: "Health",
    stage: "mvp",
    status: "watching",
    amount: "-",
    investedAt: "1 month ago",
    executionScore: 72,
    validationScore: 68,
    milestonesCompleted: 4,
    totalMilestones: 10,
    lastActivity: "Added new task: User onboarding flow",
  },
  {
    id: "4",
    name: "AgriSmart",
    domain: "Agriculture",
    stage: "growth",
    status: "invested",
    amount: "₹12L",
    investedAt: "4 months ago",
    executionScore: 65,
    validationScore: 70,
    milestonesCompleted: 8,
    totalMilestones: 12,
    lastActivity: "Updated milestone: IoT sensor integration",
  },
  {
    id: "5",
    name: "GreenLogistics",
    domain: "Logistics",
    stage: "mvp",
    status: "watching",
    amount: "-",
    investedAt: "2 weeks ago",
    executionScore: 78,
    validationScore: 75,
    milestonesCompleted: 2,
    totalMilestones: 6,
    lastActivity: "Created startup profile",
  },
  {
    id: "6",
    name: "FoodieFast",
    domain: "Food",
    stage: "mvp",
    status: "invested",
    amount: "₹8L",
    investedAt: "5 months ago",
    executionScore: 68,
    validationScore: 72,
    milestonesCompleted: 5,
    totalMilestones: 8,
    lastActivity: "Updated task: Kitchen workflow automation",
  },
];

export default function MyInvestments() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDomain, setFilterDomain] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const filteredInvestments = allInvestments
    .filter((inv) => {
      const matchesSearch =
        inv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.domain.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === "all" || inv.status === filterStatus;
      const matchesDomain = filterDomain === "all" || inv.domain === filterDomain;
      return matchesSearch && matchesStatus && matchesDomain;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "execution":
          return b.executionScore - a.executionScore;
        case "validation":
          return b.validationScore - a.validationScore;
        case "amount":
          return (parseInt(b.amount) || 0) - (parseInt(a.amount) || 0);
        default:
          return 0;
      }
    });

  const stats = {
    total: allInvestments.length,
    invested: allInvestments.filter((i) => i.status === "invested").length,
    watching: allInvestments.filter((i) => i.status === "watching").length,
    totalInvested: allInvestments
      .filter((i) => i.amount !== "-")
      .reduce((acc, i) => acc + parseInt(i.amount.replace("₹", "").replace("L", "")), 0),
  };

  return (
    <InvestorLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-investor" />
              My Investments
            </h1>
            <p className="text-muted-foreground mt-1">
              Track and manage your startup portfolio
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="px-3"
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="px-3"
              >
                <Grid className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Startups</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-success">{stats.invested}</p>
              <p className="text-sm text-muted-foreground">Invested</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-investor">{stats.watching}</p>
              <p className="text-sm text-muted-foreground">Watching</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-foreground">₹{stats.totalInvested}L</p>
              <p className="text-sm text-muted-foreground">Total Invested</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search startups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="invested">Invested</SelectItem>
              <SelectItem value="watching">Watching</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterDomain} onValueChange={setFilterDomain}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Domain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Domains</SelectItem>
              <SelectItem value="SaaS">SaaS</SelectItem>
              <SelectItem value="Edtech">Edtech</SelectItem>
              <SelectItem value="Health">Health</SelectItem>
              <SelectItem value="Agriculture">Agriculture</SelectItem>
              <SelectItem value="Logistics">Logistics</SelectItem>
              <SelectItem value="Food">Food</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="execution">Highest Execution</SelectItem>
              <SelectItem value="validation">Highest Validation</SelectItem>
              <SelectItem value="amount">Highest Investment</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Investments List */}
        {viewMode === "list" ? (
          <div className="space-y-4">
            {filteredInvestments.map((startup) => (
              <Card key={startup.id} className="bg-card border-border hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Main Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg text-foreground">{startup.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {startup.domain}
                        </Badge>
                        <Badge
                          variant={startup.stage as "idea" | "mvp" | "growth"}
                          className="text-xs capitalize"
                        >
                          {startup.stage}
                        </Badge>
                        <Badge
                          variant={startup.status as "invested" | "watching"}
                          className="text-xs capitalize"
                        >
                          {startup.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {startup.amount !== "-" && (
                          <>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              {startup.amount}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {startup.investedAt}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Scores */}
                    <div className="flex gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-founder">{startup.executionScore}%</div>
                        <div className="text-xs text-muted-foreground">Execution</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent">{startup.validationScore}%</div>
                        <div className="text-xs text-muted-foreground">Validation</div>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="w-full md:w-48">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">
                          Milestones {startup.milestonesCompleted}/{startup.totalMilestones}
                        </span>
                      </div>
                      <Progress
                        value={(startup.milestonesCompleted / startup.totalMilestones) * 100}
                        className="h-2"
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                      <Button variant="investor" size="sm" className="gap-1">
                        <ArrowUpRight className="w-4 h-4" />
                        Details
                      </Button>
                    </div>
                  </div>

                  {/* Last Activity */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Last activity:</span> {startup.lastActivity}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredInvestments.map((startup) => (
              <Card key={startup.id} className="bg-card border-border hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">{startup.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {startup.domain}
                        </Badge>
                        <Badge
                          variant={startup.status as "invested" | "watching"}
                          className="text-xs capitalize"
                        >
                          {startup.status}
                        </Badge>
                      </div>
                    </div>
                    {startup.amount !== "-" && (
                      <span className="text-lg font-bold text-success">{startup.amount}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Execution</span>
                        <span className="font-medium">{startup.executionScore}%</span>
                      </div>
                      <Progress value={startup.executionScore} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Validation</span>
                        <span className="font-medium">{startup.validationScore}%</span>
                      </div>
                      <Progress value={startup.validationScore} className="h-2" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <span>
                      {startup.milestonesCompleted}/{startup.totalMilestones} Milestones
                    </span>
                    <span>{startup.investedAt}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-1">
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                    <Button variant="investor" size="sm" className="flex-1 gap-1">
                      <TrendingUp className="w-4 h-4" />
                      Progress
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredInvestments.length === 0 && (
          <Card className="bg-card border-border">
            <CardContent className="py-12 text-center">
              <Briefcase className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-lg font-medium text-foreground">No startups found</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your filters or search query
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </InvestorLayout>
  );
}

