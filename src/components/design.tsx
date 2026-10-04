/* Helpers for placing layers at Figma desktop coordinates.
   1 unit = 1px of the 1920px frame, scaled by --u (see globals.css). */

export const u = (n: number) => `calc(${n} * var(--u))`;

export function Layer({
  src,
  alt = "",
  left,
  top,
  width,
  height,
  className = "",
  style,
}: {
  src: string;
  alt?: string;
  left: number;
  top: number;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      aria-hidden={alt ? undefined : "true"}
      className={`pointer-events-none absolute max-w-none ${className}`}
      style={{
        left: u(left),
        top: u(top),
        width: u(width),
        height: u(height),
        ...style,
      }}
    />
  );
}

export function Box({
  left,
  top,
  width,
  height,
  className = "",
  style,
  children,
}: {
  left: number;
  top: number;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`absolute ${className}`}
      style={{
        left: u(left),
        top: u(top),
        width: width === undefined ? undefined : u(width),
        height: height === undefined ? undefined : u(height),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* Text placed at the Figma text-box top-left.
   General Sans ("display") needs -0.068em: the browser's normal line box is
   taller than Figma's, which pushes glyphs down. Inter ("body") needs -0.11em
   for the same reason. */
export function T({
  children,
  left,
  top,
  size,
  tracking,
  weight,
  color,
  font = "display",
  inert = false,
}: {
  children: React.ReactNode;
  left: number;
  top: number;
  size: number;
  tracking: number;
  weight: number;
  color: string;
  font?: "display" | "body" | "rajdhani" | "exo" | "gobold";
  inert?: boolean;
}) {
  return (
    <p
      className={`absolute whitespace-nowrap ${
        font === "display"
          ? "font-display"
          : font === "rajdhani"
            ? "font-rajdhani"
            : font === "exo"
              ? "font-exo"
              : font === "gobold"
                ? "font-bebas"
                : "font-body"
      } ${inert ? "pointer-events-none" : ""}`}
      style={{
        left: u(left),
        top: u(top),
        fontSize: u(size),
        letterSpacing: u(tracking),
        fontWeight: weight,
        color,
        marginTop:
          font === "display" ? "-0.068em" : font === "rajdhani" ? "-0.109em" : font === "exo" ? "-0.0645em" : font === "gobold" ? "-0.24em" : "-0.11em",
      }}
    >
      {children}
    </p>
  );
}
