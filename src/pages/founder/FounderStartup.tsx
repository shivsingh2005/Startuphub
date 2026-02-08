import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FounderLayout } from "@/components/layout/FounderLayout";
import { supabase } from "../../supabaseClient";
import { useUser } from "@clerk/clerk-react";
import { 
  Rocket, 
  Building2, 
  Target, 
  Users, 
  TrendingUp, 
  Edit2, 
  Save, 
  Copy, 
  CheckCircle2,
  Globe, 
  Calendar, 
  Briefcase, 
  Link as LinkIcon, 
  Share2,
  Download,
  Loader2,
} from "lucide-react";

const domainOptions = ["SaaS", "Fintech", "Edtech", "Health", "E-commerce", "AI/ML", "Logistics", "Cleantech"];
const stageOptions = [
  { value: "idea", label: "Idea Stage", description: "Concept validation and market research" },
  { value: "mvp", label: "MVP", description: "Minimum viable product built" },
  { value: "growth", label: "Growth", description: "Product-market fit achieved, scaling" },
  { value: "scale", label: "Scale", description: "Rapid expansion and market dominance" },
];

export default function FounderStartup() {
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const [startupData, setStartupData] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    // Load startup data from Supabase and localStorage
    const loadStartupData = async () => {
      try {
        // First, try to load from Supabase
        if (user) {
          const { data: supabaseData, error } = await supabase
            .from('startups')
            .select('*')
            .eq('founder_id', user.id)
            .single();

          if (supabaseData && !error) {
            // Map Supabase field names to app field names
            const mappedData = {
              id: supabaseData.id,
              name: supabaseData.name,
              tagline: supabaseData.tagline,
              description: supabaseData.description,
              domain: supabaseData.domain,
              stage: supabaseData.stage,
              foundedDate: supabaseData.founded_date,
              location: supabaseData.location,
              website: supabaseData.website,
              linkedin: supabaseData.linkedin,
              teamSize: supabaseData.team_size,
              lookingFor: supabaseData.looking_for,
              teamId: supabaseData.team_id,
              executionScore: supabaseData.execution_score,
              validationScore: supabaseData.validation_score,
              founderId: supabaseData.founder_id,
              createdAt: supabaseData.created_at,
            };
            setStartupData(mappedData);
            setFormData(mappedData);
            return;
          }
        }

        // Fallback to localStorage
        let data = localStorage.getItem(`startups_${user?.id}`);
        
        if (!data) {
          const allStartups = JSON.parse(localStorage.getItem("startups") || "[]");
          data = allStartups.find((s: any) => s.founderId === user?.id);
        }

        if (data) {
          setStartupData(data);
          setFormData(data);
        }
      } catch (error) {
        console.error("Error loading startup data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadStartupData();
    }
  }, [user]);

  const handleCopyTeamId = () => {
    if (startupData?.teamId) {
      navigator.clipboard.writeText(startupData.teamId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = async () => {
    setIsEditing(false);
    
    const updatedData = {
      ...formData,
      founded_date: formData.foundedDate,
      team_size: formData.teamSize,
      looking_for: formData.lookingFor,
      team_id: formData.teamId,
      execution_score: formData.executionScore,
      validation_score: formData.validationScore,
      updated_at: new Date().toISOString(),
    };
    
    // Remove camelCase fields that don't match Supabase
    delete updatedData.foundedDate;
    delete updatedData.teamSize;
    delete updatedData.lookingFor;
    delete updatedData.teamId;
    delete updatedData.executionScore;
    delete updatedData.validationScore;
    
    try {
      // Try to update in Supabase
      const { error: supabaseError } = await supabase
        .from('startups')
        .update(updatedData)
        .eq('founder_id', user?.id);

      if (supabaseError) {
        console.error("Supabase update error:", supabaseError);
      }
    } catch (error) {
      console.error("Error updating in Supabase:", error);
    }
    
    // Also update localStorage as backup
    const localData = { ...formData };
    localStorage.setItem(`startups_${user?.id}`, JSON.stringify(localData));
    
    const allStartups = JSON.parse(localStorage.getItem("startups") || "[]");
    const index = allStartups.findIndex((s: any) => s.founderId === user?.id);
    if (index >= 0) {
      allStartups[index] = localData;
    } else {
      allStartups.push(localData);
    }
    localStorage.setItem("startups", JSON.stringify(allStartups));
    
    setStartupData(formData);
    console.log("Saved startup data");
  };

  if (loading) {
    return (
      <FounderLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      </FounderLayout>
    );
  }

  // Show empty state if no startup exists
  if (!startupData) {
    return (
      <FounderLayout>
        <div className="p-6 lg:p-8">
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-founder/10 flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-founder" />
              </div>
              <CardTitle className="font-display text-xl">No Startup Found</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                You haven't created a startup profile yet. Create one to get started!
              </p>
              <Button asChild className="w-full">
                <a href="/founder/onboarding">Create Startup Profile</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </FounderLayout>
    );
  }

  return (
    <FounderLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-2">
              <Building2 className="w-8 h-8 text-founder" />
              My Startup
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your startup profile and settings
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="w-4 h-4" />
              Share Profile
            </Button>
            <Button 
              variant={isEditing ? "default" : "outline"} 
              size="sm" 
              className="gap-1"
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            >
              {isEditing ? (
                <><Save className="w-4 h-4" /> Save Changes</>
              ) : (
                <><Edit2 className="w-4 h-4" /> Edit Profile</>
              )}
            </Button>
          </div>
        </div>

        {/* Startup ID Card */}
        <Card className="bg-gradient-to-r from-founder/5 to-accent/5 border-founder/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-founder/20 flex items-center justify-center">
                  <Rocket className="w-10 h-10 text-founder" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground">{startupData.name}</h2>
                  <p className="text-muted-foreground">{startupData.tagline}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">{startupData.domain}</Badge>
                    <Badge variant="founder" className="capitalize">{startupData.stage}</Badge>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-lg border border-border">
                  <span className="text-sm text-muted-foreground">Team ID:</span>
                  <span className="font-mono font-medium">{startupData.teamId}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 px-2"
                    onClick={handleCopyTeamId}
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Share this ID to invite team members</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-founder" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Startup Name</label>
                    {isEditing ? (
                      <Input 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    ) : (
                      <p className="text-muted-foreground">{formData.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Tagline</label>
                    {isEditing ? (
                      <Input 
                        value={formData.tagline}
                        onChange={(e) => setFormData({...formData, tagline: e.target.value})}
                      />
                    ) : (
                      <p className="text-muted-foreground">{formData.tagline}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Description</label>
                  {isEditing ? (
                    <textarea 
                      className="w-full min-h-[100px] p-3 rounded-md border border-input bg-background text-sm"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  ) : (
                    <p className="text-muted-foreground">{formData.description}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Domain</label>
                    {isEditing ? (
                      <select 
                        className="w-full h-10 px-3 rounded-md border border-input bg-background"
                        value={formData.domain}
                        onChange={(e) => setFormData({...formData, domain: e.target.value})}
                      >
                        {domainOptions.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    ) : (
                      <p className="text-muted-foreground">{formData.domain}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Stage</label>
                    {isEditing ? (
                      <select 
                        className="w-full h-10 px-3 rounded-md border border-input bg-background"
                        value={formData.stage}
                        onChange={(e) => setFormData({...formData, stage: e.target.value})}
                      >
                        {stageOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                    ) : (
                      <div>
                        <p className="text-muted-foreground capitalize">{formData.stage}</p>
                        <p className="text-xs text-muted-foreground">
                          {stageOptions.find(s => s.value === formData.stage)?.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Online Presence */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <Globe className="w-5 h-5 text-founder" />
                  Online Presence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-1">
                      <Globe className="w-4 h-4" /> Website
                    </label>
                    {isEditing ? (
                      <Input 
                        value={formData.website}
                        onChange={(e) => setFormData({...formData, website: e.target.value})}
                      />
                    ) : (
                      <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-founder hover:underline flex items-center gap-1">
                        {formData.website}
                        <LinkIcon className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-1">
                      <LinkIcon className="w-4 h-4" /> LinkedIn
                    </label>
                    {isEditing ? (
                      <Input 
                        value={formData.linkedin}
                        onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                      />
                    ) : (
                      <a href={formData.linkedin} target="_blank" rel="noopener noreferrer" className="text-founder hover:underline flex items-center gap-1">
                        {formData.linkedin}
                        <LinkIcon className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display text-base">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Founded</span>
                  </div>
                  <span className="text-sm font-medium">
                    {startupData.foundedDate 
                      ? new Date(startupData.foundedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                      : "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Milestones</span>
                  </div>
                  <span className="text-sm font-medium">0/10 Completed</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Team Size</span>
                  </div>
                  <span className="text-sm font-medium">{startupData.teamSize || 1} members</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Execution Score</span>
                  </div>
                  <span className="text-sm font-medium text-success">50%</span>
                </div>
              </CardContent>
            </Card>

            {/* Hiring */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display text-base flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  We're Hiring
                </CardTitle>
              </CardHeader>
              <CardContent>
                {startupData.lookingFor && startupData.lookingFor.length > 0 ? (
                  <div className="space-y-2">
                    {startupData.lookingFor.map((role: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                        <div className="w-2 h-2 rounded-full bg-success" />
                        <span className="text-sm">{role}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No open positions yet</p>
                )}
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Manage Openings
                </Button>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display text-base">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                  <Download className="w-4 h-4" />
                  Download Pitch Deck
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                  <Share2 className="w-4 h-4" />
                  Public Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </FounderLayout>
  );
}

