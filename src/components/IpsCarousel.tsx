"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { Layer, T, u } from "./design";
import { safeSrc } from "@/lib/content/merge";
import type { Content } from "@/lib/content/types";

type I = Content["ips"];
type Ip = I["items"][number];

const A = "/figma/ips";

/* Desktop: Figma frame 6:2, section starts at y=3800 (bottom of Deliver).
   Mobile "Original IPs": node 40:3010. */
const Y0 = 3800;
const y = (n: number) => n - Y0;

const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";
const MS = 700;

/* A conveyor of 7 slots: -1 and 5 are hidden just outside the visible row
   (0..4). Moving next slides everything one slot left: the item in slot 0
   fades out to slot -1 while the item waiting in slot 5 slides into slot 4.
   The item that ends up in a hidden end slot is moved to the opposite hidden
   slot with no transition (it is invisible there). Content follows the slot,
   so neighbouring slots always show consecutive IPs. */
const SLOTS_N = 7;
const mod = (n: number, m: number) => ((n % m) + m) % m;

function useCarousel(IPS: Ip[]) {
  const [step, setStep] = useState(0);
  const [tick, setTick] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const busy = useRef(false);
  const go = useCallback((d: 1 | -1) => {
    if (busy.current) return;
    busy.current = true;
    setTimeout(() => (busy.current = false), MS * 0.55);
    setStep((o) => o + d);
    setDir(d);
    setTick((t) => t + 1);
  }, []);
  const pos = (i: number) => mod(i - step, SLOTS_N) - 1;
  const wrapped =
    tick === 0
      ? -1
      : [...Array(SLOTS_N).keys()].find((i) => pos(i) === (dir === 1 ? 5 : -1)) ?? -1;
  const content = (i: number) => IPS[mod(step + pos(i), IPS.length)];
  return { tick, go, pos, wrapped, content, centre: IPS[mod(step + 2, IPS.length)] };
}

const SHADOW = "drop-shadow(0 calc(3 * var(--u)) calc(36.5 * var(--u)) rgba(37,121,255,0.35))";

/* Positions left -> right, from the Figma slots (logo rect is relative to its slot). */
const GEOM = [
  { slot: `${A}/slot1.svg`, left: 369, top: 4272.68, w: 220, h: 214.4, logo: `${A}/logo45.png`, ll: 412.6, lt: 4308.1, lw: 135, lh: 131.8, z: 0, o: 0 },
  { slot: `${A}/slot1.svg`, left: 475.5, top: 4245.68, w: 275.491, h: 268.4, logo: `${A}/logo45.png`, ll: 530, lt: 4290, lw: 169, lh: 165, z: 10, o: 1 },
  { slot: `${A}/slot3.svg`, left: 609.5, top: 4215.64, w: 337.146, h: 328.467, logo: `${A}/logo51.png`, ll: 676, lt: 4270, lw: 207, lh: 202, z: 30, o: 1 },
  { slot: `${A}/slot5.svg`, left: 742.5, top: 4168.95, w: 433, h: 421.853, logo: `${A}/logo57.png`, ll: 829, lt: 4239, lw: 266, lh: 261, z: 50, o: 1 },
  { slot: `${A}/slot3.svg`, left: 962.5, top: 4215.64, w: 337.146, h: 328.467, logo: `${A}/logo51.png`, ll: 1029, lt: 4270, lw: 207, lh: 202, z: 30, o: 1 },
  { slot: `${A}/slot2.svg`, left: 1138.25, top: 4245.68, w: 275.491, h: 268.4, logo: `${A}/logo45.png`, ll: 1193, lt: 4290, lw: 169, lh: 165, z: 10, o: 1 },
  { slot: `${A}/slot2.svg`, left: 1331, top: 4272.68, w: 220, h: 214.4, logo: `${A}/logo45.png`, ll: 1374.6, lt: 4308.1, lw: 135, lh: 131.8, z: 0, o: 0 },
];

function DesktopIps({ d }: { d: I }) {
  const { tick, go, pos, wrapped, content } = useCarousel(d.items);
  return (
    <div className="relative hidden lg:block" style={{ height: u(902) }}>
      <Layer src={`${A}/band.png`} left={0} top={y(4117)} width={1920} height={577} className="object-cover" />

      <h2>
        <T left={829} top={y(3852)} size={71.54} tracking={0.1629} weight={700} color="#0c1b3a" font="rajdhani">
          {d.heading1}
        </T>
        <T left={568} top={y(3942)} size={71.54} tracking={0.2174} weight={700} color="#1577fe" font="rajdhani">
          {d.heading2}
        </T>
      </h2>
      <T left={460} top={y(4056)} size={23.535} tracking={0.2776} weight={400} color="#52627b" font="body">
        {d.sub1}
      </T>
      <T left={538} top={y(4092)} size={23.812} tracking={0.1223} weight={400} color="#52627b" font="body">
        {d.sub2}
      </T>

      {Array.from({ length: SLOTS_N }, (_, i) => {
        const g = GEOM[pos(i) + 1];
        const ip = content(i);
        const jump = i === wrapped;
        return (
          <div
            key={i}
            aria-hidden={pos(i) !== 2}
            className="absolute"
            style={{
              left: u(g.left),
              top: u(y(g.top)),
              width: u(g.w),
              height: u(g.h),
              zIndex: g.z,
              opacity: g.o,
              transition: jump
                ? "none"
                : `left ${MS}ms ${EASE}, top ${MS}ms ${EASE}, width ${MS}ms ${EASE}, height ${MS}ms ${EASE}, opacity ${MS}ms ${EASE}, z-index ${MS}ms ${EASE}`,
            }}
          >
            {pos(i) === 2 && <span key={`r${tick}`} aria-hidden="true" className="ip-ring" />}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={g.slot} alt="" className="pointer-events-none absolute inset-0 size-full max-w-none" style={{ filter: SHADOW }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ip.logo ? safeSrc(ip.logo, g.logo) : g.logo}
              alt={pos(i) === 2 ? ip.name : ""}
              className={`pointer-events-none absolute max-w-none object-cover ${pos(i) === 2 ? "ip-float" : ""}`}
              style={{
                left: `${((g.ll - g.left) / g.w) * 100}%`,
                top: `${((g.lt - g.top) / g.h) * 100}%`,
                width: `${(g.lw / g.w) * 100}%`,
                height: `${(g.lh / g.h) * 100}%`,
              }}
            />
          </div>
        );
      })}

      <button
        type="button"
        aria-label="Previous IP"
        onClick={() => go(-1)}
        className="absolute z-10 transition hover:scale-110 active:scale-95"
        style={{ left: u(249), top: u(y(4353)), width: u(41), height: u(60) }}
      >
        <Layer src={`${A}/arrow-l.svg`} left={0} top={0} width={41} height={60} />
      </button>
      <button
        type="button"
        aria-label="Next IP"
        onClick={() => go(1)}
        className="absolute z-10 transition hover:scale-110 active:scale-95"
        style={{ left: u(1640), top: u(y(4353)), width: u(41), height: u(60) }}
      >
        <Layer src={`${A}/arrow-r.svg`} left={0} top={0} width={41} height={60} />
      </button>
    </div>
  );
}

/* ---------- mobile (390px) ---------- */

/* Mobile positions left -> right, as px from the centre of the strip so the
   row stays centred at any phone width: two hidden off-screen each side, three
   visible (box sizes/positions from the Figma carousel at 390px). */
const M_GEOM = [
  { left: -449, size: 130, opacity: 0 },
  { left: -321, size: 130, opacity: 0 },
  { left: -193, size: 130, opacity: 1 },
  { left: -95, size: 190, opacity: 1 },
  { left: 63, size: 130, opacity: 1 },
  { left: 191, size: 130, opacity: 0 },
  { left: 319, size: 130, opacity: 0 },
];

function GridBackdrop() {
  const line = "rgba(22,53,91,0.55)";
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 h-[430px] bg-[#04142c]"
      style={{
        backgroundImage: `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(to bottom, ${line} 1px, transparent 1px)`,
        backgroundSize: "30px 30px",
      }}
    />
  );
}

function MobileIps({ d }: { d: I }) {
  const { tick, go, pos, wrapped, content, centre: ip } = useCarousel(d.items);
  const touchX = useRef<number | null>(null);
  return (
    <div className="flex h-[720px] flex-col items-center gap-8 overflow-hidden bg-[#fbfdff] pt-[62px] lg:hidden">
      <div className="flex w-full flex-col items-center gap-2 px-5 text-center">
        <p className="font-barlow w-full text-[31px] font-extrabold uppercase text-[#08162f]">
          <span className="block leading-[0.98]">{d.heading1}</span>
          <span className="block leading-[0.98] text-[#086bfa]">{d.heading2}</span>
        </p>
        <p className="relative top-px w-full text-[11px] leading-[1.55] text-[#65728a]">
          {d.sub1} {d.sub2}
        </p>
      </div>
      <div className="relative flex w-full flex-1 flex-col items-center overflow-hidden bg-[#086bfa] pt-[70px]">
        <GridBackdrop />
        <Image
          src={`${A}/m-halo.svg`}
          alt=""
          width={330}
          height={330}
          className="pointer-events-none absolute left-1/2 top-[52px] max-w-none -translate-x-1/2"
        />
        <div
          className="relative h-[230px] w-full shrink-0"
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          }}
        >
          {Array.from({ length: SLOTS_N }, (_, i) => {
            const p = pos(i);
            const g = M_GEOM[p + 1];
            const cip = content(i);
            const c = p === 2;
            const jump = i === wrapped;
            const fade = `opacity ${MS}ms ${EASE}`;
            return (
              <div
                key={i}
                aria-hidden={!c}
                className="absolute"
                style={{
                  left: `calc(50% + ${g.left}px)`,
                  top: (230 - g.size) / 2,
                  width: g.size,
                  height: g.size,
                  opacity: g.opacity,
                  zIndex: c ? 50 : 10,
                  transition: jump
                    ? "none"
                    : `left ${MS}ms ${EASE}, top ${MS}ms ${EASE}, width ${MS}ms ${EASE}, height ${MS}ms ${EASE}, opacity ${MS}ms ${EASE}, z-index ${MS}ms ${EASE}`,
                }}
              >
                {c && <span key={`r${tick}`} aria-hidden="true" className="ip-ring" />}
                <Image src={`${A}/m-secondary.svg`} alt="" width={202} height={202} className="pointer-events-none absolute max-w-none" style={{ left: "-27.69%", top: "-16.92%", width: "155.38%", height: "155.38%", opacity: c ? 0 : 1, transition: fade }} />
                <Image src={`${A}/m-featured.svg`} alt="" width={262} height={262} className="pointer-events-none absolute max-w-none" style={{ left: "-18.95%", top: "-11.58%", width: "137.9%", height: "137.9%", opacity: c ? 1 : 0, transition: fade }} />
                <span
                  className="pointer-events-none absolute"
                  style={{
                    left: c ? "12.63%" : "18.46%",
                    top: c ? "10.46%" : "19.2%",
                    width: c ? "74.74%" : "63.08%",
                    transition: `left ${MS}ms ${EASE}, top ${MS}ms ${EASE}, width ${MS}ms ${EASE}`,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cip.logo ? safeSrc(cip.logo, `${A}/m-featured-logo.png`) : `${A}/m-featured-logo.png`}
                    alt={c ? cip.name : ""}
                    width={207}
                    height={202}
                    className={`block h-auto w-full ${c ? "ip-float" : ""}`}
                  />
                </span>
              </div>
            );
          })}
          <button
            type="button"
            aria-label="Previous IP"
            onClick={() => go(-1)}
            className="absolute left-[18px] top-[94px] z-10 flex size-[38px] items-center justify-center rounded-full border border-[rgba(255,255,255,0.35)] bg-[rgba(255,255,255,0.15)] active:scale-95"
          >
            <Image src={`${A}/m-chevron.svg`} alt="" width={18} height={18} />
          </button>
        </div>
        <div className="relative flex w-[calc(100%-80px)] shrink-0 flex-col items-center gap-[7px] rounded-[22px] bg-[rgba(255,255,255,0.95)] p-5 shadow-[0_10px_28px_rgba(36,76,143,0.09)]">
          <Image src={`${A}/m-emblem.png`} alt="" width={71} height={66} className="size-[34px] object-contain" />
          <div
            key={tick}
            className={`flex w-full flex-col items-center gap-[7px] ${tick === 0 ? "" : "ip-text-in"}`}
          >
            <h3 className="font-barlow whitespace-nowrap text-[22px] font-extrabold uppercase leading-[normal] text-[#08162f]">
              {ip.name}
            </h3>
            <p className="w-full text-center text-[10px] leading-[1.45] text-[#65728a]">
              {ip.copy}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function IpsCarousel({ data }: { data: I }) {
  return (
    <section id="ips" className="relative">
      <MobileIps d={data} />
      <DesktopIps d={data} />
    </section>
  );
}
