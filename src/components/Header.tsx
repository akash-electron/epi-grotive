import Image from "next/image";

export function DiamondMark({ size = 40 }: { size?: number }) {
  return (
    <Image
      src="/figma/emblem.png"
      alt="Epigrotive emblem"
      width={71}
      height={66}
      style={{ width: size, height: "auto" }}
      priority
    />
  );
}

export default function Header() {
  return (
    <header className="w-full bg-bar">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="shrink-0 border-l-2 border-primary pl-1.5 leading-[1.1] sm:pl-2">
            <p className="font-exo text-[10px] font-bold tracking-wide text-ink sm:text-[12px]">
              EPIGROTIVE
            </p>
            <p className="font-exo text-[10px] font-medium tracking-wide text-primary sm:text-[12px]">
              GAMING
            </p>
          </div>
          <Image
            src="/figma/socials.png"
            alt="Social links"
            width={160}
            height={31}
            className="h-[18px] w-auto shrink-0 sm:h-[22px]"
            priority
          />
        </div>

        <a href="#top" aria-label="Epigrotive home" className="shrink-0">
          <span className="block h-8 w-8 sm:hidden">
            <DiamondMark size={32} />
          </span>
          <span className="hidden h-10 w-10 sm:block">
            <DiamondMark size={40} />
          </span>
        </a>

        <nav className="font-display flex shrink-0 items-center gap-2 text-[9px] font-medium tracking-[0.1em] text-navlink sm:gap-6 sm:text-xs">
          <a href="#top" className="transition hover:text-ink">
            HOME
          </a>
          <a href="#deliver" className="transition hover:text-ink">
            ABOUT
          </a>
          <a href="#contact" className="transition hover:text-ink">
            CONTACT
          </a>
          <a
            href="#contact"
            aria-label="Start a project"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm text-white transition hover:bg-primary-dark sm:h-8 sm:w-8 sm:text-base"
          >
            →
          </a>
        </nav>
      </div>
    </header>
  );
}
