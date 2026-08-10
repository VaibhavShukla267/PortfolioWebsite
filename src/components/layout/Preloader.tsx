"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/lib/data";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const DURATION = 1600;

export default function Preloader() {
  const prefersReduced = useMediaQuery("(prefers-reduced-motion: reduce)", false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (prefersReduced) return;

    document.body.style.overflow = "hidden";
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const linear = Math.min(elapsed / DURATION, 1);
      const eased = 1 - Math.pow(1 - linear, 3);
      setProgress(Math.round(eased * 100));
      if (linear < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        document.body.style.overflow = "";
        setTimeout(() => setDone(true), 250);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-bg"
        >
          <motion.div
            initial={{ clipPath: "inset(0 0 0 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-text-tertiary">
              {profile.role}
            </span>
            <span className="font-display text-7xl font-semibold tabular-nums text-text-primary sm:text-8xl">
              {progress}
              <span className="text-accent">%</span>
            </span>
            <div className="h-px w-40 overflow-hidden bg-border">
              <motion.div
                className="h-full bg-accent"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
