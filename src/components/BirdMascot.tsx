import { useEffect, useRef, useState } from "react";

type Mood = "happy" | "listening" | "thinking" | "concerned";

interface BirdMascotProps {
  mood?: Mood;
  size?: number;
}

/**
 * Still bird mascot. Body never translates across the screen.
 * It reacts via:
 *  - Eyes that follow the cursor
 *  - Blink animation
 *  - Mood-based expression (beak/cheeks)
 *  - Subtle 4px breathing only (in place)
 */
export const BirdMascot = ({ mood = "happy", size = 220 }: BirdMascotProps) => {
  const ref = useRef<SVGSVGElement>(null);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.min(Math.hypot(dx, dy), 200);
      const angle = Math.atan2(dy, dx);
      const r = (dist / 200) * 4; // max 4px pupil offset
      setPupil({ x: Math.cos(angle) * r, y: Math.sin(angle) * r });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const beak = (() => {
    switch (mood) {
      case "listening": return <path d="M100 112 L112 118 L100 124 Z" fill="hsl(35 95% 55%)" />;
      case "thinking": return <path d="M100 116 Q108 118 100 122 Z" fill="hsl(35 95% 55%)" />;
      case "concerned": return <path d="M96 120 Q100 116 104 120" stroke="hsl(35 95% 45%)" strokeWidth="2.5" fill="none" strokeLinecap="round" />;
      default: return <path d="M96 116 L112 116 L104 124 Z" fill="hsl(35 95% 55%)" />;
    }
  })();

  return (
    <div className="inline-block animate-float-still">
      <svg ref={ref} width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/* shadow */}
        <ellipse cx="100" cy="180" rx="50" ry="6" fill="hsl(215 40% 18% / 0.12)" />
        {/* body */}
        <ellipse cx="100" cy="120" rx="58" ry="55" fill="hsl(175 65% 55%)" />
        <ellipse cx="100" cy="135" rx="42" ry="38" fill="hsl(45 95% 88%)" />
        {/* wings */}
        <path d="M48 120 Q35 130 50 150 Q60 140 60 125 Z" fill="hsl(175 60% 42%)" />
        <path d="M152 120 Q165 130 150 150 Q140 140 140 125 Z" fill="hsl(175 60% 42%)" />
        {/* head tuft */}
        <path d="M92 65 Q100 50 108 65" stroke="hsl(175 60% 42%)" strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* cheeks for happy/listening */}
        {(mood === "happy" || mood === "listening") && (
          <>
            <circle cx="76" cy="118" r="6" fill="hsl(0 80% 75% / 0.6)" />
            <circle cx="124" cy="118" r="6" fill="hsl(0 80% 75% / 0.6)" />
          </>
        )}
        {/* eyes (whites) */}
        <g className="animate-blink" style={{ transformOrigin: "82px 100px" }}>
          <circle cx="82" cy="100" r="10" fill="white" />
          <circle cx={82 + pupil.x} cy={100 + pupil.y} r="5" fill="hsl(215 40% 18%)" />
          <circle cx={84 + pupil.x} cy={98 + pupil.y} r="1.6" fill="white" />
        </g>
        <g className="animate-blink" style={{ transformOrigin: "118px 100px" }}>
          <circle cx="118" cy="100" r="10" fill="white" />
          <circle cx={118 + pupil.x} cy={100 + pupil.y} r="5" fill="hsl(215 40% 18%)" />
          <circle cx={120 + pupil.x} cy={98 + pupil.y} r="1.6" fill="white" />
        </g>
        {/* eyebrows for concerned */}
        {mood === "concerned" && (
          <>
            <path d="M72 88 L92 92" stroke="hsl(215 40% 18%)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M128 88 L108 92" stroke="hsl(215 40% 18%)" strokeWidth="2.5" strokeLinecap="round" />
          </>
        )}
        {/* feet */}
        <path d="M88 172 L88 180 M84 180 L92 180" stroke="hsl(35 95% 45%)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M112 172 L112 180 M108 180 L116 180" stroke="hsl(35 95% 45%)" strokeWidth="2.5" strokeLinecap="round" />
        {beak}
      </svg>
    </div>
  );
};
