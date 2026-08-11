"use client";

import { useRef, useSyncExternalStore, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

function subscribeHoverCapable(callback: () => void) {
  const mql = window.matchMedia(HOVER_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}
function getHoverCapableSnapshot() {
  return window.matchMedia(HOVER_QUERY).matches;
}
function getHoverCapableServerSnapshot() {
  return false;
}

/**
 * A soft radial glare that tracks the cursor 1:1 across the card's surface —
 * fades in on hover, follows the pointer, fades out on leave. Rendered as an
 * absolutely-positioned overlay layer so it never fights the card's own
 * background/border; the caller's `className` needs `relative overflow-hidden`.
 */
export default function GlareCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(50);
  const py = useMotionValue(50);
  const opacity = useMotionValue(0);
  const posSpring = { stiffness: 200, damping: 26, mass: 0.5 };
  const x = useSpring(px, posSpring);
  const y = useSpring(py, posSpring);
  const glareOpacity = useSpring(opacity, { stiffness: 220, damping: 30 });
  const background = useMotionTemplate`radial-gradient(280px circle at ${x}% ${y}%, var(--glow), transparent 65%)`;

  // Same hover-capability gate as TiltCard — touch devices never fire
  // mousemove, so skip the listeners/overlay there entirely rather than
  // leave an inert transform behind.
  const hoverCapable = useSyncExternalStore(
    subscribeHoverCapable,
    getHoverCapableSnapshot,
    getHoverCapableServerSnapshot
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set(((e.clientX - rect.left) / rect.width) * 100);
    py.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <div
      ref={ref}
      onMouseMove={hoverCapable ? handleMove : undefined}
      onMouseEnter={hoverCapable ? () => opacity.set(1) : undefined}
      onMouseLeave={hoverCapable ? () => opacity.set(0) : undefined}
      className={className}
    >
      {children}
      {hoverCapable ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background, opacity: glareOpacity }}
        />
      ) : null}
    </div>
  );
}
