"use client";

import { motion } from "framer-motion";
import RevealText from "@/components/ui/RevealText";
import Marquee from "@/components/ui/Marquee";
import { profile } from "@/lib/data";

const socials = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, "")}` },
  { label: "LinkedIn", value: "vaibhav-shukla", href: profile.linkedin },
  { label: "GitHub", value: "VaibhavShukla267", href: profile.github },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-8 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-text-tertiary">
          <span className="text-accent">06</span>
          <span className="mx-3">—</span>
          Contact
        </div>

        <h2 className="mt-5 max-w-4xl font-display text-[11vw] font-semibold leading-[1.05] tracking-tight text-text-primary sm:mt-6 sm:text-6xl md:text-7xl balance">
          <RevealText as="span" by="words" className="inline">
            Let&apos;s build something worth
          </RevealText>{" "}
          <span className="font-normal italic text-text-tertiary">shipping.</span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-5 max-w-lg text-[15px] text-text-secondary sm:mt-6 sm:text-lg"
        >
          Open to full-stack, front-end, and GenAI-automation roles. Reach out
          directly — no forms, no gatekeeping.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-8 sm:mt-10"
        >
          <a
            href={`mailto:${profile.email}`}
            data-cursor-hover
            className="group inline-flex max-w-full items-center gap-3 rounded-full bg-text-primary py-3.5 pl-5 pr-4 font-display text-sm font-semibold text-bg transition-opacity hover:opacity-85 sm:gap-4 sm:py-5 sm:pl-8 sm:pr-6 sm:text-xl md:text-2xl"
          >
            <span className="truncate">{profile.email}</span>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bg text-text-primary sm:h-9 sm:w-9">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="sm:h-4 sm:w-4">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </span>
          </a>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-5 border-t border-border pt-8 min-[420px]:grid-cols-2 sm:mt-16 sm:gap-6 sm:pt-10 md:grid-cols-4">
          {socials.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              data-cursor-hover
              className="group flex min-w-0 flex-col gap-1.5"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-tertiary">
                {item.label}
              </span>
              <span className="truncate text-sm text-text-secondary transition-colors group-hover:text-accent sm:text-base">
                {item.value}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-16 sm:mt-24">
        <Marquee speed={42}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="flex items-center gap-6 font-display text-3xl font-semibold text-text-primary/10 sm:text-5xl lg:text-7xl"
            >
              Available for work
              <span className="h-3 w-3 rounded-full bg-accent" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
