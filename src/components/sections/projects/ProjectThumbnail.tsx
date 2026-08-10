"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/data";

const nodePositions = [
  [60, 40], [180, 25], [260, 90], [140, 110], [40, 140],
  [220, 170], [90, 190], [200, 60], [150, 150], [280, 130],
];

const nodeLinks: [number, number][] = [
  [0, 3], [3, 6], [6, 4], [1, 3], [1, 7], [7, 2], [2, 9], [9, 5], [5, 8], [8, 3], [3, 1], [4, 8],
];

// Trig-derived coordinates can print with a differing number of trailing
// digits between server and client float formatting — round before using
// them as SVG attributes to avoid a hydration mismatch.
const round = (n: number) => Math.round(n * 100) / 100;

function BrainViz() {
  return (
    <svg viewBox="0 0 300 220" className="h-full w-full">
      {nodeLinks.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodePositions[a][0]}
          y1={nodePositions[a][1]}
          x2={nodePositions[b][0]}
          y2={nodePositions[b][1]}
          stroke="currentColor"
          strokeOpacity={0.25}
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: i * 0.05, ease: "easeOut" }}
        />
      ))}
      {nodePositions.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={i % 3 === 0 ? 4.5 : 3}
          fill="currentColor"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
        />
      ))}
    </svg>
  );
}

function WaveViz() {
  const paths = [
    "M0,120 C60,60 120,180 180,110 C240,50 280,140 300,90",
    "M0,150 C60,110 120,190 180,140 C240,100 280,160 300,130",
    "M0,90 C60,140 120,60 180,90 C240,120 280,60 300,80",
  ];
  return (
    <svg viewBox="0 0 300 220" className="h-full w-full">
      {paths.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={i === 1 ? 2 : 1}
          strokeOpacity={i === 1 ? 0.7 : 0.3}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: i * 0.15, ease: "easeOut" }}
        />
      ))}
    </svg>
  );
}

function GridViz() {
  const cells = Array.from({ length: 24 }, (_, i) => i);
  return (
    <svg viewBox="0 0 300 220" className="h-full w-full">
      {cells.map((i) => {
        const col = i % 8;
        const row = Math.floor(i / 8);
        const active = (i * 7) % 5 === 0;
        return (
          <motion.rect
            key={i}
            x={10 + col * 36}
            y={20 + row * 60}
            width={26}
            height={40}
            rx={4}
            fill={active ? "currentColor" : "none"}
            stroke="currentColor"
            strokeOpacity={0.3}
            fillOpacity={active ? 0.35 : 0}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.02 }}
          />
        );
      })}
    </svg>
  );
}

function OrbitViz() {
  return (
    <svg viewBox="0 0 300 220" className="h-full w-full">
      <circle cx={150} cy={110} r={70} fill="none" stroke="currentColor" strokeOpacity={0.2} />
      <circle cx={150} cy={110} r={40} fill="none" stroke="currentColor" strokeOpacity={0.3} />
      <circle cx={150} cy={110} r={6} fill="currentColor" />
      <motion.circle
        cx={150}
        cy={40}
        r={5}
        fill="currentColor"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "150px 110px" }}
      />
    </svg>
  );
}

// Angle for a given hour mark, matching the tick layout below (0 = 12 o'clock, clockwise).
const handAngle = (hourMark: number) => (hourMark / 12) * Math.PI * 2 - Math.PI / 2;

function ClockViz() {
  const cx = 150;
  const cy = 110;
  const r = 72;
  const ticks = Array.from({ length: 12 }, (_, i) => i);

  // Static "10:10" hand positions — computed once rather than rotated in,
  // since CSS transform-origin on a raw SVG <line> doesn't reliably pivot
  // at an arbitrary point across environments. Revealed via pathLength instead.
  const hourAngle = handAngle(10);
  const minuteAngle = handAngle(2);
  const hourLen = 34;
  const minuteLen = 52;
  const hourX = round(cx + Math.cos(hourAngle) * hourLen);
  const hourY = round(cy + Math.sin(hourAngle) * hourLen);
  const minuteX = round(cx + Math.cos(minuteAngle) * minuteLen);
  const minuteY = round(cy + Math.sin(minuteAngle) * minuteLen);

  return (
    <svg viewBox="0 0 300 220" className="h-full w-full">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeOpacity={0.25} />

      {ticks.map((i) => {
        const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const inner = i % 3 === 0 ? r - 12 : r - 7;
        const x1 = round(cx + Math.cos(angle) * inner);
        const y1 = round(cy + Math.sin(angle) * inner);
        const x2 = round(cx + Math.cos(angle) * r);
        const y2 = round(cy + Math.sin(angle) * r);
        return (
          <motion.line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeOpacity={0.45}
            strokeWidth={i % 3 === 0 ? 2 : 1}
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
          />
        );
      })}

      {/* GPS-sync ping — animates the radius directly so cx/cy never drift */}
      <motion.circle
        cx={cx}
        cy={cy}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        initial={{ opacity: 0.5, r: r * 0.3 }}
        animate={{ opacity: 0, r: r * 1.3 }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
      />

      <motion.line
        x1={cx}
        y1={cy}
        x2={hourX}
        y2={hourY}
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      />
      <motion.line
        x1={cx}
        y1={cy}
        x2={minuteX}
        y2={minuteY}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
      />
      <circle cx={cx} cy={cy} r={4} fill="currentColor" />
    </svg>
  );
}

function ChartViz() {
  const bars = [38, 68, 52, 88, 62, 100, 78];
  const baseY = 190;
  const barWidth = 26;
  const gap = 12;
  const startX = 20;

  return (
    <svg viewBox="0 0 300 220" className="h-full w-full">
      <line x1={10} y1={baseY} x2={290} y2={baseY} stroke="currentColor" strokeOpacity={0.2} />
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={startX + i * (barWidth + gap)}
          width={barWidth}
          rx={4}
          fill="currentColor"
          fillOpacity={i === bars.length - 2 ? 0.55 : 0.22}
          initial={{ height: 0, y: baseY }}
          whileInView={{ height: h, y: baseY - h }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
        />
      ))}
      <motion.polyline
        points={bars
          .map((h, i) => `${startX + i * (barWidth + gap) + barWidth / 2},${baseY - h - 16}`)
          .join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.85 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      />
    </svg>
  );
}

function CardsViz() {
  const cards = [
    { x: 24, y: 46, rot: -7 },
    { x: 92, y: 28, rot: -1 },
    { x: 158, y: 48, rot: 6 },
  ];

  return (
    <svg viewBox="0 0 300 220" className="h-full w-full">
      {cards.map((c, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, y: c.y + 18, rotate: 0 }}
          whileInView={{ opacity: 1, y: c.y, rotate: c.rot }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
          style={{ transformOrigin: `${c.x + 55}px ${c.y + 65}px` }}
        >
          <rect
            x={c.x}
            y={c.y}
            width={104}
            height={122}
            rx={12}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.35}
          />
          <rect x={c.x + 10} y={c.y + 12} width={84} height={48} rx={6} fill="currentColor" fillOpacity={0.18} />
          <rect x={c.x + 10} y={c.y + 70} width={58} height={8} rx={4} fill="currentColor" fillOpacity={0.4} />
          <rect x={c.x + 10} y={c.y + 85} width={38} height={6} rx={3} fill="currentColor" fillOpacity={0.25} />
          <circle cx={c.x + 88} cy={c.y + 88} r={6} fill="currentColor" fillOpacity={0.5} />
        </motion.g>
      ))}
    </svg>
  );
}

const viz: Record<Project["thumbnail"], React.ComponentType> = {
  brain: BrainViz,
  wave: WaveViz,
  grid: GridViz,
  orbit: OrbitViz,
  chart: ChartViz,
  cards: CardsViz,
  clock: ClockViz,
};

export default function ProjectThumbnail({ type }: { type: Project["thumbnail"] }) {
  const Viz = viz[type];
  return (
    <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-3xl border border-border bg-surface text-accent sm:aspect-[16/11]">
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(80% 60% at 20% 15%, var(--glow), transparent 60%)",
        }}
      />
      <div className="relative h-full w-full p-6">
        <Viz />
      </div>
    </div>
  );
}
