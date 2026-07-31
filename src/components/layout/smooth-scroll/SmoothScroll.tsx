"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(() =>
    typeof window === "undefined"
      ? true
      : !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setEnabled(!mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
