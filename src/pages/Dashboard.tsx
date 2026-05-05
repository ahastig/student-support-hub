import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BirdMascot } from "@/components/BirdMascot";
import { LogOut, AlertTriangle, Users, TrendingUp, EyeOff } from "lucide-react";
import { students, cohortStats, type StudentReport, type RiskLevel } from "@/lib/wellness-data";

const riskBadge = (r: RiskLevel) => {
  const map = {
    high: "bg-destructive text-destructive-foreground",
    moderate: "bg-warning text-warning-foreground",
    low: "bg-success text-success-foreground",
  } as const;
  return map[r];
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState<{ name: string; role: string } | null>(null);
  const [selected, setSelected] = useState<StudentReport>(students[0]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<RiskLevel | "all">("all");

  useEffect(() => {
    const s = sessionStorage.getItem("kalma_staff");
    if (!s) return navigate("/staff-login");
    setStaff(JSON.parse(s));
  }, [navigate]);

  const filtered = useMemo(() =>
    students.filter(s =>
      (filter === "all" || s.risk === filter) &&
      (s.name.toLowerCase().includes(query.toLowerCase()) || s.section.toLowerCase().includes(query.toLowerCase()))
    ).sort((a, b) => ({ high: 0, moderate: 1, low: 2 }[a.risk] - { high: 0, moderate: 1, low: 2 }[b.risk])),
    [query, filter]
  );

  return (
    <div className="min-h-screen bg-sky-gradient">
      <header className="container flex items-center justify-between py-4">
        <div>
          <div className="font-bold text-lg">Kalma · Counselor Dashboard</div>
          <div className="text-xs text-muted-foreground">{staff?.name} · {staff?.role}</div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => { sessionStorage.removeItem("kalma_staff"); navigate("/"); }}>
          <LogOut className="h-4 w-4 mr-1" /> Sign out
        </Button>
      </header>

      <div className="container pb-10 space-y-6">
        {/* Privacy banner */}
        <Card className="p-4 rounded-2xl bg-accent/10 border-accent/30 flex items-start gap-3">
          <EyeOff className="h-5 w-5 text-accent mt-0.5 shrink-0" />
          <div className="text-sm">
            <strong>Privacy-first.</strong> You see AI-generated <em>risk summaries</em> and <em>recommendations</em> only —
            never the raw conversations between students and Kalma. This protects student trust while surfacing who needs help.
          </div>
        </Card>

        {/* Cohort stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={<Users />} label="Students Screened" value={cohortStats.total.toString()} />
          <StatCard icon={<AlertTriangle />} label="High Risk" value={`${cohortStats.high} (24%)`} tone="destructive" />
          <StatCard icon={<TrendingUp />} label="Moderate" value={`${cohortStats.moderate} (63%)`} tone="warning" />
          <StatCard icon={<BirdMascot mood="happy" size={36} />} label="Low Risk" value={`${cohortStats.low} (13%)`} tone="success" />
        </div>

        <div className="grid lg:grid-cols-[380px_1fr] gap-6">
          {/* List */}
          <Card className="rounded-3xl shadow-card overflow-hidden">
            <div className="p-4 border-b space-y-3">
              <Input placeholder="Search name or section…" value={query} onChange={(e) => setQuery(e.target.value)} />
              <div className="flex gap-2 flex-wrap">
                {(["all", "high", "moderate", "low"] as const).map(f => (
                  <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} onClick={() => setFilter(f)} className="h-8 text-xs capitalize">
                    {f}
                  </Button>
                ))}
              </div>
            </div>
            <div className="divide-y max-h-[60vh] overflow-y-auto">
              {filtered.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSelected(s)}
                  className={`w-full text-left p-4 hover:bg-muted transition-colors ${selected.id === s.id ? "bg-muted" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{s.name}</div>
                    <Badge className={riskBadge(s.risk) + " capitalize"}>{s.risk}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{s.section} · {s.lastCheck}</div>
                </button>
              ))}
              {filtered.length === 0 && <div className="p-6 text-center text-sm text-muted-foreground">No students match.</div>}
            </div>
          </Card>

          {/* Detail */}
          <Card className="rounded-3xl shadow-soft p-6 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl">{selected.name}</h2>
                <div className="text-sm text-muted-foreground">LRN {selected.lrn} · {selected.section} · {selected.strand}</div>
              </div>
              <Badge className={riskBadge(selected.risk) + " capitalize text-sm px-3 py-1"}>{selected.risk} risk</Badge>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Metric label="Avg Sleep" value={`${selected.sleepAvg}h`} good={selected.sleepAvg >= 7} />
              <Metric label="Stress" value={`${selected.stress}/10`} good={selected.stress <= 5} />
              <Metric label="Screen Time" value={`${selected.screenTime}h`} good={selected.screenTime <= 5} />
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-2">AI-Generated Summary</h3>
              <p className="text-sm leading-relaxed">{selected.summary}</p>
            </div>

            {selected.flags.length > 0 && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-2">Flags</h3>
                <div className="flex flex-wrap gap-2">
                  {selected.flags.map(f => (
                    <Badge key={f} variant="outline" className="border-destructive/40 text-destructive">{f}</Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-4">
              <h3 className="text-sm font-bold uppercase tracking-wide text-primary mb-1">Recommended Action</h3>
              <p className="text-sm">{selected.recommendation}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone?: "destructive" | "warning" | "success" }) => (
  <Card className="rounded-2xl p-4 shadow-card">
    <div className={`flex items-center gap-2 text-${tone || "primary"}`}>{icon}</div>
    <div className="text-2xl font-bold mt-2">{value}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
  </Card>
);

const Metric = ({ label, value, good }: { label: string; value: string; good: boolean }) => (
  <div className={`rounded-2xl p-3 text-center ${good ? "bg-success/10" : "bg-destructive/10"}`}>
    <div className="text-xl font-bold">{value}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
  </div>
);

export default Dashboard;
