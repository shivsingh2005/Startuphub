import { 
  Briefcase, 
  BarChart3, 
  Users2, 
  Send, 
  Target, 
  CheckCircle2,
  TrendingUp,
  Eye
} from "lucide-react";

const features = [
  {
    icon: Briefcase,
    title: "Startup Management",
    description: "Create your startup profile, define your vision, and build your team. Everything in one place.",
    color: "text-founder",
    bgColor: "bg-founder/10",
  },
  {
    icon: Target,
    title: "Task & Milestone Tracking",
    description: "Break down your roadmap into actionable tasks. Track progress with visual milestones.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: BarChart3,
    title: "Execution Analytics",
    description: "Real-time metrics on task completion, team velocity, and milestone achievement.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Users2,
    title: "Team Collaboration",
    description: "Invite team members, assign tasks, and track individual contributions.",
    color: "text-team",
    bgColor: "bg-team/10",
  },
  {
    icon: Send,
    title: "Pitch to Investors",
    description: "Send pitch requests to matched investors. Show your execution, not just your slides.",
    color: "text-investor",
    bgColor: "bg-investor/10",
  },
  {
    icon: Eye,
    title: "Investor Dashboard",
    description: "Investors can track portfolio startups, monitor progress, and discover new opportunities.",
    color: "text-info",
    bgColor: "bg-info/10",
  },
];

const workflow = [
  {
    step: "01",
    title: "Founders Build",
    description: "Create your startup, add team, define milestones and tasks",
    icon: Briefcase,
  },
  {
    step: "02", 
    title: "Teams Execute",
    description: "Complete tasks, hit milestones, generate real progress data",
    icon: CheckCircle2,
  },
  {
    step: "03",
    title: "Founders Pitch",
    description: "Filter investors by stage, domain, and send pitch requests",
    icon: Send,
  },
  {
    step: "04",
    title: "Investors Track",
    description: "Monitor real execution data, not just promises",
    icon: TrendingUp,
  },
];

export function Features() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Build & Fund
          </h2>
          <p className="text-muted-foreground text-lg">
            From idea to investment, FoundersPath provides the complete toolkit for 
            founders, teams, and investors.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Workflow section */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              The FoundersPath Flow
            </h2>
            <p className="text-muted-foreground text-lg">
              A complete founder → investor workflow that shows real execution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflow.map((item, index) => (
              <div key={item.step} className="relative">
                {/* Connector line */}
                {index < workflow.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-accent/50 to-transparent z-0" />
                )}
                
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 border-2 border-accent/30 mb-4">
                    <span className="font-display text-xl font-bold text-accent">{item.step}</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
