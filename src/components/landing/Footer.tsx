import { Rocket } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
              <Rocket className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="font-display text-xl font-bold">FoundersPath</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8 text-sm text-primary-foreground/70">
            <a href="#" className="hover:text-primary-foreground transition-colors">Features</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">About</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Contact</a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-primary-foreground/50">
            © 2024 FoundersPath. Built for Hackathon.
          </p>
        </div>
      </div>
    </footer>
  );
}
