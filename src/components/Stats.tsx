import Image from "next/image";
import CountUp from "./CountUp";
import { Box, Layer, T, u } from "./design";
import { safeSrc } from "@/lib/content/merge";
import type { Content } from "@/lib/content/types";

type S = Content["stats"];

const A = "/figma/stats";

/* Desktop: Figma frame 6:2, section starts at y=1696.63 (bottom of the Engines
   panel). Mobile "Numbers" block: node 40:2895. */
const Y0 = 1696.63;
const y = (n: number) => n - Y0;

/* 6 rows x 9 columns, fills read from the Figma dot-matrix nodes. */
const DOTS = [
  ["#E3E9F5", "#E0E6F2", "#E8EBF4", "#DDE5F0", "#DCE4EF", "#DCE4EF", "#D5DDEA", "#BDD4FD", "#5C9CFE"],
  ["#E1E8F2", "#DBE3EE", "#E4E8F3", "#D9E1EC", "#D4DDEC", "#D0D9E8", "#AFCBFB", "#3B83FC", "#A1C4FC"],
  ["#DFE6F0", "#E1E8F2", "#DFE5F1", "#D9E3EF", "#B4CAEF", "#609CFC", "#3A85FC", "#95BEFC", "#A6C7FA"],
  ["#D6DEEB", "#E0E7F1", "#E5E9F2", "#C6D2EA", "#6DA5FC", "#4C8FF8", "#A2C2FF", "#E0E7F1", "#D7E1ED"],
  ["#DFE5F1", "#DDE3EF", "#E3EAF2", "#A3C3FC", "#68A3FD", "#A4C3FA", "#D6E0EC", "#E1E8F2", "#DBE3EE"],
  ["#D8E2EE", "#D4DDEC", "#CCD8E8", "#68A3FD", "#8DB8FD", "#D3DCEB", "#DEE5EF", "#DEE7F0", "#DDE5F2"],
];

const BARS = [
  { left: 612, top: 2371, w: 23, h: 22, from: "#f1f6fc", to: "#f1f6fc" },
  { left: 655, top: 2349, w: 23, h: 44, from: "#e1edfd", to: "#f0f4fd" },
  { left: 699, top: 2330, w: 22, h: 63, from: "#d7e6fd", to: "#eff3fc" },
  { left: 742, top: 2311, w: 23, h: 82, from: "#d2e3fd", to: "#f0f4fd" },
  { left: 786, top: 2292, w: 22, h: 101, from: "#c6dafb", to: "#f1f6fc" },
  { left: 829, top: 2271, w: 23, h: 122, from: "#b1cdfc", to: "#edf4fc" },
  { left: 873, top: 2249, w: 23, h: 144, from: "#9dc1fd", to: "#ecf3fb" },
];

const CARD =
  "absolute border border-[#e0e8f4] bg-gradient-to-b from-white to-[#f8fbff]";
const cardStyle = {
  borderRadius: u(20),
  boxShadow: `0 ${u(8)} ${u(36)} rgba(65,107,171,0.05)`,
};

function DesktopStats({ d }: { d: S }) {
  return (
    <div className="relative hidden lg:block" style={{ height: u(1100) }}>
      <Layer src={safeSrc(d.image, `${A}/epig.png`)} left={1229} top={y(1822)} width={571} height={373} className="object-cover" />

      <Box left={163} top={y(1847)} width={58} height={3} className="bg-[#006aff]" />
      <T left={248} top={y(1845)} size={17.399} tracking={4.1843} weight={700} color="#41567a" font="body">
        {d.eyebrow}
      </T>
      <h2>
        <T left={164} top={y(1903)} size={91.757} tracking={0.9539} weight={700} color="#040a1a" font="rajdhani">
          {d.line1}
        </T>
        <T left={164} top={y(1986)} size={93.313} tracking={0.5104} weight={700} color="#0162fa" font="rajdhani">
          {d.line2}
        </T>
      </h2>
      <T left={163} top={y(2089)} size={24.558} tracking={0.4557} weight={400} color="#4d6083" font="body">
        {d.sub1}
      </T>
      <T left={164} top={y(2125)} size={25.143} tracking={0.0401} weight={400} color="#4b6083" font="body">
        {d.sub2}
      </T>

      <Box left={148} top={y(2201)} width={801} height={224} className={CARD} style={cardStyle} />
      <Box left={977} top={y(2201)} width={801} height={224} className={CARD} style={cardStyle} />
      <Box left={148} top={y(2453)} width={801} height={230} className={CARD} style={cardStyle} />
      <Box left={977} top={y(2453)} width={801} height={230} className={CARD} style={cardStyle} />

      {BARS.map((b) => (
        <Box
          key={b.left}
          left={b.left}
          top={y(b.top)}
          width={b.w}
          height={b.h}
          style={{
            borderRadius: u(1.5),
            backgroundImage: `linear-gradient(to bottom, ${b.from}, ${b.to})`,
          }}
        />
      ))}

      <Layer src={`${A}/line.svg`} left={1436} top={y(2236)} width={304} height={178} />
      <Layer src={`${A}/pt1.svg`} left={1494} top={y(2350)} width={12} height={12} />
      <Layer src={`${A}/pt2.svg`} left={1585} top={y(2299)} width={12} height={12} />
      <Layer src={`${A}/pt3.svg`} left={1719} top={y(2249)} width={12} height={12} />

      {DOTS.map((row, r) =>
        row.map((c, i) => (
          <Box
            key={`${r}-${i}`}
            left={669.7 + i * 27}
            top={y(2501.7 + r * 26)}
            width={10.6}
            height={10.6}
            style={{ borderRadius: "50%", backgroundColor: c }}
          />
        )),
      )}

      <Layer src={`${A}/orbit1.svg`} left={1509} top={y(2471)} width={204} height={204} />
      <Layer src={`${A}/orbit2.svg`} left={1530} top={y(2492)} width={162} height={162} />
      <Layer src={`${A}/orbit3.svg`} left={1553} top={y(2515)} width={116} height={116} />
      <Layer src={`${A}/sphere.svg`} left={1584} top={y(2546)} width={54} height={54} />
      <Layer src={`${A}/satellite.svg`} left={1709} top={y(2482)} width={18} height={18} />

      <T left={200} top={y(2261)} size={92.719} tracking={-4.33} weight={800} color="#0262fc" font="body">
        <CountUp value={d.items[0]?.value ?? ""} />
      </T>
      <T left={199} top={y(2362)} size={20.048} tracking={3.0395} weight={600} color="#495d80" font="body">
        {d.items[0]?.label}
      </T>
      <T left={1025} top={y(2267)} size={86.096} tracking={-7.8903} weight={800} color="#041233" font="body">
        <CountUp value={d.items[1]?.value ?? ""} />
      </T>
      <T left={1025} top={y(2364)} size={18.711} tracking={3.7603} weight={600} color="#4c5f81" font="body">
        {d.items[1]?.label}
      </T>
      <T left={199} top={y(2516)} size={93.688} tracking={-3.26} weight={800} color="#0161fc" font="body">
        <CountUp value={d.items[2]?.value ?? ""} />
      </T>
      <T left={199} top={y(2618)} size={18.711} tracking={3.863} weight={600} color="#4d6082" font="body">
        {d.items[2]?.label}
      </T>
      <T left={1026} top={y(2518)} size={90.882} tracking={-7.65} weight={800} color="#011755" font="body">
        <CountUp value={d.items[3]?.value ?? ""} />
      </T>
      <T left={1025} top={y(2617)} size={18.711} tracking={3.8227} weight={600} color="#4c5f81" font="body">
        {d.items[3]?.label}
      </T>
    </div>
  );
}

/* ---------- mobile (390px) ---------- */

const CARD_M =
  "flex h-[122px] w-full min-w-0 items-center justify-between rounded-[14px] border border-[#dce7f4] bg-white p-[13px] shadow-[0_10px_28px_rgba(36,76,143,0.09)]";

function MobileMetric({
  value,
  label,
  children,
}: {
  value: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className={CARD_M}>
      <div className="flex w-[78px] min-w-0 shrink flex-col gap-1">
        <p className="font-barlow whitespace-nowrap text-[36px] font-extrabold leading-[0.9] text-[#086bfa]">
          <CountUp value={value} />
        </p>
        <p className="w-full text-[7px] font-bold uppercase leading-[1.35] text-[#65728a]">
          {label}
        </p>
      </div>
      {children}
    </div>
  );
}

function MobileStats({ d }: { d: S }) {
  return (
    <section className="flex flex-col gap-8 bg-[#fbfdff] px-5 pb-[70px] lg:hidden">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="h-[2px] w-6 bg-[#086bfa]" />
          <p className="text-[9px] font-bold uppercase leading-[normal] text-[#65728a]">
            {d.eyebrow}
          </p>
        </div>
        <h2 className="font-barlow text-[31px] font-extrabold uppercase text-[#08162f]">
          <span className="block leading-[0.98]">{d.line1}</span>
          <span className="block leading-[0.98] text-[#086bfa]">{d.line2}</span>
        </h2>
        <p className="text-[11px] leading-[1.55] text-[#65728a]">
          {d.sub1} {d.sub2}
        </p>
      </div>
      <div className="-mt-px grid w-full grid-cols-2 gap-2.5">
        <MobileMetric value={d.items[0]?.value ?? ""} label={d.items[0]?.label ?? ""}>
          <div className="flex h-[48px] w-[62px] items-end gap-[5px]">
            {[13, 21, 30, 39, 47].map((h) => (
              <span
                key={h}
                className="w-[8px] rounded-t-[2px] bg-[#c8dcfc]"
                style={{ height: h }}
              />
            ))}
          </div>
        </MobileMetric>
        <MobileMetric value={d.items[1]?.value ?? ""} label={d.items[1]?.label ?? ""}>
          <div className="relative h-[40px] w-[70px] shrink-0">
            <Image
              src={`${A}/m-growth.svg`}
              alt=""
              width={70}
              height={42}
              className="absolute max-w-none"
              style={{ left: 0, top: "-2.37%", width: "100.45%", height: "104.87%" }}
            />
          </div>
        </MobileMetric>
        <MobileMetric value={d.items[2]?.value ?? ""} label={d.items[2]?.label ?? ""}>
          <Image src={`${A}/m-dots.svg`} alt="" width={66} height={52} className="h-[52px] w-[66px] shrink-0" />
        </MobileMetric>
        <MobileMetric value={d.items[3]?.value ?? ""} label={d.items[3]?.label ?? ""}>
          <Image src={`${A}/m-orbit.svg`} alt="" width={62} height={62} className="size-[62px] shrink-0" />
        </MobileMetric>
      </div>
    </section>
  );
}

export default function Stats({ data }: { data: S }) {
  return (
    <>
      <MobileStats d={data} />
      <section id="stats" className="relative hidden lg:block">
        <DesktopStats d={data} />
      </section>
    </>
  );
}
