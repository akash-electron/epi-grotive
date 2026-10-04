import Image from "next/image";
import Reveal from "./Reveal";

function MenuIcon() {
  return (
    <span className="flex h-[22px] w-[22px] shrink-0 flex-col items-center justify-center gap-[3px] rounded-[6px] bg-[#006BFF]">
      <span className="block h-[2px] w-[11px] rounded bg-white" />
      <span className="block h-[2px] w-[11px] rounded bg-white" />
      <span className="block h-[2px] w-[11px] rounded bg-white" />
    </span>
  );
}

function EngineCard({
  eyebrow,
  titleA,
  titleB,
  copy,
  tags,
  cta,
  ctaColor,
  photo,
  photoLabel,
  photoAspect,
  photoWidth,
}: {
  eyebrow: string;
  titleA: string;
  titleB: string;
  copy: string;
  tags: string[];
  cta: string;
  ctaColor: string;
  photo: string;
  photoLabel: string;
  photoAspect: string;
  photoWidth: string;
}) {
  return (
    <article className="flex flex-row items-center gap-4 rounded-[20px] border border-line/60 bg-gradient-to-b from-white to-[#F7FAFF] p-5 shadow-[0_18px_40px_-18px_rgba(10,27,51,0.25)] sm:gap-5 sm:p-7">
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.14em] text-ink sm:text-[11px]">
          <MenuIcon />
          <span className="truncate">{eyebrow}</span>
        </p>
        <h3 className="font-display mt-3 text-[1.55rem] font-semibold leading-[1.05] text-[#021021] sm:text-[2rem]">
          {titleA}
          <br />
          {titleB}
        </h3>
        <p className="mt-2.5 text-xs leading-relaxed text-[#516177] sm:text-[13px]">
          {copy}
        </p>
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-[#EDF2F8] px-2.5 py-1 text-[9px] font-semibold tracking-[0.08em] text-[#4C596D] sm:text-[10px]"
            >
              {t}
            </span>
          ))}
        </div>
        <a
          href="#deliver"
          style={{ backgroundColor: ctaColor }}
          className="mt-4 inline-flex h-11 items-center gap-2 rounded-full px-6 text-xs font-semibold text-white transition hover:brightness-90"
        >
          {cta} <span aria-hidden="true">→</span>
        </a>
      </div>
      <div className={`relative shrink-0 ${photoWidth}`}>
        <Image
          src={photo}
          alt={photoLabel}
          width={photoAspect === "tall" ? 506 : 626}
          height={photoAspect === "tall" ? 604 : 636}
          sizes="(max-width: 640px) 144px, 240px"
          className="h-auto w-full"
        />
      </div>
    </article>
  );
}

export default function Engines() {
  return (
    <section className="bg-band relative bg-primary">
      <div className="relative mx-auto -mt-28 max-w-6xl px-4 pb-2 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-b from-[#E5F0FF] to-[#F8FAFF] px-4 py-10 shadow-xl sm:px-8">
            <h2 className="font-display relative text-center text-2xl font-semibold leading-tight text-[#222222] sm:text-[1.75rem]">
              ONE HOUSE.
              <br />
              <span className="text-primary">TWO ENGINES.</span>
            </h2>
            <div className="relative mt-6 grid gap-5 md:grid-cols-2">
              <EngineCard
                eyebrow="EPIGRO MEDIA"
                titleA="MAKE CULTURE"
                titleB="MOVE."
                copy="Brand worlds, content systems and creator programs designed for the audience, not around it."
                tags={["BRAND", "CONTENT", "CREATORS"]}
                cta="Explore media"
                ctaColor="#006AFF"
                photo="/figma/engine-media.png"
                photoLabel="Media production setup"
                photoAspect="tall"
                photoWidth="w-36 sm:w-48"
              />
              <EngineCard
                eyebrow="EPIGROTIVE GAMING"
                titleA="BUILD THE"
                titleB="ARENA."
                copy="Esports IPs, tournaments and community ecosystems that give people a reason to show up."
                tags={["ESPORTS", "TOURNAMENTS", "COMMUNITY"]}
                cta="Explore gaming"
                ctaColor="#1469D9"
                photo="/figma/engine-gaming.png"
                photoLabel="Esports gamer in arena"
                photoAspect="wide"
                photoWidth="w-40 sm:w-60"
              />
            </div>
          </div>
        </Reveal>
      </div>
      {/* bottom curve: blue band meets white stats with a shallow arch */}
      <div aria-hidden="true" className="leading-[0]">
        <svg
          viewBox="0 0 1440 30"
          preserveAspectRatio="none"
          className="h-[18px] w-full sm:h-[30px]"
        >
          <path d="M0 0H1440V2Q720 32 0 2Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
}
