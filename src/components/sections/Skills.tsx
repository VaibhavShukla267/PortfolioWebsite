"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Marquee from "@/components/ui/Marquee";
import SkillOrbit from "./skills/SkillOrbit";
import TiltCard from "@/components/ui/TiltCard";
import { skillGroups } from "@/lib/data";

const allSkills = skillGroups.flatMap((g) => g.items);

export default function Skills() {
  return (
    <section id="skills" className="relative py-8 sm:py-14 lg:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-5 sm:gap-12 sm:px-8 lg:grid-cols-[1.3fr_1fr] lg:gap-8">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          title="A full-stack toolkit,"
          accent="production-tested."
          description="Not a checklist — the exact set of tools I reach for to take a platform from brief to shipped."
        />
        <div className="hidden lg:block">
          <SkillOrbit />
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:mt-14">
        <Marquee speed={62}>
          {allSkills.map((skill, i) => (
            <SkillPill key={`a-${i}-${skill}`} label={skill} />
          ))}
        </Marquee>
        <Marquee speed={70} reverse>
          {[...allSkills].reverse().map((skill, i) => (
            <SkillPill key={`b-${i}-${skill}`} label={skill} muted />
          ))}
        </Marquee>
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-5 sm:mt-20 sm:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: "easeOut" }}
              whileHover={{ y: -4 }}
            >
              <TiltCard
                maxTilt={4}
                className="group rounded-3xl border border-border bg-surface p-6 transition-colors hover:border-border-strong sm:p-7"
              >
                <div className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold text-text-primary">
                  {group.title}
                </h3>
                <p className="mt-2 text-sm text-text-tertiary">{group.blurb}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border px-3 py-1 text-xs text-text-secondary transition-colors group-hover:border-border-strong"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillPill({ label, muted = false }: { label: string; muted?: boolean }) {
  return (
    <span
      className={`flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 font-display text-sm sm:text-base ${
        muted
          ? "border-border text-text-tertiary"
          : "border-border-strong text-text-primary"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {label}
    </span>
  );
}
