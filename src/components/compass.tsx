import { cn } from "@/lib/cn";

const C = 260;

function polar(r: number, deg: number) {
  const a = ((deg - 90) * Math.PI) / 180;
  return { x: +(C + r * Math.cos(a)).toFixed(2), y: +(C + r * Math.sin(a)).toFixed(2) };
}

const points = [
  { deg: 0, code: "N", label: "MEDIA" },
  { deg: 90, code: "E", label: "MARKETING" },
  { deg: 180, code: "S", label: "AI" },
  { deg: 270, code: "W", label: "TECHNOLOGY" },
];

/**
 * The GetNorth compass: four disciplines on the cardinal points,
 * one needle pointing to the client's goal.
 */
export function Compass({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const stroke = tone === "dark" ? "#0a3e23" : "#f5f3ee";
  const accent = tone === "dark" ? "#0a3e23" : "#9fd0aa";
  const ticks = Array.from({ length: 72 }, (_, i) => i * 5);

  return (
    <svg
      viewBox="0 0 520 520"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-labelledby="compass-title"
    >
      <title id="compass-title">
        GetNorth compass: Media, Marketing, AI and Technology on the four cardinal points, with the needle pointing north.
      </title>

      <circle cx={C} cy={C} r={236} fill="none" stroke={stroke} strokeOpacity={0.18} />
      <circle cx={C} cy={C} r={206} fill="none" stroke={stroke} strokeOpacity={0.12} />
      <circle cx={C} cy={C} r={150} fill="none" stroke={stroke} strokeOpacity={0.14} strokeDasharray="2 6" />
      <circle cx={C} cy={C} r={84} fill="none" stroke={stroke} strokeOpacity={0.12} />

      {/* Degree ticks */}
      {ticks.map((deg) => {
        const major = deg % 90 === 0;
        const mid = deg % 30 === 0;
        const a = polar(236, deg);
        const b = polar(major ? 214 : mid ? 222 : 229, deg);
        return (
          <line
            key={deg}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={major && deg === 0 ? accent : stroke}
            strokeOpacity={major ? 0.9 : mid ? 0.45 : 0.22}
            strokeWidth={major ? 2 : 1}
          />
        );
      })}

      {/* Crosshair */}
      <line x1={C} y1={60} x2={C} y2={460} stroke={stroke} strokeOpacity={0.1} />
      <line x1={60} y1={C} x2={460} y2={C} stroke={stroke} strokeOpacity={0.1} />

      {/* Intercardinal star */}
      <path
        d={`M${C} ${C - 150} L${C + 22} ${C - 22} L${C + 150} ${C} L${C + 22} ${C + 22} L${C} ${C + 150} L${C - 22} ${C + 22} L${C - 150} ${C} L${C - 22} ${C - 22} Z`}
        fill="none"
        stroke={stroke}
        strokeOpacity={0.16}
      />

      {/* Cardinal labels */}
      {points.map((p) => {
        const pos = polar(p.deg % 180 === 0 ? 184 : 150, p.deg);
        return (
          <g key={p.code}>
            <text
              x={pos.x}
              y={pos.y - 7}
              textAnchor="middle"
              fontFamily="var(--font-geist-mono), monospace"
              fontSize="11"
              letterSpacing="2.5"
              fill={p.code === "N" ? accent : stroke}
              fillOpacity={p.code === "N" ? 1 : 0.55}
            >
              {p.code}
            </text>
            <text
              x={pos.x}
              y={pos.y + 11}
              textAnchor="middle"
              fontFamily="var(--font-geist-mono), monospace"
              fontSize="12.5"
              fontWeight="600"
              letterSpacing="2.5"
              fill={stroke}
              fillOpacity={0.85}
            >
              {p.label}
            </text>
          </g>
        );
      })}

      {/* Needle */}
      <g className="animate-needle" style={{ transformOrigin: `${C}px ${C}px` }}>
        <path d={`M${C} ${C - 132} L${C + 17} ${C} L${C - 17} ${C} Z`} fill={accent} />
        <path d={`M${C - 17} ${C} L${C + 17} ${C} L${C} ${C + 132} Z`} fill="none" stroke={stroke} strokeOpacity={0.55} strokeWidth={1.5} />
        <path d={`M${C} ${C - 132} L${C} ${C} L${C - 17} ${C} Z`} fill="#000" fillOpacity={0.18} />
      </g>
      <circle cx={C} cy={C} r={7} fill={tone === "dark" ? "#f5f3ee" : "#0f1f17"} stroke={stroke} strokeWidth={2} />
    </svg>
  );
}
