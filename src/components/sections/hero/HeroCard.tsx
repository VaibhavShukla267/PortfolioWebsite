"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { profile } from "@/lib/data";
import GlareCard from "@/components/ui/GlareCard";

const contactLines = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s+/g, "")}`,
  },
  {
    label: "LinkedIn",
    value: "vaibhav-shukla",
    href: profile.linkedin,
  },
];

// Replaces the old photo-based hero portrait — a profile card instead of a
// likeness. Reads as an actual visiting card: name/role up top, then contact
// details, no pitch copy — the rest of the page already makes the case for
// who I am, this card just needs to say how to reach me. Mouse-reactive
// tilt + a pointer-tracked glare (GlareCard) live directly on the card,
// since there's no photo to keep still for.
export default function HeroCard() {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 150, damping: 20, mass: 0.6 };
  const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), spring);
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), spring);
  const shiftX = useSpring(useTransform(px, [0, 1], [-12, 12]), spring);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative mx-auto w-full max-w-72 sm:max-w-88 lg:max-w-100"
      style={{ perspective: 1000 }}
    >
      {/* ambient parallax glow behind the card */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 scale-125"
        style={{ rotateX, rotateY, x: shiftX, transformStyle: "preserve-3d" }}
      >
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 55% at 50% 38%, var(--glow), transparent 72%)",
          }}
        />
      </motion.div>

      <CornerMarks />

      <motion.div
        initial={{ opacity: 0, y: 36, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <GlareCard className="glass shadow-soft relative overflow-hidden rounded-[28px] p-6 sm:p-7">
          <div className="flex items-start gap-4">
            <span
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-display text-lg font-semibold text-accent-contrast sm:h-16 sm:w-16 sm:text-xl"
              style={{ backgroundImage: "var(--grad-accent)" }}
            >
              {profile.initials}
            </span>
            <div className="min-w-0 pt-0.5">
              <div className="truncate font-display text-lg font-semibold text-text-primary sm:text-xl">
                {profile.name}
              </div>
              <div className="mt-0.5 truncate font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary sm:text-[11px]">
                {profile.role}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            {contactLines.map((line) => (
              <a
                key={line.label}
                href={line.href}
                target={line.href.startsWith("http") ? "_blank" : undefined}
                rel={line.href.startsWith("http") ? "noopener noreferrer" : undefined}
                data-cursor-hover
                className="group flex min-w-0 flex-col gap-1"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary">
                  {line.label}
                </span>
                <span className="truncate text-[13px] text-text-secondary transition-colors group-hover:text-accent sm:text-sm">
                  {line.value}
                </span>
              </a>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-secondary">
                Open to work
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary">
              {profile.location}
            </span>
          </div>
        </GlareCard>
      </motion.div>
    </div>
  );
}

function CornerMarks() {
  const base = "absolute h-4 w-4 border-accent/60 sm:h-6 sm:w-6";
  return (
    <div aria-hidden className="pointer-events-none absolute -inset-2 sm:-inset-4">
      <span className={`${base} left-0 top-0 border-l-2 border-t-2`} />
      <span className={`${base} right-0 top-0 border-r-2 border-t-2`} />
      <span className={`${base} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${base} bottom-0 right-0 border-b-2 border-r-2`} />
    </div>
  );
}
