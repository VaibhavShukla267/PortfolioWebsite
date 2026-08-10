"use client";

import { useRef, useSyncExternalStore, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

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

export default function TiltCard({
  children,
  className,
  maxTilt = 6,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 220, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), spring);

  // Touch devices never fire mousemove, so the tilt never actually engages there —
  // but the idle `perspective(...) rotateX(0) rotateY(0)` transform it leaves behind,
  // nested inside this card's overflow-hidden content, is enough to trigger a known
  // WebKit/iOS Safari bug where the content underneath fails to paint at all. Only
  // apply the 3D transform on devices that can actually hover/point precisely.
  // Server snapshot defaults to false so SSR markup matches the pre-hydration DOM.
  const tiltEnabled = useSyncExternalStore(
    subscribeHoverCapable,
    getHoverCapableSnapshot,
    getHoverCapableServerSnapshot
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={tiltEnabled ? handleMove : undefined}
      onMouseLeave={tiltEnabled ? handleLeave : undefined}
      style={tiltEnabled ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}
