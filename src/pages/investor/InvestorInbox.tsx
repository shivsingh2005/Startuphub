import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InvestorLayout } from "@/components/layout/InvestorLayout";
import {
  Inbox,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Send,
  Star,
  Archive,
  ChevronDown,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for pitch requests
const allPitches = [
  {
    id: "1",
    startupName: "FinanceHub",
    domain: "Fintech",
    stage: "idea",
    founderName: "Amit Patel",
    pitchSummary: "AI-powered personal finance assistant for millennials. Uses machine learning to categorize expenses, suggest savings strategies, and predict cash flow gaps. We have 5,000+ waitlist signups and a working MVP.",
    askAmount: "₹25L",
    equity: "10%",
    receivedAt: "2 hours ago",
    status: "pending",
    executionScore: null,
    validationScore: null,
  },
  {
    id: "2",
    startupName: "GreenLogistics",
    domain: "Logistics",
    stage: "mvp",
    founderName: "Sanjay Kumar",
    pitchSummary: "Sustainable last-mile delivery platform using electric vehicles and route optimization. Currently serving 50 merchants in Bangalore with 30% cost reduction compared to traditional methods.",
    askAmount: "₹40L",
    equity: "12%",
    receivedAt: "1 day ago",
    status: "pending",
    executionScore: 72,
    validationScore: 68,
  },
  {
    id: "3",
    startupName: "EduVerse",
    domain: "Edtech",
    stage: "mvp",
    founderName: "Priya Sharma",
    pitchSummary: "VR-based immersive learning experiences for K-12 students. Partnership with 5 schools for pilot program. 40% improvement in retention rates in initial testing.",
    askAmount: "₹30L",
    equity: "15%",
    receivedAt: "2 days ago",
    status: "pending",
    executionScore: 78,
    validationScore: 82,
  },
  {
    id: "4",
    startupName: "MediQuick",
    domain: "Health",
    stage: "idea",
    founderName: "Rajesh Gupta",
    pitchSummary: "AI-powered diagnostic assistant for primary healthcare in rural areas. Can identify 50+ common conditions with 90% accuracy. Seeking funding for clinical trials.",
    askAmount: "₹50L",
    equity: "8%",
    receivedAt: "3 days ago",
    status: "accepted",
    executionScore: 65,
    validationScore: 75,
  },
  {
    id: "5",
    startupName: "AgriSmart",
    domain: "Agriculture",
    stage: "growth",
    founderName: "Vikram Singh",
    pitchSummary: "IoT-based smart farming solutions with real-time soil monitoring and automated irrigation. Serving 200+ farmers across 3 states with 30% yield improvement.",
    askAmount: "₹60L",
    equity: "10%",
    receivedAt: "1 week ago",
    status: "rejected",
    executionScore: 85,
    validationScore: 70,
  },
  {
    id: "6",
    startupName: "FoodieFast",
    domain: "Food",
    stage: "mvp",
    founderName: "Anita Desai",
    pitchSummary: "Cloud kitchen focused on healthy meal delivery with AI-based personalization. 1,000+ monthly orders with 4.5 star rating on food delivery apps.",
    askAmount: "₹20L",
    equity: "12%",
    receivedAt: "1 week ago",
    status: "pending",
    executionScore: 68,
    validationScore: 72,
  },
];

export default function InvestorInbox() {
  const [selectedPitch, setSelectedPitch] = useState<typeof allPitches[0] | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDomain, setFilterDomain] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPitches = allPitches.filter((pitch) => {
    const matchesStatus = filterStatus === "all" || pitch.status === filterStatus;
    const matchesDomain = filterDomain === "all" || pitch.domain === filterDomain;
    const matchesSearch =
      pitch.startupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pitch.pitchSummary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesDomain && matchesSearch;
  });

  const stats = {
    total: allPitches.length,
    pending: allPitches.filter((p) => p.status === "pending").length,
    accepted: allPitches.filter((p) => p.status === "accepted").length,
    rejected: allPitches.filter((p) => p.status === "rejected").length,
  };

  const handleAccept = (pitch: typeof allPitches[0]) => {
    console.log("Accepted pitch:", pitch.startupName);
    // In real app, this would update the backend
  };

  const handleReject = (pitch: typeof allPitches[0]) => {
    console.log("Rejected pitch:", pitch.startupName);
    // In real app, this would update the backend
  };

  return (
    <InvestorLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-3">
              <Inbox className="w-8 h-8 text-investor" />
              Pitch Inbox
            </h1>
            <p className="text-muted-foreground mt-1">
              Review and respond to startup pitch requests
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-sm">
              {stats.total} Total
            </Badge>
            <Badge variant="pending" className="text-sm">
              {stats.pending} Pending
            </Badge>
            <Badge variant="accepted" className="text-sm">
              {stats.accepted} Accepted
            </Badge>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search pitches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterDomain} onValueChange={setFilterDomain}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Domain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Domains</SelectItem>
              <SelectItem value="Fintech">Fintech</SelectItem>
              <SelectItem value="Edtech">Edtech</SelectItem>
              <SelectItem value="Health">Health</SelectItem>
              <SelectItem value="Logistics">Logistics</SelectItem>
              <SelectItem value="Agriculture">Agriculture</SelectItem>
              <SelectItem value="Food">Food</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pitch List */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="font-display text-base">Requests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {filteredPitches.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Inbox className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No pitches found</p>
                  </div>
                ) : (
                  filteredPitches.map((pitch) => (
                    <div
                      key={pitch.id}
                      onClick={() => setSelectedPitch(pitch)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        selectedPitch?.id === pitch.id
                          ? "border-investor bg-investor/5"
                          : "border-border hover:border-investor/30 hover:bg-muted/30"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium text-foreground">{pitch.startupName}</h3>
                          <p className="text-xs text-muted-foreground">{pitch.founderName}</p>
                        </div>
                        <Badge
                          variant={
                            pitch.status === "pending"
                              ? "pending"
                              : pitch.status === "accepted"
                              ? "accepted"
                              : "rejected"
                          }
                          className="text-xs capitalize"
                        >
                          {pitch.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {pitch.domain}
                        </Badge>
                        <Badge variant={pitch.stage as "idea" | "mvp" | "growth"} className="text-xs capitalize">
                          {pitch.stage}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {pitch.receivedAt}
                        </span>
                        <span className="font-medium text-foreground">{pitch.askAmount}</span>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Pitch Details */}
          <div className="lg:col-span-2">
            {selectedPitch ? (
              <Card className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="font-display text-2xl">
                        {selectedPitch.startupName}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-sm">
                          {selectedPitch.domain}
                        </Badge>
                        <Badge
                          variant={selectedPitch.stage as "idea" | "mvp" | "growth"}
                          className="text-sm capitalize"
                        >
                          {selectedPitch.stage}
                        </Badge>
                        <Badge
                          variant={
                            selectedPitch.status === "pending"
                              ? "pending"
                              : selectedPitch.status === "accepted"
                              ? "accepted"
                              : "rejected"
                          }
                          className="text-sm capitalize"
                        >
                          {selectedPitch.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {selectedPitch.status === "pending" && (
                        <>
                          <Button variant="ghost" size="sm">
                            <Archive className="w-4 h-4 mr-1" />
                            Archive
                          </Button>
                          <Button variant="success" size="sm">
                            <Star className="w-4 h-4 mr-1" />
                            Save
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Pitch Summary */}
                  <div>
                    <h3 className="font-medium mb-2">Pitch Summary</h3>
                    <p className="text-muted-foreground">{selectedPitch.pitchSummary}</p>
                  </div>

                  {/* Founder Info */}
                  <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-muted/30">
                    <div>
                      <p className="text-xs text-muted-foreground">Founder</p>
                      <p className="font-medium">{selectedPitch.founderName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Received</p>
                      <p className="font-medium">{selectedPitch.receivedAt}</p>
                    </div>
                  </div>

                  {/* Investment Terms */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-success/5 border border-success/20">
                      <p className="text-xs text-success mb-1">Ask Amount</p>
                      <p className="text-2xl font-bold text-success">{selectedPitch.askAmount}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-investor/5 border border-investor/20">
                      <p className="text-xs text-investor mb-1">Equity Offered</p>
                      <p className="text-2xl font-bold text-investor">{selectedPitch.equity}</p>
                    </div>
                  </div>

                  {/* Scores (if available) */}
                  {selectedPitch.executionScore !== null && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Execution Score</p>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-muted rounded-full h-3">
                            <div
                              className="bg-founder h-3 rounded-full"
                              style={{ width: `${selectedPitch.executionScore}%` }}
                            />
                          </div>
                          <span className="font-bold">{selectedPitch.executionScore}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Validation Score</p>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-muted rounded-full h-3">
                            <div
                              className="bg-accent h-3 rounded-full"
                              style={{ width: `${selectedPitch.validationScore}%` }}
                            />
                          </div>
                          <span className="font-bold">{selectedPitch.validationScore}%</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  {selectedPitch.status === "pending" && (
                    <div className="flex gap-4 pt-4 border-t">
                      <Button
                        variant="success"
                        className="flex-1 gap-2"
                        onClick={() => handleAccept(selectedPitch)}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Accept Pitch
                      </Button>
                      <Button
                        variant="destructive"
                        className="flex-1 gap-2"
                        onClick={() => handleReject(selectedPitch)}
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </Button>
                    </div>
                  )}

                  {selectedPitch.status === "accepted" && (
                    <div className="flex gap-4 pt-4 border-t">
                      <Button variant="outline" className="flex-1 gap-2">
                        <Eye className="w-4 h-4" />
                        View Startup Profile
                      </Button>
                      <Button variant="investor" className="flex-1 gap-2">
                        <Send className="w-4 h-4" />
                        Send Term Sheet
                      </Button>
                    </div>
                  )}

                  {selectedPitch.status === "rejected" && (
                    <div className="flex gap-4 pt-4 border-t">
                      <Button variant="outline" className="flex-1 gap-2">
                        <Archive className="w-4 h-4" />
                        Archive Pitch
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-card border-border h-full flex items-center justify-center min-h-[400px]">
                <div className="text-center text-muted-foreground">
                  <Inbox className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Select a pitch to view details</p>
                  <p className="text-sm mt-1">Click on any pitch from the list to see full details</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </InvestorLayout>
  );
}

