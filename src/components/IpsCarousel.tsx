"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const ips = [
  { img: "/figma/ip-1.png", w: 169, h: 165 },
  { img: "/figma/ip-3.png", w: 207, h: 202 },
  { img: "/figma/ip-5.png", w: 266, h: 261 },
  { img: "/figma/ip-4.png", w: 207, h: 202 },
  { img: "/figma/ip-2.png", w: 169, h: 165 },
];

function Badge({
  img,
  w,
  h,
  large = false,
}: {
  img: string;
  w: number;
  h: number;
  large?: boolean;
}) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full border-2 border-primary/60 bg-[#EEF6FF] text-center shadow-xl shadow-primary/20 ${
        large ? "h-44 w-44 sm:h-60 sm:w-60" : "h-28 w-28 sm:h-36 sm:w-36"
      }`}
    >
      <Image
        src={img}
        alt="Epigrotive tournament IP logo"
        width={w}
        height={h}
        className="h-auto w-2/3 object-contain"
      />
    </div>
  );
}

export default function IpsCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const n = ips.length;

  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + n) % n);
  }, [n]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 4000);
    return () => clearInterval(t);
  }, [paused, go]);

  const order = [0, 1, 2, 3, 4].map((k) => (index + k) % n);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-4 pt-12 text-center sm:px-6">
        <Reveal>
          <h2 className="font-rajdhani text-3xl font-bold text-ink sm:text-[3.4rem] sm:leading-[1.05]">
            OUR IPS.
          </h2>
          <p className="font-rajdhani mt-1 text-2xl font-bold text-primary sm:text-[3.4rem] sm:leading-[1.05]">
            EMBRACE THE CHALLENGE.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-muted sm:text-sm">
            Formats we&apos;ve built from scratch and grow season after season —
            because ownership means every rule, every rivalry, and every night
            on stage is entirely ours.
          </p>
        </Reveal>
      </div>

      <div
        className="bg-band relative mt-8 overflow-hidden bg-primary"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current == null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (dx > 40) go(-1);
          if (dx < -40) go(1);
          touchX.current = null;
        }}
      >
        <div className="absolute inset-x-0 top-0 h-16 rounded-b-[50%] bg-white" />
        <div className="absolute inset-x-0 bottom-0 h-16 rounded-t-[50%] bg-white" />

        <div className="relative mx-auto flex max-w-6xl items-center justify-between px-2 py-14 sm:px-6">
          <button
            onClick={() => go(-1)}
            aria-label="Previous IP"
            className="z-10 flex h-10 w-10 items-center justify-center rounded-full text-2xl font-bold text-white transition hover:bg-white/20"
          >
            ≪
          </button>
          <div className="flex flex-1 items-center justify-center gap-2 sm:gap-4">
            {order.map((ipIdx, pos) => {
              const center = pos === 2;
              return (
                <div
                  key={ipIdx}
                  className={`transition-all duration-500 ${
                    center
                      ? "z-10 scale-100 opacity-100"
                      : pos === 1 || pos === 3
                        ? "-mx-10 scale-75 opacity-90 sm:-mx-12"
                        : "-mx-14 scale-[0.6] opacity-70"
                  } ${pos === 0 || pos === 4 ? "hidden sm:flex" : "flex"}`}
                  style={{ transform: undefined }}
                >
                  <Badge
                    img={ips[ipIdx].img}
                    w={ips[ipIdx].w}
                    h={ips[ipIdx].h}
                    large={center}
                  />
                </div>
              );
            })}
          </div>
          <button
            onClick={() => go(1)}
            aria-label="Next IP"
            className="z-10 flex h-10 w-10 items-center justify-center rounded-full text-2xl font-bold text-white transition hover:bg-white/20"
          >
            ≫
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 bg-white pb-4">
        {ips.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to IP ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-primary" : "w-2 bg-line"}`}
          />
        ))}
      </div>
    </section>
  );
}
