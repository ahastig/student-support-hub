// Mock student data based on the research findings:
// 60 SHS students from Taguig — 13% Low, 63% Moderate, 24% High Risk
// Strands: STEM, HUMSS, ABM. Names are natural Filipino-sounding (kept simple).

export type RiskLevel = "low" | "moderate" | "high";

export interface StudentReport {
  id: string;
  name: string;
  lrn: string;
  section: string;
  strand: "STEM" | "HUMSS" | "ABM";
  risk: RiskLevel;
  sleepAvg: number; // hours
  stress: number; // 1-10
  screenTime: number; // hours
  flags: string[];
  summary: string;
  recommendation: string;
  lastCheck: string;
}

const sections = ["Newton", "Rizal", "Aquino", "Bonifacio", "Mabini", "Curie"];

export const students: StudentReport[] = [
  {
    id: "s001", name: "James Alcarde", lrn: "136728190001", section: "STEM-Newton", strand: "STEM",
    risk: "high", sleepAvg: 4.2, stress: 8.6, screenTime: 9.1,
    flags: ["Chronic sleep deprivation", "Late-night academic load", "Mood volatility"],
    summary: "Reports persistent fatigue and difficulty concentrating. Mentions feeling 'overwhelmed' with college entrance prep. Late-night screen use coincides with academic deadlines.",
    recommendation: "Priority 1-on-1 counseling session this week. Sleep hygiene plan recommended.",
    lastCheck: "2 hours ago",
  },
  {
    id: "s002", name: "John Mercado", lrn: "136728190002", section: "HUMSS-Rizal", strand: "HUMSS",
    risk: "high", sleepAvg: 4.8, stress: 8.1, screenTime: 7.5,
    flags: ["High perceived stress", "Social withdrawal indicators"],
    summary: "Conversation patterns show increasing isolation. Avoids group activities and reports anxiety about peer comparison on social media.",
    recommendation: "Schedule individual session. Consider parent meeting.",
    lastCheck: "Yesterday",
  },
  {
    id: "s003", name: "Jancen Robles", lrn: "136728190003", section: "ABM-Aquino", strand: "ABM",
    risk: "moderate", sleepAvg: 5.6, stress: 6.4, screenTime: 6.2,
    flags: ["Early signs of burnout"],
    summary: "Functional but showing classic 'vulnerable middle' signs. Manageable stress that could escalate during exam weeks.",
    recommendation: "Group resilience workshop. Monitor weekly.",
    lastCheck: "3 days ago",
  },
  {
    id: "s004", name: "Maria Santos", lrn: "136728190004", section: "STEM-Curie", strand: "STEM",
    risk: "moderate", sleepAvg: 6.0, stress: 5.9, screenTime: 5.4,
    flags: ["Mild sleep deficit"],
    summary: "Generally stable. Stress spikes around STEM project deadlines. No immediate concerns but pattern worth watching.",
    recommendation: "Include in resilience workshop. Light check-in next month.",
    lastCheck: "1 week ago",
  },
  {
    id: "s005", name: "Mark Villanueva", lrn: "136728190005", section: "HUMSS-Mabini", strand: "HUMSS",
    risk: "low", sleepAvg: 7.4, stress: 3.2, screenTime: 4.0,
    flags: [],
    summary: "Healthy sleep patterns and balanced workload. Reports positive social connections and clear coping strategies.",
    recommendation: "No intervention needed. Excellent peer mentor candidate.",
    lastCheck: "5 days ago",
  },
  {
    id: "s006", name: "Joshua Reyes", lrn: "136728190006", section: "STEM-Newton", strand: "STEM",
    risk: "high", sleepAvg: 4.5, stress: 9.0, screenTime: 8.8,
    flags: ["Severe stress", "Sleep < 5 hours", "Academic-screen overload loop"],
    summary: "Algorithm flagged HIGH_RISK on stress (>7) AND sleep (<5). Conversation references hopelessness about 'never catching up'.",
    recommendation: "URGENT: Counselor outreach within 24 hours. Notify guidance head.",
    lastCheck: "30 minutes ago",
  },
  {
    id: "s007", name: "Andrea Bautista", lrn: "136728190007", section: "ABM-Bonifacio", strand: "ABM",
    risk: "moderate", sleepAvg: 5.8, stress: 6.0, screenTime: 5.8,
    flags: ["Inconsistent sleep schedule"],
    summary: "Weekday/weekend sleep gap of 3+ hours. Stress moderate but trending upward over 7-day window.",
    recommendation: "Sleep hygiene resource. Reassess in 2 weeks.",
    lastCheck: "4 days ago",
  },
  {
    id: "s008", name: "Daniel Cruz", lrn: "136728190008", section: "HUMSS-Rizal", strand: "HUMSS",
    risk: "moderate", sleepAvg: 6.2, stress: 5.5, screenTime: 6.5,
    flags: ["Screen time elevated"],
    summary: "High screen use coincides with late-night homework. Mood self-reports stable. Borderline moderate.",
    recommendation: "Group workshop. Encourage device-free study window.",
    lastCheck: "1 week ago",
  },
];

export const cohortStats = {
  total: 60,
  low: 8,       // 13%
  moderate: 38, // 63%
  high: 14,     // 24%
  topDrivers: ["Inadequate Sleep", "High Perceived Stress", "Academic-Screen Overload"],
};

export const riskColor = (r: RiskLevel) =>
  r === "high" ? "destructive" : r === "moderate" ? "warning" : "success";
