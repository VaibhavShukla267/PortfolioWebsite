"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { navLinks, profile } from "@/lib/data";
import { scrollToTarget } from "@/lib/lenis-singleton";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  const handleNav = (href: string) => {
    setMenuOpen(false);
    scrollToTarget(href, -24);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 transition-all duration-500 sm:px-6 ${
            scrolled ? "glass shadow-soft py-2" : "py-1"
          }`}
          style={{ marginInline: "clamp(1rem, 4vw, 2rem)" }}
        >
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              handleNav("#top");
            }}
            data-cursor-hover
            className="font-display text-lg font-semibold tracking-tight text-text-primary"
          >
            {profile.initials}
            <span className="text-accent">.</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(link.href);
                }}
                data-cursor-hover
                className="rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-text-secondary transition-colors hover:text-text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="hidden rounded-full bg-text-primary px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-bg transition-opacity hover:opacity-85 sm:block"
            >
              Resume
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              data-cursor-hover
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full border border-border md:hidden"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                className="h-px w-4 bg-text-primary"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                className="h-px w-4 bg-text-primary"
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-bg px-8 md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(link.href);
                  }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.4, ease: "easeOut" }}
                  className="py-2 font-display text-3xl font-semibold text-text-primary sm:text-4xl"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * navLinks.length, duration: 0.4, ease: "easeOut" }}
                className="mt-4 font-mono text-sm uppercase tracking-[0.2em] text-accent"
              >
                Download Resume ↗
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
