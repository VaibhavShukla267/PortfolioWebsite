"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

type RevealTag = "div" | "p" | "h1" | "h2" | "h3" | "span";

type RevealTextProps = {
  children: string;
  as?: RevealTag;
  className?: string;
  /** Splits by "lines" (default, best for paragraphs) or "words" (punchier, for headlines) */
  by?: "lines" | "words";
  delay?: number;
  start?: string;
};

export default function RevealText({
  children,
  as: Tag = "div",
  className,
  by = "lines",
  delay = 0,
  start = "top 85%",
}: RevealTextProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    let split: SplitText | undefined;
    const ctx = gsap.context(() => {
      split = new SplitText(el, {
        type: by,
        mask: by,
        linesClass: "reveal-line",
      });
      const targets = by === "words" ? split.words : split.lines;

      gsap.set(targets, { yPercent: 110, opacity: 0 });
      gsap.to(targets, {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.06,
        delay,
        scrollTrigger: {
          trigger: el,
          start,
        },
      });
    }, el);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, [by, delay, start]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}
