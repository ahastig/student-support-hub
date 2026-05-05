import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BirdMascot } from "@/components/BirdMascot";

const StaffLogin = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [role, setRole] = useState("Counselor");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem("kalma_staff", JSON.stringify({ name, role }));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-sky-gradient grid place-items-center p-4">
      <Card className="w-full max-w-md p-8 rounded-3xl shadow-soft">
        <div className="flex justify-center mb-2">
          <BirdMascot mood="thinking" size={140} />
        </div>
        <h1 className="text-3xl text-center">Staff Sign-in</h1>
        <p className="text-center text-sm text-muted-foreground mt-1 mb-6">
          Teachers & counselors only see <strong>AI risk reports</strong>, never raw student conversations.
        </p>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ms. Reyes" className="mt-1 h-12" />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 h-12 w-full rounded-md border border-input bg-background px-3"
            >
              <option>Counselor</option>
              <option>Teacher</option>
              <option>Guidance Head</option>
            </select>
          </div>
          <Button type="submit" className="w-full h-12 text-base shadow-soft">Open Dashboard</Button>
        </form>
      </Card>
    </div>
  );
};

export default StaffLogin;
