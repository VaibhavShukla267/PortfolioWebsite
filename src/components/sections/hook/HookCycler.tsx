"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const TYPE_MS = 58;
const DELETE_MS = 32;
const HOLD_MS = 1900;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

// Same external-store pattern TiltCard uses for its hover-capability check —
// reads a browser-only media query without calling setState synchronously
// inside an effect, and gives SSR a safe default (false) to hydrate against.
function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}
function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}
function getReducedMotionServerSnapshot() {
  return false;
}

// A typewriter effect — each phrase is typed out character by character,
// holds, then deletes back down to nothing before the next phrase types in.
// Driven by a small state machine: `length` is how many characters of the
// current phrase are shown, `deleting` flips once fully typed (after a
// hold), and the index advances once fully deleted back to 0. Every state
// change happens inside the setTimeout callback rather than synchronously
// in the effect body, so each render only ever schedules the next step.
export default function HookCycler({ items }: { items: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    if (reduced) return;
    const full = items[index];
    const fullyTyped = !deleting && length === full.length;
    const delay = fullyTyped ? HOLD_MS : deleting ? DELETE_MS : TYPE_MS;

    const id = setTimeout(() => {
      if (fullyTyped) {
        setDeleting(true);
        return;
      }
      if (deleting && length === 0) {
        setDeleting(false);
        setIndex((i) => (i + 1) % items.length);
        return;
      }
      setLength((l) => l + (deleting ? -1 : 1));
    }, delay);

    return () => clearTimeout(id);
  }, [length, deleting, index, items, reduced]);

  const full = items[index];
  const shown = reduced ? full : full.slice(0, length);

  return (
    <span className="text-gradient block min-h-[1.2em]">
      {shown}
      {!reduced ? (
        <span
          aria-hidden
          className="ml-0.5 inline-block w-[3px] translate-y-[0.08em] animate-pulse bg-accent align-middle"
          style={{ height: "0.85em" }}
        />
      ) : null}
    </span>
  );
}
