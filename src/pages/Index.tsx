import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BirdMascot } from "@/components/BirdMascot";
import { GraduationCap, ShieldCheck, Sparkles } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-sky-gradient">
      <header className="container flex items-center justify-between py-6">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-primary-gradient grid place-items-center text-primary-foreground font-bold">K</div>
          <span className="font-bold text-lg">Kalma</span>
        </div>
        <span className="text-sm text-muted-foreground hidden sm:inline">AI Mental Wellness · SHS Pilot</span>
      </header>

      <main className="container grid lg:grid-cols-2 gap-12 items-center pt-8 pb-24">
        <section className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-1 text-xs font-semibold text-primary shadow-card">
            <Sparkles className="h-3 w-3" /> ISRC 2026 · Research Demo
          </span>
          <h1 className="text-5xl md:text-6xl leading-tight">
            From <span className="text-primary">crisis</span> to <span className="text-accent">prevention</span>.
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Kalma is a friendly AI that checks in with Senior High School students daily,
            spotting early signs of burnout and helping counselors reach the right kids first.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button size="lg" className="h-14 px-7 text-base shadow-soft" onClick={() => navigate("/student-login")}>
              <GraduationCap className="mr-2" /> I'm a Student
            </Button>
            <Button size="lg" variant="secondary" className="h-14 px-7 text-base" onClick={() => navigate("/staff-login")}>
              <ShieldCheck className="mr-2" /> Teacher / Counselor
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-8 max-w-md">
            <Stat label="Low Risk" value="13%" tone="success" />
            <Stat label="Moderate" value="63%" tone="warning" />
            <Stat label="High Risk" value="24%" tone="destructive" />
          </div>
        </section>

        <section className="flex justify-center">
          <Card className="p-10 shadow-soft rounded-3xl bg-card/80 backdrop-blur">
            <BirdMascot mood="happy" size={260} />
            <p className="text-center mt-4 font-semibold">Hi, I'm Kalma 🪶</p>
            <p className="text-center text-sm text-muted-foreground">Move your cursor — I'm watching!</p>
          </Card>
        </section>
      </main>
    </div>
  );
};

const Stat = ({ label, value, tone }: { label: string; value: string; tone: "success" | "warning" | "destructive" }) => (
  <div className="rounded-2xl bg-card p-4 shadow-card">
    <div className={`text-2xl font-bold text-${tone}`}>{value}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
  </div>
);

export default Index;
