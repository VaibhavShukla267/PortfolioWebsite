"use client";

import { motion } from "framer-motion";

const principles = [
  "Brand-Accurate",
  "SEO-Optimized",
  "GenAI-Automated",
  "Cross-Browser Tested",
  "Production-Ready",
];

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
      <path d="M12 0l2.6 8.4L23 11l-8.4 2.6L12 22l-2.6-8.4L1 11l8.4-2.6L12 0z" />
    </svg>
  );
}

export default function PrincipleStrip() {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {principles.map((label, i) => (
        <motion.span
          key={label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 + i * 0.07, duration: 0.4, ease: "easeOut" }}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-text-secondary"
        >
          <StarIcon />
          {label}
        </motion.span>
      ))}
    </div>
  );
}
