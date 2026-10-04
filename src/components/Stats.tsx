"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

function useCountUp(target: number, start: boolean, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return val;
}

function StatCard({
  value,
  suffix,
  label,
  dark = false,
  children,
  start,
}: {
  value: number;
  suffix: string;
  label: string;
  dark?: boolean;
  children: React.ReactNode;
  start: boolean;
}) {
  const v = useCountUp(value, start);
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-line bg-white p-4 shadow-sm sm:gap-4 sm:p-5">
      <div className="min-w-0 shrink-0">
        <p
          className={`font-display text-[1.65rem] font-black leading-none sm:text-5xl ${dark ? "text-navy" : "text-primary"}`}
        >
          {v}
          {suffix}
        </p>
        <p className="mt-1.5 text-[9px] font-semibold tracking-[0.12em] text-muted sm:text-[10px]">
          {label}
        </p>
      </div>
      <div className="h-16 min-w-0 flex-1 sm:h-20">{children}</div>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setStart(true)),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid items-end gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-muted">
              <span className="inline-block h-[3px] w-8 bg-primary" /> EPIGRO
            </p>
            <h2 className="font-rajdhani mt-3 text-4xl font-bold leading-[1.02] sm:text-[4.3rem]">
              NUMBERS THAT
              <br />
              <span className="text-primary">DO THE TALKING.</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              Scale isn&apos;t a headline stat — it&apos;s the proof behind
              every campaign and every event, measured in the audiences who
              show up and stay.
            </p>
          </Reveal>
          <div aria-hidden="true" className="relative mx-auto hidden w-72 md:block">
            <div className="relative aspect-[2/1.2] overflow-hidden rounded-t-full">
              <Image
                src="/epig-mark.png"
                alt=""
                width={288}
                height={173}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
            </div>
          </div>
        </div>

        <div ref={ref} className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
          <Reveal>
            <StatCard value={150} suffix="+" label="LIVE EVENTS PRODUCED" start={start}>
              <svg viewBox="0 0 200 80" className="h-full w-full" aria-hidden="true">
                {[12, 22, 30, 38, 48, 56, 64, 74].map((h, i) => (
                  <rect
                    key={i}
                    x={10 + i * 23}
                    y={80 - h}
                    width="14"
                    height={h}
                    rx="2"
                    fill="#0B63FF"
                    opacity={0.25 + i * 0.09}
                  />
                ))}
              </svg>
            </StatCard>
          </Reveal>
          <Reveal delay={80}>
            <StatCard value={40} suffix="M+" label="CUMULATIVE VIEWS GENERATED" dark start={start}>
              <svg viewBox="0 0 200 80" className="h-full w-full" aria-hidden="true">
                <defs>
                  <linearGradient id="viewsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#0B63FF" stopOpacity="0.25" />
                    <stop offset="1" stopColor="#0B63FF" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M5 65 C 40 60, 60 40, 90 38 S 140 30, 195 8 L195 80 L5 80 Z"
                  fill="url(#viewsFill)"
                />
                <path
                  d="M5 65 C 40 60, 60 40, 90 38 S 140 30, 195 8"
                  fill="none"
                  stroke="#0B63FF"
                  strokeWidth="2"
                />
                {[
                  [5, 65],
                  [75, 42],
                  [125, 32],
                  [195, 8],
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="4" fill="#0B63FF" />
                ))}
              </svg>
            </StatCard>
          </Reveal>
          <Reveal delay={120}>
            <StatCard value={25} suffix="+" label="ACTIVE BRAND PARTNERS" start={start}>
              <svg viewBox="0 0 200 80" className="h-full w-full" aria-hidden="true">
                {Array.from({ length: 6 }).map((_, r) =>
                  Array.from({ length: 10 }).map((_, c) => (
                    <circle
                      key={`${r}-${c}`}
                      cx={12 + c * 19}
                      cy={10 + r * 12}
                      r="3.4"
                      fill={c >= 7 - Math.floor(r / 2) ? "#0B63FF" : "#C9D8F5"}
                    />
                  )),
                )}
              </svg>
            </StatCard>
          </Reveal>
          <Reveal delay={160}>
            <StatCard value={12} suffix="" label="ORIGINAL TOURNAMENT IPS" dark start={start}>
              <svg viewBox="0 0 200 80" className="h-full w-full" aria-hidden="true">
                {[34, 26, 18].map((r, i) => (
                  <circle
                    key={i}
                    cx="100"
                    cy="42"
                    r={r}
                    fill="none"
                    stroke="#C9D8F5"
                    strokeWidth="1.5"
                  />
                ))}
                <circle cx="100" cy="42" r="14" fill="#7FA9FF" />
                <circle cx="100" cy="42" r="14" fill="url(#orb)" opacity="0.6" />
                <defs>
                  <radialGradient id="orb" cx="0.35" cy="0.35" r="0.9">
                    <stop offset="0" stopColor="#fff" />
                    <stop offset="1" stopColor="#0B63FF" />
                  </radialGradient>
                </defs>
                <circle cx="178" cy="14" r="6" fill="#7FA9FF" />
              </svg>
            </StatCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
