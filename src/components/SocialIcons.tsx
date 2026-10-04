import { socialPath } from "@/lib/socials";
import { safeHref } from "@/lib/content/merge";

type Props = {
  socials: { name: string; href: string }[];
  /** Circle diameter as a CSS length. */
  size: string;
  /** Gap between circles as a CSS length. */
  gap: string;
  /** Circle fill. */
  circle?: string;
  /** Glyph fill. */
  glyph?: string;
  className?: string;
  style?: React.CSSProperties;
};

export default function SocialIcons({
  socials,
  size,
  gap,
  circle = "#231f20",
  glyph = "#ffffff",
  className = "",
  style,
}: Props) {
  return (
    <ul
      className={`flex items-center ${className}`}
      style={{ gap, ...style }}
    >
      {socials.map((s, i) => (
        <li key={i}>
          <a
            href={safeHref(s.href)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Epigrotive on ${s.name}`}
            className="flex items-center justify-center rounded-full transition hover:scale-110"
            style={{ width: size, height: size, backgroundColor: circle }}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              style={{ width: "58%", height: "58%", fill: glyph }}
            >
              <path d={socialPath(s.name)} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
