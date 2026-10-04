import { Fragment } from "react";
import Image from "next/image";
import { Layer, T, u } from "./design";
import { safeHref } from "@/lib/content/merge";
import type { Content } from "@/lib/content/types";

type H = Content["hero"];
/* eyebrow slots on desktop: [left, dot-left after it, tracking] */
const EYEBROW: [number, number, number][] = [[759, 866, 0.9336], [890, 997, 1.2335], [1016, 0, 0.966]];

/* Desktop: absolute layers in px of the 1920px Figma frame (node 6:2), with the
   hero starting at frame y=120, scaled by --u. Mobile: node 40:2820 (390px). */
const A = "/figma/hero";

function DesktopHero({ h }: { h: H }) {
  const maskUrl = `url(${A}/blue-mask.svg)`;
  return (
    <div
      className="relative hidden bg-white lg:block"
      style={{ height: u(844) }}
    >
      <Layer src={`${A}/grid.png`} left={0} top={0} width={1920} height={844} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <Layer
          src={`${A}/eg-logo.png`}
          left={698.4}
          top={-574}
          width={2000}
          height={2000}
          style={{ opacity: 0.08, filter: "blur(2px)" }}
        />
        <div
          className="absolute overflow-hidden"
          style={{
            left: u(-837),
            top: u(-400),
            width: u(1356),
            height: u(2000),
            opacity: 0.08,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${A}/eg-logo.png`}
            alt=""
            className="absolute left-0 top-0 h-full max-w-none"
            style={{ width: "147.49%" }}
          />
        </div>
      </div>
      {/* blue arc band */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 w-full overflow-hidden"
        style={{ top: u(615), height: u(844) }}
      >
        <div
          className="absolute"
          style={{
            top: "-435.55%",
            left: "-41.2%",
            right: 0,
            bottom: 0,
            maskImage: maskUrl,
            WebkitMaskImage: maskUrl,
            maskMode: "alpha",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskSize: `${u(2232)} ${u(839)}`,
            WebkitMaskSize: `${u(2232)} ${u(839)}`,
            maskPosition: `${u(634.989)} ${u(3678.023)}`,
            WebkitMaskPosition: `${u(634.989)} ${u(3678.023)}`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${A}/blue-grid.svg`}
            alt=""
            className="absolute inset-0 block size-full max-w-none"
          />
        </div>
      </div>
      <Layer src={`${A}/feather-r.png`} left={1100} top={0} width={820} height={776} />
      <Layer src={`${A}/feather-l.png`} left={0} top={0} width={705} height={807} />
      <Layer src={`${A}/glow.png`} left={247} top={362} width={1427} height={482} />
      <Layer src={`${A}/particles.svg`} left={0} top={0} width={1920} height={844} />

      {h.eyebrow.map((t, i) => {
        const [left, dot, tr] = EYEBROW[i] ?? [1016 + (i - 2) * 150, 1016 + (i - 2) * 150 + 130, 1];
        return (
          <Fragment key={i}>
            <T left={left} top={212} size={18.717} tracking={tr} weight={600} color="#5d5d5d">
              {t}
            </T>
            {i < h.eyebrow.length - 1 && (
              <Layer src={`${A}/eyebrow-dot.svg`} left={dot || left + 130} top={215} width={6} height={6} />
            )}
          </Fragment>
        );
      })}

      <h1>
        <T left={651} top={279} size={58.201} tracking={-2.05} weight={600} color="#231f20">
          {h.line1}
        </T>
        <T left={546} top={353} size={103.704} tracking={-3.8797} weight={600} color="#231f20">
          {h.line2}
        </T>
      </h1>
      <T left={711} top={499} size={28.139} tracking={-0.8492} weight={500} color="#676767">
        {h.sub1}
      </T>
      <T left={670} top={533} size={27.382} tracking={-0.5078} weight={500} color="#676767">
        {h.sub2}
      </T>

      <a
        href={safeHref(h.ctaHref)}
        className="group absolute"
        style={{ left: u(816), top: u(577), width: u(292), height: u(58) }}
      >
        <Layer
          src={`${A}/cta-shapes.svg`}
          left={0}
          top={0}
          width={292}
          height={58}
          className="transition group-hover:brightness-90"
        />
        <T left={47} top={21} size={20.053} tracking={-0.5099} weight={500} color="#ffffff">
          {h.cta}
        </T>
        <Layer src={`${A}/cta-arrow.svg`} left={216} top={20} width={28} height={18} />
      </a>
    </div>
  );
}

function MobileHero({ h }: { h: H }) {
  const cat =
    "text-[8px] font-bold uppercase leading-[normal] text-[#12213d] whitespace-nowrap";
  return (
    <section
      className="relative flex min-h-[652px] flex-col items-center overflow-hidden bg-[#eaf4ff] px-5 pb-[34px] pt-[95px] lg:hidden"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${A}/grid.png`}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full object-cover"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[rgba(241,248,255,0.32)] via-[rgba(243,248,255,0.86)] via-[72%] to-[#e9f3ff]"
      />
      <div className="relative flex w-full flex-col items-center gap-6">
        <div className="flex items-center gap-1.5">
          {h.eyebrow.map((t, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="size-[3px] rounded-full bg-[#086bfa]" />}
              <p className={cat}>{t}</p>
            </span>
          ))}
        </div>
        <div className="flex w-full flex-col items-center gap-3 text-center">
          <h1 className="font-barlow mb-[-2px] mt-px w-full text-[43px] font-extrabold leading-[0.96] text-[#08162f]">
            {h.line1} {h.line2}
          </h1>
          <p className="w-full px-[15px] text-[12px] leading-[1.5] text-[#65728a]">
            {h.sub1} {h.sub2}
          </p>
        </div>
        <a
          href={safeHref(h.ctaHref)}
          className="flex h-[44px] items-center justify-center gap-3 rounded-full border border-[#086bfa] bg-[#086bfa] px-6 text-[11px] font-bold uppercase leading-[normal] tracking-[-0.015em] text-white"
        >
          {h.cta}
          <Image src="/figma/m-arrow-right.svg" alt="" width={14} height={14} />
        </a>
        <div className="flex h-[176px] w-full flex-col items-center justify-between rounded-[22px] border border-[#c7deff] bg-[rgba(255,255,255,0.55)] p-[18px] shadow-[0_10px_28px_rgba(36,76,143,0.09)]">
          <Image
            src="/figma/emblem.png"
            alt=""
            width={71}
            height={66}
            className="relative -top-px size-[46px] object-contain"
          />
          <p className="font-barlow relative top-px w-full text-center text-[24px] font-extrabold uppercase text-[#08162f]">
            <span className="block leading-[0.95]">{h.cardLine1}</span>
            <span className="block leading-[0.95] text-[#086bfa]">
              {h.cardLine2}
            </span>
          </p>
          <div className="relative top-0.5 flex items-center gap-[7px]">
            <span className="h-px w-[26px] bg-[#086bfa]" />
            <span className="text-[8px] font-bold uppercase leading-[normal] text-[#65728a]">
              {h.cardCta}
            </span>
            <span className="h-px w-[26px] bg-[#086bfa]" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Hero({ data }: { data: H }) {
  return (
    <section id="top" className="relative">
      <MobileHero h={data} />
      <DesktopHero h={data} />
    </section>
  );
}
