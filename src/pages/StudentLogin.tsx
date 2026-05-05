import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BirdMascot } from "@/components/BirdMascot";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lrn, setLrn] = useState("");
  const [section, setSection] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem("kalma_student", JSON.stringify({ name, lrn, section }));
    navigate("/chat");
  };

  return (
    <div className="min-h-screen bg-sky-gradient grid place-items-center p-4">
      <Card className="w-full max-w-md p-8 rounded-3xl shadow-soft">
        <div className="flex justify-center mb-2">
          <BirdMascot mood="listening" size={140} />
        </div>
        <h1 className="text-3xl text-center">Hi! Let's get to know you</h1>
        <p className="text-center text-sm text-muted-foreground mt-1 mb-6">Demo login — any details work.</p>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label htmlFor="name">Your Name</Label>
            <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Juan Dela Cruz" className="mt-1 h-12" />
          </div>
          <div>
            <Label htmlFor="lrn">LRN</Label>
            <Input id="lrn" required value={lrn} onChange={(e) => setLrn(e.target.value)} placeholder="136728190000" className="mt-1 h-12" />
          </div>
          <div>
            <Label htmlFor="section">Section</Label>
            <Input id="section" required value={section} onChange={(e) => setSection(e.target.value)} placeholder="STEM-Newton" className="mt-1 h-12" />
          </div>
          <Button type="submit" className="w-full h-12 text-base shadow-soft">Continue to Kalma</Button>
        </form>
      </Card>
    </div>
  );
};

export default StudentLogin;
