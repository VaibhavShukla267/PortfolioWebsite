"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function HeroPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 150, damping: 20, mass: 0.6 };
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), spring);
  const rotateX = useSpring(useTransform(py, [0, 1], [6, -6]), spring);
  const shiftX = useSpring(useTransform(px, [0, 1], [-8, 8]), spring);

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
      className="relative mx-auto w-full max-w-55 sm:max-w-75 lg:max-w-95"
      style={{ perspective: 1000 }}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 scale-125"
        style={{
          background:
            "radial-gradient(55% 55% at 50% 38%, var(--glow), transparent 72%)",
        }}
      />

      <CornerMarks />

      <motion.div
        initial={{ opacity: 0, y: 36, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
        style={{ rotateX, rotateY, x: shiftX, transformStyle: "preserve-3d" }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <Image
            src="/images/portrait.png"
            alt="Portrait of Vaibhav Shukla"
            width={640}
            height={834}
            priority
            className="pointer-events-none w-full select-none drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)]"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="glass absolute bottom-3 left-0 flex items-center gap-1.5 rounded-full px-2.5 py-1.5 sm:bottom-6 sm:gap-2 sm:px-3.5 sm:py-2 lg:-left-4"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.1em] whitespace-nowrap text-text-secondary sm:text-[10px] sm:tracking-[0.12em]">
          Open to work
        </span>
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
