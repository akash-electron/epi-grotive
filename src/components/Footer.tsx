import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-4 text-[11px] sm:flex-row sm:px-6">
        <p className="flex items-center gap-2">
          <Image
            src="/figma/footer-emblem.png"
            alt="Epigrotive"
            width={35}
            height={36}
            className="h-5 w-auto"
          />
          <span className="font-exo text-xs font-bold">
            EPIGROTIVE <span className="text-primary">GAMING</span>
          </span>
        </p>
        <Image
          src="/figma/footer-socials.png"
          alt="Social links"
          width={170}
          height={47}
          className="h-5 w-auto"
        />
        <p className="font-exo text-[11px] text-white/50">
          © 2026 Epigrotive Gaming. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
