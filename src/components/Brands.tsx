import Image from "next/image";
import Reveal from "./Reveal";

const logos: { src: string; alt: string; w: number; h: number }[] = [
  { src: "/figma/logo-amazonpay.png", alt: "Amazon Pay", w: 204, h: 41 },
  { src: "/figma/logo-amd.png", alt: "AMD", w: 206, h: 51 },
  { src: "/figma/logo-gigabyte.png", alt: "Gigabyte Technology", w: 206, h: 46 },
  { src: "/figma/logo-dubai.png", alt: "Dubai Energy Drink", w: 204, h: 63 },
  { src: "/figma/logo-hp.png", alt: "HP", w: 90, h: 148 },
  { src: "/figma/logo-joy.png", alt: "Joy e-bike", w: 195, h: 55 },
  { src: "/figma/logo-ring.png", alt: "Partner", w: 116, h: 115 },
  { src: "/figma/logo-nvidia.png", alt: "NVIDIA", w: 206, h: 39 },
  { src: "/figma/logo-razer.png", alt: "Razer", w: 205, h: 34 },
  { src: "/figma/logo-rootershop.png", alt: "Rooter Shop", w: 195, h: 65 },
  { src: "/figma/logo-rooter.png", alt: "Rooter", w: 206, h: 55 },
  { src: "/figma/logo-fitcheck.png", alt: "The Fit Check", w: 185, h: 32 },
  { src: "/figma/logo-f.png", alt: "Partner", w: 149, h: 148 },
  { src: "/figma/logo-unipin.png", alt: "UniPin", w: 138, h: 40 },
  { src: "/figma/logo-vedam.png", alt: "Vedam School of Technology", w: 194, h: 67 },
  { src: "/figma/logo-veroforza.png", alt: "Veroforza", w: 204, h: 30 },
  { src: "/figma/logo-vishal.png", alt: "Vishal Peripherals", w: 177, h: 52 },
  { src: "/figma/logo-wellversed.png", alt: "Wellversed", w: 185, h: 41 },
];

export default function Brands() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Reveal className="text-center">
          <h2 className="font-rajdhani text-3xl font-bold leading-tight text-ink sm:text-[2.75rem]">
            BRANDS WE&apos;VE
            <br />
            <span className="text-primary">WORKED WITH.</span>
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="relative mt-6 overflow-hidden rounded-[28px] bg-panel p-6 sm:p-10">
            <div className="bg-grid-blue pointer-events-none absolute inset-0 opacity-20" />
            <div className="relative grid grid-cols-3 items-center justify-items-center gap-x-4 gap-y-8 sm:grid-cols-6">
              {logos.map((l) => (
                <Image
                  key={l.src}
                  src={l.src}
                  alt={l.alt}
                  width={l.w}
                  height={l.h}
                  className="h-7 w-auto object-contain sm:h-10"
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
