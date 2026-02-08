import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  SlidersHorizontal,
  X,
  Rocket,
  DollarSign,
  GraduationCap,
  Heart,
  ShoppingCart,
  Truck,
  Cpu,
  Leaf,
  Gamepad2,
  Music,
  Briefcase,
} from "lucide-react";

interface Domain {
  id: string;
  name: string;
  icon: React.ElementType;
  count: number;
  color: string;
}

interface DomainFilterProps {
  selectedDomain: string | null;
  onDomainChange: (domain: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalStartups: number;
  filteredCount: number;
}

const domains: Domain[] = [
  { id: "saas", name: "SaaS", icon: Rocket, count: 45, color: "text-blue-600 bg-blue-50 border-blue-200" },
  { id: "fintech", name: "Fintech", icon: DollarSign, count: 32, color: "text-green-600 bg-green-50 border-green-200" },
  { id: "edtech", name: "Edtech", icon: GraduationCap, count: 28, color: "text-purple-600 bg-purple-50 border-purple-200" },
  { id: "health", name: "Health", icon: Heart, count: 24, color: "text-red-600 bg-red-50 border-red-200" },
  { id: "ecommerce", name: "E-commerce", icon: ShoppingCart, count: 19, color: "text-orange-600 bg-orange-50 border-orange-200" },
  { id: "logistics", name: "Logistics", icon: Truck, count: 15, color: "text-cyan-600 bg-cyan-50 border-cyan-200" },
  { id: "ai", name: "AI/ML", icon: Cpu, count: 38, color: "text-indigo-600 bg-indigo-50 border-indigo-200" },
  { id: "cleantech", name: "Cleantech", icon: Leaf, count: 12, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  { id: "gaming", name: "Gaming", icon: Gamepad2, count: 16, color: "text-pink-600 bg-pink-50 border-pink-200" },
  { id: "entertainment", name: "Entertainment", icon: Music, count: 14, color: "text-violet-600 bg-violet-50 border-violet-200" },
  { id: "enterprise", name: "Enterprise", icon: Briefcase, count: 22, color: "text-slate-600 bg-slate-50 border-slate-200" },
];

export function DomainFilter({
  selectedDomain,
  onDomainChange,
  searchQuery,
  onSearchChange,
  totalStartups,
  filteredCount,
}: DomainFilterProps) {
  const [showAllDomains, setShowAllDomains] = useState(false);
  
  const visibleDomains = showAllDomains ? domains : domains.slice(0, 6);

  return (
    <div className="space-y-4">
      {/* Search and Stats */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search startups by name, domain, or description..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <SlidersHorizontal className="w-4 h-4" />
          <span>
            Showing <span className="font-medium text-foreground">{filteredCount}</span> of{" "}
            <span className="font-medium text-foreground">{totalStartups}</span> startups
          </span>
        </div>
      </div>

      {/* Domain Pills */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedDomain === null ? "default" : "outline"}
          size="sm"
          onClick={() => onDomainChange(null)}
          className="gap-2"
        >
          <Rocket className="w-4 h-4" />
          All Domains
          <Badge variant="secondary" className="ml-1 text-xs">
            {totalStartups}
          </Badge>
        </Button>

        {visibleDomains.map((domain) => {
          const Icon = domain.icon;
          const isSelected = selectedDomain === domain.id;
          
          return (
            <Button
              key={domain.id}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => onDomainChange(isSelected ? null : domain.id)}
              className={`gap-2 ${isSelected ? "" : domain.color}`}
            >
              <Icon className="w-4 h-4" />
              {domain.name}
              <Badge 
                variant={isSelected ? "secondary" : "outline"} 
                className="ml-1 text-xs"
              >
                {domain.count}
              </Badge>
            </Button>
          );
        })}

        {domains.length > 6 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAllDomains(!showAllDomains)}
          >
            {showAllDomains ? "Show Less" : `+${domains.length - 6} More`}
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {(selectedDomain || searchQuery) && (
        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {selectedDomain && (
            <Badge variant="secondary" className="gap-1">
              {domains.find(d => d.id === selectedDomain)?.name}
              <button
                onClick={() => onDomainChange(null)}
                className="ml-1 hover:text-foreground"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              Search: {searchQuery}
              <button
                onClick={() => onSearchChange("")}
                className="ml-1 hover:text-foreground"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-xs"
            onClick={() => {
              onDomainChange(null);
              onSearchChange("");
            }}
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
