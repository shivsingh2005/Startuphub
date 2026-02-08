import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MarketplaceLayout } from "@/components/layout/MarketplaceLayout";
import { StartupCard } from "@/components/marketplace/StartupCard";
import { FundingActivity } from "@/components/marketplace/FundingActivity";
import { TopStartups } from "@/components/marketplace/TopStartups";
import { DomainFilter } from "@/components/marketplace/DomainFilter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Rocket,
  TrendingUp,
  Users,
  Building2,
  ArrowRight,
  Sparkles,
  Search,
  Zap,
  TrendingUp as TrendingUpIcon,
  Globe,
} from "lucide-react";

// Mock data for startups
const allStartups = [
  {
    id: "1",
    name: "TechFlow AI",
    description: "AI-powered workflow automation for modern teams. Streamline your operations with intelligent task management.",
    domain: "saas",
    stage: "growth" as const,
    executionScore: 92,
    validationScore: 88,
    teamSize: 12,
    milestonesCompleted: 15,
    totalMilestones: 18,
    location: "Bangalore, India",
    foundedDate: "2022",
    fundingRaised: "₹2.5Cr",
    investorCount: 4,
  },
  {
    id: "2",
    name: "EduSpark",
    description: "Personalized learning platform using AI to adapt to each student's unique learning style and pace.",
    domain: "edtech",
    stage: "growth" as const,
    executionScore: 88,
    validationScore: 85,
    teamSize: 18,
    milestonesCompleted: 12,
    totalMilestones: 15,
    location: "Mumbai, India",
    foundedDate: "2021",
    fundingRaised: "₹4Cr",
    investorCount: 6,
  },
  {
    id: "3",
    name: "HealthBridge",
    description: "Telemedicine platform connecting patients with specialists across India. 24/7 healthcare access.",
    domain: "health",
    stage: "mvp" as const,
    executionScore: 78,
    validationScore: 82,
    teamSize: 8,
    milestonesCompleted: 6,
    totalMilestones: 12,
    location: "Delhi, India",
    foundedDate: "2023",
    fundingRaised: "₹1.2Cr",
    investorCount: 3,
  },
  {
    id: "4",
    name: "FinanceHub",
    description: "AI-powered personal finance assistant for millennials. Budget, invest, and save smarter.",
    domain: "fintech",
    stage: "mvp" as const,
    executionScore: 85,
    validationScore: 79,
    teamSize: 6,
    milestonesCompleted: 5,
    totalMilestones: 10,
    location: "Hyderabad, India",
    foundedDate: "2023",
    fundingRaised: "₹80L",
    investorCount: 2,
  },
  {
    id: "5",
    name: "GreenLogistics",
    description: "Sustainable last-mile delivery platform using electric vehicles and optimized routing.",
    domain: "logistics",
    stage: "growth" as const,
    executionScore: 90,
    validationScore: 87,
    teamSize: 25,
    milestonesCompleted: 20,
    totalMilestones: 25,
    location: "Pune, India",
    foundedDate: "2020",
    fundingRaised: "₹6Cr",
    investorCount: 5,
  },
  {
    id: "6",
    name: "DataMind",
    description: "No-code AI platform for businesses to build and deploy machine learning models.",
    domain: "ai",
    stage: "scale" as const,
    executionScore: 94,
    validationScore: 91,
    teamSize: 32,
    milestonesCompleted: 28,
    totalMilestones: 30,
    location: "Bangalore, India",
    foundedDate: "2019",
    fundingRaised: "₹12Cr",
    investorCount: 8,
  },
  {
    id: "7",
    name: "ShopEase",
    description: "Social commerce platform enabling small businesses to sell through WhatsApp and Instagram.",
    domain: "ecommerce",
    stage: "growth" as const,
    executionScore: 86,
    validationScore: 84,
    teamSize: 15,
    milestonesCompleted: 14,
    totalMilestones: 18,
    location: "Chennai, India",
    foundedDate: "2021",
    fundingRaised: "₹3.5Cr",
    investorCount: 4,
  },
  {
    id: "8",
    name: "GameVerse",
    description: "Cloud gaming platform bringing high-end gaming to low-end devices across India.",
    domain: "gaming",
    stage: "mvp" as const,
    executionScore: 81,
    validationScore: 77,
    teamSize: 10,
    milestonesCompleted: 4,
    totalMilestones: 12,
    location: "Mumbai, India",
    foundedDate: "2023",
    fundingRaised: "₹1.5Cr",
    investorCount: 3,
  },
  {
    id: "9",
    name: "SolarGrid",
    description: "Smart solar energy management system for residential and commercial buildings.",
    domain: "cleantech",
    stage: "growth" as const,
    executionScore: 89,
    validationScore: 86,
    teamSize: 14,
    milestonesCompleted: 16,
    totalMilestones: 20,
    location: "Ahmedabad, India",
    foundedDate: "2020",
    fundingRaised: "₹5Cr",
    investorCount: 5,
  },
  {
    id: "10",
    name: "MelodyBox",
    description: "AI music composition tool for content creators and independent artists.",
    domain: "entertainment",
    stage: "idea" as const,
    executionScore: 72,
    validationScore: 68,
    teamSize: 4,
    milestonesCompleted: 2,
    totalMilestones: 8,
    location: "Kolkata, India",
    foundedDate: "2024",
    fundingRaised: "₹30L",
    investorCount: 1,
  },
  {
    id: "11",
    name: "WorkFlow Pro",
    description: "Enterprise project management suite with advanced analytics and team collaboration.",
    domain: "enterprise",
    stage: "scale" as const,
    executionScore: 93,
    validationScore: 89,
    teamSize: 45,
    milestonesCompleted: 35,
    totalMilestones: 40,
    location: "Bangalore, India",
    foundedDate: "2018",
    fundingRaised: "₹18Cr",
    investorCount: 10,
  },
  {
    id: "12",
    name: "PaySmart",
    description: "UPI-based payment solution for rural India with voice-enabled transactions.",
    domain: "fintech",
    stage: "growth" as const,
    executionScore: 87,
    validationScore: 83,
    teamSize: 22,
    milestonesCompleted: 18,
    totalMilestones: 22,
    location: "Jaipur, India",
    foundedDate: "2021",
    fundingRaised: "₹7Cr",
    investorCount: 6,
  },
];

// Mock data for funding activities
const fundingActivities = [
  {
    id: "1",
    startupName: "TechFlow AI",
    startupDomain: "SaaS",
    investorName: "Sequoia India",
    investorType: "VC" as const,
    amount: "₹5Cr",
    stage: "Series A" as const,
    date: "2 days ago",
  },
  {
    id: "2",
    startupName: "HealthBridge",
    startupDomain: "Health",
    investorName: "Angel Network Delhi",
    investorType: "Angel" as const,
    amount: "₹1.5Cr",
    stage: "Seed" as const,
    date: "3 days ago",
  },
  {
    id: "3",
    startupName: "DataMind",
    startupDomain: "AI/ML",
    investorName: "Accel Partners",
    investorType: "VC" as const,
    amount: "₹8Cr",
    stage: "Series B" as const,
    date: "5 days ago",
  },
  {
    id: "4",
    startupName: "GreenLogistics",
    startupDomain: "Logistics",
    investorName: "Blume Ventures",
    investorType: "VC" as const,
    amount: "₹3Cr",
    stage: "Series A" as const,
    date: "1 week ago",
  },
  {
    id: "5",
    startupName: "EduSpark",
    startupDomain: "Edtech",
    investorName: "Ratan Tata",
    investorType: "Angel" as const,
    amount: "₹2Cr",
    stage: "Seed" as const,
    date: "1 week ago",
  },
];

// Mock data for top startups
const weeklyTopStartups = [
  {
    id: "1",
    rank: 1,
    name: "DataMind",
    domain: "AI/ML",
    stage: "scale",
    executionScore: 94,
    validationScore: 91,
    growthRate: 28,
    fundingRaised: "₹12Cr",
    teamSize: 32,
    milestonesCompleted: 28,
    totalMilestones: 30,
    trending: true,
  },
  {
    id: "2",
    rank: 2,
    name: "TechFlow AI",
    domain: "SaaS",
    stage: "growth",
    executionScore: 92,
    validationScore: 88,
    growthRate: 24,
    fundingRaised: "₹2.5Cr",
    teamSize: 12,
    milestonesCompleted: 15,
    totalMilestones: 18,
    trending: true,
  },
  {
    id: "3",
    rank: 3,
    name: "GreenLogistics",
    domain: "Logistics",
    stage: "growth",
    executionScore: 90,
    validationScore: 87,
    growthRate: 19,
    fundingRaised: "₹6Cr",
    teamSize: 25,
    milestonesCompleted: 20,
    totalMilestones: 25,
    trending: false,
  },
  {
    id: "4",
    rank: 4,
    name: "SolarGrid",
    domain: "Cleantech",
    stage: "growth",
    executionScore: 89,
    validationScore: 86,
    growthRate: 17,
    fundingRaised: "₹5Cr",
    teamSize: 14,
    milestonesCompleted: 16,
    totalMilestones: 20,
    trending: false,
  },
  {
    id: "5",
    rank: 5,
    name: "EduSpark",
    domain: "Edtech",
    stage: "growth",
    executionScore: 88,
    validationScore: 85,
    growthRate: 15,
    fundingRaised: "₹4Cr",
    teamSize: 18,
    milestonesCompleted: 12,
    totalMilestones: 15,
    trending: false,
  },
];

const yearlyTopStartups = [
  {
    id: "1",
    rank: 1,
    name: "WorkFlow Pro",
    domain: "Enterprise",
    stage: "scale",
    executionScore: 93,
    validationScore: 89,
    growthRate: 156,
    fundingRaised: "₹18Cr",
    teamSize: 45,
    milestonesCompleted: 35,
    totalMilestones: 40,
    trending: true,
  },
  {
    id: "2",
    rank: 2,
    name: "DataMind",
    domain: "AI/ML",
    stage: "scale",
    executionScore: 94,
    validationScore: 91,
    growthRate: 142,
    fundingRaised: "₹12Cr",
    teamSize: 32,
    milestonesCompleted: 28,
    totalMilestones: 30,
    trending: true,
  },
  {
    id: "3",
    rank: 3,
    name: "PaySmart",
    domain: "Fintech",
    stage: "growth",
    executionScore: 87,
    validationScore: 83,
    growthRate: 98,
    fundingRaised: "₹7Cr",
    teamSize: 22,
    milestonesCompleted: 18,
    totalMilestones: 22,
    trending: false,
  },
  {
    id: "4",
    rank: 4,
    name: "GreenLogistics",
    domain: "Logistics",
    stage: "growth",
    executionScore: 90,
    validationScore: 87,
    growthRate: 87,
    fundingRaised: "₹6Cr",
    teamSize: 25,
    milestonesCompleted: 20,
    totalMilestones: 25,
    trending: false,
  },
  {
    id: "5",
    rank: 5,
    name: "SolarGrid",
    domain: "Cleantech",
    stage: "growth",
    executionScore: 89,
    validationScore: 86,
    growthRate: 76,
    fundingRaised: "₹5Cr",
    teamSize: 14,
    milestonesCompleted: 16,
    totalMilestones: 20,
    trending: false,
  },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  }
};

export default function Marketplace() {
  const [searchParams] = useSearchParams();
  const userRole = (searchParams.get("role") as "founder" | "investor" | "team") || "founder";
  
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);

  // Filter startups based on domain and search
  const filteredStartups = useMemo(() => {
    return allStartups.filter((startup) => {
      const matchesDomain = selectedDomain ? startup.domain === selectedDomain : true;
      const matchesSearch = searchQuery
        ? startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          startup.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          startup.domain.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesDomain && matchesSearch;
    });
  }, [selectedDomain, searchQuery]);

  const displayedStartups = filteredStartups.slice(0, visibleCount);
  const hasMore = visibleCount < filteredStartups.length;

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, filteredStartups.length));
  };

  return (
    <MarketplaceLayout userRole={userRole}>
      <motion.div 
        className="space-y-8"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* 🌟 Hero Section - Premium Glass */}
        <motion.div 
          variants={fadeInUp}
          className="relative overflow-hidden rounded-3xl glass-card p-8 lg:p-10"
        >
          {/* Animated glow orbs */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-fuchsia-400/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
          
          <div className="relative z-10">
            <motion.div 
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="badge-premium flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Premium Marketplace
              </span>
            </motion.div>
            
            <motion.h1 
              className="font-display text-4xl lg:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-gradient-premium">Discover Amazing</span>
              <br />
              <span className="text-foreground">Startups</span>
            </motion.h1>
            
            <motion.p 
              className="text-muted-foreground text-lg max-w-2xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Explore innovative startups across different domains. Track funding activities 
              and discover the next big thing in India's startup ecosystem.
            </motion.p>
            
            {/* Premium Stats Cards */}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { icon: Building2, value: "150+", label: "Startups", color: "text-violet-500", bg: "bg-violet-500/10" },
                { icon: TrendingUpIcon, value: "₹50Cr+", label: "Funding Raised", color: "text-emerald-500", bg: "bg-emerald-500/10" },
                { icon: Users, value: "200+", label: "Investors", color: "text-blue-500", bg: "bg-blue-500/10" },
                { icon: Globe, value: "12", label: "Domains", color: "text-amber-500", bg: "bg-amber-500/10" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="glass-panel px-5 py-4 flex items-center gap-3 hover-lift"
                  whileHover={{ scale: 1.02 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Startups Listing */}
          <div className="lg:col-span-2 space-y-6">
            {/* Premium Glass Filter Bar */}
            <motion.div variants={fadeInUp}>
              <div className="glass-card p-4">
                <DomainFilter
                  selectedDomain={selectedDomain}
                  onDomainChange={setSelectedDomain}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  totalStartups={allStartups.length}
                  filteredCount={filteredStartups.length}
                />
              </div>
            </motion.div>

            {/* Startups Grid */}
            <motion.div variants={fadeInUp}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
                    <Rocket className="w-5 h-5 text-violet-500" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      {selectedDomain 
                        ? `${selectedDomain.charAt(0).toUpperCase() + selectedDomain.slice(1)} Startups`
                        : "All Startups"
                      }
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {filteredStartups.length} found
                    </p>
                  </div>
                </div>
                <Badge className="badge-premium">
                  {displayedStartups.length} of {filteredStartups.length}
                </Badge>
              </div>

              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                variants={staggerContainer}
              >
                {displayedStartups.map((startup, index) => (
                  <motion.div
                    key={startup.id}
                    variants={cardVariants}
                    whileHover={{ y: -4 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <StartupCard
                      {...startup}
                      onViewDetails={(id) => console.log("View details:", id)}
                      onConnect={(id) => console.log("Connect:", id)}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Load More Button */}
              {hasMore && (
                <motion.div 
                  className="flex justify-center mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      variant="outline" 
                      size="lg" 
                      onClick={loadMore}
                      className="glass-panel px-8 hover:bg-white/60 transition-all gap-2"
                    >
                      <Zap className="w-4 h-4" />
                      Load More
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </motion.div>
              )}

              {filteredStartups.length === 0 && (
                <motion.div 
                  className="text-center py-16 glass-card"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-medium text-foreground mb-2">No startups found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search query</p>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Funding & Top Startups */}
          <div className="space-y-6">
            {/* Funding Activity */}
            <motion.div variants={fadeInUp}>
              <div className="glass-card p-5">
                <FundingActivity
                  activities={fundingActivities}
                  onViewAll={() => console.log("View all funding")}
                />
              </div>
            </motion.div>

            {/* Top Startups */}
            <motion.div variants={fadeInUp}>
              <div className="glass-card p-5">
                <TopStartups
                  weeklyStartups={weeklyTopStartups}
                  yearlyStartups={yearlyTopStartups}
                  onViewAll={() => console.log("View all top startups")}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </MarketplaceLayout>
  );
}

