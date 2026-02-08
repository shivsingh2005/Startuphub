import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  TrendingUp,
  Star,
  ArrowUpRight,
  Building2,
  Target,
  Users,
  Flame,
  Crown,
  Medal,
} from "lucide-react";

interface TopStartup {
  id: string;
  rank: number;
  name: string;
  domain: string;
  stage: string;
  executionScore: number;
  validationScore: number;
  growthRate: number;
  fundingRaised: string;
  teamSize: number;
  milestonesCompleted: number;
  totalMilestones: number;
  trending?: boolean;
}

interface TopStartupsProps {
  weeklyStartups: TopStartup[];
  yearlyStartups: TopStartup[];
  onViewAll?: () => void;
}

export function TopStartups({ weeklyStartups, yearlyStartups, onViewAll }: TopStartupsProps) {
  const [activeTab, setActiveTab] = useState("weekly");

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-50 border-yellow-200";
      case 2:
        return "bg-gray-50 border-gray-200";
      case 3:
        return "bg-amber-50 border-amber-200";
      default:
        return "bg-card border-border";
    }
  };

  const renderStartupList = (startups: TopStartup[]) => (
    <div className="space-y-3">
      {startups.map((startup) => (
        <div
          key={startup.id}
          className={`p-4 rounded-xl border ${getRankStyle(startup.rank)} hover:shadow-md transition-all cursor-pointer group`}
        >
          <div className="flex items-start gap-3">
            {/* Rank */}
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center">
              {getRankIcon(startup.rank)}
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors truncate">
                    {startup.name}
                  </h4>
                  {startup.trending && (
                    <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700 border-orange-200">
                      <Flame className="w-3 h-3 mr-1" />
                      Hot
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 text-success">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-bold">+{startup.growthRate}%</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="text-xs">
                  {startup.domain}
                </Badge>
                <Badge variant="secondary" className="text-xs capitalize">
                  {startup.stage}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {startup.teamSize}
                </span>
              </div>

              {/* Scores */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Execution</span>
                    <span className="font-medium text-foreground">{startup.executionScore}%</span>
                  </div>
                  <Progress value={startup.executionScore} className="h-1.5" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Validation</span>
                    <span className="font-medium text-foreground">{startup.validationScore}%</span>
                  </div>
                  <Progress value={startup.validationScore} className="h-1.5" />
                </div>
              </div>

              {/* Bottom Stats */}
              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    {startup.milestonesCompleted}/{startup.totalMilestones}
                  </span>
                  <span className="font-medium text-success">
                    {startup.fundingRaised}
                  </span>
                </div>
                <Button variant="ghost" size="sm" className="h-7 px-2 gap-1">
                  View
                  <ArrowUpRight className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-accent" />
            </div>
            <div>
              <CardTitle className="font-display text-lg">Top Startups</CardTitle>
              <p className="text-xs text-muted-foreground">Ranked by performance & growth</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="gap-1" onClick={onViewAll}>
            View All
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="weekly" className="gap-2">
              <Star className="w-4 h-4" />
              This Week
            </TabsTrigger>
            <TabsTrigger value="yearly" className="gap-2">
              <Trophy className="w-4 h-4" />
              This Year
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly" className="mt-0">
            {renderStartupList(weeklyStartups)}
          </TabsContent>
          
          <TabsContent value="yearly" className="mt-0">
            {renderStartupList(yearlyStartups)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
