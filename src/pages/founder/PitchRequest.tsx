import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FounderLayout } from "@/components/layout/FounderLayout";
import {
  Search,
  Filter,
  Send,
  Building2,
  TrendingUp,
  Target,
  DollarSign,
  CheckCircle2,
  Users,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock investor directory data
const investorDirectory = [
  {
    id: "1",
    name: "Acme Ventures",
    type: "VC",
    preferredStage: "mvp",
    preferredDomain: ["SaaS", "Fintech"],
    ticketSize: "₹25L - ₹1Cr",
    location: "Mumbai",
    portfolio: 24,
  },
  {
    id: "2",
    name: "Angel Network India",
    type: "Angel",
    preferredStage: "idea",
    preferredDomain: ["Edtech", "Health"],
    ticketSize: "₹5L - ₹25L",
    location: "Bangalore",
    portfolio: 45,
  },
  {
    id: "3",
    name: "Growth Capital Partners",
    type: "VC",
    preferredStage: "growth",
    preferredDomain: ["SaaS", "E-commerce"],
    ticketSize: "₹1Cr+",
    location: "Delhi",
    portfolio: 18,
  },
  {
    id: "4",
    name: "TechStart Accelerator",
    type: "Accelerator",
    preferredStage: "idea",
    preferredDomain: ["SaaS", "AI/ML"],
    ticketSize: "₹10L - ₹50L",
    location: "Hyderabad",
    portfolio: 60,
  },
  {
    id: "5",
    name: "HealthTech Angels",
    type: "Angel",
    preferredStage: "mvp",
    preferredDomain: ["Health", "Biotech"],
    ticketSize: "₹10L - ₹50L",
    location: "Chennai",
    portfolio: 15,
  },
  {
    id: "6",
    name: "EduFund Partners",
    type: "VC",
    preferredStage: "growth",
    preferredDomain: ["Edtech"],
    ticketSize: "₹50L - ₹2Cr",
    location: "Pune",
    portfolio: 12,
  },
];

const filterOptions = {
  type: ["Angel", "VC", "Mentor", "Accelerator"],
  stage: ["Idea", "MVP", "Growth"],
  domain: ["SaaS", "Fintech", "Edtech", "Health", "E-commerce", "AI/ML"],
  ticketSize: ["₹1L - ₹5L", "₹5L - ₹25L", "₹25L - ₹1Cr", "₹1Cr+"],
};

// Demo startup data for pitch generator
const demoStartupData = {
  name: "TechFlow AI",
  tagline: "AI-powered workflow automation for startups",
  domain: "SaaS",
  stage: "mvp",
  description: "TechFlow AI is an intelligent workflow automation platform that helps startups streamline their operations using advanced AI. We reduce operational costs by 60% on average.",
  executionScore: 78,
  validationScore: 85,
  teamSize: 5,
  milestonesCompleted: 6,
  totalMilestones: 10,
  foundedDate: "2024-01-15",
  location: "Bangalore, India",
};

// Generate pitch based on startup data
const generatePitch = (startup: typeof demoStartupData) => {
  return `
# ${startup.name} - Pitch Deck

## The Problem
Startups struggle with operational inefficiencies, spending 60% of their time on manual workflows instead of growth activities.

## Our Solution
${startup.name} is an AI-powered workflow automation platform that:
- Uses advanced AI to streamline operations
- Reduces operational costs by 60%
- Automates repetitive tasks
- Provides real-time execution analytics

## Market Opportunity
- $50B+ market for startup operations software
- 40% YoY growth in workflow automation adoption
- Increasing demand for AI-powered solutions

## Traction
- MVP launched on ${new Date(startup.foundedDate).toLocaleDateString()}
- ${startup.milestonesCompleted}/${startup.totalMilestones} milestones completed
- ${startup.teamSize} team members
- ${startup.executionScore}% execution score
- ${startup.validationScore}% validation score

## Ask
We're raising ₹50L to accelerate product development and expand our market reach in the ${startup.domain} space.

## Team
Our team of ${startup.teamSize} members is based in ${startup.location}, bringing expertise in AI, product development, and startup operations.
  `.trim();
};

export default function PitchRequest() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInvestors, setSelectedInvestors] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    type: [] as string[],
    stage: [] as string[],
    domain: [] as string[],
  });
  const [generatedPitch, setGeneratedPitch] = useState("");
  const [isGeneratingPitch, setIsGeneratingPitch] = useState(false);

  const toggleInvestor = (id: string) => {
    setSelectedInvestors(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const toggleFilter = (category: keyof typeof activeFilters, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value]
    }));
  };

  const filteredInvestors = investorDirectory.filter(investor => {
    const matchesSearch = investor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = activeFilters.type.length === 0 || activeFilters.type.includes(investor.type);
    const matchesStage = activeFilters.stage.length === 0 || 
      activeFilters.stage.map(s => s.toLowerCase()).includes(investor.preferredStage);
    const matchesDomain = activeFilters.domain.length === 0 ||
      investor.preferredDomain.some(d => activeFilters.domain.includes(d));
    
    return matchesSearch && matchesType && matchesStage && matchesDomain;
  });

  const handleSendPitch = () => {
    if (selectedInvestors.length === 0) {
      toast.error("Please select at least one investor");
      return;
    }
    
    toast.success(`Pitch request sent to ${selectedInvestors.length} investor(s)!`);
    setSelectedInvestors([]);
  };

  const handleGeneratePitch = () => {
    setIsGeneratingPitch(true);
    // Simulate AI generation delay
    setTimeout(() => {
      const pitch = generatePitch(demoStartupData);
      setGeneratedPitch(pitch);
      setIsGeneratingPitch(false);
      toast.success("Pitch generated successfully!");
    }, 1500);
  };

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(generatedPitch);
    toast.success("Pitch copied to clipboard!");
  };

  return (
    <FounderLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Send Pitch Request
            </h1>
            <p className="text-muted-foreground mt-1">
              Find and connect with investors that match your startup
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  Pitch Generator
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accent" />
                    AI Pitch Generator
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <p className="text-muted-foreground text-sm">
                    Generate a professional pitch deck based on your startup data.
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg border border-border">
                    <h4 className="font-medium text-sm mb-2">Startup Data Used:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <p><strong>Name:</strong> {demoStartupData.name}</p>
                      <p><strong>Domain:</strong> {demoStartupData.domain}</p>
                      <p><strong>Stage:</strong> {demoStartupData.stage}</p>
                      <p><strong>Location:</strong> {demoStartupData.location}</p>
                      <p><strong>Team:</strong> {demoStartupData.teamSize} members</p>
                      <p><strong>Exec. Score:</strong> {demoStartupData.executionScore}%</p>
                    </div>
                  </div>
                  <Button 
                    onClick={handleGeneratePitch} 
                    className="w-full gap-2"
                    disabled={isGeneratingPitch}
                  >
                    {isGeneratingPitch ? (
                      <>
                        <Sparkles className="w-4 h-4 animate-pulse" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Generate Pitch
                      </>
                    )}
                  </Button>
                  {generatedPitch && (
                    <div className="space-y-2">
                      <div className="bg-background border border-border rounded-lg p-4 max-h-96 overflow-y-auto">
                        <pre className="whitespace-pre-wrap text-sm">{generatedPitch}</pre>
                      </div>
                      <Button variant="outline" onClick={handleCopyPitch} className="w-full">
                        Copy to Clipboard
                      </Button>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
            <Button 
              variant="founder" 
              className="gap-2"
              onClick={handleSendPitch}
              disabled={selectedInvestors.length === 0}
            >
              <Send className="w-4 h-4" />
              Send to {selectedInvestors.length} Investor{selectedInvestors.length !== 1 ? "s" : ""}
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search investors by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              variant={showFilters ? "secondary" : "outline"} 
              className="gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4" />
              Filters
              {Object.values(activeFilters).flat().length > 0 && (
                <Badge variant="founder" className="ml-1">
                  {Object.values(activeFilters).flat().length}
                </Badge>
              )}
            </Button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Investor Type */}
                  <div>
                    <h4 className="font-medium text-sm text-foreground mb-3">Investor Type</h4>
                    <div className="space-y-2">
                      {filterOptions.type.map((type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                          <Checkbox
                            checked={activeFilters.type.includes(type)}
                            onCheckedChange={() => toggleFilter("type", type)}
                          />
                          <span className="text-sm text-muted-foreground">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Preferred Stage */}
                  <div>
                    <h4 className="font-medium text-sm text-foreground mb-3">Preferred Stage</h4>
                    <div className="space-y-2">
                      {filterOptions.stage.map((stage) => (
                        <label key={stage} className="flex items-center gap-2 cursor-pointer">
                          <Checkbox
                            checked={activeFilters.stage.includes(stage)}
                            onCheckedChange={() => toggleFilter("stage", stage)}
                          />
                          <span className="text-sm text-muted-foreground">{stage}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Preferred Domain */}
                  <div>
                    <h4 className="font-medium text-sm text-foreground mb-3">Preferred Domain</h4>
                    <div className="space-y-2">
                      {filterOptions.domain.map((domain) => (
                        <label key={domain} className="flex items-center gap-2 cursor-pointer">
                          <Checkbox
                            checked={activeFilters.domain.includes(domain)}
                            onCheckedChange={() => toggleFilter("domain", domain)}
                          />
                          <span className="text-sm text-muted-foreground">{domain}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Selected Count */}
        {selectedInvestors.length > 0 && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-founder/10 border border-founder/30">
            <CheckCircle2 className="w-5 h-5 text-founder" />
            <span className="text-foreground font-medium">
              {selectedInvestors.length} investor{selectedInvestors.length !== 1 ? "s" : ""} selected
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedInvestors([])}
              className="ml-auto text-muted-foreground"
            >
              Clear all
            </Button>
          </div>
        )}

        {/* Investor Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredInvestors.map((investor) => {
            const isSelected = selectedInvestors.includes(investor.id);
            return (
              <Card
                key={investor.id}
                className={`bg-card border-2 transition-all cursor-pointer hover:shadow-md ${
                  isSelected
                    ? "border-founder bg-founder/5"
                    : "border-border hover:border-muted-foreground/30"
                }`}
                onClick={() => toggleInvestor(investor.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isSelected ? "bg-founder/20" : "bg-investor/10"
                      }`}>
                        <Building2 className={`w-6 h-6 ${isSelected ? "text-founder" : "text-investor"}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{investor.name}</h3>
                        <Badge variant="outline" className="text-xs mt-1">
                          {investor.type}
                        </Badge>
                      </div>
                    </div>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleInvestor(investor.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Target className="w-4 h-4" />
                      <span>Stage: </span>
                      <Badge variant={investor.preferredStage as "idea" | "mvp" | "growth"} className="capitalize">
                        {investor.preferredStage}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="w-4 h-4" />
                      <span>{investor.ticketSize}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{investor.portfolio} startups in portfolio</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {investor.preferredDomain.map((domain) => (
                        <Badge key={domain} variant="secondary" className="text-xs">
                          {domain}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredInvestors.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No investors match your filters</p>
            <Button
              variant="ghost"
              className="mt-2"
              onClick={() => {
                setActiveFilters({ type: [], stage: [], domain: [] });
                setSearchQuery("");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </FounderLayout>
  );
}

