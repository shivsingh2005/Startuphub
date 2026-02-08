import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Rocket, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-investor/10 blur-3xl" />
        <div className="absolute top-1/4 left-1/2 w-[400px] h-[400px] rounded-full bg-founder/5 blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-8 animate-fade-in">
            <Rocket className="w-4 h-4" />
            <span>The Startup Operating System</span>
          </div>

          {/* Main heading */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
            Build, Track & 
            <span className="block text-gradient">Fund Your Startup</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            One platform for founders, teams, and investors. Manage tasks, track milestones, 
            validate ideas, and connect with investors who see your real execution—not just slides.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/auth?role=founder">
              <Button variant="hero" size="xl" className="group">
                Start as Founder
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/auth?role=investor">
              <Button variant="hero-outline" size="xl">
                Join as Investor
              </Button>
            </Link>
            <Link to="/auth?role=team">
              <Button variant="hero-outline" size="xl" className="group">
                <Briefcase className="w-4 h-4 mr-2" />
                Join as Team Member
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="glass-dark rounded-2xl p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-accent mb-2">
                <Rocket className="w-5 h-5" />
                <span className="text-3xl font-bold text-white">150+</span>
              </div>
              <p className="text-white/60 text-sm">Startups Launched</p>
            </div>
            <div className="glass-dark rounded-2xl p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-success mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-3xl font-bold text-white">₹2.5Cr</span>
              </div>
              <p className="text-white/60 text-sm">Funding Facilitated</p>
            </div>
            <div className="glass-dark rounded-2xl p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-investor mb-2">
                <Users className="w-5 h-5" />
                <span className="text-3xl font-bold text-white">50+</span>
              </div>
              <p className="text-white/60 text-sm">Active Investors</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-2.5 rounded-full bg-white/50 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
