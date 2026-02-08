import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "../../supabaseClient";
import { FounderLayout } from "@/components/layout/FounderLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Rocket, ArrowLeft, ArrowRight, Check, Loader2, Building2, Globe, MapPin, Calendar, Link as LinkIcon } from "lucide-react";

const domainOptions = ["SaaS", "Fintech", "Edtech", "Health", "E-commerce", "AI/ML", "Logistics", "Cleantech", "Web3", "Other"];
const stageOptions = [
  { value: "idea", label: "Idea Stage", description: "Concept validation and market research" },
  { value: "mvp", label: "MVP", description: "Minimum viable product built" },
  { value: "growth", label: "Growth", description: "Product-market fit achieved, scaling" },
  { value: "scale", label: "Scale", description: "Rapid expansion and market dominance" },
];

export default function FounderOnboarding() {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    startupName: "",
    tagline: "",
    description: "",
    domain: "",
    stage: "idea",
    website: "",
    linkedin: "",
    location: "",
    foundedDate: "",
  });

  useEffect(() => {
    const checkExistingStartup = async () => {
      if (!isLoaded || !user) return;

      try {
        // Check if user already has a startup in Supabase
        const { data: existingStartup, error } = await supabase
          .from('startups')
          .select('id')
          .eq('founder_id', user.id)
          .single();

        if (existingStartup) {
          // User already has a startup, redirect to startup page
          navigate("/founder/startup");
          return;
        }

        // Also check localStorage as fallback
        const localData = localStorage.getItem(`startups_${user.id}`);
        if (localData) {
          navigate("/founder/startup");
          return;
        }
      } catch (error) {
        // No existing startup found, continue with onboarding
        console.log("No existing startup found");
      } finally {
        setLoading(false);
      }
    };

    checkExistingStartup();
  }, [user, isLoaded, navigate]);

  const handleSubmit = async () => {
    if (!user) return;
    
    setSaving(true);
    
    try {
      // Generate team ID
      const teamId = `TF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      
      // Create startup data object
      const startup = {
        name: formData.startupName,
        tagline: formData.tagline,
        description: formData.description,
        domain: formData.domain,
        stage: formData.stage,
        founded_date: formData.foundedDate || new Date().toISOString().split('T')[0],
        location: formData.location,
        website: formData.website,
        linkedin: formData.linkedin,
        team_size: 1,
        looking_for: [],
        team_id: teamId,
        founder_id: user.id,
        founder_name: user.fullName || user.username || user.primaryEmailAddress?.emailAddress,
        execution_score: 50,
        validation_score: 50,
        created_at: new Date().toISOString(),
      };

      // Save to Supabase
      const { data: supabaseData, error: supabaseError } = await supabase
        .from('startups')
        .insert(startup)
        .select()
        .single();

      if (supabaseError) {
        console.error("Supabase error:", supabaseError);
        // Fallback to localStorage if Supabase fails
        const localStartup = {
          ...startup,
          id: `SF-2024-${Date.now()}`,
        };
        
        // Save to localStorage
        const existingStartups = JSON.parse(localStorage.getItem("startups") || "[]");
        existingStartups.push(localStartup);
        localStorage.setItem("startups", JSON.stringify(existingStartups));
        
        const userStartups = JSON.parse(localStorage.getItem(`startups_${user.id}`) || "[]");
        userStartups.push(localStartup);
        localStorage.setItem(`startups_${user.id}`, JSON.stringify(userStartups));
        
        console.log("Saved to localStorage instead");
      } else {
        console.log("Successfully saved to Supabase:", supabaseData);
      }

      // Navigate to startup page
      navigate("/founder/startup");
      
    } catch (error) {
      console.error("Error saving startup:", error);
      // Save to localStorage as fallback
      const localStartup = {
        ...formData,
        id: `SF-2024-${Date.now()}`,
        team_id: `TF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        founder_id: user.id,
        founder_name: user.fullName || user.username || user.primaryEmailAddress?.emailAddress,
        team_size: 1,
        looking_for: [],
        execution_score: 50,
        validation_score: 50,
        founded_date: formData.foundedDate || new Date().toISOString().split('T')[0],
      };
      
      localStorage.setItem(`startups_${user.id}`, JSON.stringify([localStartup]));
      const existingStartups = JSON.parse(localStorage.getItem("startups") || "[]");
      existingStartups.push(localStartup);
      localStorage.setItem("startups", JSON.stringify(existingStartups));
      
      navigate("/founder/startup");
    } finally {
      setSaving(false);
    }
  };

  if (!isLoaded || loading) {
    return (
      <FounderLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      </FounderLayout>
    );
  }

  return (
    <FounderLayout>
      <div className="min-h-screen bg-background">
        {/* Progress Header */}
        <div className="border-b bg-card/50">
          <div className="max-w-2xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => step > 1 ? setStep(step - 1) : navigate("/")}
                className="gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                {step > 1 ? "Back" : "Skip for now"}
              </Button>
              <span className="text-sm text-muted-foreground">
                Step {step} of 3
              </span>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3].map((s) => (
                <div 
                  key={s}
                  className={`h-2 flex-1 rounded-full transition-colors ${
                    s <= step ? "bg-founder" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-6 py-8">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <Card className="border-0 shadow-none">
              <CardHeader className="px-0 pt-0">
                <div className="w-12 h-12 rounded-xl bg-founder/10 flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-founder" />
                </div>
                <CardTitle className="text-2xl">Tell us about your startup</CardTitle>
                <CardDescription>
                  Start by giving your startup a name and basic details
                </CardDescription>
              </CardHeader>
              <CardContent className="px-0 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="startupName">Startup Name *</Label>
                  <Input
                    id="startupName"
                    placeholder="e.g., TechFlow AI"
                    value={formData.startupName}
                    onChange={(e) => setFormData({...formData, startupName: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline *</Label>
                  <Input
                    id="tagline"
                    placeholder="e.g., AI-powered workflow automation"
                    value={formData.tagline}
                    onChange={(e) => setFormData({...formData, tagline: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what your startup does..."
                    className="min-h-[120px]"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  disabled={!formData.startupName || !formData.tagline || !formData.description}
                  onClick={() => setStep(2)}
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Category & Stage */}
          {step === 2 && (
            <Card className="border-0 shadow-none">
              <CardHeader className="px-0 pt-0">
                <div className="w-12 h-12 rounded-xl bg-founder/10 flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-founder" />
                </div>
                <CardTitle className="text-2xl">Categorize your startup</CardTitle>
                <CardDescription>
                  Help others find your startup by adding details
                </CardDescription>
              </CardHeader>
              <CardContent className="px-0 space-y-6">
                <div className="space-y-2">
                  <Label>Domain/Industry *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {domainOptions.map((domain) => (
                      <button
                        key={domain}
                        type="button"
                        onClick={() => setFormData({...formData, domain})}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                          formData.domain === domain
                            ? "border-founder bg-founder/10 text-founder"
                            : "border-border hover:border-muted-foreground/30"
                        }`}
                      >
                        {domain}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Stage *</Label>
                  <div className="grid gap-3">
                    {stageOptions.map((stage) => (
                      <button
                        key={stage.value}
                        type="button"
                        onClick={() => setFormData({...formData, stage: stage.value})}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          formData.stage === stage.value
                            ? "border-founder bg-founder/10"
                            : "border-border hover:border-muted-foreground/30"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{stage.label}</span>
                          {formData.stage === stage.value && (
                            <Check className="w-4 h-4 text-founder" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{stage.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1" 
                    size="lg"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button 
                    className="flex-1" 
                    size="lg"
                    disabled={!formData.domain || !formData.stage}
                    onClick={() => setStep(3)}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Additional Info */}
          {step === 3 && (
            <Card className="border-0 shadow-none">
              <CardHeader className="px-0 pt-0">
                <div className="w-12 h-12 rounded-xl bg-founder/10 flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-founder" />
                </div>
                <CardTitle className="text-2xl">Additional Details</CardTitle>
                <CardDescription>
                  Add your online presence and location (optional)
                </CardDescription>
              </CardHeader>
              <CardContent className="px-0 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website" className="flex items-center gap-2">
                      <Globe className="w-4 h-4" /> Website
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://yourstartup.com"
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedin" className="flex items-center gap-2">
                      <LinkIcon className="w-4 h-4" /> LinkedIn
                    </Label>
                    <Input
                      id="linkedin"
                      type="url"
                      placeholder="https://linkedin.com/company/..."
                      value={formData.linkedin}
                      onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Location
                    </Label>
                    <Input
                      id="location"
                      placeholder="e.g., Bangalore, India"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="foundedDate" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Founded Date
                    </Label>
                    <Input
                      id="foundedDate"
                      type="date"
                      value={formData.foundedDate}
                      onChange={(e) => setFormData({...formData, foundedDate: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1" 
                    size="lg"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </Button>
                  <Button 
                    className="flex-1" 
                    size="lg"
                    disabled={saving}
                    onClick={handleSubmit}
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        Complete Setup
                        <Check className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </FounderLayout>
  );
}

