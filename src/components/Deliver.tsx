import Image from "next/image";
import { Box, Layer, T, u } from "./design";
import { safeHref, safeSrc } from "@/lib/content/merge";
import type { Content } from "@/lib/content/types";

type D = Content["deliver"];

const A = "/figma/deliver";

/* Desktop: Figma frame 6:2, section starts at y=2796.63 (bottom of the Stats
   section). Mobile "What we deliver": node 40:2953. */
const Y0 = 2796.63;
const y = (n: number) => n - Y0;

type Service = {
  card: { left: number; width: number };
  ph: { src: string; left: number; width: number };
  num: { left: number; size: number; tracking: number; color: string };
  name: { left: number; top: number; size: number; tracking: number; color: string };
  lines: { left: number; top: number; size: number; tracking: number; color: string }[];
  circleLeft: number;
  mGlow: string;
  mIcon: string;
};

const SERVICES: Service[] = [
  {
    card: { left: 116, width: 422 },
    ph: { src: `${A}/ph1.svg`, left: 117, width: 420 },
    num: { left: 156, size: 26.439, tracking: 1.1147, color: "#015ef2" },
    name: { left: 156, top: 3451, size: 38.319, tracking: -0.9362, color: "#000141" },
    lines: [
      { left: 156, top: 3501, size: 18.354, tracking: -0.2309, color: "#646faa" },
      { left: 155, top: 3526, size: 18.419, tracking: -0.4028, color: "#5d69a7" },
      { left: 156, top: 3552, size: 19.317, tracking: -0.8564, color: "#606ba9" },
      { left: 155, top: 3579, size: 17.81, tracking: -0.1578, color: "#5c69a8" },
    ],
    circleLeft: 454,
    mGlow: `${A}/m-glow1.svg`,
    mIcon: `${A}/m-icon1.svg`,
  },
  {
    card: { left: 546, width: 409 },
    ph: { src: `${A}/ph2.svg`, left: 547.99, width: 406 },
    num: { left: 581, size: 26.439, tracking: 1.3558, color: "#005af2" },
    name: { left: 582, top: 3449, size: 36.984, tracking: -0.1598, color: "#010548" },
    lines: [
      { left: 582, top: 3501, size: 18.635, tracking: -0.484, color: "#5e6aa4" },
      { left: 582, top: 3526, size: 18.419, tracking: -0.3858, color: "#5d6aa6" },
      { left: 582, top: 3552, size: 18.635, tracking: -0.5217, color: "#5f6aa8" },
      { left: 581, top: 3582, size: 19.457, tracking: -1.0418, color: "#5d6ead" },
    ],
    circleLeft: 871,
    mGlow: `${A}/m-glow2.svg`,
    mIcon: `${A}/m-icon2.svg`,
  },
  {
    card: { left: 968, width: 409 },
    ph: { src: `${A}/ph3.svg`, left: 969.09, width: 406 },
    num: { left: 1006, size: 27.994, tracking: -0.2899, color: "#0155f3" },
    name: { left: 1006, top: 3450, size: 36.984, tracking: 0.0114, color: "#000141" },
    lines: [
      { left: 1007, top: 3501, size: 18.635, tracking: -0.4522, color: "#5e69a7" },
      { left: 1006, top: 3527, size: 17.6, tracking: -0.0833, color: "#5e6ba9" },
      { left: 1006, top: 3552, size: 18.635, tracking: -0.5018, color: "#626eac" },
    ],
    circleLeft: 1293,
    mGlow: `${A}/m-glow3.svg`,
    mIcon: `${A}/m-icon3.svg`,
  },
  {
    card: { left: 1387, width: 417 },
    ph: { src: `${A}/ph4.svg`, left: 1388.99, width: 414 },
    num: { left: 1425, size: 26.439, tracking: 0.2407, color: "#015af7" },
    name: { left: 1425, top: 3449, size: 37.975, tracking: -0.738, color: "#000244" },
    lines: [
      { left: 1425, top: 3501, size: 18.885, tracking: -0.5817, color: "#636fb2" },
      { left: 1424, top: 3527, size: 17.6, tracking: -0.0145, color: "#606fb1" },
      { left: 1425, top: 3552, size: 18.857, tracking: -0.6289, color: "#6574b7" },
    ],
    circleLeft: 1720,
    mGlow: `${A}/m-glow4.svg`,
    mIcon: `${A}/m-icon4.svg`,
  },
];

function DesktopDeliver({ d }: { d: D }) {
  return (
    <div className="relative hidden lg:block" style={{ height: u(1003.37) }}>
      <h2>
        <T left={826} top={y(2802)} size={56.376} tracking={0.401} weight={700} color="#010a41" font="exo">
          {d.heading1}
        </T>
        <T left={844} top={y(2861)} size={58.091} tracking={-2.4946} weight={600} color="#0464f9">
          {d.heading2}
        </T>
      </h2>
      <T left={758} top={y(2934)} size={21.488} tracking={-0.2132} weight={400} color="#656ea1" font="body">
        {d.subtitle}
      </T>

      {SERVICES.map((s, si) => {
        const c = d.services[si];
        if (!c) return null;
        return (
        <div key={si}>
          <Box
            left={s.card.left}
            top={y(2995)}
            width={s.card.width}
            height={674}
            className="border border-[#eaf0f9] bg-gradient-to-b from-white to-[#f8fbff]"
            style={{
              borderRadius: u(12),
              boxShadow: `0 ${u(8)} ${u(36)} rgba(54,92,154,0.06)`,
            }}
          />
          <Layer src={c.image ? safeSrc(c.image) : s.ph.src} left={s.ph.left} top={y(2996)} width={s.ph.width} height={395} className={c.image ? "object-cover" : ""} />
          <T left={s.num.left} top={y(si === 2 ? 3410 : 3411)} size={s.num.size} tracking={s.num.tracking} weight={700} color={s.num.color} font="rajdhani">
            {c.number}
          </T>
          <h3>
            <T left={s.name.left} top={y(s.name.top)} size={s.name.size} tracking={s.name.tracking} weight={700} color={s.name.color} font="rajdhani">
              {c.title}
            </T>
          </h3>
          {c.copy.map((line, i) => {
            const l = s.lines[Math.min(i, s.lines.length - 1)];
            return (
              <T key={i} left={l.left} top={y(l.top + Math.max(0, i - (s.lines.length - 1)) * 26)} size={l.size} tracking={l.tracking} weight={400} color={l.color} font="body">
                {line}
              </T>
            );
          })}
          <a
            href={safeHref(c.href)}
            aria-label={`Talk to us about ${c.title}`}
            className="absolute transition hover:scale-105"
            style={{ left: u(s.circleLeft), top: u(y(3591)), width: u(54), height: u(54) }}
          >
            <Layer src={`${A}/circle.svg`} left={0} top={0} width={54} height={54} />
            <Layer src={`${A}/arrow.svg`} left={16} top={17} width={23} height={14.786} />
          </a>
        </div>
        );
      })}
    </div>
  );
}

/* ---------- mobile (390px) ---------- */

function MobileDeliver({ d }: { d: D }) {
  return (
    <div className="flex flex-col gap-8 bg-white px-5 pb-[76px] pt-[66px] lg:hidden">
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="font-barlow w-full text-[31px] font-extrabold uppercase text-[#08162f]">
          <span className="block leading-[0.98]">{d.heading1}</span>
          <span className="block leading-[0.98] text-[#086bfa]">{d.heading2}</span>
        </p>
        <p className="mt-px w-full text-[11px] leading-[1.55] text-[#65728a]">
          {d.subtitle}
        </p>
      </div>
      <div className="-mt-0.5 flex w-full flex-col gap-[14px]">
        {d.services.map((s, si) => (
          <article
            key={si}
            className="flex h-[360px] w-full flex-col overflow-hidden rounded-[14px] border border-[#dce7f4] bg-white shadow-[0_10px_28px_rgba(36,76,143,0.09)]"
          >
            <div className="relative flex h-[196px] w-full shrink-0 items-center justify-center overflow-hidden bg-[#04142c]">
              {s.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={safeSrc(s.image)} alt="" className="absolute inset-0 size-full object-cover" />
              ) : (
                <>
              <Image
                src={SERVICES[si]?.mGlow ?? SERVICES[0].mGlow}
                alt=""
                width={200}
                height={200}
                className="pointer-events-none absolute top-[-12px] max-w-none"
                style={{ left: "calc(50% - 98px)" }}
              />
              <Image
                src={`${A}/m-orbit.svg`}
                alt=""
                width={200}
                height={200}
                className="pointer-events-none absolute top-[-12px] max-w-none"
                style={{ left: "calc(50% - 98px)" }}
              />
              <span className="relative flex size-[74px] items-center justify-center rounded-[22px] border border-[#315b8c] bg-[#0d2a51]">
                <Image src={SERVICES[si]?.mIcon ?? SERVICES[0].mIcon} alt="" width={34} height={34} />
              </span>
                </>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-2 px-[15px] pb-4 pt-4">
              <p className="text-[9px] font-extrabold leading-[normal] text-[#086bfa]">
                {s.number}
              </p>
              <div className="flex w-full items-center justify-between">
                <h3 className="font-barlow whitespace-nowrap text-[23px] font-extrabold leading-[normal] text-[#08162f]">
                  {s.title}
                </h3>
                <a
                  href={safeHref(s.href)}
                  aria-label={`Talk to us about ${s.title}`}
                  className="flex size-[32px] shrink-0 items-center justify-center rounded-full bg-[#eaf4ff]"
                >
                  <Image src={`${A}/m-arrow.svg`} alt="" width={15} height={15} />
                </a>
              </div>
              <p className="w-full text-[10px] leading-[1.45] text-[#65728a]">
                {s.mobileCopy}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function Deliver({ data }: { data: D }) {
  return (
    <section id="deliver" className="relative">
      <MobileDeliver d={data} />
      <DesktopDeliver d={data} />
    </section>
  );
}
