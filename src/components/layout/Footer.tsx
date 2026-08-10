"use client";

import { profile } from "@/lib/data";
import { scrollToTarget } from "@/lib/lenis-singleton";

export default function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 text-center text-xs text-text-tertiary sm:flex-row sm:px-8 sm:text-left">
        <span>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </span>
        <span className="font-mono">
          Built with Next.js · Framer Motion · GSAP
        </span>
        <button
          type="button"
          onClick={() => scrollToTarget("#top")}
          data-cursor-hover
          className="font-mono uppercase tracking-[0.2em] text-text-secondary transition-colors hover:text-accent"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
