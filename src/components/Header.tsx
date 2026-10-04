"use client";

import Image from "next/image";
import { useState } from "react";
import SocialIcons from "./SocialIcons";
import { safeHref, safeSrc } from "@/lib/content/merge";
import type { Content } from "@/lib/content/types";

type H = Content["header"];

/* Desktop positions are px of the 1920px Figma frame (node 6:2), scaled by --u.
   Mobile follows the 390px frame (node 40:2820). */
const u = (n: number) => `calc(${n} * var(--u))`;

/* Desktop nav slots (left, letter-spacing) for the first three links; extra
   links continue to the right at 110px steps. */
const NAV_SLOTS = [
  { left: 1410, tracking: 0.1361 },
  { left: 1505, tracking: 0.0187 },
  { left: 1615, tracking: 0.1829 },
];
const slot = (i: number) => NAV_SLOTS[i] ?? { left: 1615 + (i - 2) * 110, tracking: 0.1 };

function MobileHeader({ h }: { h: H }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative lg:hidden">
      <div className="flex h-[68px] items-center justify-between bg-[rgba(227,240,255,0.92)] px-5">
        <a href="#top" className="flex items-center gap-[7px]">
          <span className="block h-[26px] w-[2px] bg-[#086bfa]" />
          <span className="flex flex-col leading-[normal]">
            <span className="font-barlow text-[13px] font-extrabold text-[#08162f]">
              {h.brand}
            </span>
            <span className="text-[6px] font-bold text-[#086bfa]">{h.brandSub}</span>
          </span>
        </a>
        <a href="#top" aria-label="Epigrotive home" className="size-[40px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={safeSrc(h.logo, "/figma/emblem.png")}
            alt="Epigrotive emblem"
            className="size-full object-contain"
          />
        </a>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex size-[40px] items-center justify-center rounded-full bg-[#086bfa]"
        >
          <Image src="/figma/m-menu.svg" alt="" width={17} height={17} />
        </button>
      </div>
      {open && (
        <nav className="absolute inset-x-0 top-[68px] z-50 flex flex-col bg-[rgba(227,240,255,0.98)] px-5 pb-4 shadow-[0_10px_28px_rgba(36,76,143,0.12)]">
          {h.nav.map((item, i) => (
            <a
              key={i}
              href={safeHref(item.href)}
              onClick={() => setOpen(false)}
              className="font-display border-t border-[#c7deff] py-3 text-[13px] font-medium tracking-[0.1em] text-[#12213d]"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}

function DesktopHeader({ h, socials }: { h: H; socials: Content["socials"] }) {
  return (
    <div className="relative hidden lg:block" style={{ height: u(120) }}>
      <Image
        src="/figma/hero/header-bg-left.svg"
        alt=""
        width={984}
        height={304}
        aria-hidden="true"
        className="pointer-events-none absolute max-w-none"
        style={{ left: u(-24), top: u(-82), width: u(984), height: u(304) }}
        priority
      />
      <Image
        src="/figma/hero/header-bg-right.svg"
        alt=""
        width={984}
        height={304}
        aria-hidden="true"
        className="pointer-events-none absolute max-w-none"
        style={{ left: u(960), top: u(-82), width: u(984), height: u(304) }}
        priority
      />
      <span
        aria-hidden="true"
        className="absolute bg-[#086bfa]"
        style={{ left: u(126), top: u(49), width: u(2), height: u(35) }}
      />
      <a
        href="#top"
        className="font-exo absolute inset-y-0 whitespace-nowrap"
        style={{ left: u(136), width: u(100) }}
      >
        <span
          className="absolute left-0 font-bold text-[#0b0502]"
          style={{ top: u(52), fontSize: u(14.608), letterSpacing: u(-0.138) }}
        >
          {h.brand}
        </span>
        <span
          className="absolute left-0 font-medium text-[#006cff]"
          style={{ top: u(71), fontSize: u(14.705), letterSpacing: u(-0.135) }}
        >
          {h.brandSub}
        </span>
      </a>
      <SocialIcons
        socials={socials}
        size={u(28.5)}
        gap={u(14.8)}
        className="absolute"
        style={{ left: u(250), top: u(53) }}
      />
      <a
        href="#top"
        aria-label="Epigrotive home"
        className="absolute"
        style={{ left: u(924), top: u(27), width: u(71), height: u(66) }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={safeSrc(h.logo, "/figma/emblem.png")}
          alt="Epigrotive emblem"
          className="size-full object-contain"
        />
      </a>
      <nav aria-label="Primary">
        {h.nav.map((item, i) => (
          <a
            key={i}
            href={safeHref(item.href)}
            className="font-display absolute whitespace-nowrap font-medium text-[#676767] transition hover:text-ink"
            style={{
              left: u(slot(i).left),
              top: u(54),
              fontSize: u(16.043),
              letterSpacing: u(slot(i).tracking),
              marginTop: "-0.068em",
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <a
        href={safeHref(h.ctaHref)}
        aria-label="Start a project"
        className="group absolute"
        style={{
          left: u(1752.72),
          top: u(39.24),
          width: u(43.295),
          height: u(41.528),
        }}
      >
        <Image
          src="/figma/header-circle.svg"
          alt=""
          width={43}
          height={42}
          className="size-full transition group-hover:brightness-90"
        />
        <Image
          src="/figma/header-arrow.svg"
          alt=""
          width={24}
          height={15}
          className="absolute"
          style={{ left: u(9.28), top: u(12.76), width: u(24), height: u(15.429) }}
        />
      </a>
    </div>
  );
}

export default function Header({ data, socials }: { data: H; socials: Content["socials"] }) {
  return (
    <header className="relative z-20 w-full">
      <MobileHeader h={data} />
      <DesktopHeader h={data} socials={socials} />
    </header>
  );
}
