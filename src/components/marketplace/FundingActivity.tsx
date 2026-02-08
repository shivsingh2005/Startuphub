import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  ArrowUpRight,
  Building2,
  User,
  Calendar,
  DollarSign,
  ChevronRight,
} from "lucide-react";

interface FundingRound {
  id: string;
  startupName: string;
  startupDomain: string;
  investorName: string;
  investorType: "Angel" | "VC" | "Accelerator" | "Mentor";
  amount: string;
  stage: "Pre-seed" | "Seed" | "Series A" | "Series B" | "Growth";
  date: string;
  logo?: string;
}

interface FundingActivityProps {
  activities: FundingRound[];
  onViewAll?: () => void;
}

export function FundingActivity({ activities, onViewAll }: FundingActivityProps) {
  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Pre-seed":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "Seed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Series A":
        return "bg-green-100 text-green-700 border-green-200";
      case "Series B":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Growth":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getInvestorTypeColor = (type: string) => {
    switch (type) {
      case "Angel":
        return "text-blue-600 bg-blue-50";
      case "VC":
        return "text-purple-600 bg-purple-50";
      case "Accelerator":
        return "text-green-600 bg-green-50";
      case "Mentor":
        return "text-orange-600 bg-orange-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-success" />
          </div>
          <div>
            <CardTitle className="font-display text-lg">Recent Funding Activity</CardTitle>
            <p className="text-xs text-muted-foreground">Latest investments across the platform</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="gap-1" onClick={onViewAll}>
          View All
          <ChevronRight className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="p-4 rounded-xl border border-border hover:border-success/30 hover:bg-muted/30 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/20 to-founder/20 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                    {activity.startupName}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant="outline" className="text-xs">
                      {activity.startupDomain}
                    </Badge>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${getStageColor(activity.stage)}`}>
                      {activity.stage}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-success flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  {activity.amount}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end mt-1">
                  <Calendar className="w-3 h-3" />
                  {activity.date}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-investor/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-investor" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{activity.investorName}</p>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${getInvestorTypeColor(activity.investorType)}`}
                  >
                    {activity.investorType}
                  </Badge>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
                Details
                <ArrowUpRight className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
