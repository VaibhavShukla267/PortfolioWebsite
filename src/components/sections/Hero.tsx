"use client";

import { profile } from "@/lib/data";
import { scrollToTarget } from "@/lib/lenis-singleton";
import HeroPortrait from "./hero/HeroPortrait";
import RoleCycler from "./hero/RoleCycler";
import RevealText from "@/components/ui/RevealText";
import Counter from "@/components/ui/Counter";
import PrincipleStrip from "@/components/ui/PrincipleStrip";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-24 pb-8 sm:pt-28 sm:pb-10 lg:pt-32"
    >
      {/* ambient wash behind the whole hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(60% 50% at 78% 20%, var(--glow), transparent 70%)",
        }}
      />

      <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-8 px-5 sm:gap-10 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
            className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-text-tertiary sm:mb-6 sm:text-xs sm:tracking-[0.3em]"
          >
            Portfolio — {new Date().getFullYear()} · Based in India
          </motion.p>

          <RevealText
            as="h1"
            by="words"
            delay={0.1}
            className="font-display text-[15vw] font-semibold leading-[0.95] tracking-tight text-text-primary sm:text-[9vw] md:text-[6.4vw] lg:text-[5vw]"
          >
            {profile.name}
          </RevealText>

          <div className="mt-3 font-display text-xl font-medium text-text-secondary sm:mt-4 sm:text-3xl md:text-4xl">
            <RoleCycler roles={profile.roles} />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            className="mt-6 max-w-xl text-[15px] leading-relaxed text-text-secondary sm:mt-8 sm:text-base lg:text-lg"
          >
            I build high-traffic, SEO-strong web platforms and wire GenAI
            straight into the content pipeline — from pixel-level UI to the
            automation that ships it faster.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6, ease: "easeOut" }}
            className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4"
          >
            <button
              type="button"
              onClick={() => scrollToTarget("#work", -24)}
              data-cursor-hover
              className="rounded-full bg-text-primary px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-bg transition-opacity hover:opacity-85 sm:px-7 sm:py-3.5"
            >
              View Work
            </button>
            <button
              type="button"
              onClick={() => scrollToTarget("#contact", -24)}
              data-cursor-hover
              className="rounded-full border border-border-strong px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-text-primary transition-colors hover:border-accent hover:text-accent sm:px-7 sm:py-3.5"
            >
              Get in Touch
            </button>
          </motion.div>

          <div className="mt-8 sm:mt-12">
            <PrincipleStrip />
          </div>
        </div>

        <div className="lg:order-last">
          <HeroPortrait />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mx-auto mt-10 grid w-full max-w-7xl grid-cols-2 gap-x-4 gap-y-6 border-t border-border px-5 pt-6 sm:mt-0 sm:grid-cols-4 sm:gap-6 sm:px-8 sm:pt-8"
      >
        {profile.stats.map((stat) => (
          <div key={stat.label}>
            <div className="font-display text-2xl font-semibold text-text-primary sm:text-3xl lg:text-4xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </div>
            <div className="mt-1 text-[11px] text-text-tertiary sm:text-xs lg:text-sm">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
