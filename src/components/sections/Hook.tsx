"use client";

import { motion } from "framer-motion";
import { scrollToTarget } from "@/lib/lenis-singleton";
import HookCycler from "./hook/HookCycler";

const questions = [
  "in need of a developer who ships production-ready code, not just prototypes?",
  "looking for someone who can turn a messy brief into a polished product?",
  "struggling with development — stalled builds, tangled code, missed deadlines?",
];

// A pain-point hook bridging the hero and the résumé-style sections below —
// speaks directly to the visitor's problem before asking them to read
// credentials. No index/eyebrow number: it's an interstitial, not a
// numbered content section.
export default function Hook() {
  return (
    <section className="relative py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs uppercase tracking-[0.25em] text-text-tertiary"
        >
          A quick question
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-text-primary sm:text-5xl md:text-6xl balance"
        >
          Are you
          <HookCycler items={questions} />
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-8 max-w-md text-base text-text-secondary sm:text-lg"
        >
          That&apos;s exactly where I come in.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4"
        >
          <button
            type="button"
            onClick={() => scrollToTarget("#work", -24)}
            data-cursor-hover
            className="rounded-full bg-text-primary px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-bg transition-opacity hover:opacity-85 sm:px-7 sm:py-3.5"
          >
            See the Work
          </button>
          <button
            type="button"
            onClick={() => scrollToTarget("#contact", -24)}
            data-cursor-hover
            className="rounded-full border border-border-strong px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-text-primary transition-colors hover:border-accent hover:text-accent sm:px-7 sm:py-3.5"
          >
            Let&apos;s Talk
          </button>
        </motion.div>
      </div>
    </section>
  );
}
