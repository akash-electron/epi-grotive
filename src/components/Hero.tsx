import Image from "next/image";
import Reveal from "./Reveal";

function SideWatermark({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 320 560"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none absolute top-16 h-[480px] w-[300px] text-primary opacity-[0.05] sm:h-[560px] sm:w-[340px] ${
        flip ? "-right-24 -scale-x-100" : "-left-24"
      }`}
    >
      <path
        d="M40 500 200 280 40 60"
        stroke="currentColor"
        strokeWidth="42"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M120 500 280 280 120 60"
        stroke="currentColor"
        strokeWidth="42"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="top" className="bg-bar">
      <div className="chamfer-top relative overflow-hidden bg-white">
        <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-70" />
        {/* speckle texture on the side edges */}
        <div className="speckle speckle-fade-l pointer-events-none absolute inset-y-0 left-0 w-40 opacity-40 sm:w-64" />
        <div className="speckle speckle-fade-r pointer-events-none absolute inset-y-0 right-0 w-40 opacity-40 sm:w-64" />
        <SideWatermark />
        <SideWatermark flip />
        {/* faint giant watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-10 hidden w-[560px] opacity-[0.05] md:block"
        >
          <Image
            src="/epig-mark.png"
            alt=""
            width={560}
            height={573}
            className="w-full"
          />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 pb-40 pt-10 text-center sm:px-6 sm:pt-14">
          <Reveal>
            <p className="text-[11px] font-semibold tracking-[0.22em] text-navlink sm:text-xs">
              ESPORTS <span className="text-primary">•</span> GAMING{" "}
              <span className="text-primary">•</span> EPIGRO MEDIA
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-display mt-4 tracking-tight text-ink">
              <span className="block text-[1.7rem] font-semibold leading-[1.1] sm:text-[2.75rem]">
                Building The Next Era Of
              </span>
              <span className="block whitespace-nowrap text-[2rem] font-semibold leading-[1.05] sm:text-[4.9rem]">
                Gaming &amp; Esports
              </span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-navlink sm:text-[15px]">
              Powering the gaming ecosystem through
              <br className="hidden sm:block" /> esports, media, content and
              brand experiences.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <span className="relative mt-7 inline-flex">
              <span
                aria-hidden="true"
                className="absolute left-0 top-1/2 h-[72%] w-[62%] -translate-x-[14%] -translate-y-1/2 rounded-full border-[1.5px] border-echo"
              />
              <span
                aria-hidden="true"
                className="absolute right-0 top-1/2 h-[72%] w-[62%] -translate-y-1/2 translate-x-[14%] rounded-full border-[1.5px] border-echo"
              />
              <a
                href="#contact"
                className="relative z-10 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-xs font-bold tracking-wide text-white shadow-lg shadow-primary/30 transition hover:bg-primary-dark sm:text-[13px]"
              >
                START A PROJECT <span aria-hidden="true">→</span>
              </a>
            </span>
          </Reveal>
        </div>

        {/* blue curved divider: same tile texture as the engines band below,
            so the curve joins it with no seam */}
        <div className="absolute inset-x-0 bottom-0 leading-[0]">
          <svg
            viewBox="0 0 1440 190"
            preserveAspectRatio="none"
            className="h-[130px] w-full sm:h-[190px]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="heroGrid"
                width="496"
                height="310"
                patternUnits="userSpaceOnUse"
              >
                <image
                  href="/grid-blue-tile.png"
                  xlinkHref="/grid-blue-tile.png"
                  x="0"
                  y="0"
                  width="496"
                  height="310"
                />
              </pattern>
            </defs>
            <path
              d="M0 0 Q 720 230 1440 0 L1440 190 L0 190 Z"
              fill="#0B63FF"
            />
            <path
              d="M0 0 Q 720 230 1440 0 L1440 190 L0 190 Z"
              fill="url(#heroGrid)"
            />
            <path
              d="M0 0 Q 720 230 1440 0"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.6"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
