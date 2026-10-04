"use client";

import { useEffect, useRef, useState } from "react";
import { ANIMATIONS_ENABLED } from "@/lib/animations";

/** Counts the leading number of `value` (e.g. "40M+" -> 0..40, keeping "M+")
 *  from 0 once it scrolls into view. Renders the final value on the server and
 *  when motion is disabled or reduced. */
export default function CountUp({
  value,
  duration = 1600,
}: {
  value: string;
  duration?: number;
}) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(target);

  useEffect(() => {
    if (!match || !ANIMATIONS_ENABLED) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    setN(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / duration);
          setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  if (!match) return <>{value}</>;
  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden="true">
        {n}
        {suffix}
      </span>
    </span>
  );
}
