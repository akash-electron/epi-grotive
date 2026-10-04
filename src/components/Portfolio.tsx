import Image from "next/image";
import Reveal from "./Reveal";

const shots = [
  { src: "/figma/pf-1-1.png", title: "Portfolio 1-1" },
  { src: "/figma/pf-1-2.png", title: "Portfolio 1-2" },
  { src: "/figma/pf-1-3.png", title: "Portfolio 1-3" },
  { src: "/figma/pf-1-4.png", title: "Portfolio 1-4" },
  { src: "/figma/pf-1-5.png", title: "Portfolio 1-5" },
  { src: "/figma/pf-1-6.png", title: "Portfolio 1-6" },
  { src: "/figma/pf-2-1.png", title: "Portfolio 2-1" },
  { src: "/figma/pf-2-2.png", title: "Portfolio 2-2" },
  { src: "/figma/pf-2-3.png", title: "Portfolio 2-3" },
  { src: "/figma/pf-2-4.png", title: "Portfolio 2-4" },
  { src: "/figma/pf-2-5.png", title: "Portfolio 2-5" },
  { src: "/figma/pf-2-6.png", title: "Portfolio 2-6" },
];

function Thumb({ src, title }: { src: string; title: string }) {
  return (
    <div className="group relative aspect-square w-56 shrink-0 overflow-hidden rounded-lg bg-navy sm:w-64 md:w-full">
      <Image
        src={src}
        alt={title}
        fill
        sizes="(max-width: 768px) 224px, (max-width: 1024px) 256px, 16vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-primary/0 transition group-hover:bg-primary/20" />
    </div>
  );
}

export default function Portfolio() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 pt-6 text-center sm:px-6">
        <Reveal>
          <h2 className="font-gobold text-3xl font-normal leading-tight tracking-wide text-ink sm:text-[2rem]">
            A SELECTION OF
            <br />
            <span className="text-primary">PORTFOLIO</span>
          </h2>
        </Reveal>
      </div>
      <Reveal delay={100}>
        <div className="relative mt-6 bg-navy py-4">
          <div className="bg-grid-blue pointer-events-none absolute inset-0 opacity-20" />
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-primary to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-primary to-transparent" />
          {/* Mobile: horizontal strips. Desktop: fixed 2x6 grid like the design */}
          <div className="relative flex gap-3 overflow-x-auto px-4 pb-3 md:hidden">
            {shots.slice(0, 6).map((s) => (
              <Thumb key={s.src} src={s.src} title={s.title} />
            ))}
          </div>
          <div className="relative hidden px-4 md:block">
            <div className="mx-auto grid max-w-6xl grid-cols-6 gap-3">
              {shots.map((s) => (
                <Thumb key={s.src} src={s.src} title={s.title} />
              ))}
            </div>
          </div>
          <div className="relative flex gap-3 overflow-x-auto px-4 md:hidden">
            {shots.slice(6).concat(shots.slice(0, 6)).map((s) => (
              <Thumb key={`${s.src}-b`} src={s.src} title={s.title} />
            ))}
          </div>
        </div>
      </Reveal>
      <div className="flex justify-center bg-white py-6">
        <a
          href="#contact"
          className="rounded-full bg-primary px-8 py-2.5 text-xs font-bold tracking-wide text-white transition hover:bg-primary-dark"
        >
          EXPLORE MORE
        </a>
      </div>
    </section>
  );
}
