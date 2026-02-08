import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Rocket, 
  Users, 
  TrendingUp,
  ArrowLeft,
  Briefcase
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDemoAuth, UserRole } from "@/lib/demoAuth";

const roleConfig = {
  founder: {
    title: "Founder",
    icon: Rocket,
    color: "text-founder",
    bgColor: "bg-founder/10",
    borderColor: "border-founder",
    description: "Build your startup and connect with investors",
  },
  team: {
    title: "Team Member",
    icon: Users,
    color: "text-team",
    bgColor: "bg-team/10",
    borderColor: "border-team",
    description: "Join a startup and track your contributions",
  },
  investor: {
    title: "Investor",
    icon: TrendingUp,
    color: "text-investor",
    bgColor: "bg-investor/10",
    borderColor: "border-investor",
    description: "Discover startups and track your portfolio",
  },
};

export default function Auth() {
  const [searchParams] = useSearchParams();
  const initialRole = (searchParams.get("role") as UserRole) || "founder";
  const navigate = useNavigate();
  const { signIn } = useDemoAuth();
  
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  
  const config = roleConfig[selectedRole];
  const Icon = config.icon;

  const handleDemoSignIn = (role: UserRole) => {
    signIn(role);
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-investor/10 blur-3xl" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12">
          <Link to="/" className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
              <Rocket className="w-6 h-6 text-accent-foreground" />
            </div>
FoundersPath
          </Link>

          <div className="max-w-md text-center">
            <h1 className="font-display text-4xl font-bold text-white mb-4">
              Welcome to the Future of Startup Operations
            </h1>
            <p className="text-white/70 text-lg">
              Build, execute, and fund your startup journey with real-time collaboration 
              and transparent investor connections.
            </p>
          </div>

          <div className="mt-12 relative w-full max-w-sm">
            <div className="glass-dark rounded-2xl p-4 absolute -left-8 top-0 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Growth Rate</p>
                  <p className="text-success text-lg font-bold">+127%</p>
                </div>
              </div>
            </div>
            
            <div className="glass-dark rounded-2xl p-4 absolute right-0 top-16 animate-float" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Startups</p>
                  <p className="text-accent text-lg font-bold">150+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - Auth form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Demo Mode Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <p className="text-amber-800 text-sm">
              <strong>Demo Mode:</strong> This is a preview. Click any role below to explore with sample data.
            </p>
          </div>

          <div className="mb-8">
            <div className="text-sm text-muted-foreground mb-3 block">Select your role</div>
            <div className="flex gap-2">
              {(Object.keys(roleConfig) as UserRole[]).map((role) => {
                const cfg = roleConfig[role];
                const RoleIcon = cfg.icon;
                const isSelected = selectedRole === role;
                return (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`flex-1 p-3 rounded-xl border-2 transition-all ${
                      isSelected 
                        ? `${cfg.borderColor} ${cfg.bgColor}` 
                        : "border-border hover:border-muted-foreground/30"
                    }`}
                  >
                    <RoleIcon className={`w-5 h-5 mx-auto mb-1 ${isSelected ? cfg.color : "text-muted-foreground"}`} />
                    <span className={`text-xs font-medium block ${isSelected ? cfg.color : "text-muted-foreground"}`}>
                      {cfg.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-8">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bgColor} mb-4`}>
              <Icon className={`w-4 h-4 ${config.color}`} />
              <span className={`text-sm font-medium ${config.color}`}>{config.title}</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Try Demo Mode
            </h2>
            <p className="text-muted-foreground">
              Jump in with pre-loaded sample data
            </p>
          </div>

          {/* Demo Mode Quick Access */}
          <div className="space-y-4">
            <Button 
              onClick={() => handleDemoSignIn(selectedRole)}
              className="w-full h-12 text-lg"
              size="lg"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Enter as {config.title} (Demo)
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              No sign-in required for demo mode
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

