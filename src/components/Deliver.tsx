import Image from "next/image";
import Reveal from "./Reveal";
import { IMG } from "@/lib/images";

const items = [
  {
    n: "01",
    title: "Event Management",
    copy: "End-to-end tournament and live-event operations — from venue logistics and player ops to the run sheet that keeps show day on time.",
    photo: IMG.deliverEvent,
  },
  {
    n: "02",
    title: "Production",
    copy: "Broadcast, stage and content production built for competitive gaming, from camera blocking to the graphics package on screen.",
    photo: IMG.deliverProduction,
  },
  {
    n: "03",
    title: "Creatives",
    copy: "Brand worlds, campaigns and design systems that give every activation a consistent, recognizable identity.",
    photo: IMG.deliverCreatives,
  },
  {
    n: "04",
    title: "Influencer Marketing",
    copy: "Creator programs that connect brands with audiences through the players and personalities they already trust.",
    photo: IMG.deliverInfluencer,
  },
];

export default function Deliver() {
  return (
    <section id="deliver" className="bg-[#F6FAFF]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-[2.75rem]">
            WHAT WE
            <br />
            <span className="text-primary">DELIVER.</span>
          </h2>
          <p className="mt-2 text-xs text-muted">
            Two engines. One standard of execution.
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.n} delay={i * 70}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-[4/3] bg-navy">
                  <Image
                    src={it.photo}
                    alt={it.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-navy/20 transition group-hover:bg-navy/0" />
                </div>
                <div className="flex flex-1 flex-col p-3 sm:p-4">
                  <p className="text-xs font-extrabold text-primary">{it.n}</p>
                  <h3 className="font-display mt-1 text-sm font-extrabold text-navy sm:text-base">
                    {it.title}
                  </h3>
                  <p className="mt-1.5 flex-1 text-[11px] leading-relaxed text-muted">
                    {it.copy}
                  </p>
                  <div className="mt-3 flex justify-end">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mist text-primary transition group-hover:bg-primary group-hover:text-white">
                      →
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
