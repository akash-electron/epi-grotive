import Image from "next/image";
import { Box, Layer, T, u } from "./design";
import { safeHref, safeSrc } from "@/lib/content/merge";
import type { Content } from "@/lib/content/types";

type E = Content["engines"];
type Card = E["cards"][number];

const A = "/figma/engines";

/* Desktop: Figma frame 6:2, section starts at y=953.63. Mobile: node 40:2852. */
const Y0 = 953.63;
const y = (n: number) => n - Y0;

type Engine = {
  card: { left: number; top: number };
  label: { left: number; size: number; tracking: number; color: string };
  title: { left: number; top: number; size: number; tracking: number; color: string }[];
  copy: { left: number; top: number; size: number; tracking: number; color: string }[];
  pills: { left: number; width: number }[];
  tags: { left: number; size: number; tracking: number; color: string }[];
  btn: { left: number; bg: string; labelLeft: number; size: number; tracking: number };
  arrow: { src: string; left: number; width: number; height: number };
  photo: { left: number; top: number; width: number; height: number };
  iconLeft: number;
};

const ENGINES: Engine[] = [
  {
    card: { left: 242, top: 1181 },
    iconLeft: 278,
    label: { left: 324, size: 13.384, tracking: 2.0053, color: "#203047" },
    title: [
      { left: 281, top: 1263, size: 41.444, tracking: -0.9805, color: "#021021" },
      { left: 281, top: 1309, size: 41.444, tracking: -1.6777, color: "#020f20" },
    ],
    copy: [
      { left: 280, top: 1368, size: 17.171, tracking: -0.1579, color: "#516177" },
      { left: 279, top: 1393, size: 16.372, tracking: 0.3594, color: "#516177" },
      { left: 279, top: 1418, size: 17.043, tracking: 0.013, color: "#506075" },
    ],
    pills: [
      { left: 280, width: 74 },
      { left: 368, width: 89 },
      { left: 471, width: 100 },
    ],
    tags: [
      { left: 295, size: 11, tracking: 1.2273, color: "#4c596d" },
      { left: 379, size: 10.707, tracking: 1.3729, color: "#48596d" },
      { left: 482, size: 10.692, tracking: 1.425, color: "#4e5e73" },
    ],
    btn: { left: 278, bg: "#006aff", labelLeft: 304, size: 12.41, tracking: 0.8222 },
    arrow: { src: `${A}/arrow-media.svg`, left: 414, width: 16, height: 10.286 },
    photo: { left: 680, top: 1218, width: 253, height: 302 },
  },
  {
    card: { left: 975.5, top: 1181 },
    iconLeft: 1011,
    label: { left: 1059, size: 13.384, tracking: 2.3494, color: "#1a2b43" },
    title: [
      { left: 1016, top: 1263, size: 42.292, tracking: 0.8643, color: "#021021" },
      { left: 1014, top: 1310, size: 41.494, tracking: -1.2156, color: "#020f1e" },
    ],
    copy: [
      { left: 1015, top: 1368, size: 16.762, tracking: -0.0801, color: "#506176" },
      { left: 1014, top: 1393, size: 16.565, tracking: -0.0207, color: "#546478" },
      { left: 1014, top: 1419, size: 12.878, tracking: 2.0698, color: "#4d5f74" },
    ],
    pills: [
      { left: 1015, width: 80 },
      { left: 1105, width: 126 },
      { left: 1242, width: 120 },
    ],
    tags: [
      { left: 1029, size: 10.692, tracking: 0.9502, color: "#283b54" },
      { left: 1124, size: 10.692, tracking: 0.9352, color: "#20324a" },
      { left: 1258, size: 12.028, tracking: -0.2005, color: "#22354e" },
    ],
    btn: { left: 1011, bg: "#1469d9", labelLeft: 1038, size: 12.266, tracking: 0.6194 },
    arrow: { src: `${A}/arrow-gaming.svg`, left: 1148, width: 18, height: 11.571 },
    photo: { left: 1367, top: 1212, width: 313, height: 318 },
  },
];

function DesktopCard({ e, c }: { e: Engine; c: Card }) {
  return (
    <>
      <Box left={e.card.left} top={y(e.card.top)} width={705} height={402}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${A}/card.svg`}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute block max-w-none"
          style={{ left: "-5.11%", top: "-6.97%", width: "110.22%", height: "117.92%" }}
        />
      </Box>
      <Box left={e.iconLeft} top={y(1211)} width={30} height={30} className="rounded-[7px] bg-[#006bff]" style={{ borderRadius: u(7) }} />
      {[1220, 1225, 1230].map((t) => (
        <Box key={t} left={e.iconLeft + 8} top={y(t)} width={14} height={1.8} className="bg-white" />
      ))}
      <T left={e.label.left} top={y(1221)} size={e.label.size} tracking={e.label.tracking} weight={600} color={e.label.color} font="body">
        {c.label}
      </T>
      <h3>
        {e.title.map((t, i) => (
          <T key={i} left={t.left} top={y(t.top)} size={t.size} tracking={t.tracking} weight={600} color={t.color}>
            {[c.title1, c.title2][i]}
          </T>
        ))}
      </h3>
      {c.copy.map((line, i) => {
        const m = e.copy[Math.min(i, e.copy.length - 1)];
        return (
          <T key={i} left={m.left} top={y(m.top + Math.max(0, i - (e.copy.length - 1)) * 25)} size={m.size} tracking={m.tracking} weight={400} color={m.color} font="body">
            {line}
          </T>
        );
      })}
      {e.pills.slice(0, c.tags.length).map((p) => (
        <Box key={p.left} left={p.left} top={y(1455)} width={p.width} height={29} className="bg-[#edf2f8]" style={{ borderRadius: u(15) }} />
      ))}
      {e.tags.map((t, i) => (
        <T key={i} left={t.left} top={y(1465)} size={t.size} tracking={t.tracking} weight={600} color={t.color} font="body">
          {c.tags[i] ?? ""}
        </T>
      ))}
      <a
        href={safeHref(c.href)}
        aria-label={c.cta}
        className="absolute transition hover:brightness-90"
        style={{
          left: u(e.btn.left),
          top: u(y(1505)),
          width: u(179),
          height: u(44),
          borderRadius: u(23),
          backgroundColor: e.btn.bg,
        }}
      />
      <T left={e.btn.labelLeft} top={y(1521)} size={e.btn.size} tracking={e.btn.tracking} weight={600} color="#ffffff" font="body" inert>
        {c.cta}
      </T>
      <Layer src={e.arrow.src} left={e.arrow.left} top={y(1520)} width={e.arrow.width} height={e.arrow.height} />
      <Layer src={safeSrc(c.photo)} left={e.photo.left} top={y(e.photo.top)} width={e.photo.width} height={e.photo.height} className="object-cover" />
    </>
  );
}

function DesktopEngines({ d }: { d: E }) {
  return (
    <div
      className="relative hidden lg:block"
      style={{ height: u(743), marginTop: u(-10.37) }}
    >
      <Layer src={`${A}/panel.svg`} left={131.6} top={0} width={1658} height={743} />
      <h2>
        <T left={842} top={y(1061)} size={40.107} tracking={-0.9186} weight={600} color="#222222">
          {d.heading1}
        </T>
        <T left={820} top={y(1110)} size={41.444} tracking={-1.8113} weight={600} color="#0066ff">
          {d.heading2}
        </T>
      </h2>
      {ENGINES.map((e, i) => d.cards[i] && <DesktopCard key={i} e={e} c={d.cards[i]} />)}
    </div>
  );
}

/* ---------- mobile (390px) ---------- */

function MobileEngines({ d }: { d: E }) {
  return (
    <section
      id="engines"
      className="flex flex-col gap-6 bg-[#fbfdff] px-5 pb-[70px] pt-12 lg:hidden"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="font-barlow w-full text-[31px] font-extrabold uppercase text-[#08162f]">
          <span className="block leading-[0.98]">{d.heading1}</span>
          <span className="block leading-[0.98] text-[#086bfa]">{d.heading2}</span>
        </p>
        <p className="w-full text-[11px] leading-[1.55] text-[#65728a]">
          {d.mobileSubtitle}
        </p>
      </div>
      {d.cards.map((c, i) => (
        <article
          key={i}
          className={`flex h-[388px] w-full flex-col gap-3 overflow-hidden rounded-[22px] border border-[#dce7f4] bg-white p-[17px] shadow-[0_10px_28px_rgba(36,76,143,0.09)] ${i === 0 ? "-mt-px" : ""}`}
        >
          <div className="flex w-full items-center gap-2.5">
            <span className="flex size-[30px] items-center justify-center rounded-lg bg-[#086bfa]">
              <Image src={`${A}/m-layers.svg`} alt="" width={15} height={15} />
            </span>
            <p className="text-[8px] font-extrabold uppercase leading-[normal] text-[#65728a]">
              {c.label}
            </p>
          </div>
          <div className="flex w-full flex-col gap-1.5">
            <h3 className="font-barlow w-[210px] text-[27px] font-extrabold uppercase leading-[0.92] text-[#08162f]">
              {c.title1} {c.title2}
            </h3>
            <p className="mt-px w-[250px] text-[10px] leading-[1.45] text-[#65728a]">
              {c.mobileCopy}
            </p>
          </div>
          <div className={`relative h-[125px] w-full shrink-0 ${i === 0 ? "mt-px" : ""}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={safeSrc(c.photo)} alt="" className="absolute inset-0 size-full object-contain" />
          </div>
          <div className="flex w-full flex-wrap content-start gap-1.5">
            {c.mobileTags.map((t, ti) => (
              <span
                key={ti}
                className="rounded-full bg-[#eaf4ff] px-[11px] py-1.5 text-[9px] font-semibold leading-[normal] text-[#12213d]"
              >
                {t}
              </span>
            ))}
          </div>
          <a
            href={safeHref(c.href)}
            className="flex h-[44px] shrink-0 items-center justify-center gap-3 self-start rounded-full border border-[#086bfa] bg-[#086bfa] px-6 text-[11px] font-bold uppercase leading-[normal] tracking-[-0.015em] text-white"
          >
            {c.cta}
            <Image src="/figma/m-arrow-right.svg" alt="" width={14} height={14} />
          </a>
        </article>
      ))}
    </section>
  );
}

export default function Engines({ data }: { data: E }) {
  return (
    <>
      <MobileEngines d={data} />
      <section id="engines-d" className="relative z-10 hidden lg:block">
        <DesktopEngines d={data} />
      </section>
    </>
  );
}
