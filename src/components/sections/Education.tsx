"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { certifications, education } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="relative py-8 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="05"
          eyebrow="Education & Certifications"
          title="The formal foundation,"
          accent="kept current."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-2">
          {education.map((item, i) => (
            <motion.div
              key={item.school}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="rounded-3xl border border-border bg-surface p-6 sm:p-8"
            >
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
                {item.period}
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold text-text-primary sm:text-2xl">
                {item.school}
              </h3>
              <div className="mt-1 text-sm text-accent">{item.degree}</div>
              <div className="mt-4 font-mono text-xs text-text-secondary">
                {item.detail}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 sm:mt-16">
          <div className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-text-tertiary">
            Certifications & Learning
          </div>
          <div className="flex flex-wrap gap-3">
            {certifications.map((cert, i) => (
              <motion.span
                key={cert}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-full border border-border px-4 py-2 text-sm text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary"
              >
                {cert}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
