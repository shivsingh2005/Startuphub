import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InvestorLayout } from "@/components/layout/InvestorLayout";
import {
  PieChart,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Award,
  AlertTriangle,
  ChevronDown,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Mock data
const portfolioData = [
  { name: "TechFlow AI", execution: 85, validation: 78, stage: "mvp", domain: "SaaS" },
  { name: "EduSpark", execution: 92, validation: 88, stage: "growth", domain: "Edtech" },
  { name: "HealthBridge", execution: 72, validation: 68, stage: "mvp", domain: "Health" },
  { name: "AgriSmart", execution: 65, validation: 70, stage: "growth", domain: "Agriculture" },
  { name: "GreenLogistics", execution: 78, validation: 75, stage: "mvp", domain: "Logistics" },
  { name: "FinanceHub", execution: 0, validation: 0, stage: "idea", domain: "Fintech" },
];

const executionTrend = [
  { month: "Jan", avgExecution: 70 },
  { month: "Feb", avgExecution: 72 },
  { month: "Mar", avgExecution: 75 },
  { month: "Apr", avgExecution: 74 },
  { month: "May", avgExecution: 78 },
  { month: "Jun", avgExecution: 80 },
];

const validationTrend = [
  { month: "Jan", avgValidation: 68 },
  { month: "Feb", avgValidation: 70 },
  { month: "Mar", avgValidation: 72 },
  { month: "Apr", avgValidation: 71 },
  { month: "May", avgValidation: 75 },
  { month: "Jun", avgValidation: 77 },
];

const stageDistribution = [
  { name: "Idea", value: 15, color: "#94a3b8" },
  { name: "MVP", value: 50, color: "#3b82f6" },
  { name: "Growth", value: 35, color: "#22c55e" },
];

const domainDistribution = [
  { name: "SaaS", value: 25, color: "#8b5cf6" },
  { name: "Edtech", value: 20, color: "#06b6d4" },
  { name: "Health", value: 15, color: "#ec4899" },
  { name: "Agriculture", value: 15, color: "#84cc16" },
  { name: "Logistics", value: 15, color: "#f59e0b" },
  { name: "Fintech", value: 10, color: "#ef4444" },
];

const milestoneProgress = [
  { name: "TechFlow AI", completed: 6, total: 8 },
  { name: "EduSpark", completed: 12, total: 12 },
  { name: "HealthBridge", completed: 4, total: 10 },
  { name: "AgriSmart", completed: 8, total: 12 },
  { name: "GreenLogistics", completed: 2, total: 6 },
];

export default function PortfolioAnalytics() {
  const [selectedMetric, setSelectedMetric] = useState("execution");

  const avgExecution =
    portfolioData.reduce((acc, p) => acc + (p.execution > 0 ? p.execution : 0), 0) /
    portfolioData.filter((p) => p.execution > 0).length;

  const avgValidation =
    portfolioData.reduce((acc, p) => acc + (p.validation > 0 ? p.validation : 0), 0) /
    portfolioData.filter((p) => p.validation > 0).length;

  const topPerformer = portfolioData.reduce(
    (best, current) => (current.execution > best.execution ? current : best),
    portfolioData[0]
  );

  const needsAttention = portfolioData.reduce(
    (worst, current) =>
      current.execution > 0 && current.execution < worst.execution ? current : worst,
    portfolioData[0]
  );

  return (
    <InvestorLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-3">
              <PieChart className="w-8 h-8 text-investor" />
              Portfolio Analytics
            </h1>
            <p className="text-muted-foreground mt-1">
              Deep insights into your startup portfolio performance
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              Export Report
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-investor/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-investor" />
                </div>
                <Badge variant="outline" className="text-xs">Portfolio</Badge>
              </div>
              <p className="text-3xl font-bold text-foreground">{avgExecution.toFixed(0)}%</p>
              <p className="text-sm text-muted-foreground mt-1">Avg Execution Score</p>
              <div className="flex items-center gap-1 mt-2 text-success text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+5% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-accent" />
                </div>
                <Badge variant="outline" className="text-xs">Best</Badge>
              </div>
              <p className="text-xl font-bold text-foreground truncate">{topPerformer.name}</p>
              <p className="text-sm text-muted-foreground mt-1">Top Performer</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-success h-2 rounded-full"
                    style={{ width: `${topPerformer.execution}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{topPerformer.execution}%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-amber" />
                </div>
                <Badge variant="outline" className="text-xs">Needs</Badge>
              </div>
              <p className="text-xl font-bold text-foreground truncate">{needsAttention.name}</p>
              <p className="text-sm text-muted-foreground mt-1">Needs Attention</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-amber h-2 rounded-full"
                    style={{ width: `${needsAttention.execution}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{needsAttention.execution}%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-success" />
                </div>
                <Badge variant="outline" className="text-xs">Total</Badge>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {portfolioData.filter((p) => p.execution > 0).length}
              </p>
              <p className="text-sm text-muted-foreground mt-1">Active Startups</p>
              <p className="text-xs text-muted-foreground mt-2">
                {portfolioData.filter((p) => p.execution === 0).length} ideas pending execution
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Execution Trend */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-investor" />
                Execution Score Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={executionTrend}>
                  <defs>
                    <linearGradient id="colorExecution" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" domain={[60, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(222 47% 11%)",
                      border: "1px solid hsl(222 47% 11%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="avgExecution"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorExecution)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Validation Trend */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <Award className="w-5 h-5 text-accent" />
                Validation Score Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={validationTrend}>
                  <defs>
                    <linearGradient id="colorValidation" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" domain={[60, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(222 47% 11%)",
                      border: "1px solid hsl(222 47% 11%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="avgValidation"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorValidation)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Distribution & Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stage Distribution */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-base">By Stage</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <RechartsPieChart>
                  <Pie
                    data={stageDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stageDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Domain Distribution */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-base">By Domain</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <RechartsPieChart>
                  <Pie
                    data={domainDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {domainDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Milestone Progress */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-base flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-investor" />
                Milestone Completion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={milestoneProgress} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" domain={[0, 12]} className="text-xs" />
                  <YAxis dataKey="name" type="category" width={100} className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(222 47% 11%)",
                      border: "1px solid hsl(222 47% 11%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="completed" fill="#22c55e" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Performance Comparison */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-investor" />
              Startup Performance Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={portfolioData.filter((p) => p.execution > 0)}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis domain={[0, 100]} className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(222 47% 11%)",
                    border: "1px solid hsl(222 47% 11%)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="execution" name="Execution" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="validation" name="Validation" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </InvestorLayout>
  );
}

