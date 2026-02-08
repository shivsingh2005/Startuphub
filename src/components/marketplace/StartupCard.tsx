import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  CheckCircle2,
  Users,
  Target,
  ArrowUpRight,
  Building2,
  MapPin,
  Calendar,
  TrendingUp as TrendingUpIcon,
} from "lucide-react";

interface StartupCardProps {
  id: string;
  name: string;
  description: string;
  domain: string;
  stage: "idea" | "mvp" | "growth" | "scale";
  logo?: string;
  executionScore: number;
  validationScore: number;
  teamSize: number;
  milestonesCompleted: number;
  totalMilestones: number;
  location?: string;
  foundedDate?: string;
  fundingRaised?: string;
  investorCount?: number;
  onViewDetails?: (id: string) => void;
  onConnect?: (id: string) => void;
}

export function StartupCard({
  id,
  name,
  description,
  domain,
  stage,
  executionScore,
  validationScore,
  teamSize,
  milestonesCompleted,
  totalMilestones,
  location,
  foundedDate,
  fundingRaised,
  investorCount,
  onViewDetails,
  onConnect,
}: StartupCardProps) {
  const getStageColor = (stage: string) => {
    switch (stage) {
      case "idea":
        return "bg-gray-100/50 text-gray-700 border-gray-200/50";
      case "mvp":
        return "bg-blue-100/50 text-blue-700 border-blue-200/50";
      case "growth":
        return "bg-emerald-100/50 text-emerald-700 border-emerald-200/50";
      case "scale":
        return "bg-violet-100/50 text-violet-700 border-violet-200/50";
      default:
        return "bg-gray-100/50 text-gray-700 border-gray-200/50";
    }
  };

  const getDomainColor = (domain: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      saas: { bg: "bg-violet-500/10", text: "text-violet-500" },
      edtech: { bg: "bg-blue-500/10", text: "text-blue-500" },
      health: { bg: "bg-emerald-500/10", text: "text-emerald-500" },
      fintech: { bg: "bg-amber-500/10", text: "text-amber-500" },
      logistics: { bg: "bg-orange-500/10", text: "text-orange-500" },
      ai: { bg: "bg-pink-500/10", text: "text-pink-500" },
      ecommerce: { bg: "bg-cyan-500/10", text: "text-cyan-500" },
      gaming: { bg: "bg-purple-500/10", text: "text-purple-500" },
      cleantech: { bg: "bg-green-500/10", text: "text-green-500" },
      entertainment: { bg: "bg-rose-500/10", text: "text-rose-500" },
      enterprise: { bg: "bg-slate-500/10", text: "text-slate-500" },
    };
    return colors[domain.toLowerCase()] || { bg: "bg-gray-500/10", text: "text-gray-500" };
  };

  const domainColor = getDomainColor(domain);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="glass-card overflow-hidden h-full">
        {/* Header */}
        <div className="p-5 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div 
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Building2 className="w-6 h-6 text-violet-500" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-lg leading-tight text-foreground">
                  {name}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={`${domainColor.bg} ${domainColor.text} border-0 text-xs font-medium`}>
                    {domain}
                  </Badge>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full border capitalize ${getStageColor(stage)}`}>
                    {stage}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {location}
              </span>
            )}
            {foundedDate && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {foundedDate}
              </span>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="px-5 py-4 bg-white/30 border-y border-white/20">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <TrendingUpIcon className="w-3.5 h-3.5" />
                  Execution
                </span>
                <span className="font-semibold text-foreground">{executionScore}%</span>
              </div>
              <div className="progress-premium">
                <motion.div 
                  className="progress-premium-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${executionScore}%` }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Validation
                </span>
                <span className="font-semibold text-foreground">{validationScore}%</span>
              </div>
              <div className="progress-premium">
                <motion.div 
                  className="bg-gradient-to-r from-amber-400 to-orange-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${validationScore}%` }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
                  style={{ width: `${validationScore}%`, height: '100%', borderRadius: '10px' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="px-5 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Users className="w-3.5 h-3.5" />
                <span className="font-semibold text-foreground">{teamSize}</span> members
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Target className="w-3.5 h-3.5" />
                <span className="font-semibold text-foreground">{milestonesCompleted}/{totalMilestones}</span> milestones
              </span>
            </div>
          </div>

          {/* Funding Info */}
          {(fundingRaised || investorCount) && (
            <motion.div 
              className="flex items-center justify-between py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-600">Funding</span>
                {fundingRaised && (
                  <span className="text-lg font-bold text-emerald-600">{fundingRaised}</span>
                )}
              </div>
              {investorCount && (
                <span className="text-xs text-emerald-600/70">
                  {investorCount} investors
                </span>
              )}
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full gap-1.5 bg-white/50 hover:bg-white/80 transition-all"
                onClick={() => onViewDetails?.(id)}
              >
                View Details
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Button>
            </motion.div>
            <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                size="sm" 
                className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white border-0 shadow-lg shadow-violet-500/25 transition-all"
                onClick={() => onConnect?.(id)}
              >
                Connect
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

