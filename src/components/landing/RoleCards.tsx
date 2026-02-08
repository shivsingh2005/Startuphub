import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const roles = [
  {
    id: "founder",
    title: "Founder",
    subtitle: "Build & Lead",
    description: "Create your startup, manage your team, track milestones, and pitch to investors with real execution data.",
    icon: Rocket,
    color: "text-founder",
    bgColor: "bg-founder/10",
    borderColor: "border-founder/30",
    hoverBg: "hover:bg-founder/5",
    buttonVariant: "founder" as const,
    features: ["Startup Management", "Team Building", "Milestone Tracking", "Investor Pitching"],
  },
  {
    id: "team",
    title: "Team Member", 
    subtitle: "Execute & Collaborate",
    description: "Join a startup team, complete assigned tasks, track your contributions, and help achieve milestones.",
    icon: Users,
    color: "text-team",
    bgColor: "bg-team/10",
    borderColor: "border-team/30",
    hoverBg: "hover:bg-team/5",
    buttonVariant: "team" as const,
    features: ["Task Management", "Progress Tracking", "Team Collaboration", "Contribution Analytics"],
  },
  {
    id: "investor",
    title: "Investor",
    subtitle: "Discover & Track",
    description: "Find promising startups, review pitch requests, track portfolio performance, and monitor real execution metrics.",
    icon: TrendingUp,
    color: "text-investor",
    bgColor: "bg-investor/10",
    borderColor: "border-investor/30",
    hoverBg: "hover:bg-investor/5",
    buttonVariant: "investor" as const,
    features: ["Startup Discovery", "Pitch Inbox", "Portfolio Tracking", "Execution Insights"],
  },
];

export function RoleCards() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose Your Role
          </h2>
          <p className="text-muted-foreground text-lg">
            Whether you're building, executing, or investing—FoundersPath has you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {roles.map((role, index) => (
            <div
              key={role.id}
              className={`relative group p-8 rounded-3xl bg-card border-2 ${role.borderColor} ${role.hoverBg} transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl ${role.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <role.icon className={`w-8 h-8 ${role.color}`} />
              </div>

              {/* Content */}
              <div className="mb-6">
                <p className={`text-sm font-medium ${role.color} mb-1`}>{role.subtitle}</p>
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                  {role.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {role.description}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-8">
                {role.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className={`w-1.5 h-1.5 rounded-full ${role.bgColor.replace('/10', '')}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link to={`/auth?role=${role.id}`}>
                <Button variant={role.buttonVariant} className="w-full group/btn">
                  Get Started
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
