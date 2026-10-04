import { socialPath } from "@/lib/socials";
import { safeHref, safeSrc } from "@/lib/content/merge";
import type { Content } from "@/lib/content/types";
import { Layer, T, u } from "./design";

const A = "/figma/footer";

/* Desktop: Figma frame 6:2, footer bar at y=7586 (106px). Mobile footer: node
   40:3251. Order and sizes of the icons follow the design. */
const Y0 = 7586;
const y = (n: number) => n - Y0;

type F = Content["footer"];
type Socials = Content["socials"];

/* The design orders the footer icons YouTube, Instagram, Discord, X. Other
   networks follow. Desktop slots are [left, glyph width] in frame units;
   mobile slots are left within the 102px strip. */
const ORDER = ["youtube", "instagram", "discord", "x"];
const ordered = (socials: Socials) =>
  [...socials].sort((a, b) => {
    const i = ORDER.indexOf(a.name.trim().toLowerCase());
    const j = ORDER.indexOf(b.name.trim().toLowerCase());
    return (i < 0 ? 99 : i) - (j < 0 ? 99 : j);
  });
const D_SLOTS: [number, number][] = [[821, 21], [865, 17], [907, 19], [950, 17]];
const dSlot = (i: number): [number, number] => D_SLOTS[i] ?? [950 + (i - 3) * 43, 18];
const M_SLOTS: [number, number][] = [[6, 13], [32, 11], [57, 12], [83, 10]];
const mSlot = (i: number): [number, number] => M_SLOTS[i] ?? [83 + (i - 3) * 26, 11];

function Glyph({ name, size }: { name: string; size: number | string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: size, height: size, fill: "currentColor", display: "block" }}>
      <path d={socialPath(name)} />
    </svg>
  );
}

function DesktopFooter({ f, socials }: { f: F; socials: Socials }) {
  return (
    <div className="relative hidden bg-[#0d1c39] lg:block" style={{ height: u(106) }}>
      <Layer src={safeSrc(f.logo, `${A}/emblem.png`)} left={273} top={y(7622)} width={35} height={36} className="object-cover" />
      <T left={316} top={y(7638)} size={11.952} tracking={0.372} weight={700} color="#ffffff" font="exo">
        {f.brand}
      </T>
      <T left={391} top={y(7638)} size={11.968} tracking={0.574} weight={700} color="#0e4ada" font="exo">
        {f.brandSub}
      </T>

      <ul>
        {ordered(socials).map(({ name, href }, i) => {
          const [left, w] = dSlot(i);
          return (
          <li key={i}>
            <a
              href={safeHref(href)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Epigrotive on ${name}`}
              className="absolute text-[#858d9c] transition hover:text-white"
              style={{ left: u(left), top: u(y(7642) - w / 2), width: u(w), height: u(w) }}
            >
              <Glyph name={name} size="100%" />
            </a>
          </li>
          );
        })}
      </ul>

      <T left={1351} top={y(7638)} size={11.893} tracking={0.427} weight={500} color="#667181" font="exo">
        {f.copyright}
      </T>
    </div>
  );
}

/* ---------- mobile (390px) ---------- */

function MobileFooter({ f, socials }: { f: F; socials: Socials }) {
  return (
    <div className="flex flex-col gap-[26px] bg-[#04142c] px-5 pb-[23px] pt-[34px] lg:hidden">
      <div className="flex w-full items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Epigrotive Gaming">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={safeSrc(f.logo, `${A}/emblem.png`)} alt="" className="size-[34px] object-contain" />
          <span className="flex flex-col leading-[normal]">
            <span className="font-barlow whitespace-nowrap text-[16px] font-extrabold text-white">{f.brand}</span>
            <span className="text-[6px] font-bold uppercase text-[#1677ff]">{f.brandSub}</span>
          </span>
        </a>
        <ul className="relative h-[28px] w-[102px] shrink-0 text-[#88909e]">
          {ordered(socials).map(({ name, href }, i) => {
            const [left, w] = mSlot(i);
            return (
            <li key={i}>
              <a
                href={safeHref(href)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Epigrotive on ${name}`}
                className="absolute"
                style={{ left, top: 14 - w / 2, width: w, height: w }}
              >
                <Glyph name={name} size="100%" />
              </a>
            </li>
            );
          })}
        </ul>
      </div>
      <nav aria-label="Footer" className="flex w-full justify-between text-[9px] font-semibold leading-[normal] text-[#b9c8dc]">
        {f.nav.map((n, i) => (
          <a key={i} href={safeHref(n.href)}>
            {n.label}
          </a>
        ))}
      </nav>
      <div className="h-px w-full bg-[#1b3557]" />
      <div className="flex w-full items-center justify-between whitespace-nowrap text-[7px] leading-[normal] text-[#72839c]">
        <p>{f.copyright}</p>
        <p>{f.privacyLabel}</p>
      </div>
    </div>
  );
}

export default function Footer({ data, socials }: { data: F; socials: Socials }) {
  return (
    <footer className="relative">
      <MobileFooter f={data} socials={socials} />
      <DesktopFooter f={data} socials={socials} />
    </footer>
  );
}
