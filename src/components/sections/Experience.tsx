"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import { experience } from "@/lib/data";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const fill = fillRef.current;
    if (!container || !fill) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      fill.style.height = "100%";
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 65%",
            end: "bottom 75%",
            scrub: 0.6,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="relative py-8 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          eyebrow="Experience"
          title="Two roles, one relentless focus on"
          accent="shipping."
        />

        <div ref={containerRef} className="relative mt-10 pl-6 sm:mt-16 sm:pl-12">
          <div className="absolute left-0 top-0 h-full w-px bg-border" />
          <div
            ref={fillRef}
            className="absolute left-0 top-0 w-px bg-accent"
            style={{ height: "0%" }}
          />

          <div className="flex flex-col gap-12 sm:gap-20">
            {experience.map((item, i) => (
              <motion.div
                key={item.role + item.period}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative"
              >
                <span className="absolute -left-6 top-1.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent ring-4 ring-bg sm:-left-12" />

                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-display text-2xl font-semibold text-text-primary sm:text-3xl">
                    {item.role}
                  </h3>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
                    {item.period}
                  </span>
                </div>
                <div className="mt-1 text-sm font-medium text-accent">
                  {item.company}
                </div>

                <ul className="mt-5 flex max-w-2xl flex-col gap-3">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-sm leading-relaxed text-text-secondary sm:text-base"
                    >
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-text-tertiary" />
                      {point}
                    </li>
                  ))}
                </ul>

                <span className="mt-6 block font-mono text-6xl font-semibold text-text-primary/5 select-none sm:text-7xl">
                  0{i + 1}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
