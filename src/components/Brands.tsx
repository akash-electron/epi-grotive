import { Box, Layer, T, u } from "./design";
import { safeSrc } from "@/lib/content/merge";
import type { Content } from "@/lib/content/types";

type B = Content["brands"];

const A = "/figma/brands";

/* Desktop: Figma frame 6:2, section starts at y=4702 (bottom of IPs). The dark
   panel runs past the section end and overlaps the Portfolio band below.
   Mobile "Brands": node 40:3063. */
const Y0 = 4702;
const y = (n: number) => n - Y0;

/* Desktop cell boxes in Figma paint order (18 cells); logos map to cells by index.
   Logos beyond 18 only appear in the phone grid. */
const LOGOS = [
  { file: "amazon-pay.png", alt: "Amazon Pay", left: 221.0, top: 5068.0, w: 204.0, h: 41.0 },
  { file: "amd.png", alt: "AMD", left: 470.0, top: 5063.0, w: 206.0, h: 51.0 },
  { file: "gigabyte-technology.png", alt: "Gigabyte Technology", left: 720.0, top: 5065.0, w: 206.0, h: 46.0 },
  { file: "dubai-energy-drink.png", alt: "Dubai Energy Drink", left: 971.0, top: 5057.0, w: 204.0, h: 63.0 },
  { file: "hp.png", alt: "HP", left: 1277.0, top: 5014.0, w: 90.0, h: 148.0 },
  { file: "joy-e-bike.png", alt: "Joy e-bike", left: 1475.0, top: 5061.0, w: 195.0, h: 55.0 },
  { file: "purple-ring-brand-unconfirmed.png", alt: "Brand", left: 265.0, top: 5224.0, w: 116.0, h: 115.0 },
  { file: "nvidia.png", alt: "NVIDIA", left: 470.0, top: 5262.0, w: 206.0, h: 39.0 },
  { file: "razer.png", alt: "Razer", left: 721.0, top: 5264.0, w: 205.0, h: 34.0 },
  { file: "rooter-shop.png", alt: "Rooter Shop", left: 976.0, top: 5247.0, w: 195.0, h: 65.0 },
  { file: "rooter.png", alt: "Rooter", left: 1219.0, top: 5253.0, w: 206.0, h: 55.0 },
  { file: "the-fit-check.png", alt: "The Fit Check", left: 1482.0, top: 5264.0, w: 185.0, h: 32.0 },
  { file: "blue-f-brand-unconfirmed.png", alt: "Brand", left: 248.0, top: 5400.0, w: 149.0, h: 148.0 },
  { file: "unipin.png", alt: "UniPin", left: 503.0, top: 5454.0, w: 138.0, h: 40.0 },
  { file: "vedam-school-of-technology.png", alt: "Vedam School of Technology", left: 726.0, top: 5446.0, w: 194.0, h: 67.0 },
  { file: "veroforza.png", alt: "Veroforza", left: 971.0, top: 5460.0, w: 204.0, h: 30.0 },
  { file: "vishal-peripherals.png", alt: "Vishal Peripherals", left: 1240.0, top: 5448.0, w: 177.0, h: 52.0 },
  { file: "wellversed.png", alt: "Wellversed", left: 1480.0, top: 5454.0, w: 185.0, h: 41.0 },
];

/* Panel grid lines: [left, top, length]. */
const V_LINES = [
  [201, 4922.54, 726.911],
  [303, 4918, 736],
  [405, 4918, 736],
  [507, 4918, 736],
  [609, 4918, 736],
  [711, 4918, 736],
  [813, 4918, 736],
  [915, 4918, 736],
  [1017, 4918, 736],
  [1119, 4918, 736],
  [1221, 4918, 736],
  [1323, 4918, 736],
  [1425, 4918, 736],
  [1527, 4918, 736],
  [1629, 4918, 736],
  [1731, 4923.83, 724.343]
];
const H_LINES = [
  [161.71, 4944, 1604.57],
  [124.46, 5016, 1679.072],
  [124, 5088, 1680],
  [124, 5160, 1680],
  [124, 5232, 1680],
  [124, 5304, 1680],
  [124, 5376, 1680],
  [124, 5448, 1680],
  [124, 5520, 1680],
  [134.29, 5592, 1659.428]
];

/* A replaced logo no longer has the original aspect, so it is fitted inside a
   standard box centred on its cell. */
const CUSTOM_W = 190;
const CUSTOM_H = 90;

function DesktopBrands({ d }: { d: B }) {
  return (
    <div className="relative hidden lg:block" style={{ height: u(863) }}>
      <h2>
        <T left={781} top={y(4712)} size={59.098} tracking={0.3881} weight={700} color="#0b1b3a" font="rajdhani">
          {d.heading1}
        </T>
        <T left={777.84} top={y(4787)} size={59.098} tracking={0.4451} weight={700} color="#1577fe" font="rajdhani">
          {d.heading2}
        </T>
      </h2>

      <Layer src={`${A}/panel.svg`} left={126} top={y(4920)} width={1677} height={733} />
      {V_LINES.map(([l, t, h]) => (
        <Box key={`v${l}`} left={l} top={y(t)} width={3} height={h} className="bg-[#102b4b]" />
      ))}
      {H_LINES.map(([l, t, w]) => (
        <Box key={`h${t}`} left={l} top={y(t)} width={w} height={3} className="bg-[#102b4b]" />
      ))}
      {LOGOS.map((l, i) => {
        const c = d.logos[i];
        if (!c) return null;
        // the original logo (local file, or its Cloudinary copy named after the file) keeps the
        // design's exact box; anything the admin uploads later is fitted in a standard box
        const own = c.src === `${A}/${l.file}` || new RegExp(`/brands/${l.file.replace(/\.png$/, "")}\\.[a-z0-9]+$`).test(c.src);
        return own ? (
          <Layer key={i} src={safeSrc(c.src)} alt={c.alt} left={l.left} top={y(l.top)} width={l.w} height={l.h} className="object-cover" />
        ) : (
          <Layer
            key={i}
            src={safeSrc(c.src)}
            alt={c.alt}
            left={l.left + l.w / 2 - CUSTOM_W / 2}
            top={y(l.top + l.h / 2 - CUSTOM_H / 2)}
            width={CUSTOM_W}
            height={CUSTOM_H}
            className="object-contain"
          />
        );
      })}
    </div>
  );
}

/* ---------- mobile (390px) ---------- */

function MobileBrands({ d }: { d: B }) {
  const line = "rgba(22,53,91,0.55)";
  return (
    <div className="flex flex-col gap-8 bg-white px-5 pb-[74px] pt-[70px] lg:hidden">
      <h2 className="font-barlow relative top-px w-full text-center text-[31px] font-extrabold uppercase text-[#08162f]">
        <span className="block leading-[0.98]">{d.heading1}</span>
        <span className="block leading-[0.98] text-[#086bfa]">{d.heading2}</span>
      </h2>
      <ul
        className="relative grid w-full grid-cols-3 overflow-hidden rounded-[30px] bg-[#04142c] p-[10px] shadow-[0_14px_36px_rgba(10,75,165,0.12)]"
        style={{
          backgroundImage: `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(to bottom, ${line} 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      >
        {d.logos.map((l, i) => (
          <li
            key={i}
            className="flex h-[68px] w-full min-w-0 items-center justify-center overflow-hidden border border-[#214365] bg-[rgba(8,29,58,0.53)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={safeSrc(l.src)}
              alt={l.alt}
              className="h-[48px] w-[88px] max-w-full object-contain"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Brands({ data }: { data: B }) {
  return (
    <section id="brands" className="relative z-10">
      <MobileBrands d={data} />
      <DesktopBrands d={data} />
    </section>
  );
}
