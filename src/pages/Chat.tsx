import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BirdMascot } from "@/components/BirdMascot";
import { Send, LogOut } from "lucide-react";

type Msg = { role: "kalma" | "you"; text: string };
type Mood = "happy" | "listening" | "thinking" | "concerned";

const KALMA_FLOW: { prompt: string; mood: Mood }[] = [
  { prompt: "Kumusta! How many hours did you sleep last night?", mood: "listening" },
  { prompt: "Got it. On a scale of 1–10, how stressed do you feel today?", mood: "thinking" },
  { prompt: "Thanks for sharing. How many hours of screen time outside of school?", mood: "listening" },
  { prompt: "And how's your mood — would you say it's been steady or up and down this week?", mood: "thinking" },
  { prompt: "You're doing great by checking in. Anything weighing on your mind right now?", mood: "concerned" },
  { prompt: "Salamat for trusting me. I'll save this check-in. Take a breath — you've got this. 💚", mood: "happy" },
];

const Chat = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState<{ name: string } | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [mood, setMood] = useState<Mood>("happy");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = sessionStorage.getItem("kalma_student");
    if (!s) return navigate("/student-login");
    const parsed = JSON.parse(s);
    setStudent(parsed);
    setMessages([
      { role: "kalma", text: `Hi ${parsed.name.split(" ")[0]}! I'm Kalma. Ready for our daily check-in?` },
      { role: "kalma", text: KALMA_FLOW[0].prompt },
    ]);
    setMood(KALMA_FLOW[0].mood);
  }, [navigate]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setMessages((m) => [...m, { role: "you", text: userText }]);
    setInput("");
    setMood("thinking");
    setTimeout(() => {
      const next = step + 1;
      if (next < KALMA_FLOW.length) {
        setMessages((m) => [...m, { role: "kalma", text: KALMA_FLOW[next].prompt }]);
        setMood(KALMA_FLOW[next].mood);
        setStep(next);
      } else {
        setMessages((m) => [...m, { role: "kalma", text: "Our session is done — see you tomorrow! 🌤️" }]);
        setMood("happy");
      }
    }, 700);
  };

  return (
    <div className="min-h-screen bg-sky-gradient flex flex-col">
      <header className="container flex items-center justify-between py-4">
        <div className="font-bold">Kalma · Daily Check-in</div>
        <Button variant="ghost" size="sm" onClick={() => { sessionStorage.removeItem("kalma_student"); navigate("/"); }}>
          <LogOut className="h-4 w-4 mr-1" /> Sign out
        </Button>
      </header>

      <main className="container flex-1 grid lg:grid-cols-[300px_1fr] gap-6 pb-6">
        <Card className="p-6 rounded-3xl shadow-card flex flex-col items-center justify-center bg-card/80 backdrop-blur sticky top-4 self-start">
          <BirdMascot mood={mood} size={220} />
          <p className="mt-4 text-sm text-muted-foreground text-center">
            Hi {student?.name?.split(" ")[0] || "friend"}! Your answers stay private — only summary risk-level is shared with counselors.
          </p>
        </Card>

        <Card className="rounded-3xl shadow-card flex flex-col overflow-hidden bg-card">
          <div className="flex-1 p-6 space-y-3 overflow-y-auto max-h-[60vh]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "you" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "you"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(); }} className="p-4 border-t flex gap-2">
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your answer…" className="h-12" />
            <Button type="submit" size="icon" className="h-12 w-12 shrink-0"><Send className="h-5 w-5" /></Button>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default Chat;
