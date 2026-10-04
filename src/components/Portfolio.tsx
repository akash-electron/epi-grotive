import Image from "next/image";
import { Box, Layer, T, u } from "./design";
import { safeHref, safeSrc } from "@/lib/content/merge";
import type { Content } from "@/lib/content/types";

type P = Content["portfolio"];

const A = "/figma/portfolio";

/* Desktop: Figma frame 6:2, section starts at y=5565 (top of the blue grid
   band). Mobile "Portfolio": node 40:3133. */
const Y0 = 5565;
const y = (n: number) => n - Y0;

/* 340px squares laid edge to edge, all the same size. Each row cycles through
   the photos (repeated until a cycle has at least 8, so one cycle is always
   wider than the screen; the bottom row starts half a cycle later) and loops
   seamlessly every PERIOD px. The top row drifts left, the bottom row right. */
const SIZE = 340;
const MIN_CYCLE = 8;
const SECONDS_PER_PHOTO = 75 / 8;

function cycle(photos: string[]) {
  if (!photos.length) return [];
  const out: string[] = [];
  while (out.length < MIN_CYCLE) out.push(...photos);
  return out;
}

function DesktopPortfolio({ d }: { d: P }) {
  const mask = `url(${A}/blue-mask.svg)`;
  const full = cycle(d.marquee);
  const period = SIZE * full.length;
  const half = Math.floor(full.length / 2);
  const rows = [
    { top: 5905, start: -50, cls: "marquee-left", copies: [0, 1], files: full },
    { top: 6245, start: -88, cls: "marquee-right", copies: [-1, 0], files: [...full.slice(half), ...full.slice(0, half)] },
  ];
  return (
    <div className="relative hidden lg:block" style={{ height: u(1383) }}>
      {/* blue curved grid band */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute"
          style={{
            top: "-302.46%",
            left: "-41.2%",
            right: 0,
            bottom: 0,
            maskImage: mask,
            WebkitMaskImage: mask,
            maskMode: "alpha",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskSize: `${u(2232)} ${u(1377.017)}`,
            WebkitMaskSize: `${u(2232)} ${u(1377.017)}`,
            maskPosition: `${u(632.506)} ${u(4185.99)}`,
            WebkitMaskPosition: `${u(632.506)} ${u(4185.99)}`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${A}/blue-grid.svg`} alt="" className="absolute inset-0 block size-full max-w-none" />
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        {/* the PSD texture is #121212 with holes cut where the old gapped photos sat, so use a solid backing (keeps the dark bars above and below the photos, as in the design) */}
        <Box left={0} top={y(5884)} width={1920} height={721} className="bg-[#121212]" />
        {rows.map((row) => (
          <div
            key={row.top}
            className={`absolute left-0 top-0 ${row.cls}`}
            style={{ ["--period" as string]: period, animationDuration: `${SECONDS_PER_PHOTO * full.length}s` }}
            aria-hidden="true"
          >
            {row.copies.map((c) =>
              row.files.map((f, i) => (
                <Layer
                  key={`${c}-${i}`}
                  src={safeSrc(f)}
                  left={row.start + i * SIZE + c * period}
                  top={y(row.top)}
                  width={SIZE}
                  height={SIZE}
                  className="object-cover"
                />
              )),
            )}
          </div>
        ))}
        <Layer src={`${A}/feather.png`} left={0} top={y(5884)} width={1920} height={721} className="object-cover" />
      </div>

      <h2>
        <T left={765} top={y(5706)} size={61} tracking={8.42} weight={400} color="#051831" font="gobold">
          {d.heading1}
        </T>
        <T left={832} top={y(5781)} size={61} tracking={8.27} weight={400} color="#297bff" font="gobold">
          {d.heading2}
        </T>
      </h2>

      <a
        href={safeHref(d.exploreHref)}
        className="group absolute"
        style={{ left: u(805), top: u(y(6663.24)), width: u(310), height: u(57) }}
      >
        <Layer src={`${A}/explore.svg`} left={0} top={0} width={310} height={57} className="transition group-hover:brightness-90" />
        <T left={60} top={16.76} size={26.738} tracking={-0.8198} weight={500} color="#ffffff">
          {d.exploreLabel}
        </T>
      </a>
    </div>
  );
}

/* ---------- mobile (390px) ---------- */

function MobilePortfolio({ d }: { d: P }) {
  const line = "rgba(201,221,252,0.55)";
  return (
    <div className="relative -mt-px flex flex-col items-center gap-8 overflow-hidden bg-[#086bfa] px-5 pb-[58px] pt-[54px] lg:hidden">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[900px] bg-[#eaf4ff]"
        style={{
          backgroundImage: `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(to bottom, ${line} 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />
      <div className="relative w-full rounded-[22px] bg-white p-5 shadow-[0_10px_28px_rgba(36,76,143,0.09)]">
        <h2 className="font-barlow text-center text-[31px] font-extrabold uppercase text-[#08162f]">
          <span className="block leading-[0.98]">{d.heading1}</span>
          <span className="block leading-[0.98] text-[#086bfa]">{d.heading2}</span>
        </h2>
      </div>
      <ul className="relative grid w-full grid-cols-2 gap-[10px]">
        {d.grid.map((p, i) => (
          <li key={i} className="relative h-[154px] w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={safeSrc(p.src)} alt={p.label} className="absolute inset-0 size-full object-cover" />
            <span
              aria-hidden="true"
              className="absolute inset-0"
              style={{ backgroundImage: "linear-gradient(160.08deg, rgba(0,106,255,0) 28.571%, rgba(0,106,255,0.439) 85.714%)" }}
            />
            <p className="absolute left-3 top-[131px] w-[145px] text-[9px] font-bold uppercase leading-[normal] text-white">
              {p.label}
            </p>
          </li>
        ))}
      </ul>
      <a
        href={safeHref(d.exploreHref)}
        className="relative flex h-[44px] items-center justify-center gap-3 rounded-full border border-[#dce7f4] bg-white px-6 text-[11px] font-bold uppercase leading-[normal] text-[#086bfa]"
      >
        {d.exploreLabel}
        <Image src={`${A}/arrow.svg`} alt="" width={14} height={14} />
      </a>
    </div>
  );
}

export default function Portfolio({ data }: { data: P }) {
  return (
    <section id="portfolio" className="relative">
      <MobilePortfolio d={data} />
      <DesktopPortfolio d={data} />
    </section>
  );
}
